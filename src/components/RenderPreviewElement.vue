<template>
  <div class="preview-list-item">
    <div
      class="preview-item-mark"
      :style="{ width: rect?.width + 'px', height: rect?.height + 'px' }"
    ></div>
    <RenderElementVue :element="element" ref="elementEl" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RenderElement } from "../models/element";
import RenderElementVue from "./RenderElement.vue";

defineProps<{
  element: RenderElement;
}>();

const elementEl = ref<InstanceType<typeof RenderElementVue> | null>(null);
const rect = ref<DOMRect | null>(null);

onMounted(() => {
  const rects = elementEl.value?.$el?.getClientRects();
  rect.value = rects?.[0]?.toJSON();
});
</script>

<style lang="scss" scoped>
.preview-item-mark {
  position: absolute;
  z-index: 10;
  background-color: #fff;
  opacity: 0.2;
  box-sizing: border-box;
  &:hover,
  &.is-active {
    border: 2px dashed #409eff;
    opacity: 0.5;
  }
}
</style>
