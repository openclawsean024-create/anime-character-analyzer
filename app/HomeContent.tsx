"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_ANALYZERS, Analyzer } from "./lib/analyzers";

type Lang = "zh" | "en";

interface AnalysisResult {
  character: { name: string; emoji: string; description?: string };
  pct: number;
}

function analyzeName(name: string, characters: { name: string; emoji: string; description?: string }[]): AnalysisResult[] {
  const n = name.trim().toLowerCase().replace(/\s/g, "");
  if (!n) return [];
  const seed = n.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
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

function Header({
  lang,
  onLang,
  active,
}: {
  lang: Lang;
  onLang: (l: Lang) => void;
  active?: string;
}) {
  return (
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
          <span className="logo-text">
            <span className="logo-primary">Anime</span>
            <span className="logo-secondary"> Analyzer</span>
          </span>
        </div>
        <nav className="nav-links">
          <a href="/" className={`nav-link${active === "/" ? " active" : ""}`}>
            {lang === "zh" ? "分析" : "Analyze"}
          </a>
          <a href="/create" className={`nav-link${active === "/create" ? " active" : ""}`}>
            {lang === "zh" ? "創建" : "Create"}
          </a>
          <a href="/leaderboard" className={`nav-link${active === "/leaderboard" ? " active" : ""}`}>
            {lang === "zh" ? "排行榜" : "Ranking"}
          </a>
        </nav>
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => onLang("zh")}>
            中文
          </button>
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => onLang("en")}>
            EN
          </button>
        </div>
      </div>
    </header>
  );
}

function Top5BarChart({ results, lang }: { results: AnalysisResult[]; lang: Lang }) {
  const top5 = results.slice(0, 5);
  const medals = ["🥇", "🥈", "🥉", "④", "⑤"];
  const barColors = [
    "linear-gradient(90deg, #FFD700, #FFA500)",
    "linear-gradient(90deg, #C0C0C0, #A8A8A8)",
    "linear-gradient(90deg, #CD7F32, #A0522D)",
    "linear-gradient(90deg, #50AF95, #3D9C82)",
    "linear-gradient(90deg, #50AF95, #3D9C82)",
  ];
  const textColors = ["#FFD700", "#C0C0C0", "#CD7F32", "var(--accent)", "var(--accent)"];

  return (
    <div
      className="card"
      style={{
        marginTop: 24,
        padding: "1.5rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
        }}
      />
      <p
        style={{
          marginBottom: "1.25rem",
          color: "var(--accent)",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {lang === "zh" ? "▸ 分析結果 Top 5" : "▸ Analysis Result Top 5"}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
        {top5.map((r, i) => (
          <div key={r.character.name} style={{ animationDelay: `${i * 120}ms` }} className="bar-row">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>{medals[i]}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {r.character.emoji} {r.character.name}
                </span>
              </div>
              <span style={{ fontSize: "0.95rem", fontWeight: 800, color: textColors[i], fontFamily: "'IBM Plex Mono', monospace" }}>
                {r.pct}%
              </span>
            </div>
            <div style={{ height: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${r.pct}%`,
                  height: "100%",
                  background: barColors[i],
                  borderRadius: "99px",
                  transition: `width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms`,
                  boxShadow: i < 3 ? `0 0 10px ${textColors[i]}66` : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          {lang === "zh" ? "總匹配率" : "Total match"}
        </span>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)", fontFamily: "'IBM Plex Mono', monospace" }}>
          {top5.reduce((a, r) => a + r.pct, 0)}%
        </span>
      </div>
    </div>
  );
}

function AnalyzerSelector({
  analyzers,
  selectedId,
  onChange,
  lang,
}: {
  analyzers: Analyzer[];
  selectedId: string;
  onChange: (id: string) => void;
  lang: Lang;
}) {
  const selected = analyzers.find((a) => a.id === selectedId) || analyzers[0];
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "var(--text-secondary)",
          marginBottom: "0.5rem",
        }}
      >
        {lang === "zh" ? "選擇分析器" : "Select Analyzer"}
      </label>

      {/* Desktop: pill buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
        className="analyzer-pills"
      >
        {analyzers.map((a) => (
          <button
            key={a.id}
            onClick={() => onChange(a.id)}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "99px",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: `1.5px solid ${selectedId === a.id ? "var(--accent)" : "rgba(0,229,200,0.25)"}`,
              background: selectedId === a.id ? "rgba(0,229,200,0.12)" : "transparent",
              color: selectedId === a.id ? "var(--accent)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <span>{a.emoji}</span>
            <span>{a.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile: native select dropdown */}
      <div className="analyzer-dropdown-wrap">
        <select
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.65rem 1rem",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "10px",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            fontFamily: "'Inter', sans-serif",
            outline: "none",
            cursor: "pointer",
            appearance: "none",
            WebkitAppearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2350AF95' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: "2.5rem",
          }}
        >
          {analyzers.map((a) => (
            <option key={a.id} value={a.id}>
              {a.emoji} {a.name} — {a.characters.length} {lang === "zh" ? "角色" : "chars"}
            </option>
          ))}
        </select>
      </div>

      <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
        {selected.emoji} {selected.name} · {selected.characters.length}{" "}
        {lang === "zh" ? "角色" : "characters"}
      </p>
    </div>
  );
}

export default function HomeContent() {
  const [lang, setLang] = useState<Lang>("zh");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [selectedAnalyzerId, setSelectedAnalyzerId] = useState(DEFAULT_ANALYZERS[0].id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as "create" | "leaderboard" | null;
  const selectedAnalyzer = DEFAULT_ANALYZERS.find((a) => a.id === selectedAnalyzerId) || DEFAULT_ANALYZERS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let animId = 0;
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80,175,149,0.55)";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const onAnalyze = async () => {
    if (!name.trim()) return;
    setIsAnalyzing(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 500));
    setResults(analyzeName(name, selectedAnalyzer.characters));
    setIsAnalyzing(false);
  };

  return (
    <div className="page">
      <Header lang={lang} onLang={setLang} active="/" />
      <main className="main-content">
        <section className="hero-section">
          <canvas ref={canvasRef} className="hero-particles" />
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="dot" />
              {lang === "zh" ? "動漫角色分析器" : "Anime Analyzer"}
            </div>
            <h1 className="hero-title">
              {lang === "zh" ? (
                <>測測你是哪個<br /><span className="text-gradient">動漫角色</span></>
              ) : (
                <>Discover your<br /><span className="text-gradient">anime character</span></>
              )}
            </h1>
            <p className="hero-sub">
              {lang === "zh"
                ? "輸入名字，立即生成角色分析結果。"
                : "Enter a name to get your anime character match."}
            </p>

            <AnalyzerSelector
              analyzers={DEFAULT_ANALYZERS}
              selectedId={selectedAnalyzerId}
              onChange={setSelectedAnalyzerId}
              lang={lang}
            />

            <div className="hero-cta">
              <input
                className="hero-quick-input"
                placeholder={lang === "zh" ? "輸入名字..." : "Type your name..."}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onAnalyze()}
              />
              <button className="btn-hero" onClick={onAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? "..." : lang === "zh" ? "開始分析" : "Analyze"}
              </button>
            </div>

            {isAnalyzing && (
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <div style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
                  {lang === "zh" ? "分析中..." : "Analyzing..."}
                </div>
              </div>
            )}

            {results && <Top5BarChart results={results} lang={lang} />}
          </div>
        </section>
      </main>
    </div>
  );
}
