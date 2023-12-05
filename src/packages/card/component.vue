<template>
  <div class="card-comp">
    <div class="card-title">
      {{ title }}
    </div>
    <div class="card-main">
      <RenderPreview v-model:data="cardChild" style="min-height: 120px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRenderElement } from "../../models/element";
import { computed } from "vue";

const props = defineProps<{
  title?: string;
  children?: Record<string, IRenderElement[]>;
}>();

const cardChild = computed({
  get() {
    return props.children?.["card"] || [];
  },
  set(v) {
    if (props.children) {
      props.children["card"] = v;
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
