// Serve the static export in out/ the way Apache does in production: trailing-slash directories
// resolve to index.html, unknown paths get out/404.html with a 404 status, nothing is rewritten.
//
//   npm run build && npm run serve:out            # http://127.0.0.1:4173
//   npm run serve:out -- 4010                     # another port
//
// audit:frontend and audit:visual default to http://127.0.0.1:4173, so this is the server to run
// before them. It is a development tool only; .htaccess rules (301s, headers) are not emulated.
import { createServer } from "node:http";
import { existsSync, statSync, createReadStream } from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "out");
const port = Number(process.argv[2] || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".ico": "image/x-icon", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".webm": "video/webm",
  ".pdf": "application/pdf", ".woff2": "font/woff2", ".woff": "font/woff", ".map": "application/json",
};

if (!existsSync(root)) {
  console.error("out/ is missing — run `npm run build` first");
  process.exit(1);
}

const send = (res, file, status = 200) => {
  res.writeHead(status, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let file = path.join(root, safe);
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!existsSync(file) && !path.extname(file)) file = `${file}.html`;
  if (existsSync(file) && statSync(file).isFile()) { send(res, file); return; }
  const notFound = path.join(root, "404.html");
  if (existsSync(notFound)) send(res, notFound, 404);
  else { res.writeHead(404); res.end("Not found"); }
}).listen(port, "127.0.0.1", () => {
  console.log(JSON.stringify({ serving: "out/", url: `http://127.0.0.1:${port}/` }));
});
