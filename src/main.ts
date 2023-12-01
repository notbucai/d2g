import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./style.scss";

import App from "./App.vue";

import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import vant from "vant";

import "vant/lib/index.css";

import RenderPreview from "./components/RenderPreview.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vant);
app.component("RenderPreview", RenderPreview);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component("ElIcon" + key, component);
}

app.use(router).mount("#app");
