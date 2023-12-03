<template>
  <div class="designer-component-side">
    <!-- tabs -->
    <div class="component-side-tabs">
      <div class="component-side-tab active">组件</div>
      <div class="component-side-tab">图层</div>
    </div>

    <div class="component-list" ref="componentListRef">
      <div
        class="component-item"
        v-for="item in list"
        :key="item.element"
        data-type="component"
        :data-element="item.element"
        :data-name="item.name"
      >
        <div class="component-info">
          <div class="component-info-icon"><ElIconSetting /></div>
          <div class="component-info-text">{{ item.name }}</div>
        </div>
        <div class="component-ghost">
          <div class="component-ghost-text">放在这里</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { onMounted, ref } from "vue";

const componentListRef = ref<HTMLElement | null>(null);

const list = ref([
  {
    name: "地址卡片",
    element: "van-contact-card",
  },
  {
    name: "商品卡片",
    element: "van-card",
  },
  {
    name: "上传",
    element: "van-uploader",
  },
  {
    name: "分页",
    element: "van-pagination",
  },
  {
    name: "空状态",
    element: "van-empty",
  },
]);


onMounted(() => {
  if (!componentListRef.value) return;
  Sortable.create(componentListRef.value, {
    animation: 150,
    sort: false,
    group: {
      name: "d2g",
      pull: "clone",
      put: false,
    },
  });
});

</script>

<style lang="scss" scoped>
.designer-component-side {
  width: 240px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .component-side-tabs {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 12px;
    border-bottom: 1px solid #f4f5f7;
    .component-side-tab {
      padding: 6px;
      font-size: 12px;
      color: #606060;
      cursor: pointer;
      transition: all 0.2s;
      &.active {
        color: #333;
        font-weight: bold;
      }
    }
  }
}
.component-list {
  flex: 1;
  background-color: #fafafa;
  .component-item {
    box-sizing: border-box;
    padding: 6px 12px;
    margin: 6px 0;
    user-select: none;
    cursor: move;
    .component-info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .component-info-icon {
        width: 14px;
        min-width: 14px;
        height: 14px;
        line-height: 1;
      }
      .component-info-text {
        margin-left: 6px;
        flex: 1;
        font-size: 12px;
      }
    }
    .component-ghost {
      display: none;
    }
    
  }
}
</style>
