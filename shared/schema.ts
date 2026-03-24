import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Minimal schema — most data is mock/simulated for this dashboard demo
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  apiKey: text("api_key").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
