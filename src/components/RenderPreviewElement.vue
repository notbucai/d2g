<template>
  <div class="preview-list-item" @click.stop="onClick">
    <div
      class="preview-item-mark"
      :style="{
        width: rect?.width + 'px',
        height: rect?.height + 'px',
        // top: rect?.top + 'px',
        left: rect?.left + 'px',
      }"
      :class="{ 'is-active': isActive }"
      v-if="!isLayout || isActive"
    ></div>
    <RenderElementVue :element="element" ref="elementEl" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { ElementType, IRenderElement } from "../models/element";
import RenderElementVue from "./RenderElement.vue";
import { usePreviewStore } from "../store/preview";
import { onUnmounted } from "vue";

const useData = usePreviewStore();

const props = defineProps<{
  element: IRenderElement;
}>();
const emit = defineEmits<{
  (event: "change-element", value: IRenderElement): void;
}>();

const isLayout = computed(() => {
  return props.element.type === ElementType.Layout;
});

const isActive = computed(() => {
  return useData.selectionId === props.element.id;
});

const elementEl = ref<InstanceType<typeof RenderElementVue> | null>(null);
const rect = ref<DOMRect | null>(null);

const resize = () => {
  const el = elementEl.value?.$el;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  const rects = el.getClientRects();
  rect.value = rects?.[0]?.toJSON();
  return true;
};

let resizeObserver: ResizeObserver;

onMounted(() => {
  const status = resize();
  if (!status) {
    return;
  }
  const el = elementEl.value?.$el;
  // change size
  resizeObserver = new ResizeObserver(() => {
    resize();
  });
  resizeObserver.observe(el);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});

const onClick = () => {
  let node: IRenderElement | undefined = props.element;
  if (isActive.value) {
    node = undefined;
  }
  useData.selectNode(node);
};
</script>

<style lang="scss" scoped>
.preview-item-mark {
  position: absolute;
  z-index: 10;
  background-color: rgba($color: #fff, $alpha: 0.2);
  box-sizing: border-box;
  &:hover,
  &.is-active {
    border: 2px dashed rgba($color: #409eff, $alpha: 0.5);
    background-color: rgba($color: #fff, $alpha: 0.5);
  }
}
</style>
