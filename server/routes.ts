import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { InstrumentOrigin, InstrumentCategory } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all instruments
  app.get("/api/instruments", async (req, res) => {
    try {
      const { origin, category } = req.query;
      
      let instruments;
      
      if (origin && category) {
        instruments = await storage.getInstrumentsByOriginAndCategory(
          origin as InstrumentOrigin, 
          category as InstrumentCategory
        );
      } else if (origin) {
        instruments = await storage.getInstrumentsByOrigin(origin as InstrumentOrigin);
      } else if (category) {
        instruments = await storage.getInstrumentsByCategory(category as InstrumentCategory);
      } else {
        instruments = await storage.getAllInstruments();
      }
      
      res.json(instruments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instruments" });
    }
  });

  // Get specific instrument
  app.get("/api/instruments/:id", async (req, res) => {
    try {
      const instrument = await storage.getInstrument(req.params.id);
      if (!instrument) {
        return res.status(404).json({ message: "Instrument not found" });
      }
      res.json(instrument);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instrument" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
