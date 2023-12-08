<template>
  <div class="flotation-comp" :style="style">
    <div class="floatation-main">
      <van-icon name="share-o" size="20" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  position: string;
}>();

const style = computed(() => {
  const position = props.position || 'rightBottom';
  if (position === 'leftBottom') {
    return {
      left: '24px',
      bottom: '60px',
    };
  } else if (position === 'rightBottom') {
    return {
      right: '24px',
      bottom: '60px',
    };
  }
  return {
    left: '24px',
    bottom: '60px',
  };
});

</script>

<style scoped lang="scss">
.flotation-comp {
  position: fixed;
  z-index: 9;
  // bottom: 60px;
  // right: 24px;
  .floatation-main {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: linear-gradient(120deg, #ff6034 0%, #ee0a24 100%);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    line-height: 1;
  }
}
</style>
