export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /
Allow: /assets/
Allow: /_next/static/
Allow: /*.js
Allow: /*.css
Disallow: /developer/
Disallow: /api/
Disallow: /thank-you/

User-agent: Googlebot
Allow: /
Allow: /assets/
Allow: /_next/static/
Allow: /*.js
Allow: /*.css
Disallow: /developer/
Disallow: /api/
Disallow: /thank-you/

User-agent: OAI-SearchBot
Allow: /
Allow: /assets/
Allow: /_next/static/
Allow: /*.js
Allow: /*.css
Disallow: /developer/
Disallow: /api/
Disallow: /thank-you/

User-agent: bingbot
Allow: /
Allow: /assets/
Allow: /_next/static/
Allow: /*.js
Allow: /*.css
Disallow: /developer/
Disallow: /api/
Disallow: /thank-you/

Sitemap: https://smru.edu.in/sitemap.xml
Host: https://smru.edu.in
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
