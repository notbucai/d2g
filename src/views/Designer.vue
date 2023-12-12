<template>
  <div class="designer-container">
    <HeaderNav />

    <div class="designer-main">
      <ComponentSide />
      <div class="preview-iframe">
        <i-devices modelbar="true" scale="0.8">
          <iframe
            src="/#/preview"
            frameborder="0"
            ref="previewEl"
            @load="onLoadIframe"
            slot="slot-screen"
            
            class="preview-iframe-content"
          ></iframe>
        </i-devices>
      </div>
      <ConfigurationSide />
    </div>

    <DesignerContextMenu />
  </div>
</template>

<script setup lang="ts">
import 'i-devices';
import Sortable from "sortablejs";
import { ref, watch } from "vue";

import HeaderNav from "../layout/designer/HeaderNav.vue";
import ComponentSide from "../layout/designer/ComponentSide.vue";
import ConfigurationSide from "../layout/designer/ConfigurationSide.vue";
import { useDesignerStore } from "../store/designer";
import DesignerContextMenu from "../components/DesignerContextMenu.vue";

const useData = useDesignerStore();

(window as any).Sortable = Sortable;

const previewEl = ref<HTMLIFrameElement | null>(null);

watch(
  previewEl,
  (el) => {
    if (!el?.contentWindow) return;
    useData.setPreviewWindow(el.contentWindow, el);
  },
  {
    immediate: true,
  }
);

const onLoadIframe = () => {
  console.log("onLoadIframe");
  useData.initPreviewData();
};
</script>

<style lang="scss" scoped>
.designer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .designer-main {
    display: flex;
    flex: 1;
    justify-content: space-between;
    flex-direction: row;
    overflow: hidden;
  }
}
.preview-iframe {
  margin-top: 24px;
  .preview-iframe-content {
    width: 100%;
    height: 100%;
    height: 738px;
  }
}
</style>
