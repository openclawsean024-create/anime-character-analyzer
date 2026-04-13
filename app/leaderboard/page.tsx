"use client";

import { useState, useEffect } from "react";
import { DEFAULT_ANALYZERS, type Analyzer } from "../lib/analyzers";

type Lang = "zh" | "en";
type LbTab = "hot" | "new";

export default function LeaderboardPage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [lbTab, setLbTab] = useState<LbTab>("hot");
  const [customAnalyzers, setCustomAnalyzers] = useState<Analyzer[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("anime-analyzer-custom") || "[]");
      setCustomAnalyzers(Array.isArray(stored) ? stored : []);
    } catch {
      setCustomAnalyzers([]);
    }
  }, []);

  const allAnalyzers = [...DEFAULT_ANALYZERS, ...customAnalyzers];
  const sorted = lbTab === "hot"
    ? [...allAnalyzers].sort((a, b) => b.useCount - a.useCount)
    : [...allAnalyzers].sort((a, b) => b.createdAt - a.createdAt);

  const rankIcon = (i: number) =>
    i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#50AF95" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="7" fill="#50AF95" opacity="0.15" />
                <circle cx="14" cy="14" r="3" fill="#50AF95" />
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

      <main className="page-main main-content">
        <div className="page-container">

          {/* Page Header */}
          <div className="section-header">
            <div className="hero-badge" style={{ marginBottom: "1rem" }}>
              <span className="dot" />
              {lang === "zh" ? "分析器排行榜" : "Analyzer Rankings"}
            </div>
            <h1 className="page-title">
              🏆 {lang === "zh" ? "排行榜" : "Leaderboard"}
            </h1>
            <p className="page-subtitle">
              {lang === "zh"
                ? "查看最熱門的分析器或最新建立的分析器"
                : "Browse the hottest analyzers or the newest additions"}
            </p>
          </div>

          {/* Tab Toggle */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", justifyContent: "center" }}>
            <button
              className={`lb-tab ${lbTab === "hot" ? "active" : ""}`}
              onClick={() => setLbTab("hot")}
            >
              🔥 {lang === "zh" ? "熱門榜" : "Hot"}
            </button>
            <button
              className={`lb-tab ${lbTab === "new" ? "active" : ""}`}
              onClick={() => setLbTab("new")}
            >
              ✨ {lang === "zh" ? "最新榜" : "New"}
            </button>
          </div>

          {/* List */}
          {sorted.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div className="empty-state-icon">📊</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.5rem" }}>
                {lang === "zh" ? "暫無數據" : "No Data Yet"}
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
                {lang === "zh" ? "開始使用分析器來累積使用次數吧！" : "Start analyzing to build the rankings!"}
              </p>
              <a href="/" style={{ color: "var(--accent)" }}>
                → {lang === "zh" ? "開始分析" : "Start Analyzing"}
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {sorted.map((a, i) => (
                <div
                  key={a.id}
                  className={`lb-item${i < 3 ? " top-3" : ""}`}
                >
                  {/* Rank */}
                  <div style={{
                    fontSize: i < 3 ? "1.5rem" : "0.8rem",
                    fontWeight: 700,
                    minWidth: "2.25rem",
                    textAlign: "center",
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: i >= 3 ? "var(--text-muted)" : undefined,
                  }}>
                    {rankIcon(i)}
                  </div>

                  {/* Emoji */}
                  <div style={{ fontSize: "1.6rem", flexShrink: 0 }}>{a.emoji}</div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "var(--text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {lang === "zh" ? a.name : (a.nameEn || a.name)}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 2 }}>
                      {a.characters.length} {lang === "zh" ? "個角色" : "characters"}
                      {a.id.startsWith("custom-") && (
                        <span style={{ marginLeft: "0.5rem", color: "var(--accent)" }}>
                          ✨ {lang === "zh" ? "自訂" : "Custom"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stat */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {lbTab === "hot" ? (
                      <>
                        <div style={{
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--accent)",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}>
                          {a.useCount.toLocaleString()}
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
                          {lang === "zh" ? "次使用" : "uses"}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                          {new Date(a.createdAt).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
                          {lang === "zh" ? "建立日期" : "Created"}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <a href="/" className="back-link">
              ← {lang === "zh" ? "返回首頁" : "Back to Analyze"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
