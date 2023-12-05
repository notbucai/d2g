import { defineStore } from "pinia";
import { ElementType, IRenderElement } from "../models/element";

const cacheNodes = JSON.parse(localStorage.getItem("nodes") || "null");

export const useDesignerStore = defineStore("designer", {
  state: () => ({
    previewWindow: null as Window | null,
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
  }),

  getters: {},

  actions: {
    setPreviewWindow(window: Window) {
      this.previewWindow = window;
    },
    setSelection(selection: IRenderElement | null) {
      this.selection = selection;
    },
    setNodes(nodes: IRenderElement[]) {
      this.nodes = nodes;
      localStorage.setItem("nodes", JSON.stringify(nodes));
    },
    updateNode(node: IRenderElement) {
      this.setSelection(node);
      const previewWindow = this.previewWindow;
      // postMessage
      previewWindow?.postMessage(
        {
          type: "update-node-config",
          data: JSON.parse(JSON.stringify(node)),
        },
        {
          targetOrigin: "*",
        }
      );
    },
    initPreviewData() {
      const previewWindow = this.previewWindow;
      previewWindow?.postMessage(
        {
          type: "init-preview-data",
          data: JSON.parse(JSON.stringify(this.nodes)),
        },
        {
          targetOrigin: "*",
        }
      );
    },
  },
});
