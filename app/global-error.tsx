"use client";

import AppErrorScreen from "@/components/AppErrorScreen";

// Replaces the root layout when the layout itself fails, so it supplies its own document.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html lang="en">
      <head>
        <title>St. Mary&apos;s University</title>
      </head>
      <body style={{ margin: 0 }}>
        <AppErrorScreen error={error} />
      </body>
    </html>
  );
}
