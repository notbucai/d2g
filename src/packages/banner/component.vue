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
  background-color: #f4f5f6;
  // 文字描边、
  text-shadow: 0 0 1px 1px #000;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  &.empty {
    background-color: #f4f5f6 !important;
    color: #666;
    font-size: 14px;
  }
}
</style>
