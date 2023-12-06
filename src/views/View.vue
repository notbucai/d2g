<template>
  <div class="view-page">
    <RenderElement v-for="item in nodes" :key="item.id" :element="item" />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import RenderElement from "../components/RenderElement.vue";

const cache = JSON.parse(localStorage.getItem("nodes") || "{}");
const nodes = ref(cache);

provide('RENDER_TYPE', 'view');

</script>

<style lang="scss" scoped>
</style>