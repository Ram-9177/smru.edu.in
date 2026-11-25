import { drawIcon, type IconProps, type IconShape } from "./icon";

const shape: IconShape = [{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},[["polyline",{"points":"6 9 12 15 18 9"}]]];

export default function FiChevronDown(props: IconProps) {
  return drawIcon(shape, props);
}
