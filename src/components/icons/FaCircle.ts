import { drawIcon, type IconProps, type IconShape } from "./icon";

const shape: IconShape = [{"viewBox":"0 0 512 512"},[["path",{"d":"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"}]]];

export default function FaCircle(props: IconProps) {
  return drawIcon(shape, props);
}
