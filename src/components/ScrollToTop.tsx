"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop({ smooth = true }) {
  const pathname = usePathname();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const scrollToCurrentTarget = () => {
      if (timeout) clearTimeout(timeout);

      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace("#", ""));
        timeout = setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({
            behavior: smooth ? "smooth" : "auto",
            block: "start",
          });
        }, 450);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    };

    scrollToCurrentTarget();
    window.addEventListener("hashchange", scrollToCurrentTarget);

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToCurrentTarget);
    };
  }, [pathname, smooth]);

  return null;
}
