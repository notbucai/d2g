<template>
  <div class="preview-container">
    <RenderPreview
      v-model:data="useData.nodes"
      style="min-height: 100vh; box-sizing: border-box"
    ></RenderPreview>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { usePreviewStore } from "../store/preview";
import { provide } from "vue";

const useData = usePreviewStore();
useData.initIpc();

provide("RENDER_TYPE", "preview");

watch(
  () => useData.nodes,
  () => {
    console.log(JSON.stringify(useData.nodes));
    useData.ipc?.send("update-nodes", useData.nodes);
  },
  {
    deep: true,
  }
);

watch(
  () => useData.selection,
  (selection) => {
    useData.ipc?.send("selection", selection);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss">
@import "../assets/ghost.scss";
.preview-container {
  min-height: 100vh;
  background-color: #fff;
}
</style>
