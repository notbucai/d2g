import { createRouter, createWebHashHistory } from "vue-router";

import Designer from "./views/Designer.vue";
import Preview from "./views/Preview.vue";

const routes = [
  { path: "/", redirect: "/designer" },
  { path: "/designer", component: Designer },
  { path: "/preview", component: Preview },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
