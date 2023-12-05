import { defineStore } from "pinia";
import { ElementType, IRenderElement } from "../models/element";

import { flattenDeep } from "lodash";

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    selectionId: null as string | null,
    nodes: [
      {
        id: "test",
        element: "d2g-banner",
        attrs: {
          list: [],
        },
        children: {},
      },
      {
        id: "test2",
        element: "d2g-tabs",
        type: ElementType.Layout,
        attrs: {
          tabs:[
            {
              name: 'test',
            },
            {
              name: 'test2',
            },
          ],
        },
        children: {},
      }
    ] as IRenderElement[],

    selection: null as IRenderElement | null,
  }),

  actions: {
    updateNodes(nodes: IRenderElement[]) {
      this.nodes = nodes;
    },
    selectNode(node?: IRenderElement) {
      this.selectionId = node?.id || null;
      this.selection = node || null;
    },
    updateSelectionNode(node: IRenderElement) {
      if(!this.selection){
        console.warn('updateSelectionNode: no selection');
        return;
      }
      this.selection.attrs = node.attrs;
    },
  },
});
