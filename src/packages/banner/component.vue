<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <template v-if="list?.length">
      <van-swipe-item class="box" v-for="(item, index) in list" :key="index">
        <img :src="item.image" />
      </van-swipe-item>
    </template>
    <template v-else>
      <van-swipe-item class="box empty">
        轮播图无数据，请在右侧进行配置
      </van-swipe-item>
    </template>
  </van-swipe>
</template>

<script lang="ts" setup>
defineProps<{
  list: any[];
}>();
</script>

<style lang="scss" scoped>
.box {
  height: 200px;
  width: 100%;
  color: #000;
  background-color: #f0f;
  // 文字描边、
  text-shadow: 0 0 1px 1px #000;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &.empty {
    background-color: #f4f5f6 !important;
    color: #666;
    font-size: 14px;
  }

  // 随机几种颜色
  &:nth-child(1) {
    background-color: #ff0;
  }
  &:nth-child(2) {
    background-color: #0f0;
  }
  &:nth-child(3) {
    background-color: #00f;
  }
  &:nth-child(4) {
    background-color: #0ff;
  }
}
</style>
