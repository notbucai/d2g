import { IComponent } from "../packages";

export enum ElementType {
  Layout = 'layout',
  Component = 'component',
  Float = 'float',
}

export interface IRenderElement {
  id: string;
  element: string;
  type?: ElementType; // 元素类型
  attrs?: Record<string, unknown>;
  subChildrenMap?: Record<string, IRenderElement[]>;
}

export interface IRenderLayer {
  layerNode: string;
  level: number;
  node: IRenderElement;
  component?: IComponent;
}