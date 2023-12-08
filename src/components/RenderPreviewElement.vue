<template>
  <div
    class="preview-list-item"
    :data-id="element.id"
    @click.stop="onClick"
    @contextmenu.stop.prevent="onContextMenu"
  >
    <div
      class="preview-item-mark"
      @click.stop="onClick"
      :style="{
        position: isFloat ? 'fixed' : 'absolute',
        width: rect?.width + 'px',
        height: rect?.height + 'px',
        top: isFloat ? rect?.top + 'px' : undefined,
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

const isFloat = computed(() => {
  return props.element.type === ElementType.Float;
});

const isActive = computed(() => {
  return useData.selectionId === props.element.id;
});

const elementEl = ref<InstanceType<typeof RenderElementVue> | null>(null);
const rect = ref<DOMRect | null>(null);

const resize = () => {
  console.log("resize");
  const el = elementEl.value?.$el;
  if (!(el instanceof HTMLElement)) {
    return false;
  }
  const rects = el.getClientRects();
  rect.value = rects?.[0]?.toJSON();
  return true;
};

let resizeObserver: ResizeObserver;
let floatTimer: any = null;
onMounted(() => {
  const status = resize();
  if (!status) {
    return;
  }
  const el = elementEl.value?.$el;
  let timer: any = null;
  // change size
  resizeObserver = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      resize();
    }, 100);
  });
  resizeObserver.observe(el);

  if (isFloat.value) {
    clearInterval(floatTimer);
    floatTimer = setInterval(() => {
      resize();
    }, 300);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  clearInterval(floatTimer);
});

const onClick = () => {
  let node: IRenderElement | undefined = props.element;
  if (isActive.value) {
    node = undefined;
  }
  useData.selectNode(node);
};

const onContextMenu = (event: MouseEvent) => {
  useData.contextMenuNode(props.element, event);
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
  &.is-active {
    border-style: solid;
  }
}
</style>
