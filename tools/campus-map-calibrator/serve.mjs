import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(toolRoot, "../..");
const publicRoot = path.join(projectRoot, "public");
const host = "127.0.0.1";
const port = Number(process.env.SMRU_CALIBRATOR_PORT || 4174);
const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
    const file = pathname === "/" || pathname === "/index.html"
      ? path.join(toolRoot, "index.html")
      : path.resolve(publicRoot, pathname.replace(/^\/+/, ""));
    if (file !== path.join(toolRoot, "index.html") && !file.startsWith(`${publicRoot}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes.get(path.extname(file).toLowerCase()) || "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(error?.code === "ENOENT" ? 404 : 500).end(error?.code === "ENOENT" ? "Not found" : "Local tool error");
  }
});

server.listen(port, host, () => {
  console.log(`Campus map calibrator: http://${host}:${port}/`);
});
