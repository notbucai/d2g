<template>
  <div class="tet-comp">
    {{ text || '请配置' }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text?: string;
}>();
</script>

<style scoped lang="scss">
.tet-comp {
  padding: 12px;
  text-align: center;
  color: #333;
}
</style>
