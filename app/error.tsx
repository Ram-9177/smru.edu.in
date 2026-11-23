"use client";

import AppErrorScreen from "@/components/AppErrorScreen";

// Catches a failed page inside the root layout, so the site header and footer stay in place.
export default function RouteError({ error }: { error: Error & { digest?: string } }) {
  return <AppErrorScreen error={error} />;
}
