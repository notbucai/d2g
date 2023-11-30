<template>
  <div class="designer-container">
    <div class="componentList" ref="componentListRef">
      <div
        class="component-item"
        v-for="item in list"
        :key="item.element"
        data-type="component"
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
import { computed, onMounted, ref } from "vue";

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

const previewWindow = computed(() => {
  return previewEl.value?.contentWindow;
});

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
  if (!previewWindow.value) return;
  const previewDocument = previewWindow.value.document;
  window.onmessage = (evt) => {
    const { data } = evt;
    if (data === "init") {
      console.log("init");
      const previewListEl =
        previewDocument.querySelector<HTMLElement>(".preview-list");
      // console.log("previewListEl", previewListEl);
      if (!previewListEl) return;

      new Sortable(previewListEl, {
        animation: 150,
        ghostClass: "preview-ghost",
        group: "d2g",
        onAdd(evt) {
          previewWindow.value?.postMessage(
            {
              type: "add",
              element: list.value[evt.oldIndex ?? 0].element,
              index: evt.newIndex,
            },
            "*"
          );
        },
        onMove(evt, originalEvent) {
          console.log(evt, originalEvent);
        },
        onChange(evt) {
          console.log(evt);
        },
        onUpdate(event) {
          console.log("update", event);
        },
        onEnd(evt) {
          console.log(evt);
          const { oldIndex, newIndex } = evt;
          if (oldIndex === undefined) return;
          if (newIndex === undefined) return;
          if (oldIndex === newIndex) return;

          previewWindow.value?.postMessage(
            {
              type: "move",
              oldIndex,
              newIndex,
            },
            "*"
          );
        },
      });
    }
  };
};
</script>

<style lang="scss" scoped>
@import "../assets/designer.scss";
.designer-container {
  display: flex;
}
.preview-iframe {
  width: 340px;
  height: 700px;
  border: 1px solid #ccc;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
