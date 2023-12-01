export class RenderElement {
  id: string;
  element: string;
  attrs?: Record<string, unknown>;
  children?: RenderElement[];

  constructor(
    id: string,
    element: string,
    attrs?: Record<string, unknown>,
    children?: RenderElement[]
  ) {
    this.id = id;
    this.element = element;
    this.attrs = attrs;
    this.children = children;
  }
}
