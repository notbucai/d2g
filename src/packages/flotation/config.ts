import { Rule } from "@form-create/element-ui";
import { IComponent } from "..";
import { ElementType } from "../../models/element";

export default {
  name: "浮动按钮",
  icon: "el-icon-location",
  type: ElementType.Float,

  forms: [
    {
      type: "select",
      field: "position",
      title: "位置",
      validate: [{ required: true, message: "请选择" }],
      options: [
        { value: "leftBottom", label: "左下" },
        { value: "rightBottom", label: "右下" },
      ],
      props: {
        placeholder: "请选择",
      },
    },
  ] as Rule[],

  data: {
    // text: '测试文本',
  },
} as IComponent;
