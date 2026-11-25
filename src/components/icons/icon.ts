import { createElement, type ReactNode, type SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & { size?: string | number; title?: string };

type Child = [tag: string, attributes: Record<string, string>, children?: Child[]];
export type IconShape = [attributes: Record<string, string>, children: Child[]];

const drawChildren = (children: Child[]): ReactNode[] =>
  children.map(([tag, attributes, nested], index) =>
    createElement(tag, { key: index, ...attributes }, nested && drawChildren(nested)),
  );

// Draws the same <svg> as react-icons: 1em square and the text colour unless the caller says otherwise.
export function drawIcon([attributes, children]: IconShape, { size, title, ...props }: IconProps) {
  const side = size || "1em";
  return createElement(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0",
      ...attributes,
      ...props,
      style: { color: props.color, ...props.style },
      height: side,
      width: side,
      xmlns: "http://www.w3.org/2000/svg",
    },
    title && createElement("title", null, title),
    ...drawChildren(children),
  );
}
