export enum ElementType {
  Layout = 'layout',
  Component = 'component',
}

export interface IRenderElement {
  id: string;
  element: string;
  type?: ElementType; // 元素类型
  attrs?: Record<string, unknown>;
  children?: Record<string, IRenderElement[]>;
}
