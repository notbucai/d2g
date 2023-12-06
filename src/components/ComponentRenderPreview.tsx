import { defineComponent, h, inject } from "vue";
import { IRenderElement } from "../models/element";
import RenderPreviewVue from "./RenderPreview.vue";
import RenderElementVue from "./RenderElement.vue";

export default defineComponent((props, { emit }) => {

  const renderType = inject<string>('RENDER_TYPE')

  return () => {
    const subChildList = props.data as IRenderElement[];
    if (renderType === 'view') {
      // subChildList
      return subChildList.map((subChild) => {
        return h(RenderElementVue, {
          key: subChild.id,
          element: subChild,
        });
      });
    }

    return h(RenderPreviewVue, {
      data: subChildList,
      'onUpdate:data': (data: IRenderElement[]) => {
        emit('update:data', [...data]);
      },
    });
  }
}, {
  props: ['data'],
  emits: ['update:data'],
});