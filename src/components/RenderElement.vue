<template>
  <component :is="element.element" v-bind="element.attrs || {}" :children="element.children" />
</template>

<script lang="ts" setup>
import { IRenderElement } from "../models/element";
defineProps<{
  element: IRenderElement;
}>();
</script>

<style lang="scss" scoped></style>
