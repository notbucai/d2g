<template>
  <div class="designer-configuration-side">
    <ConfigFormRender
      v-if="selection"
      :key="selection?.id"
      :id="selection?.id"
      :element="selection.element"
      v-model:data="attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDesignerStore } from "../../store/designer";

import ConfigFormRender from "../../components/ConfigFormRender.vue";

const useData = useDesignerStore();

const selection = computed(() => useData.selection);

const attrs = computed({
  get() {
    return selection?.value?.attrs || {};
  },
  set(value) {
    const id = selection.value?.id;
    if (!id) {
      return;
    }
    useData.updateNode({
      ...selection.value,
      attrs: value,
    });
  },
});
</script>

<style lang="scss" scoped>
.designer-configuration-side {
  width: 240px;
  background-color: #fff;
  height: 100%;
}
</style>
