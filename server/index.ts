import express, { type Request, type Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Immutable cache for hashed assets
  app.use("/assets", express.static(path.join(staticPath, "assets"), {
    maxAge: "365d",
    immutable: true,
  }));

  // No-store for everything else (index.html etc.)
  app.use(express.static(staticPath, {
    setHeaders(res, reqPath) {
      if (reqPath === "/index.html" || !reqPath.includes(".")) {
        res.setHeader("Cache-Control", "no-store");
      }
    },
  }));

  // Health endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  // SPA fallback
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
