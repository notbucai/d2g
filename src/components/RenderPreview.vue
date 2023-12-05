<template>
  <div class="preview-list" ref="previewListRef" :key="keyId">
    <template v-for="item in list" :key="item.id">
      <RenderPreviewElement
        :element="item"
        @change-element="onChangeItem(item, $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, StyleValue } from "vue";
import RenderPreviewElement from "../components/RenderPreviewElement.vue";
import { ElementType, IRenderElement } from "../models/element";
import SortableType from "sortablejs";
import { computed } from "vue";
import { getComponents } from "../packages";
import { nextTick } from "vue";

const previewListRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: IRenderElement[];
  style?: StyleValue;
}>();

const emit = defineEmits<{
  (event: "update:data", value: IRenderElement[]): void;
}>();

const list = computed({
  get() {
    return props.data;
  },
  set(value) {
    emit("update:data", value);
  },
});

const keyId = ref(1);

let sortable: SortableType | null = null;

const onChangeItem = (item: IRenderElement, value: IRenderElement) => {
  const listValue = [...list.value];
  const index = listValue.findIndex((v) => v.id === item.id);
  if (index === -1) return;
  listValue.splice(index, 1, value);
  list.value = listValue;
  renderSortable();
};

const components = getComponents();

const renderSortable = async () => {
  console.log("renderSortable");

  const parentWindow = window.parent;
  if (!parentWindow) return;
  const Sortable = (parentWindow as any).Sortable as typeof SortableType;
  sortable?.destroy();

  keyId.value += 1;

  await nextTick();

  if (!previewListRef.value) return;

  sortable = new Sortable(previewListRef.value, {
    // bug: https://github.com/SortableJS/Sortable/issues/1707
    // fix: 约等于没有解决
    animation: -1,
    ghostClass: "preview-ghost",
    group: "d2g",
    direction: "vertical",

    onAdd(evt) {
      const { item, newIndex } = evt;
      const dataset = item.dataset;
      if (!dataset) return;
      if (newIndex === undefined) return;
      const { element } = dataset;
      if (!element) return;

      const config = components.find((v) => v.element === element);

      const re = {
        id: Math.random().toString(),
        type: config?.type ?? ElementType.Component,
        element,
        attrs: config?.data ?? {},
        subChildrenMap: {},
      } as IRenderElement;
      const listValue = [...list.value];
      listValue.splice(newIndex, 0, re);

      list.value = listValue;

      renderSortable();
    },
    onMove(evt) {
      console.log('onMove->', evt);
      // 如果来源不是自己或组件库，则禁止拖拽
      if (evt.from !== evt.to) {
        return false;
      }
    },
    onEnd(evt) {
      const { oldIndex, newIndex } = evt;
      if (oldIndex === undefined) return;
      if (newIndex === undefined) return;
      if (oldIndex === newIndex) return;

      const listValue = list.value;
      const oldItem = listValue[oldIndex];
      if (!oldItem) return;
      listValue.splice(oldIndex, 1);
      listValue.splice(newIndex, 0, oldItem);
      keyId.value += 1;
      renderSortable();
    },
  });

  console.log('sortable', sortable);
  
};

onMounted(() => {
  const parentWindow = window.parent;
  if (!parentWindow) return;
  if (!previewListRef.value) return;

  renderSortable();
});
</script>

<style lang="scss" scoped>
.preview-list {
  &:empty {
    min-height: 100px;
    border: 2px dashed #ebeef5;
  }
}
</style>
