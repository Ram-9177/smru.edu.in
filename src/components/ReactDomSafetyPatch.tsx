"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __smruRemoveChildGuarded?: boolean;
  }
}

export default function ReactDomSafetyPatch() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__smruRemoveChildGuarded) return;

    const originalRemoveChild = Node.prototype.removeChild;

    Node.prototype.removeChild = function patchedRemoveChild<T extends Node>(child: T): T {
      if (!child || child.parentNode !== this) {
        return child;
      }

      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") {
          return child;
        }
        throw error;
      }
    };

    window.__smruRemoveChildGuarded = true;
  }, []);

  return null;
}
