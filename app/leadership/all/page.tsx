import type { Metadata } from "next";
import AboutPage from "../../../src/views/About";
import { buildMetadata } from "../../../src/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Leadership | Stmarys University",
  description: "Meet the leaders, governing council, and academic teams steering Stmarys University.",
  pathname: "/leadership/all",
});

export default function Page() {
  return <AboutPage />;
}
