"use client";

import { useEffect, useState } from "react";

const RELOAD_STAMP_KEY = "smru_chunk_reload_at";
const RELOAD_WINDOW_MS = 60_000;

// A tab holding an older page can ask for a script that has been replaced or has not finished
// uploading yet. A fresh copy of the page names scripts that exist, so a reload recovers it.
const isChunkLoadError = (error: Error) =>
  error?.name === "ChunkLoadError" ||
  /Loading (CSS )?chunk|dynamically imported module|Importing a module script failed/i.test(error?.message || "");

// At most one reload a minute, so a script that is really gone ends on this screen, not in a loop.
// Blocked storage means that limit cannot be kept, so no automatic reload happens.
const reloadOnce = () => {
  try {
    const lastReload = Number(window.sessionStorage.getItem(RELOAD_STAMP_KEY) || 0);
    if (Date.now() - lastReload < RELOAD_WINDOW_MS) return false;
    window.sessionStorage.setItem(RELOAD_STAMP_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
};

const buttonStyle = {
  border: "1px solid #0d315c",
  borderRadius: 8,
  cursor: "pointer",
  font: "inherit",
  fontWeight: 600,
  padding: "12px 24px",
};

// Inline styles throughout: this screen must still look right when the stylesheet failed to load.
export default function AppErrorScreen({ error }: { error: Error }) {
  const [reloading, setReloading] = useState(() => isChunkLoadError(error));

  useEffect(() => {
    if (isChunkLoadError(error) && reloadOnce()) return;
    setReloading(false);
  }, [error]);

  return (
    <main
      style={{
        alignItems: "center",
        background: "#f8fbff",
        color: "#0d315c",
        display: "flex",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 16,
      }}
    >
      <div style={{ maxWidth: 480, textAlign: "center", width: "100%" }}>
        <p style={{ color: "#019e6e", fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>St. Mary&apos;s University</p>
        <h1 style={{ fontSize: 28, lineHeight: 1.25, margin: "0 0 12px" }}>
          {reloading ? "Refreshing this page" : "This page needs a refresh"}
        </h1>
        {!reloading && (
          <>
            <p style={{ color: "#475569", lineHeight: 1.6, margin: "0 0 24px" }}>
              Something stopped this page from loading. Reloading usually fixes it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{ ...buttonStyle, background: "#0d315c", color: "#ffffff" }}
              >
                Reload page
              </button>
              <button
                type="button"
                onClick={() => window.location.assign("/")}
                style={{ ...buttonStyle, background: "#ffffff", color: "#0d315c" }}
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
