import { defineStore } from "pinia";
import { IRenderElement } from "../models/element";
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
    getAllNodeList(): IRenderElement[][] {
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
    },
    updateNodes(nodes: IRenderElement[]) {
      this.keyId++;
      this.nodes = nodes;
    },
    selectNode(node?: IRenderElement) {
      this.selectionId = node?.id || null;
      this.selection = node || null;
    },
    updateSelectionNode(node: IRenderElement) {
      if (!this.selection) {
        console.warn("updateSelectionNode: no selection");
        return;
      }
      this.selection.attrs = node.attrs;
    },
    async contextMenuNode(node: IRenderElement, event: MouseEvent) {
      this.selectNode(node);
      const a = this.getAllNodeList;
      console.log("a", a);

      await nextTick();
      
      this.ipc?.send("contextmenu", {
        node: JSON.parse(JSON.stringify(node)),
        event: {
          clientX: event.clientX,
          clientY: event.clientY,
        },
      });
    },
  },
});
