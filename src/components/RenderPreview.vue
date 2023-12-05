<template>
  <div class="preview-list" ref="previewListRef" :key="keyId" :style="style">
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
import { RenderElement } from "../models/element";
import SortableType from "sortablejs";
import { computed } from "vue";
import { getComponents } from "../packages";

const previewListRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: RenderElement[];
  style?: StyleValue;
}>();

const emit = defineEmits<{
  (event: "update:data", value: RenderElement[]): void;
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

const onChangeItem = (item: RenderElement, value: RenderElement) => {
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

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 0);
  });

  if (!previewListRef.value) return;

  sortable = Sortable.create(previewListRef.value, {
    // bug: https://github.com/SortableJS/Sortable/issues/1707
    // fix: 约等于没有解决
    animation: 0,
    ghostClass: "preview-ghost",
    group: "d2g",
    forceAutoScrollFallback: true,
    fallbackOnBody: true,
    onAdd(evt) {
      const { item, newIndex } = evt;
      const dataset = item.dataset;
      if (!dataset) return;
      if (newIndex === undefined) return;
      const { element } = dataset;
      if (!element) return;

      const config = components.find((v) => v.element === element);

      const re = new RenderElement(Math.random().toString(), element, config?.data ?? {}, []);
      const listValue = [...list.value];
      listValue.splice(newIndex, 0, re);

      list.value = listValue;

      renderSortable();
    },
    onMove(evt) {
      // console.log(evt);
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
};

onMounted(() => {
  const parentWindow = window.parent;
  if (!parentWindow) return;
  if (!previewListRef.value) return;

  renderSortable();
});
</script>

<style lang="scss" scoped>
</style>
