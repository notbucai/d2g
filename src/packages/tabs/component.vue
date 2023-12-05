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
        <RenderPreview
          v-model:data="tabChild"
          :key="active"
          style="min-height: 200px"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { IRenderElement } from "../../models/element";
import { computed } from "vue";

const props = defineProps<{
  tabs?: any[];
  children?: Record<string, IRenderElement[]>;
}>();

const active = ref(0);

const tabChild = computed({
  get() {
    console.log(props.children, active.value);
    return props.children?.[active.value] || [];
  },
  set(v) {
    if (props.children) {
      props.children[active.value] = v;
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
