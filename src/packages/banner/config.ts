import { Rule } from "@form-create/element-ui";
export default {
  name: "轮播图",
  icon: "el-icon-picture",

  // 配置表单 rules
  // 参考：https://www.form-create.com/
  forms: [
    {
      type: "group",
      field: "list",
      title: "图片列表",
      value: [
        {
          title: "",
          image: [],
        },
      ],
      props: {
        defaultValue: { image: [], title: "" },

        options: {
          form: {
            title: false,
          },
          submitBtn: false,
          resetBtn: false,
        },
        rule: [
          // 上传
          {
            type: "upload",
            field: "image",
            title: "图片",
            validate: [
              { type: "array", required: true, message: "请上传图片", min: 1, trigger: 'change' },
            ],
            props: {
              customUpload: true,
              action: "",
              listType: "picture-card",
              accept: "image/*",
              limit: 1,
              onSuccess: (res: any, file: any) => {
                file.url = res.data.filePath;
              },
              // 自定义上传，转成base64
              httpRequest: async (option: any) => {
                return new Promise((resolve, reject) => {
                  const file = option.file;
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                    file.url = reader.result;

                    resolve({
                      data: {
                        filePath: reader.result,
                      },
                    });
                  };
                  reader.onerror = function (error) {
                    reject(error);
                  };
                });
              },
            },
          },
          // 输入框
          {
            type: "input",
            field: "title",
            title: "标题",
            value: "",
            validate: [
              { type: "string", required: true, message: "请输入标题" },
            ],
            props: {
              placeholder: "请输入标题",
            },
          },
        ],
      },
    },
  ] as Rule[],

  // 拖拽用，初始化数据，配置数据
  data: {
    list: [
      {
        title: "标题1",
        image: "https://picsum.photos/300/200?random=1",
      },
      {
        title: "标题2",
        image: "https://picsum.photos/300/200?random=2",
      },
      {
        title: "标题3",
        image: "https://picsum.photos/300/200?random=3",
      },
    ],
  },
};
