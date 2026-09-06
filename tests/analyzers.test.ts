import { describe, it, expect } from "vitest";
import {
  DEFAULT_ANALYZERS,
  normalizeAnalyzer,
  customAnalyzersStorageKey,
  type Analyzer,
  type Character,
} from "../app/lib/analyzers";

describe("analyzers module", () => {
  describe("DEFAULT_ANALYZERS", () => {
    it("exposes the 10 seeded franchises", () => {
      expect(DEFAULT_ANALYZERS).toHaveLength(10);
    });

    it("each default analyzer has a unique id", () => {
      const ids = DEFAULT_ANALYZERS.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("each default analyzer has at least 8 characters", () => {
      for (const a of DEFAULT_ANALYZERS) {
        expect(a.characters.length).toBeGreaterThanOrEqual(8);
      }
    });

    it("each character has a non-empty name and emoji", () => {
      for (const a of DEFAULT_ANALYZERS) {
        for (const c of a.characters) {
          expect(c.name.length).toBeGreaterThan(0);
          expect(c.emoji.length).toBeGreaterThan(0);
        }
      }
    });

    it("exports the canonical storage key", () => {
      expect(customAnalyzersStorageKey).toBe("anime-analyzer-custom");
    });

    it("ships a known list of franchise ids", () => {
      const ids = DEFAULT_ANALYZERS.map((a) => a.id).sort();
      expect(ids).toEqual([
        "attack-on-titan",
        "chainsaw-man",
        "death-note",
        "demon-slayer",
        "jujutsu-kaisen",
        "naruto",
        "one-piece",
        "one-punch-man",
        "spy-x-family",
        "sword-art-online",
      ]);
    });
  });

  describe("normalizeAnalyzer", () => {
    const baseValid: Analyzer = {
      id: "custom-test",
      name: "測試動畫",
      nameEn: "Test Anime",
      emoji: "🧪",
      characters: [
        { name: "角色A", emoji: "🅰️" },
        { name: "角色B", emoji: "🅱️" },
      ],
      createdAt: 1700000000000,
      useCount: 7,
    };

    it("returns null for null / non-object input", () => {
      expect(normalizeAnalyzer(null)).toBeNull();
      expect(normalizeAnalyzer(undefined)).toBeNull();
      expect(normalizeAnalyzer(42)).toBeNull();
      expect(normalizeAnalyzer("string")).toBeNull();
    });

    it("returns null when required string fields are missing", () => {
      const { id: _id, ...rest } = baseValid;
      expect(normalizeAnalyzer(rest)).toBeNull();
    });

    it("returns null when characters is not an array", () => {
      expect(normalizeAnalyzer({ ...baseValid, characters: "not-an-array" })).toBeNull();
    });

    it("returns null when fewer than 2 valid characters", () => {
      const tooFew: Partial<Analyzer> = {
        ...baseValid,
        characters: [{ name: "孤兒", emoji: "👤" }] as Character[],
      };
      expect(normalizeAnalyzer(tooFew)).toBeNull();
    });

    it("filters out non-object / missing-emoji characters and keeps valid ones", () => {
      const input = {
        ...baseValid,
        characters: [
          { name: "好的", emoji: "✅" },
          { name: "沒emoji" }, // invalid: missing emoji
          null, // invalid: null entry
          "not-an-object", // invalid: string entry
          { name: "第二個", emoji: "2️⃣" },
        ],
      };
      const out = normalizeAnalyzer(input);
      expect(out).not.toBeNull();
      expect(out!.characters).toHaveLength(2);
      expect(out!.characters[0].name).toBe("好的");
      expect(out!.characters[1].name).toBe("第二個");
    });

    it("defaults createdAt / useCount when missing or wrong type", () => {
      const before = Date.now();
      const out = normalizeAnalyzer({
        ...baseValid,
        createdAt: "not-a-number",
        useCount: undefined,
      });
      expect(out).not.toBeNull();
      expect(typeof out!.createdAt).toBe("number");
      expect(out!.createdAt).toBeGreaterThanOrEqual(before);
      expect(out!.useCount).toBe(0);
    });

    it("passes through valid payload verbatim", () => {
      const out = normalizeAnalyzer(baseValid);
      expect(out).toEqual({
        ...baseValid,
        characters: baseValid.characters.map((c) => ({ ...c, description: "" })),
      });
    });
  });
});
