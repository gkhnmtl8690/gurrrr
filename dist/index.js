// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  instruments;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.instruments = /* @__PURE__ */ new Map();
    this.seedInstruments();
  }
  seedInstruments() {
    const instrumentsData = [
      // Turkish Instruments - Vurmalı
      {
        id: "davul",
        name: "Davul",
        description: "Zurna ile birlikte kullan\u0131lan \xE7ift tarafl\u0131 geni\u015F davul",
        origin: "turkish",
        category: "vurmal\u0131",
        audioFile: "/audio/davul.mp3",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "darbuka",
        name: "Darbuka",
        description: "Parmaklarla \xE7al\u0131nan kum saati \u015Feklinde ritim enstr\xFCman\u0131",
        origin: "turkish",
        category: "vurmal\u0131",
        audioFile: "/audio/darbuka.mp3",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "bendir",
        name: "Bendir",
        description: "Tasavvuf ve halk m\xFCzi\u011Finde kullan\u0131lan \xE7er\xE7eve davulu",
        origin: "turkish",
        category: "vurmal\u0131",
        audioFile: "/audio/bendir.mp3",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "kasik",
        name: "Ka\u015F\u0131k",
        description: "Ah\u015Fap ka\u015F\u0131klarla icra edilen halk oyunu ritim arac\u0131",
        origin: "turkish",
        category: "vurmal\u0131",
        audioFile: "/audio/kasik.mp3",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "parmak-zili",
        name: "Parmak Zili",
        description: "Raks ve dansta parmaklara tak\u0131lan k\xFC\xE7\xFCk metal ziller",
        origin: "turkish",
        category: "vurmal\u0131",
        audioFile: "/audio/parmak-zili.mp3",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Turkish Instruments - Telli
      {
        id: "baglama",
        name: "Ba\u011Flama",
        description: "T\xFCrk halk m\xFCzi\u011Finin en temel enstr\xFCman\u0131",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/baglama.mp3",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "ud",
        name: "Ud",
        description: "Perdesiz armut \u015Feklinde g\xF6vdeli telli \xE7alg\u0131",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/ud.mp3",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "cumbus",
        name: "C\xFCmb\xFC\u015F",
        description: "Banjo ve ud kar\u0131\u015F\u0131m\u0131 metalik g\xF6vdeli \xE7alg\u0131",
        origin: "turkish",
        category: "telli",
        audioFile: "/audio/cumbus.mp3",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Turkish Instruments - Yaylı
      {
        id: "kabak-kemane",
        name: "Kabak Kemane",
        description: "Kaba\u011F\u0131n oyulmas\u0131yla yap\u0131lan geleneksel yayl\u0131 \xE7alg\u0131",
        origin: "turkish",
        category: "yayl\u0131",
        audioFile: "/audio/kabak-kemane.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "karadeniz-kemencesi",
        name: "Karadeniz Kemencesi",
        description: "Karadeniz b\xF6lgesine \xF6zg\xFC \xFC\xE7 telli k\xFC\xE7\xFCk yayl\u0131 \xE7alg\u0131",
        origin: "turkish",
        category: "yayl\u0131",
        audioFile: "/audio/karadeniz-kemencesi.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "yayli-tanbur",
        name: "Yayl\u0131 Tanbur",
        description: "Klasik T\xFCrk m\xFCzi\u011Finde kullan\u0131lan uzun sapl\u0131 yayl\u0131 \xE7alg\u0131",
        origin: "turkish",
        category: "yayl\u0131",
        audioFile: "/audio/yayli-tanbur.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Turkish Instruments - Üflemeli
      {
        id: "ney",
        name: "Ney",
        description: "Kam\u0131\u015Ftan yap\u0131lan tasavvuf m\xFCzi\u011Finin \xE7alg\u0131s\u0131",
        origin: "turkish",
        category: "\xFCflemeli",
        audioFile: "/audio/ney.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fbd29c5cd36d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "zurna",
        name: "Zurna",
        description: "Halk oyunlar\u0131 ve t\xF6renlerde kullan\u0131lan y\xFCksek sesli \xE7alg\u0131",
        origin: "turkish",
        category: "\xFCflemeli",
        audioFile: "/audio/zurna.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fbd29c5cd36d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "mey",
        name: "Mey",
        description: "Kiraz a\u011Fac\u0131ndan yap\u0131lan h\xFCz\xFCnl\xFC sesli \xFCflemeli \xE7alg\u0131",
        origin: "turkish",
        category: "\xFCflemeli",
        audioFile: "/audio/mey.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fbd29c5cd36d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Turkish Instruments - Tuşlu
      {
        id: "kanun",
        name: "Kanun",
        description: "Mandallar\u0131 bulunan T\xFCrk m\xFCzi\u011Fi makamlar\u0131 i\xE7in tasarlanm\u0131\u015F \xE7alg\u0131",
        origin: "turkish",
        category: "tu\u015Flu",
        audioFile: "/audio/kanun.mp3",
        imageUrl: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Foreign Instruments - Vurmalı
      {
        id: "bateri",
        name: "Bateri",
        description: "Caz, rock ve pop m\xFCzi\u011Fin temelini olu\u015Fturan davul seti",
        origin: "foreign",
        category: "vurmal\u0131",
        audioFile: "/audio/bateri.mp3",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "konga",
        name: "Konga",
        description: "K\xFCba k\xF6kenli uzun ve dar Latin m\xFCzi\u011Fi davulu",
        origin: "foreign",
        category: "vurmal\u0131",
        audioFile: "/audio/konga.mp3",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "kastanyet",
        name: "Kastanyet",
        description: "\u0130spanyol flamenko dans\u0131nda kullan\u0131lan ah\u015Fap \xE7alg\u0131",
        origin: "foreign",
        category: "vurmal\u0131",
        audioFile: "/audio/kastanyet.mp3",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "marakas",
        name: "Marakas",
        description: "\u0130\xE7i tohum dolu sapl\u0131 vurmal\u0131 \xE7alg\u0131",
        origin: "foreign",
        category: "vurmal\u0131",
        audioFile: "/audio/marakas.mp3",
        imageUrl: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Foreign Instruments - Telli
      {
        id: "akustik-gitar",
        name: "Akustik Gitar",
        description: "Pop\xFCler m\xFCzi\u011Fin temel enstr\xFCmanlar\u0131ndan klasik gitar",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/akustik-gitar.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "elektro-gitar",
        name: "Elektro Gitar",
        description: "Rock, blues ve metal m\xFCzi\u011Finin vazge\xE7ilmez \xE7alg\u0131s\u0131",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/elektro-gitar.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "banjo",
        name: "Banjo",
        description: "Amerikan country ve folk m\xFCzi\u011Finin tiz ve parlak \xE7alg\u0131s\u0131",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/banjo.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "mandolin",
        name: "Mandolin",
        description: "\u0130talyan k\xF6kenli k\xFC\xE7\xFCk armut \u015Fekilli ne\u015Feli \xE7alg\u0131",
        origin: "foreign",
        category: "telli",
        audioFile: "/audio/mandolin.mp3",
        imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Foreign Instruments - Yaylı
      {
        id: "keman",
        name: "Keman",
        description: "Orkestralar\u0131n en pop\xFCler y\xFCksek perdeli \xE7alg\u0131s\u0131",
        origin: "foreign",
        category: "yayl\u0131",
        audioFile: "/audio/keman.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "viyolonsel",
        name: "Viyolonsel",
        description: "Kemana g\xF6re b\xFCy\xFCk ve derin sesli oturarak \xE7al\u0131nan \xE7alg\u0131",
        origin: "foreign",
        category: "yayl\u0131",
        audioFile: "/audio/viyolonsel.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "kontrbas",
        name: "Kontrbas",
        description: "Orkestran\u0131n en b\xFCy\xFCk ve en kal\u0131n sesli yayl\u0131 \xE7alg\u0131s\u0131",
        origin: "foreign",
        category: "yayl\u0131",
        audioFile: "/audio/kontrbas.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Foreign Instruments - Üflemeli
      {
        id: "flut",
        name: "Fl\xFCt",
        description: "Yan \xFCflemeli parlak ve tiz sesli metal \xE7alg\u0131",
        origin: "foreign",
        category: "\xFCflemeli",
        audioFile: "/audio/flut.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "klarnet",
        name: "Klarnet",
        description: "Tek kam\u0131\u015Fl\u0131 caz ve klasik m\xFCzi\u011Fin pop\xFCler \xE7alg\u0131s\u0131",
        origin: "foreign",
        category: "\xFCflemeli",
        audioFile: "/audio/klarnet.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "saksafon",
        name: "Saksafon",
        description: "Caz m\xFCzi\u011Fiyle \xF6zde\u015Fle\u015Fmi\u015F pirin\xE7 konik \xE7alg\u0131",
        origin: "foreign",
        category: "\xFCflemeli",
        audioFile: "/audio/saksafon.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "trompet",
        name: "Trompet",
        description: "Bando m\xFCziklerinde kullan\u0131lan parlak keskin sesli \xE7alg\u0131",
        origin: "foreign",
        category: "\xFCflemeli",
        audioFile: "/audio/trompet.mp3",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      // Foreign Instruments - Tuşlu
      {
        id: "piyano",
        name: "Piyano",
        description: "En \xE7ok bilinen tu\u015Flu konser salonlar\u0131n\u0131n vazge\xE7ilmezi",
        origin: "foreign",
        category: "tu\u015Flu",
        audioFile: "/audio/piyano.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "akordeon",
        name: "Akordeon",
        description: "Tu\u015Flu ve k\xF6r\xFCkl\xFC halk m\xFCzi\u011Finde kullan\u0131lan \xE7alg\u0131",
        origin: "foreign",
        category: "tu\u015Flu",
        audioFile: "/audio/akordeon.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        id: "org",
        name: "Org",
        description: "Kiliselerde kullan\u0131lan \xE7ok klavyeli pedal\u0131 devasa \xE7alg\u0131",
        origin: "foreign",
        category: "tu\u015Flu",
        audioFile: "/audio/org.mp3",
        imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      }
    ];
    instrumentsData.forEach((instrument) => {
      const id = instrument.id || randomUUID();
      this.instruments.set(id, { ...instrument, id });
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getAllInstruments() {
    return Array.from(this.instruments.values()).filter((i) => i.isActive);
  }
  async getInstrumentsByOrigin(origin) {
    return Array.from(this.instruments.values()).filter((i) => i.isActive && i.origin === origin);
  }
  async getInstrumentsByCategory(category) {
    return Array.from(this.instruments.values()).filter((i) => i.isActive && i.category === category);
  }
  async getInstrumentsByOriginAndCategory(origin, category) {
    return Array.from(this.instruments.values()).filter((i) => i.isActive && i.origin === origin && i.category === category);
  }
  async getInstrument(id) {
    const instrument = this.instruments.get(id);
    return instrument?.isActive ? instrument : void 0;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/instruments", async (req, res) => {
    try {
      const { origin, category } = req.query;
      let instruments;
      if (origin && category) {
        instruments = await storage.getInstrumentsByOriginAndCategory(
          origin,
          category
        );
      } else if (origin) {
        instruments = await storage.getInstrumentsByOrigin(origin);
      } else if (category) {
        instruments = await storage.getInstrumentsByCategory(category);
      } else {
        instruments = await storage.getAllInstruments();
      }
      res.json(instruments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch instruments" });
    }
  });
  app2.get("/api/instruments/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: "0.0.0.0",
    port: 5e3,
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    host: "0.0.0.0",
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
