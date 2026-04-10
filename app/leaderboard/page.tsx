"use client";

import { useState, useEffect } from "react";

type Lang = "zh" | "en";
type LbTab = "hot" | "new";

interface Analyzer {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  characters: { name: string; emoji: string }[];
  createdAt: number;
  useCount: number;
}

const DEFAULT_ANALYZERS: Analyzer[] = [
  { id: "one-piece", name: "海賊王", nameEn: "One Piece", emoji: "🏴‍☠️", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 847 },
  { id: "naruto", name: "火影忍者", nameEn: "Naruto", emoji: "🍥", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 623 },
  { id: "demon-slayer", name: "鬼滅之刃", nameEn: "Demon Slayer", emoji: "⚔️", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 512 },
  { id: "attack-on-titan", name: "進擊的巨人", nameEn: "Attack on Titan", emoji: "🔶", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 398 },
  { id: "sword-art-online", name: "刀劍神域", nameEn: "Sword Art Online", emoji: "🗡️", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 334 },
  { id: "death-note", name: "死亡筆記本", nameEn: "Death Note", emoji: "📓", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 287 },
  { id: "jujutsu-kaisen", name: "咒術迴戰", nameEn: "Jujutsu Kaisen", emoji: "👊", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 256 },
  { id: "one-punch-man", name: "一拳超人", nameEn: "One Punch Man", emoji: "💥", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 219 },
  { id: "spy-x-family", name: "間諜過家家", nameEn: "Spy x Family", emoji: "🕵️", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 178 },
  { id: "chainsaw-man", name: "鏈鋸人", nameEn: "Chainsaw Man", emoji: "⛓️", characters: Array(10).fill({ name: "", emoji: "👤" }), createdAt: Date.now(), useCount: 145 },
];

const normalizeRankings = (value: unknown) => {
  const base = { hot: [] as string[], new: [] as string[] };
  if (!value || typeof value !== "object") return base;
  const record = value as { hot?: unknown; new?: unknown };
  return {
    hot: Array.isArray(record.hot) ? record.hot.filter((v): v is string => typeof v === "string") : [],
    new: Array.isArray(record.new) ? record.new.filter((v): v is string => typeof v === "string") : [],
  };
};

export default function LeaderboardPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [lbTab, setLbTab] = useState<LbTab>("hot");
  const [customAnalyzers, setCustomAnalyzers] = useState<Analyzer[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("anime-analyzer-custom") || "[]");
      setCustomAnalyzers(stored);
    } catch {
      setCustomAnalyzers([]);
    }
  }, []);

  const allAnalyzers = [...DEFAULT_ANALYZERS, ...customAnalyzers];
  const sorted = lbTab === "hot"
    ? [...allAnalyzers].sort((a, b) => b.useCount - a.useCount)
    : [...allAnalyzers].sort((a, b) => b.createdAt - a.createdAt);

  const rankClass = (i: number) => (i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "normal");

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#00E5C8" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="7" fill="#00E5C8" opacity="0.15" />
                <circle cx="14" cy="14" r="3" fill="#00E5C8" />
              </svg>
            </div>
            <a href="/" className="logo-text">
              <span className="logo-primary">Anime</span>
              <span className="logo-secondary"> Analyzer</span>
            </a>
          </div>
          <nav className="nav-links">
            <a href="/" className="nav-link">{lang === "zh" ? "分析" : "Analyze"}</a>
            <a href="/create" className="nav-link">{lang === "zh" ? "創建" : "Create"}</a>
            <a href="/leaderboard" className="nav-link active">{lang === "zh" ? "排行榜" : "Ranking"}</a>
          </nav>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      </header>

      <main className="main-content" style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              🏆 {lang === "zh" ? "排行榜" : "Leaderboard"}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {lang === "zh"
                ? "查看最熱門的分析器或最新建立的分析器"
                : "Browse the hottest analyzers or the newest additions"}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", justifyContent: "center" }}>
            <button
              className={`lb-tab ${lbTab === "hot" ? "active" : ""}`}
              onClick={() => setLbTab("hot")}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                background: lbTab === "hot" ? "var(--accent)" : "rgba(255,255,255,0.06)",
                color: lbTab === "hot" ? "#0F172A" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              🔥 {lang === "zh" ? "熱門榜" : "Hot"}
            </button>
            <button
              className={`lb-tab ${lbTab === "new" ? "active" : ""}`}
              onClick={() => setLbTab("new")}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                background: lbTab === "new" ? "var(--accent)" : "rgba(255,255,255,0.06)",
                color: lbTab === "new" ? "#0F172A" : "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              ✨ {lang === "zh" ? "最新榜" : "New"}
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
              <h3 style={{ marginBottom: "0.5rem" }}>{lang === "zh" ? "暫無數據" : "No Data Yet"}</h3>
              <p style={{ color: "var(--text-secondary)" }}>
                {lang === "zh" ? "開始使用分析器來累積使用次數吧！" : "Start analyzing to build the rankings!"}
              </p>
              <a href="/" style={{ color: "var(--accent)", marginTop: "1rem", display: "inline-block" }}>
                → {lang === "zh" ? "開始分析" : "Start Analyzing"}
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {sorted.map((a, i) => (
                <div
                  key={a.id}
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    opacity: i >= 10 ? 0.7 : 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: i < 3 ? "1.5rem" : "1.1rem",
                      fontWeight: 700,
                      minWidth: "2.5rem",
                      textAlign: "center",
                    }}
                  >
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </div>
                  <div style={{ fontSize: "1.75rem" }}>{a.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>
                      {lang === "zh" ? a.name : a.nameEn}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      {a.characters.length} {lang === "zh" ? "個角色" : "characters"}
                      {a.id.startsWith("custom-") && (
                        <span style={{ marginLeft: "0.5rem", color: "var(--accent)" }}>
                          ✨ {lang === "zh" ? "自訂" : "Custom"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {lbTab === "hot" ? (
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent)" }}>
                          {a.useCount.toLocaleString()}
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                          {lang === "zh" ? "次使用" : "uses"}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                          {new Date(a.createdAt).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                          {lang === "zh" ? "建立" : "Created"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href="/" style={{ color: "var(--accent)" }}>
              ← {lang === "zh" ? "返回首頁" : "Back to Analyze"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
