import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_ANALYZERS, type Character } from "../../lib/analyzers";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function analyzeName(name: string, characters: { name: string; emoji: string; description?: string }[]) {
  const n = name.trim().toLowerCase().replace(/\s/g, "");
  if (!n) return [];
  const seed = hashCode(n);
  const rand = (i: number) => ((seed * 9301 + i * 49297 + 233) % 233280) / 233280;
  const base = 1 / characters.length;
  const results = characters.map((char, i) => ({
    character: char,
    pct: Math.max(3, Math.min(55, Math.round((base + (rand(i * 3) - 0.5) * 0.3) * 100))),
  }));
  let diff = 100 - results.reduce((a, r) => a + r.pct, 0);
  for (let i = 0; diff !== 0 && i < results.length * 10; i++) {
    results[i % results.length].pct += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }
  return results.sort((a, b) => b.pct - a.pct);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, analyzerId } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const analyzer = DEFAULT_ANALYZERS.find((a) => a.id === (analyzerId || "one-piece"));
    if (!analyzer) {
      return NextResponse.json({ error: `Analyzer '${analyzerId}' not found` }, { status: 404 });
    }

    return NextResponse.json({
      name: name.trim(),
      analyzer: {
        id: analyzer.id,
        name: analyzer.name,
        nameEn: analyzer.nameEn,
        emoji: analyzer.emoji,
      },
      results: analyzeName(name.trim(), analyzer.characters),
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
