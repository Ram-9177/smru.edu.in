"use client";

import { useEffect } from "react";

const MERITTO_WIDGET = {
  scriptSrc: "https://widgets.in4.nopaperforms.com/emwgts.js",
  widgetKey: "1724ed5dcfaa2cb0aabd46c4d9c7d8df",
  height: "600px",
};

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
      // Cleanup script when component unmounts if needed
      script.remove();
    };
  }, []);

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/20 p-2 sm:p-4 rounded-xl shadow-2xl relative overflow-hidden ${className}`}>
        <div
            className="npf_wgts w-full min-h-[600px]"
            data-height={MERITTO_WIDGET.height}
            data-w={MERITTO_WIDGET.widgetKey}
        />
    </div>
  );
}
