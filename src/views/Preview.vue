<template>
  <div class="preview-container">
    <div class="preview-list" ref="previewListRef" :key="keyId">
      <template v-for="item in list" :key="item.id">
        <RenderPreviewElement :element="item" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import RenderPreviewElement from "../components/RenderPreviewElement.vue";
import { RenderElement } from "../models/element";

const previewListRef = ref<HTMLElement | null>(null);

const list = ref<RenderElement[]>([
  new RenderElement(
    "1",
    "van-contact-card",
    {
      name: "张三",
      tel: "13000000000",
      address: "浙江省杭州市西湖区文三路 138 号",
      editable: false,
    },
    []
  ),
  new RenderElement(
    "1",
    "van-card",
    {
      thumb: "https://img.yzcdn.cn/vant/apple-1.jpg",
      title: "商品标题",
      desc: "描述信息",
      num: 2,
      price: 2.0,
      originPrice: 2.0,
      centered: false,
      lazyLoad: false,
      thumbLink: "",
      tags: [],
    },
    []
  ),
  new RenderElement("1", "van-uploader", {}, []),
  new RenderElement("1", "van-pagination", {}, []),
  new RenderElement(
    "1",
    "van-empty",
    {
      description: "描述文字",
    },
    []
  ),
]);

const keyId = ref(1);

onMounted(() => {
  const parentWindow = window.parent;
  if (!parentWindow) return;
  // postMessage init
  window.onmessage = (evt) => {
    const { data } = evt;

    if (data.type === "move") {
      console.log("move");

      const { oldIndex, newIndex } = data;
      if (oldIndex === undefined) return;
      if (newIndex === undefined) return;
      if (oldIndex === newIndex) return;
      console.log("oldIndex", oldIndex, "newIndex", newIndex);
      const listValue = list.value;
      const item = listValue.splice(oldIndex, 1)[0];

      if (item) {
        listValue.splice(newIndex, 0, item);
        list.value = [...listValue];
        keyId.value = keyId.value + 1;
        parentWindow.postMessage("init");
      }
    } else if (data.type === "add") {
      console.log("add");

      const { index, element } = data;
      if (index === undefined) return;
      if (element === undefined) return;

      const listValue = [...list.value];
      listValue.splice(
        index,
        0,
        new RenderElement(Math.random().toString(), element, {}, [])
      );
      list.value = listValue;
      keyId.value = keyId.value + 1;
      parentWindow.postMessage("init");
    }
  };

  setTimeout(() => {
    parentWindow.postMessage("init");
  }, 100);
});
</script>

<style lang="scss" scoped>
@import "../assets/designer.scss";
</style>
