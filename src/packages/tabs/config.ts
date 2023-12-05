import { ElementType } from "../../models/element";

export default {
  name: '多标签容器',
  icon: 'el-icon-files',
  type: ElementType.Layout,

  forms: [
    {
      type: 'group',
      field: 'tabs',
      title: '基础配置',
      props: {
        rule: [
          {
            type: 'input',
            field: 'name',
            title: '名称',
          },
        ],
      },
    },
  ],
}
