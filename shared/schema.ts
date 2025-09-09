import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type InstrumentOrigin = "turkish" | "foreign" | "interesting";
export type InstrumentCategory = "vurmalı" | "telli" | "yaylı" | "üflemeli" | "tuşlu" | "videolar";

export const instruments = pgTable("instruments", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  origin: varchar("origin", { length: 10 }).$type<InstrumentOrigin>().notNull(),
  category: varchar("category", { length: 20 }).$type<InstrumentCategory>().notNull(),
  audioFile: text("audio_file").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const insertInstrumentSchema = createInsertSchema(instruments).omit({
  id: true,
});

export type InsertInstrument = z.infer<typeof insertInstrumentSchema>;
export type Instrument = typeof instruments.$inferSelect;

// For the frontend filtering
export const INSTRUMENT_CATEGORIES = {
  vurmalı: "Vurmalı",
  telli: "Telli", 
  yaylı: "Yaylı",
  üflemeli: "Üflemeli",
  tuşlu: "Tuşlu",
  videolar: "Videolar"
} as const;

export const INSTRUMENT_ORIGINS = {
  turkish: "Türk Çalgıları",
  foreign: "Yabancı Çalgılar",
  interesting: "Enteresan Çalgılar"
} as const;
