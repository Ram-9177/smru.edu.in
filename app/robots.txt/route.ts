export const dynamic = "force-static";

// Shared crawl policy: index everything except private utility routes.
// Explicit per-agent blocks are required because some crawlers ignore the wildcard group.
const DISALLOW = ["/developer/", "/api/", "/thank-you/"];

const POLICY = ["Allow: /", "Allow: /assets/", "Allow: /_next/static/", "Allow: /*.js", "Allow: /*.css", ...DISALLOW.map((path) => `Disallow: ${path}`)].join("\n");

// Classic + answer-engine + generative-engine crawlers we explicitly welcome.
const AGENTS = [
  "*",
  "Googlebot",
  "Googlebot-Image",
  "bingbot",
  "Google-Extended", // Gemini / Vertex training + grounding
  "GPTBot", // ChatGPT crawler
  "ChatGPT-User", // ChatGPT live browsing
  "OAI-SearchBot", // ChatGPT search index
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot", // Common Crawl (feeds many LLMs)
  "cohere-ai",
  "Bytespider",
  "Amazonbot",
  "YouBot",
  "DuckDuckBot",
];

export function GET() {
  const blocks = AGENTS.map((agent) => `User-agent: ${agent}\n${POLICY}`).join("\n\n");
  const body = `${blocks}\n\nSitemap: https://smru.edu.in/sitemap.xml\nHost: https://smru.edu.in\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
