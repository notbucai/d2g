<template>
  <div>
    <div @click.stop>
      <van-tabs v-model:active="active">
        <van-tab
          :title="item.name"
          v-for="(item, index) in tabs"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
    <div v-if="!tabs?.length" class="empty-tips"> 请进行配置 </div>
    <template v-else>
      <div class="tab-main">
        <ComponentRenderPreview v-model:data="tabChild" :key="active" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { IRenderElement } from "../../models/element";
import ComponentRenderPreview from "../../components/ComponentRenderPreview";

const props = defineProps<{
  tabs?: any[];
  subChildrenMap?: Record<string, IRenderElement[]>;
}>();

const active = ref(0);

const tabChild = computed({
  get() {
    return props.subChildrenMap?.[active.value] || [];
  },
  set(v) {
    if (props.subChildrenMap) {
      props.subChildrenMap[active.value] = v;

    }
  },
});
</script>

<style lang="scss" scoped>
.tab-main {
  min-height: 120px;
}
.empty-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>
