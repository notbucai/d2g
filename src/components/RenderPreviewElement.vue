<template>
  <div class="preview-list-item" @click.stop="onClick">
    <div
      class="preview-item-mark"
      :style="{ width: rect?.width + 'px', height: rect?.height + 'px' }"
      :class="{ 'is-active': isActive }"
    >
      <!-- 删除就不放在这里了 -->
      <!-- <div class="preview-item-mark-del">
        <ElIconClose />
      </div> -->
    </div>
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

onMounted(() => {
  // console.log('elementEl.value?.$el', elementEl.value?.$el);
  const el = elementEl.value?.$el;
  if (!(el instanceof HTMLElement)) {
    return;
  }
  const rects = el?.getClientRects();
  rect.value = rects?.[0]?.toJSON();
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
  // .preview-item-mark-del {
  //   display: none;
  //   position: absolute;
  //   right: -8px;
  //   top: -8px;
  //   width: 16px;
  //   height: 16px;
  //   cursor: pointer;
  //   background-color: rgba($color: #409eff, $alpha: .1);
  //   border: 1px solid #409eff;
  //   color: #409eff;
  //   border-radius: 50%;
  // }
  &:hover,
  &.is-active {
    border: 2px dashed rgba($color: #409eff, $alpha: 0.5);
    background-color: rgba($color: #fff, $alpha: 0.5);
    // .preview-item-mark-del {
    //   display: block;
    // }
  }
}
</style>
