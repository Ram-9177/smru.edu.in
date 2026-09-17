// Static image imports, independent of the generated next-env.d.ts (which is gitignored because its
// reference path flips between .next and .next-dev). Mirrors next/image-types/global so `tsc --noEmit`
// passes on a fresh checkout before any build has run. src/types.d.ts is a module (it has `export {}`),
// so its `declare module "*.webp"` lines are not ambient; this file must stay module-free.
type StaticImageData = import("next/dist/shared/lib/get-img-props").StaticImageData;

declare module "*.png" { const content: StaticImageData; export default content; }
declare module "*.jpg" { const content: StaticImageData; export default content; }
declare module "*.jpeg" { const content: StaticImageData; export default content; }
declare module "*.webp" { const content: StaticImageData; export default content; }
declare module "*.avif" { const content: StaticImageData; export default content; }
declare module "*.gif" { const content: StaticImageData; export default content; }
declare module "*.ico" { const content: StaticImageData; export default content; }
declare module "*.bmp" { const content: StaticImageData; export default content; }
declare module "*.svg" { const content: any; export default content; }
