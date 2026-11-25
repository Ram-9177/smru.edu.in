"use client";

import { useEffect, useState } from "react";
import { loadLiveCms, type LiveCmsState } from "./live-cms";

// What cms-data.json publishes, or null while it publishes nothing (the normal state). Carries no content itself, so
// the footer can use it on every page.
export function useLiveCms(): LiveCmsState | null {
  const [live, setLive] = useState<LiveCmsState | null>(null);

  useEffect(() => {
    let active = true;
    loadLiveCms().then((published) => {
      if (active && published) setLive(published);
    });
    return () => {
      active = false;
    };
  }, []);

  return live;
}
