<template>
  <div class="config-form-render">
    <form-create
      :name="element + id"
      :rule="rules"
      v-model:api="fApi"
      :option="options"
      :modelValue="data"
      v-if="rules && rules.length"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { IComponent, getConfig } from "../packages";
const props = defineProps<{
  id: string;
  element: string;
  data: any;
}>();

const emit = defineEmits<{
  (event: "update:data", value: any): void;
}>();

const fApi = reactive({});

const config = ref<IComponent>();

const rules = computed(() => {
  return config.value?.forms;
});

watch(
  () => props.element,
  (value) => {
    // todo loading
    config.value = getConfig(value);
  },
  {
    immediate: true,
  }
);

const options = {
  form: {
    labelPosition: "top",
    size: "small",
  },
  onSubmit: (formData: any) => {
    console.log(JSON.stringify(formData));
    emit("update:data", formData);
  },
  resetBtn: true,
};
</script>

<style scoped lang="scss">
// 改
.config-form-render {
  padding: 8px;
  height: 100%;
  overflow-y: auto;
  :deep(.form-create) {
    ._fc-group-plus-minus {
      border-width: 0;
    }
    ._fc-group-container {
      margin: 0;
      padding: 4px 8px;
      padding-bottom: 12px;
      border-radius: 4px;
      margin-bottom: 16px;

      ._fc-group-idx {
        width: 20px;
        height: 20px;
        bottom: -10px;
        font-size: 12px;
        color: #333;
        user-select: none;
      }
      ._fc-group-handle {
        padding: 2px 6px;
        bottom: -12px;
        ._fc-group-btn {
          width: 16px;
          height: 16px;
          margin-left: 4px;
          &._fc-group-arrow:before {
            width: 6px;
            height: 6px;
            top: 6px;
            left: 4px;
          }
        }
      }
    }
    .el-form-item {
      margin-bottom: 8px;
      .el-form-item__label {
        line-height: 1.2;
        margin-bottom: 4px;
      }
      .el-upload-list--picture-card {
        --el-upload-list-picture-card-size: 80px;
      }
      .el-upload--picture-card {
        --el-upload-picture-card-size: 80px;
      }
    }
  }
}
</style>
