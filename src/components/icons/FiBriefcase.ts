import { drawIcon, type IconProps, type IconShape } from "./icon";

const shape: IconShape = [{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},[["rect",{"x":"2","y":"7","width":"20","height":"14","rx":"2","ry":"2"}],["path",{"d":"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}]]];

export default function FiBriefcase(props: IconProps) {
  return drawIcon(shape, props);
}
