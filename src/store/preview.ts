import { defineStore } from "pinia";
import { ElementType, IRenderElement } from "../models/element";

// import { flattenDeep } from "lodash";

export const usePreviewStore = defineStore("preview", {
  state: () => ({
    selectionId: null as string | null,
    nodes: [
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
        children: {},
      },
      {
        id: "text1",
        element: "d2g-text",
        attrs: {
          text: "测试文本1",
        },
      },

      {
        id: "card-1",
        element: "d2g-card",
        attrs: {
          title: "123123",
        },
        children: {
          card: [
            {
              id: "text1",
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
        children: {
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
      if (!this.selection) {
        console.warn("updateSelectionNode: no selection");
        return;
      }
      this.selection.attrs = node.attrs;
    },
  },
});
