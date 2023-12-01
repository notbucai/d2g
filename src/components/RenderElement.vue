<template>
  <component :is="element.element" v-bind="element.attrs || {}">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { RenderElement } from "../models/element";
defineProps<{
  element: RenderElement;
}>();

</script>

<style lang="scss" scoped></style>
