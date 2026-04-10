"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_ANALYZERS } from "./lib/analyzers";

interface Character {
  name: string;
  emoji: string;
  description?: string;
}

type Lang = "zh" | "en";

interface AnalysisResult { character: Character; pct: number; }
function analyzeName(name: string, characters: { name: string; emoji: string; description?: string }[]): AnalysisResult[] {
  const n = name.trim().toLowerCase().replace(/\s/g, "");
  if (!n) return [];
  const seed = n.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = (i: number) => ((seed * 9301 + i * 49297 + 233) % 233280) / 233280;
  const base = 1 / characters.length;
  const results = characters.map((char, i) => ({ character: char, pct: Math.max(3, Math.min(55, Math.round((base + (rand(i * 3) - 0.5) * 0.3) * 100))) }));
  let diff = 100 - results.reduce((a, r) => a + r.pct, 0);
  for (let i = 0; diff !== 0 && i < results.length * 10; i++) { results[i % results.length].pct += diff > 0 ? 1 : -1; diff += diff > 0 ? -1 : 1; }
  return results.sort((a, b) => b.pct - a.pct);
}

function Header({ lang, onLang, active }: { lang: Lang; onLang: (l: Lang) => void; active?: string }) {
  return <header className="site-header"><div className="header-inner"><div className="logo"><div className="logo-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#00E5C8" strokeWidth="1.5" /><circle cx="14" cy="14" r="7" fill="#00E5C8" opacity="0.15" /><circle cx="14" cy="14" r="3" fill="#00E5C8" /></svg></div><span className="logo-text"><span className="logo-primary">Anime</span><span className="logo-secondary"> Analyzer</span></span></div><nav className="nav-links"><a href="/" className={`nav-link${active === '/' ? ' active' : ''}`}>{lang === "zh" ? "分析" : "Analyze"}</a><a href="/create" className={`nav-link${active === '/create' ? ' active' : ''}`}>{lang === "zh" ? "創建" : "Create"}</a><a href="/leaderboard" className={`nav-link${active === '/leaderboard' ? ' active' : ''}`}>{lang === "zh" ? "排行榜" : "Ranking"}</a></nav><div className="lang-toggle"><button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => onLang("zh")}>中文</button><button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => onLang("en")}>EN</button></div></div></header>;
}

function CreateContent({ lang }: { lang: Lang }) {
  return (
    <div className="page">
      <Header lang={lang} onLang={() => {}} active="/create" />
      <main className="main-content" style={{ padding: "4rem 2rem" }}>
        <section style={{ maxWidth: 920, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem" }}>
            建立自訂分析器
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            建立你的專屬動漫分析器，定義角色清單與名稱設定。
          </p>
          <div className="card" style={{ marginBottom: "1rem" }}>
            <p style={{ color: "var(--text-primary)" }}>
              這是獨立的 /create 頁面，供自訂分析器使用。
            </p>
          </div>
          <a href="/" style={{ color: "var(--accent)" }}>返回首頁</a>
        </section>
      </main>
    </div>
  );
}

function LeaderboardContent({ lang }: { lang: Lang }) {
  return (
    <div className="page">
      <Header lang={lang} onLang={() => {}} active="/leaderboard" />
      <main className="main-content" style={{ padding: "4rem 2rem" }}>
        <section style={{ maxWidth: 920, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "1rem" }}>
            排行榜
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            顯示熱門與最新分析器排行。
          </p>
          <div className="card" style={{ marginBottom: "1rem" }}>
            <p style={{ color: "var(--text-primary)" }}>
              這是獨立的 /leaderboard 頁面，供排行榜瀏覽使用。
            </p>
          </div>
          <a href="/" style={{ color: "var(--accent)" }}>返回首頁</a>
        </section>
      </main>
    </div>
  );
}

export default function HomeContent() {
  const [lang, setLang] = useState<Lang>("zh");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as "create" | "leaderboard" | null;
  const analyzer = DEFAULT_ANALYZERS[0];

  // Show create or leaderboard tab when accessed via direct URL (middleware rewrite)
  if (activeTab === "create") {
    return <CreateContent lang={lang} />;
  }

  if (activeTab === "leaderboard") {
    return <LeaderboardContent lang={lang} />;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    let animId = 0;
    const particles = Array.from({ length: 20 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    const draw = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(80,175,149,0.55)"; ctx.fill(); }); animId = requestAnimationFrame(draw); };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  const onAnalyze = async () => { if (!name.trim()) return; setIsAnalyzing(true); await new Promise((r) => setTimeout(r, 500)); setResults(analyzeName(name, analyzer.characters)); setIsAnalyzing(false); };

  return <div className="page"><Header lang={lang} onLang={setLang} active="/" /><main className="main-content"><section className="hero-section"><canvas ref={canvasRef} className="hero-particles" /><div className="hero-inner"><div className="hero-badge"><span className="dot" />{lang === "zh" ? "動漫角色分析器" : "Anime Analyzer"}</div><h1 className="hero-title">{lang === "zh" ? <>測測你是哪個<br /><span className="text-gradient">動漫角色</span></> : <>Discover your<br /><span className="text-gradient">anime character</span></>}</h1><p className="hero-sub">{lang === "zh" ? "輸入名字，立即生成角色分析結果。" : "Enter a name to get your anime character match."}</p><div className="hero-cta"><input className="hero-quick-input" placeholder={lang === "zh" ? "輸入名字..." : "Type your name..."} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onAnalyze()} /><button className="btn-hero" onClick={onAnalyze}>{isAnalyzing ? "..." : (lang === "zh" ? "開始分析" : "Analyze")}</button></div>{results && <div className="card" style={{ marginTop: 24, textAlign: "left" }}><p style={{ color: "var(--text-secondary)" }}>{results[0].character.name} {results[0].pct}%</p></div>}</div></section></main></div>;
}
