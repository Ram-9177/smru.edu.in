import { drawIcon, type IconProps, type IconShape } from "./icon";

const shape: IconShape = [{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},[["polyline",{"points":"9 18 15 12 9 6"}]]];

export default function FiChevronRight(props: IconProps) {
  return drawIcon(shape, props);
}
