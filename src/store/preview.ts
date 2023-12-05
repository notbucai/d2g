import { defineStore } from "pinia";
import { IRenderElement } from "../models/element";

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    selectionId: null as string | null,
    nodes: [] as IRenderElement[],
    keyId: 0,

    selection: null as IRenderElement | null,
  }),

  actions: {
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
  },
});
