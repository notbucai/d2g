<template>
  <div class="designer-header-nav">
    <div class="designer-header-nav-left">
      <div class="designer-header-nav-logo">
        <img src="/logo-title.png" alt="logo" />
      </div>
    </div>
    <div class="designer-header-nav-right">
      <div class="designer-header-nav-button" @click="handlePreview">
        <!-- Save -->
        <span>预览</span>
      </div>
      <div class="designer-header-nav-button" @click="handleSave">
        <!-- Save -->
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';

const handleSave = () => {
  ElMessage.success('保存成功');
}

const handlePreview = () => {
  // 375 x 667 center, hide toolbar
  window.open('/#/view', '_blank', 'width=375,height=667,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,fullscreen=no')
}

</script>

<style lang="scss" scoped>
.designer-header-nav {
  background-color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #f4f5f7;
  .designer-header-nav-logo {
    height: 22px;
    img {
      height: 100%;
    }
  }
  .designer-header-nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .designer-header-nav-button {
    padding: 4px 6px;
    min-width: 40px;
    text-align: center;
    border-radius: 4px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
