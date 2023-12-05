<template>
  <div class="preview-container">
    <RenderPreview v-model:data="useData.nodes" style="min-height: 100vh;"></RenderPreview>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { usePreviewStore } from "../store/preview";

const useData = usePreviewStore();
const parentWindow = window.parent;

window.addEventListener("message", (e) => {
  const type = e.data?.type;
  const data = e.data?.data;
  if (type === "update-node-config") {
    useData.updateSelectionNode(data);
  }
});

watch(
  () => useData.nodes,
  () => {
    console.log(JSON.stringify(useData.nodes));
  },
  {
    deep: true,
  }
);

watch(
  () => useData.selection,
  (selection) => {
    console.log("selection -> ", selection, parentWindow);
    parentWindow.postMessage(
      {
        type: "selection",
        data: JSON.parse(JSON.stringify(selection)),
      },
      "*"
    );
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
