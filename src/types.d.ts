declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.mp4" {
  const src: string;
  export default src;
}
declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "react-icons/fa";
declare module "react-icons/gi";
declare module "react-icons/fi";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    src?: any;
  }
}

declare const statelist: Record<string, Array<{ id: string; text: string }>>;
declare class CTPLSelect {
  constructor(el: HTMLElement | null, options?: Record<string, unknown>);
  destroy(): void;
}

declare global {
  namespace React {
    interface CSSProperties {
      [key: `--${string}`]: string | number | undefined;
    }
  }

  interface Window {
    __ctplWidgetRegistry?: Record<string, boolean>;
    ctplTag?: (token: string) => void;
    ctplCountryChanged?: (obj: HTMLSelectElement) => void;
    ctplUpdateCorses?: () => void;
    ctplSubmitEnquirty?: () => void;
    isValidField?: (field: HTMLElement & { setCustomValidity: (message: string) => void; reportValidity: () => void }, isValid: boolean, msgtype: string) => void;
  }
}

export {};
