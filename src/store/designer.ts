import { defineStore } from "pinia";
import { ElementType, IRenderElement, IRenderLayer } from "../models/element";
import { PostMessageIpc } from "../common/ipc";
import { getComponents } from "../packages";

const cacheNodes = JSON.parse(localStorage.getItem("nodes") || "null");

export const useDesignerStore = defineStore("designer", {
  state: () => ({
    ipc: null as PostMessageIpc | null,
    previewWindow: null as Window | null,
    previewElement: null as HTMLIFrameElement | null,
    selection: null as IRenderElement | null,
    nodes:
      cacheNodes ||
      ([
        {
          id: "address",
          element: "d2g-address",
          attrs: {
            name: "不才",
            tel: "13000000000",
          },
          subChildrenMap: {},
        },
        {
          id: "grid-test",
          element: "d2g-grid",
          attrs: {
            list: [
              {
                title: "标题1",
                image: "https://picsum.photos/300/200?random=1",
              },
              {
                title: "标题2",
                image: "https://picsum.photos/300/200?random=2",
              },
              {
                title: "标题3",
                image: "https://picsum.photos/300/200?random=3",
              },
            ],
          },
          subChildrenMap: {},
        },
        {
          id: "test",
          element: "d2g-banner",
          attrs: {
            list: [
              {
                title: "标题1",
                image: "https://picsum.photos/300/200?random=1",
              },
              {
                title: "标题2",
                image: "https://picsum.photos/300/200?random=2",
              },
              {
                title: "标题3",
                image: "https://picsum.photos/300/200?random=3",
              },
            ],
          },
          subChildrenMap: {},
        },
        {
          id: "text1",
          element: "d2g-text",
          attrs: {
            text: "测试文本1",
          },
          subChildrenMap: {},
        },

        {
          id: "card-1",
          element: "d2g-card",
          attrs: {
            title: "卡片标题",
          },
          subChildrenMap: {
            card: [
              {
                id: "text-card",
                element: "d2g-text",
                attrs: {
                  text: "测试文本1",
                },
              },
            ],
          },
        },
        {
          id: "test2",
          element: "d2g-tabs",
          type: ElementType.Layout,
          attrs: {
            tabs: [
              {
                name: "标签1",
              },
              {
                name: "标签2",
              },
            ],
          },
          subChildrenMap: {
            0: [
              {
                id: "textfa",
                element: "d2g-text",
                attrs: {
                  text: "测试文本2",
                },
              },
            ],
            1: [
              {
                id: "text77",
                element: "d2g-text",
                attrs: {
                  text: "测试文本4",
                },
              },
            ],
          },
        },
      ] as IRenderElement[]),
    contextmenu: {
      visible: false,
      node: null as IRenderElement | null,
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    },
  }),

  getters: {
    components() {
      return getComponents();
    },
    layerList() {
      const components = this.components;
      // 扁平化数据
      const result: IRenderLayer[] = [];

      const walk = (node: IRenderElement, level: number, layerNode: string) => {
        result.push({ node, level, layerNode });

        Object.values(node.subChildrenMap || {}).forEach((nodes) => {
          nodes.forEach((node, index) => {
            walk(node, level + 1, `${layerNode}-${index}`);
          });
        });
      };

      this.nodes.forEach((node: IRenderElement) => {
        walk(node, 0, "0");
      });

      result.forEach(item => {
        const component = components.find(component => component.element === item.node.element);
        item.component = component;
      });

      return result;
    },
  },

  actions: {
    initIpc(previewWindow: Window) {
      if (this.ipc) {
        this.ipc.destroy();
      }
      this.ipc = new PostMessageIpc(window, previewWindow);
      this.ipc.on<IRenderElement | null>("selection", (data) => {
        this.setSelection(data);
      });
      this.ipc.on<IRenderElement[]>("update-nodes", (data) => {
        this.setNodes(data);
      });
      this.ipc.on<{ event: MouseEvent; node: IRenderElement, type: string }>(
        "contextmenu",
        (data) => {
          this.showContextMenu(data.event, data.node, data.type);
        }
      );
    },
    setPreviewWindow(window: Window, previewElement: HTMLIFrameElement) {
      this.previewWindow = window;
      this.previewElement = previewElement;
      this.initIpc(window);
    },
    setSelection(selection: IRenderElement | null) {
      this.hideContextMenu();
      this.selection = selection;
    },
    setNodes(nodes: IRenderElement[]) {
      this.nodes = nodes;
      localStorage.setItem("nodes", JSON.stringify(nodes));
    },
    updateNode(node: IRenderElement) {
      this.hideContextMenu();

      this.setSelection(node);

      this.ipc?.send("update-node-config", node);
    },
    initPreviewData() {
      this.ipc?.send("init-preview-data", this.nodes);
    },
    async showContextMenu(event: MouseEvent, node: IRenderElement, type = 'node') {
      console.log("setContextMenu", event, node);
      // 计算位置，event 为iframe中的坐标，需要转换为页面坐标
      const { clientX, clientY } = event;

      const previewElement = this.previewElement;
      const previewRect = previewElement?.getBoundingClientRect();
      if (!previewRect) return;

      let { left, top } = previewRect;

      if (type === 'layer') {
        left = 0;
        top = 0;
      }

      const x = clientX + left;
      const y = clientY + top;

      this.contextmenu = {
        visible: true,
        node,
        position: {
          x,
          y,
        },
      };
    },
    hideContextMenu() {
      this.contextmenu.visible = false;
    },
    execContextMenu(type: string) {
      this.ipc?.send("exec-contextmenu", { type, node: this.contextmenu.node });
    },
    selectActiveLayer(layer: IRenderLayer) {
      this.ipc?.send("select-node", layer.node);
    },
    onContextmenuLayer(event: MouseEvent, layer: IRenderLayer) {
      this.ipc?.send("contextmenu-layer", {
        event: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
        layer,
      });
    }
  },
});
