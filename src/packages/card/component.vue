<template>
  <div class="card-comp">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-main">
      <ComponentRenderPreview v-model:data="cardChild" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ComponentRenderPreview from "../../components/ComponentRenderPreview";
import { IRenderElement } from "../../models/element";

const props = defineProps<{
  title?: string;
  subChildrenMap?: Record<string, IRenderElement[]>;
}>();

const cardChild = computed({
  get() {
    return props.subChildrenMap?.["card"] || [];
  },
  set(v) {
    if (props.subChildrenMap) {
      props.subChildrenMap["card"] = v;
    }
  },
});
</script>

<style lang="scss" scoped>
.card-comp {
  border: 1px solid #f4f5f6;
  background-color: #f4f5f6;
  border-radius: 6px;
  margin: 10px;
  .card-title {
    font-size: 16px;
    padding: 6px;
    border-bottom: 2px solid #fff;
  }
  .card-main {
    min-height: 120px;
  }
}
</style>
