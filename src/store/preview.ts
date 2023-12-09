import { defineStore } from "pinia";
import { IRenderElement, IRenderLayer } from "../models/element";
import { nextTick } from "vue";
import { PostMessageIpc } from "../common/ipc";

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    selectionId: null as string | null,
    nodes: [] as IRenderElement[],
    keyId: 0,

    selection: null as IRenderElement | null,

    ipc: null as PostMessageIpc | null,
  }),

  getters: {
    groupNodeList(): IRenderElement[][] {
      // 找到所有的包含子节点的节点，多级
      const list: IRenderElement[][] = [];
      const find = (nodes: IRenderElement[]) => {
        nodes.forEach((node) => {
          if (!node.subChildrenMap) return;
          Object.keys(node.subChildrenMap).forEach((key) => {
            if (!node.subChildrenMap?.[key]?.length) return;
            list.push(node.subChildrenMap[key]);
            find(node.subChildrenMap[key]);
          });
        });
      };

      list.push(this.nodes);

      find(this.nodes);

      return list;
    },
    nodeList(): IRenderElement[] {
      // 找到所有的包含子节点的节点，多级
      const list: IRenderElement[] = [];
      const find = (nodes: IRenderElement[]) => {
        nodes.forEach((node) => {
          list.push(node);
          if (!node.subChildrenMap) return;
          Object.keys(node.subChildrenMap).forEach((key) => {
            if (!node.subChildrenMap?.[key]?.length) return;
            find(node.subChildrenMap[key]);
          });
        });
      };

      find(this.nodes);

      return list;
    }
  },

  actions: {
    initIpc() {
      this.ipc = new PostMessageIpc(window, window.parent);

      this.ipc?.on<IRenderElement>("update-node-config", (data) => {
        this.updateSelectionNode(data);
      });
      this.ipc?.on<IRenderElement[]>("init-preview-data", (data) => {
        this.updateNodes(data);
      });
      this.ipc?.on<{ type: string; node: IRenderElement }>(
        "exec-contextmenu",
        (data) => {
          this.execContextmenu(data.type, data.node);
        }
      );
      // selection
      this.ipc?.on<IRenderElement>("select-node", (data) => {
        this.selectNode(data);
      });
      // contextmenu-layer
      this.ipc?.on<{ event: MouseEvent; layer: IRenderLayer }>(
        "contextmenu-layer",
        (data) => {
          this.contextMenuNode(data.layer.node, data.event, 'layer');
        }
      );
    },
    updateNodes(nodes: IRenderElement[]) {
      this.keyId++;
      this.nodes = nodes;
    },
    selectNode(node?: IRenderElement) {
      this.selectionId = node?.id || null;
      const storeNode = this.nodeList.find((item) => item.id === this.selectionId);
      this.selection = storeNode || null;
    },
    updateSelectionNode(node: IRenderElement) {
      if (!this.selection) {
        console.warn("updateSelectionNode: no selection");
        return;
      }
      this.selection.attrs = node.attrs;
    },
    async contextMenuNode(node: IRenderElement, event: MouseEvent, type: string = 'node') {
      this.selectNode(node);

      await nextTick();

      this.ipc?.send("contextmenu", {
        node: JSON.parse(JSON.stringify(node)),
        event: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
        type,
      });
    },
    getNodeParentGroup(nodeId: string) {
      const groupNodeList = this.groupNodeList;
      for (let i = 0; i < groupNodeList.length; i++) {
        const list = groupNodeList[i];
        const index = list.findIndex((item) => item.id === nodeId);
        if (index > -1) {
          return list;
        }
      }
      return [];
    },
    delNode(node: IRenderElement): boolean {
      const parentGroup = this.getNodeParentGroup(node.id);
      const index = parentGroup.findIndex((item) => item.id === node.id);
      if (index > -1) {
        parentGroup.splice(index, 1);
        return true;
      }
      return false;
    },
    upNode(node: IRenderElement): boolean {
      const parentGroup = this.getNodeParentGroup(node.id);
      const index = parentGroup.findIndex((item) => item.id === node.id);
      if (index > 0) {
        parentGroup.splice(index, 1);
        parentGroup.splice(index - 1, 0, node);
        return true;
      }
      return false;
    },
    downNode(node: IRenderElement): boolean {
      const parentGroup = this.getNodeParentGroup(node.id);
      const index = parentGroup.findIndex((item) => item.id === node.id);
      if (index > -1 && index < parentGroup.length - 1) {
        parentGroup.splice(index, 1);
        parentGroup.splice(index + 1, 0, node);
        return true;
      }
      return false;
    },
    execContextmenu(type: string, node: IRenderElement) {
      // del up down
      if (type === "del") {
        this.selectNode();
        this.delNode(node);
      } else if (type === "up") {
        this.upNode(node);
      } else if (type === "down") {
        this.downNode(node);
      }
    },
  },
});
