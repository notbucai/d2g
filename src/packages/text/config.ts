import { Rule } from "@form-create/element-ui";

export default {
  name: '文本',
  icon: 'el-icon-document',

  forms: [
    {
      type: "input",
      field: "text",
      title: "文本",
      validate: [
        { type: "string", required: true, message: "请输入标题" },
      ],
      props: {
        placeholder: "请输入标题",
      },
    },
      
  ] as Rule[],
}
