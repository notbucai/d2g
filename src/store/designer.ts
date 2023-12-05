import { defineStore } from "pinia";
import { RenderElement } from "../models/element";

export const useDesignerStore = defineStore("designer", {
  state: () => ({
    previewWindow: null as Window | null,
    selection: null as RenderElement | null,
  }),

  getters: {},

  actions: {
    setPreviewWindow(window: Window) {
      this.previewWindow = window;
    },
    setSelection(selection: RenderElement | null) {
      this.selection = selection;
    },
    updateNode(node: RenderElement) {
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
  },
});
