import { defineStore } from "pinia";
import { RenderElement } from "../models/element";

export const useDataStore = defineStore("data", {
  state: () => ({
    nodes: [
      new RenderElement(
        "1shdhfgh",
        "van-contact-card",
        {
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号",
          editable: false,
        },
        []
      ),
      new RenderElement(
        "1sss",
        "div",
        {
          style: {
            width: "100%",
            minHeight: "100px",
            backgroundColor: "#409eff",
          },
        },
        [
          new RenderElement("1cvxbx", "van-pagination", {}, []),
          new RenderElement(
            "1shdhfgh",
            "van-contact-card",
            {
              name: "张三",
              tel: "13000000000",
              address: "浙江省杭州市西湖区文三路 138 号",
              editable: false,
            },
            []
          ),
        ]
      ),
      new RenderElement(
        "xxx1",
        "van-card",
        {
          thumb: "https://img.yzcdn.cn/vant/apple-1.jpg",
          title: "商品标题",
          desc: "描述信息",
          num: 2,
          price: 2.0,
          originPrice: 2.0,
          centered: false,
          lazyLoad: false,
          thumbLink: "",
          tags: [],
        },
        []
      ),
      new RenderElement("1sfg", "van-uploader", {}, []),
      new RenderElement("1cvxbx", "van-pagination", {}, []),
      new RenderElement(
        "ggsdfg1",
        "van-empty",
        {
          description: "描述文字",
        },
        []
      ),
    ] as RenderElement[],
  }),

  actions: {
    updaeNodes(nodes: RenderElement[]) {
      this.nodes = nodes;
    },
  },
});
