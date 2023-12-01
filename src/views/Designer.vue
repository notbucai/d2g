<template>
  <div class="designer-container">
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
    <div class="preview-iframe">
      <iframe
        src="/#/preview"
        frameborder="0"
        ref="previewEl"
        @load="onLoadIframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { onMounted, ref } from "vue";

(window as any).Sortable = Sortable;

const componentListRef = ref<HTMLElement | null>(null);
const previewEl = ref<HTMLIFrameElement | null>(null);
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

// const previewWindow = computed(() => {
//   return previewEl.value?.contentWindow;
// });

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

const onLoadIframe = () => {
  console.log("onLoadIframe");
};
</script>

<style lang="scss" scoped>
@import "../assets/designer.scss";
.designer-container {
  display: flex;
}
.component-list {
  padding-top: 50px;
}
.preview-iframe {
  width: 340px;
  height: 700px;
  border: 4px dashed #ccc;
  margin: 60px;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
