<template>
  <component :is="element.element" v-bind="element.attrs || {}">
    <template v-if="element.children">
      <template v-for="child in element.children" :key="child">
        <span>{{ child }}</span>
      </template>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { RenderElement } from "../models/element";
defineProps<{
  element: RenderElement;
}>();

</script>

<style lang="scss" scoped></style>
