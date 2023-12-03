import { App } from "vue";

// export vue3 plugin
export default {
  install: async (app: App) => {
    const modules = import.meta.glob("./**/component.vue");
    const keys = Object.keys(modules);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const name = key.split("/")[1];
      const module = await modules[key]?.();

      if (!module) continue;
      app.component(`d2g-${name}`, module);
    }
  },
};
