import { Rule } from "@form-create/element-ui";

export default {
  name: "用户地址",
  icon: "el-icon-chatLineSquare",

  forms: [
    {
      type: "input",
      field: "name",
      title: "名称",
      validate: [{ type: "string", required: true, message: "请输入" }],
      props: {
        placeholder: "请输入",
      },
    },
    {
      type: "input",
      field: "tel",
      title: "电话",
      validate: [{ type: "string", required: true, message: "请输入" }],
      props: {
        placeholder: "请输入",
      },
    },
  ] as Rule[],

  data: {
    name: "不才",
    tel: "13000000000",
  },
};
