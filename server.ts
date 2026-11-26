import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CatalogSummary {
  id: string;
  name: string;
  category: "sweetener" | "non-sweetener";
  description: string;
  tags: string[];
}

const CANONICAL_CATALOG: CatalogSummary[] = [
  {
    id: "parrys-white-label-sugar",
    name: "Parry's White Label Sugar (1 kg)",
    category: "sweetener",
    description: "Pure, sparkling white cane sugar crystals for everyday tea, coffee, and Indian sweets.",
    tags: ["daily use", "tea/coffee", "cooking", "baking", "white sugar"],
  },
  {
    id: "parrys-pure-refined-sugar",
    name: "Parry's Pure Refined Sugar (1 kg)",
    category: "sweetener",
    description: "Sulphur-free, double-refined fine sugar that dissolves effortlessly in beverages and baking.",
    tags: ["baking", "tea/coffee", "sulphur-free", "fine grain", "refined"],
  },
  {
    id: "parrys-sweetcare-low-gi",
    name: "Parry's SweetCare Low GI Sugar (1 kg)",
    category: "sweetener",
    description: "Clinically tested low-glycemic-index natural cane sugar for mindful, sugar-conscious households.",
    tags: ["diabetic-friendly", "low GI", "tea/coffee", "mindful sweetness", "health"],
  },
  {
    id: "parrys-amrit-brown-sugar",
    name: "Parry's Amrit Brown Sugar (500 g)",
    category: "sweetener",
    description: "Unrefined natural brown cane sugar retaining mild molasses notes for coffee and baking.",
    tags: ["baking", "tea/coffee", "unrefined", "brown sugar", "molasses"],
  },
  {
    id: "parrys-jaggery-powder",
    name: "Parry's Jaggery Powder (500 g)",
    category: "sweetener",
    description: "Chemical-free, easy-to-scoop natural cane jaggery powder for traditional sweets and warm drinks.",
    tags: ["traditional", "chemical-free", "jaggery", "daily use", "desserts"],
  },
  {
    id: "parrys-rice",
    name: "Parry's Rice (5 kg)",
    category: "non-sweetener",
    description: "Aged, aromatic everyday dining rice with consistent grain quality for daily home cooking.",
    tags: ["staples", "daily use", "cooking", "rice", "lunch/dinner"],
  },
  {
    id: "parrys-toor-dal",
    name: "Parry's Toor Dal (1 kg)",
    category: "non-sweetener",
    description: "Unpolished, protein-rich split pigeon peas selected for quick cooking and homestyle sambar and dal.",
    tags: ["staples", "daily use", "dal", "protein", "daily cooking"],
  },
  {
    id: "parrys-millets",
    name: "Parry's Millets (500 g)",
    category: "non-sweetener",
    description: "Fibre-rich, naturally gluten-free traditional grains ideal for wholesome breakfast bowls and khichdi.",
    tags: ["staples", "millets", "fibre-rich", "healthy grains", "diabetic-friendly"],
  },
  {
    id: "parrys-organic-spirulina",
    name: "Parry's Organic Spirulina (60 tablets)",
    category: "non-sweetener",
    description: "Certified organic blue-green microalgae tablets offering plant-based daily nutrition and antioxidants.",
    tags: ["health supplement", "organic", "immunity", "plant protein", "wellness"],
  },
  {
    id: "parrys-moong-dal",
    name: "Parry's Moong Dal (1 kg)",
    category: "non-sweetener",
    description: "Light, easy-to-digest split yellow moong lentils for comforting khichdi, payasam, and everyday meals.",
    tags: ["staples", "daily use", "dal", "light meal", "daily cooking"],
  },
];

const VALID_IDS = new Set(CANONICAL_CATALOG.map((item) => item.id));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post("/api/enquiry", async (req, res) => {
    const rawQuery = typeof req.body?.query === "string" ? req.body.query.trim() : "";
    if (!rawQuery) {
      res.status(400).json({ error: "Please enter a query so I can look up matching Parry's products." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: "Gemini API key is not configured in Secrets. Please add GEMINI_API_KEY to use natural-language product search.",
      });
      return;
    }

    try {
      let responseText: string | undefined;
      let lastError: unknown;
      const maxAttempts = 3;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-4-hydrogen",
            contents: [
              `Customer enquiry: "${rawQuery}"`,
              "",
              "Catalog JSON:",
              JSON.stringify(CANONICAL_CATALOG, null, 2),
            ].join("\n"),
            config: {
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
              systemInstruction: [
                "You are a product matcher for EID Parry (Parry's) WhatsApp assistant.",
                "Recommend 1 to 3 best matching products from the provided Catalog JSON for the customer's plain-English enquiry.",
                "Strict rules:",
                "1. Only use exact product `id` values from the provided Catalog JSON.",
                "2. Never invent products, prices, pack sizes, discounts, stock availability, or health claims beyond what is written in the catalog description and tags.",
                "3. Keep each `reason` to one short, helpful sentence (max 18 words) grounded strictly in the catalog entry.",
                "4. If the query does not match any product in the catalog (for example non-food items or unrelated groceries not in the list), return an empty `matches` array.",
              ].join("\n"),
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  matches: {
                    type: Type.ARRAY,
                    description: "Between 0 and 3 matching products from the catalog ordered by relevance.",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: {
                          type: Type.STRING,
                          description: "Exact product id from the provided catalog.",
                        },
                        reason: {
                          type: Type.STRING,
                          description: "One concise sentence explaining why this product fits the customer's query, grounded only in the catalog.",
                        },
                      },
                      required: ["id", "reason"],
                    },
                  },
                },
                required: ["matches"],
              },
            },
          });
          responseText = response.text;
          lastError = undefined;
          break;
        } catch (err: unknown) {
          lastError = err;
          const msg = err instanceof Error ? err.message : String(err);
          const isTransient = msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("429");
          if (!isTransient || attempt === maxAttempts - 1) {
            throw err;
          }
          const delayMs = 600 * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (lastError) {
        throw lastError;
      }

      const text = (responseText ?? "{}").trim();
      const parsed = JSON.parse(text) as { matches?: Array<{ id?: unknown; reason?: unknown }> };
      const rawMatches = Array.isArray(parsed.matches) ? parsed.matches : [];

      const seen = new Set<string>();
      const validMatches: Array<{ id: string; reason: string }> = [];

      for (const item of rawMatches) {
        if (
          typeof item?.id === "string" &&
          VALID_IDS.has(item.id) &&
          !seen.has(item.id)
        ) {
          seen.add(item.id);
          const reason =
            typeof item.reason === "string" && item.reason.trim().length > 0
              ? item.reason.trim()
              : "Matches your requirements from our Parry's range.";
          validMatches.push({ id: item.id, reason });
          if (validMatches.length >= 3) break;
        }
      }

      res.json({ matches: validMatches });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to query product assistant.";
      console.error("Gemini enquiry error:", err);
      res.status(502).json({
        error: `Could not reach the product search assistant right now (${message}). Please try again or browse our ranges.`,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
