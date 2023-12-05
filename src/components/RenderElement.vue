<template>
  <component
    :is="element.element"
    v-bind="element.attrs || {}"
    :subChildrenMap="props.element.subChildrenMap"
  />
</template>

<script lang="ts" setup>
import { IRenderElement } from "../models/element";
const props = defineProps<{
  element: IRenderElement;
}>();
</script>

<style lang="scss" scoped></style>
