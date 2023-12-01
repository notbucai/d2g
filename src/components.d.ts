// RenderPreview
import RenderPreview from "./components/RenderPreview.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RenderPreview: typeof RenderPreview;
  }
}