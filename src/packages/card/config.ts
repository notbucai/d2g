import { ElementType } from "../../models/element";

export default {
  name: '卡片容器',
  icon: 'el-icon-creditCard',
  type: ElementType.Layout,

  forms: [
    {
      type: 'input',
      field: 'title',
      title: '标题',
    },
  ],

  data: {
    title: "我是标题"
  },
}
