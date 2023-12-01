<template>
  <div class="preview-list-item">
    <div
      class="preview-item-mark"
      :style="{ width: rect?.width + 'px', height: rect?.height + 'px' }"
      v-if="!isChildren"
    ></div>
    <RenderElementVue :element="element" ref="elementEl">
      <template v-if="isChildren && elementChildren">
        <RenderPreview v-model:data="elementChildren" :key="element.id" />
      </template>
    </RenderElementVue>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { RenderElement } from "../models/element";
import RenderElementVue from "./RenderElement.vue";
const props = defineProps<{
  element: RenderElement;
}>();
const emit = defineEmits<{
  (event: "change-element", value: RenderElement): void;
}>();

const elementChildren = computed({
  get() {
    return props.element.children;
  },
  set(value) {
    props.element.children = value;
  },
});

const isChildren = computed(() => {
  return !!elementChildren.value?.length;
});

const elementEl = ref<InstanceType<typeof RenderElementVue> | null>(null);
const rect = ref<DOMRect | null>(null);

onMounted(() => {
  // console.log('elementEl.value?.$el', elementEl.value?.$el);
  const el = elementEl.value?.$el;
  if (!(el instanceof HTMLElement)) {
    return 
  }
  const rects = el?.getClientRects();
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