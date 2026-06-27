"use client";

import { useEffect } from "react";
import { MERITTO_WIDGET } from "@/lib/shared/site-constants";

type MerittoWidgetProps = {
  className?: string;
};

export default function MerittoWidget({ className = "" }: MerittoWidgetProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = MERITTO_WIDGET.scriptSrc;
    script.setAttribute("data-meritto-widget", "true");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      className={`npf_wgts ${className}`}
      data-height={MERITTO_WIDGET.height}
      data-w={MERITTO_WIDGET.widgetKey}
    />
  );
}
