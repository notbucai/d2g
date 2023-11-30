import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import vant from "vant";

import "vant/lib/index.css";

const app = createApp(App);

app.use(vant);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component("ElIcon" + key, component);
}

app.use(router).mount("#app");
