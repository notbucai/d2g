import { defineStore } from "pinia";
import { IRenderElement } from "../models/element";

export const useDesignerStore = defineStore("designer", {
  state: () => ({
    previewWindow: null as Window | null,
    selection: null as IRenderElement | null,
  }),

  getters: {},

  actions: {
    setPreviewWindow(window: Window) {
      this.previewWindow = window;
    },
    setSelection(selection: IRenderElement | null) {
      this.selection = selection;
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
  },
});
