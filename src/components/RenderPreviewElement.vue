<template>
  <div class="preview-list-item" @click.stop="onClick">
    <div
      class="preview-item-mark"
      :style="{ width: rect?.width + 'px', height: rect?.height + 'px' }"
      :class="{ 'is-active': isActive }"
      v-if="!isChildren || isActive"
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
import { useDataStore } from "../store/data";
import { onUnmounted } from "vue";

const useData = useDataStore();

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
  let id = props.element.id || null;
  if (isActive.value) {
    id = null;
  }
  useData.updateSelectionId(id);
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
