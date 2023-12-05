<template>
  <div class="preview-container">
    <RenderPreview v-model:data="useData.nodes" style="min-height: 100vh;box-sizing: border-box;"></RenderPreview>
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
  console.log('preview type', type);
  
  if (type === "update-node-config") {
    useData.updateSelectionNode(data);
  } else if (type === "init-preview-data") {
    useData.updateNodes(data);
  }
});

watch(
  () => useData.nodes,
  () => {
    console.log(JSON.stringify(useData.nodes));
    parentWindow.postMessage(
      {
        type: "update-nodes",
        data: JSON.parse(JSON.stringify(useData.nodes)),
      },
      "*"
    );
  },
  {
    deep: true,
  }
);

watch(
  () => useData.selection,
  (selection) => {
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
