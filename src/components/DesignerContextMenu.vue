<template>
  <div
    class="designer-context-menu-container"
    @click.stop
    :class="{ active: contextmenu.visible }"
    :style="{
      left: contextmenu.position.x + 'px',
      top: contextmenu.position.y + 'px',
    }"
  >
    <div class="designer-context-menu">
      <div class="designer-context-menu-item" @click="handleExec('del')">
        删除模块
      </div>
      <div class="designer-context-menu-item" @click="handleExec('up')">
        上移模块
      </div>
      <div class="designer-context-menu-item" @click="handleExec('down')">
        下移模块
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useDesignerStore } from "../store/designer";
import { computed } from "vue";
const useData = useDesignerStore();

const contextmenu = computed(() => useData.contextmenu);

onMounted(() => {
  window.addEventListener("click", () => {
    if (!contextmenu.value.visible) return;
    useData.hideContextMenu();
  });
});

const handleExec = (type: string) => {
  console.log("handleExec", type);
  useData.execContextMenu(type);
  useData.hideContextMenu();
};
</script>

<style lang="scss" scoped>
.designer-context-menu-container {
  position: fixed;
  z-index: 1000;
  opacity: 0;
  transform: scale(0);
  left: 100px;
  top: 100px;
  transition: all 0.1s;
  &.active {
    width: auto;
    height: auto;
    opacity: 1;
    transform: scale(1);
  }
  .designer-context-menu {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100px;
    overflow: hidden;

    .designer-context-menu-item {
      padding: 10px 20px;
      cursor: pointer;
      font-size: 12px;
      border: 1px dashed transparent;
      border-bottom-color: #f5f5f5;
      box-sizing: border-box;
      text-align: center;
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        border-top: none;
      }
      &:hover {
        background-color: var(--primary-color);
        color: #fff;
        border-top-color: #fff;
        border-bottom-color: #fff;
      }
    }
  }
}
</style>
