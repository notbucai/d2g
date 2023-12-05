import { defineStore } from "pinia";
import { RenderElement } from "../models/element";

import { flattenDeep } from "lodash";

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    selectionId: null as string | null,
    nodes: [
      new RenderElement(
        "test",
        "d2g-banner",
        {
          list: [],
        },
        []
      ),
    ],
  }),

  getters: {
    flatNodes: (state) => {
      return flattenDeep(state.nodes);
    },

    selection(state): RenderElement | null {
      // 存在多层问题
      const nodes = this.flatNodes;
      const selectionId = state.selectionId;
      const selection = nodes.find((node) => node.id === selectionId);
      return selection || null;
    },
  },

  actions: {
    updateNodes(nodes: RenderElement[]) {
      this.nodes = nodes;
    },
    updateSelectionId(id: string | null) {
      this.selectionId = id;
    },
    updateNode(id: string, attr: any) {
      const nodes = this.flatNodes;
      const selection = nodes.find((node) => node.id === id);
      if (selection) {
        selection.attrs = attr;
      }
    },
  },
});
