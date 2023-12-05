import { createApp } from "vue";
import { createPinia } from 'pinia'
import "./style.scss";
import 'element-plus/dist/index.css'

import App from "./App.vue";

import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import formCreate from '@form-create/element-ui'

import vant from "vant";

import "vant/lib/index.css";

import RenderPreview from "./components/RenderPreview.vue";

import packages from "./packages";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(ElementPlus);
app.use(formCreate);
app.use(vant);
app.use(packages);
app.component("RenderPreview", RenderPreview);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component("ElIcon" + key, component);
}

app.use(router).mount("#app");
