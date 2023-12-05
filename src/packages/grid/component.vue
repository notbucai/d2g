<template>
  <div class="grid-comp">
    <van-grid :column-num="3">
      <van-grid-item
        v-for="(item, index) in list"
        :key="index"
        :icon="item.image"
        :text="item.title"
      />
    </van-grid>
    <div class="grid-comp-empty" v-if="!list?.length">请在右侧进行配置</div>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  list: any[];
}>();

</script>

<style lang="scss" scoped>
.grid-comp-empty {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>

