<template>
  <div class="designer-container">
    <HeaderNav />

    <div class="designer-main">
      <ComponentSide />
      <div class="preview-iframe">
        <iframe
          src="/#/preview"
          frameborder="0"
          ref="previewEl"
          @load="onLoadIframe"
        ></iframe>
      </div>
      <ConfigurationSide />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, watch } from "vue";

import HeaderNav from "../layout/designer/HeaderNav.vue";
import ComponentSide from "../layout/designer/ComponentSide.vue";
import ConfigurationSide from "../layout/designer/ConfigurationSide.vue";
import { useDesignerStore } from "../store/designer";

const useData = useDesignerStore();

(window as any).Sortable = Sortable;

const previewEl = ref<HTMLIFrameElement | null>(null);

watch(previewEl, (el) => {
  if (!el?.contentWindow) return;
  useData.setPreviewWindow(el.contentWindow);
}, {
  immediate: true,
});

const onLoadIframe = () => {
  console.log("onLoadIframe");
};

window.addEventListener("message", (e) => {
  const type = e.data?.type;
  const data = e.data?.data;
  if (type === "selection") {
    useData.setSelection(data);
  }
});
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
  width: 375px;
  height: 667px;
  box-shadow: 0 0 12px rgba(150, 150, 150, 0.1);
  // border: 2px solid #fff;
  margin-top: 24px;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
