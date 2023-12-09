<template>
  <div class="designer-component-side">
    <!-- tabs -->
    <div class="component-side-tabs">
      <div
        class="component-side-tab"
        :class="{ active: tab === 'component' }"
        @click="tab = 'component'"
      >
        组件
      </div>
      <div
        class="component-side-tab"
        :class="{ active: tab === 'layer' }"
        @click="tab = 'layer'"
      >
        图层
      </div>
    </div>

    <div
      class="component-list"
      ref="componentListRef"
      v-show="tab === 'component'"
    >
      <div
        class="component-item"
        v-for="item in components"
        :key="item.element"
        data-type="component"
        :data-element="item.element"
      >
        <div class="component-info">
          <div class="component-info-icon" v-if="item.icon">
            <component :is="item.icon" />
          </div>
          <div class="component-info-text">{{ item.name }}</div>
        </div>
        <div class="component-ghost">
          <div class="component-ghost-text">放在这里</div>
        </div>
      </div>
    </div>

    <div class="layer-list" v-show="tab === 'layer'">
      <!-- 根据层级调整左边距 -->

      <div
        class="layer-item"
        v-for="item in layerList"
        :key="item.node.id"
        :style="{
          marginLeft: item.level * 12 + 'px',
        }"
        :class="{
          active: selection?.id === item.node.id,
        }"
        :data-level="item.level"
        @click="handleLayerItemClick(item)"
        @contextmenu.stop.prevent="onContextMenu($event, item)"
      >
        <div class="layer-icon" v-if="item.component?.icon">
          <component :is="item.component?.icon" />
        </div>
        <div class="layer-text">
          {{ item.component?.name || item.node.element }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { onMounted, ref, computed } from "vue";
import { useDesignerStore } from "../../store/designer";
import {} from "vue";
import { IRenderLayer } from "../../models/element";

const useData = useDesignerStore();

const tab = ref("layer");

const components = computed(() => useData.components);
const layerList = computed(() => useData.layerList);
const selection = computed(() => useData.selection);

const componentListRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!componentListRef.value) return;
  new Sortable(componentListRef.value, {
    sort: false,
    direction: "vertical",
    group: {
      name: "d2g",
      pull: "clone",
      put: false,
    },
  });
});

const handleLayerItemClick = (item: IRenderLayer) => {
  useData.selectActiveLayer(item);
}
const onContextMenu = (event: MouseEvent, item: IRenderLayer) => {
  useData.onContextmenuLayer(event, item);
};
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
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  .component-item {
    padding: 10px 12px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 6px;
    user-select: none;
    box-sizing: border-box;

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

.layer-list {
  flex: 1;
  background-color: #f6f6f6;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  .layer-item {
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 4px;
    font-size: 12px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 6px;
    user-select: none;
    border: 1px solid transparent;

    cursor: pointer;

    transition: all 0.2s;

    &:hover {
      border: 1px solid #409eff;
    }
    &.active {
      background-color: #409eff;
      color: #fff;
    }

    .layer-icon {
      width: 12px;
      min-width: 12px;
      height: 12px;
      line-height: 1;
    }
    .layer-text {
    }
  }
}
</style>
