<template>
  <div class="preview-container">
    <RenderPreview v-model:data="data.nodes" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useDataStore } from "../store/data";

const data = useDataStore();

watch(
  () => data.nodes,
  () => {
    console.log(JSON.stringify(data.nodes));
  },
  {
    deep: true,
  }
);

</script>

<style lang="scss" scoped>
@import "../assets/designer.scss";
</style>
