import { Rule } from "@form-create/element-ui";
import { App } from "vue";
import { ElementType } from "../models/element";

export interface IComponent {
  name: string;
  element?: string; // 组件名称，优先级高于name
  sort?: number;
  icon?: string;
  forms?: Rule[];
  data?: any;
  type?: ElementType;
}

// export vue3 plugin
export default {
  install: (app: App) => {
    const modules = import.meta.glob("./**/component.vue", { eager: true });

    const keys = Object.keys(modules);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const name = key.split("/")[1];
      const module = modules[key] as any;
      if (!module) continue;
      app.component(`d2g-${name}`, module.default);
    }
  },
};

export const getComponents = () => {
  const configs = import.meta.glob("./**/config.ts", { eager: true });

  return Object.keys(configs)
    .map((key) => {
      const module = configs[key] as any;
      const config = module?.default as IComponent;
      if (!config) return;
      const name = key.split("/")[1];
      const nameElement = `d2g-${name}`;
      return {
        ...config,
        element: config.element || nameElement,
      } as IComponent;
    })
    .filter((item) => !!item)
    .sort((a, b) => (a?.sort || 0) - (b?.sort || 0)) as IComponent[];
};

export const getConfig = (inComponentName: string) => {
  const configs = import.meta.glob("./**/config.ts", { eager: true });
  // 通过名称取到对应的配置文件
  // 名称格式：d2g-xxx 其中xxx为组件名称（可能是驼峰、可能是中划线，需要转换）
  const componentName = inComponentName.replace(/^d2g-/, "");
  // 将中划线转换驼峰
  //
  // 例如：test-banner => testBanner
  // 例如：test-banner-1 => testBanner1
  const name = componentName.replace(/-([a-z])/g, (_all, letter) =>
    letter.toUpperCase()
  );

  const keys = Object.keys(configs);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const keyName = key.split("/")[1];
    const module = configs[key] as any;

    if (name === keyName || name === module?.default?.element) {
      const config = configs[key] as any;
      return config?.default as IComponent;
    }
  }
  return;
};
