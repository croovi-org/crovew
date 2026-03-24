import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(httpServer: Server, app: Express) {
  // Dashboard is frontend-only with mock data for this demo
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
}
