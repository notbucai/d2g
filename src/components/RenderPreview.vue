<template>
  <div class="preview-list" ref="previewListRef" :key="keyId">
    <template v-for="item in list" :key="keyId + item.id">
      <RenderPreviewElement :element="item" @change="onChangeItem(item, $event)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RenderPreviewElement from "../components/RenderPreviewElement.vue";
import { RenderElement } from "../models/element";
import SortableType from "sortablejs";
import { computed } from "vue";

const previewListRef = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: RenderElement[];
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

const renderSortable = async () => {
  if (!previewListRef.value) return;

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

  sortable = Sortable.create(previewListRef.value, {
    animation: 150,
    ghostClass: "preview-ghost",
    group: "d2g",
    forceAutoScrollFallback: true,
    onAdd(evt) {
      const { item, newIndex } = evt;
      const dataset = item.dataset;
      if (!dataset) return;
      if (newIndex === undefined) return;
      const { element } = dataset;
      if (!element) return;
      const re = new RenderElement(Math.random().toString(), element, {}, []);
      const listValue = [...list.value];
      listValue.splice(newIndex, 0, re);

      list.value = listValue;

      renderSortable();
    },
    onMove(evt, originalEvent) {
      console.log(evt, originalEvent);
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
@import "../assets/designer.scss";
</style>
