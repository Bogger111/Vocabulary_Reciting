const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 5501);
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function resolveRequestPath(url) {
  const requestUrl = new URL(url, `http://${HOST}:${PORT}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = path.resolve(ROOT, relativePath);
  const relativeToRoot = path.relative(ROOT, filePath);

  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    return null;
  }

  return filePath;
}

async function sendFile(response, filePath) {
  const data = await fs.readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();

  response.writeHead(200, {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  response.end(data);
}

const server = http.createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url);

    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    await sendFile(response, filePath);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      response.writeHead(404);
      response.end("Not Found");
      return;
    }

    response.writeHead(500);
    response.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`WordRoot is running at http://${HOST}:${PORT}/`);
});
