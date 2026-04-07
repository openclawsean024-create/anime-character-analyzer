"use client";

import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Character {
  name: string;
  emoji: string;
  description: string;
}

interface Analyzer {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  characters: Character[];
  createdAt: number;
  useCount: number;
}

type Tab = "analyze" | "create" | "leaderboard";
type Lang = "zh" | "en";
type LbTab = "hot" | "new";

// ─── Default 10 Analyzers ─────────────────────────────────────────────────────
const DEFAULT_ANALYZERS: Analyzer[] = [
  {
    id: "one-piece",
    name: "海賊王",
    nameEn: "One Piece",
    emoji: "🏴‍☠️",
    characters: [
      { name: "魯夫", emoji: "😁", description: "" },
      { name: "索隆", emoji: "⚔️", description: "" },
      { name: "娜美", emoji: "🗺️", description: "" },
      { name: "烏索普", emoji: "🎯", description: "" },
      { name: "香吉士", emoji: "🍳", description: "" },
      { name: "喬巴", emoji: "🦌", description: "" },
      { name: "羅賓", emoji: "📚", description: "" },
      { name: "佛朗基", emoji: "🔧", description: "" },
      { name: "布魯克", emoji: "💀", description: "" },
      { name: "吉貝爾", emoji: "🐟", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "naruto",
    name: "火影忍者",
    nameEn: "Naruto",
    emoji: "🍥",
    characters: [
      { name: "漩渦鳴人", emoji: "🐦", description: "" },
      { name: "宇智波佐助", emoji: "🔥", description: "" },
      { name: "春野櫻", emoji: "🌸", description: "" },
      { name: "卡卡西", emoji: "🐱", description: "" },
      { name: "薩克羅", emoji: "⚡", description: "" },
      { name: "綱手", emoji: "💪", description: "" },
      { name: "自來也", emoji: "🐸", description: "" },
      { name: "我愛羅", emoji: "🏜️", description: "" },
      { name: "日向雛田", emoji: "🥀", description: "" },
      { name: "波風湊", emoji: "🌊", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "demon-slayer",
    name: "鬼滅之刃",
    nameEn: "Demon Slayer",
    emoji: "⚔️",
    characters: [
      { name: "竈門炭治郎", emoji: "🔥", description: "" },
      { name: "竈門禰豆子", emoji: "👧", description: "" },
      { name: "我妻善逸", emoji: "⚡", description: "" },
      { name: "嘴平伊之助", emoji: "🐗", description: "" },
      { name: "蝴蝶忍", emoji: "🦋", description: "" },
      { name: "煉獄杏壽郎", emoji: "🔥", description: "" },
      { name: "富岡義勇", emoji: "❄️", description: "" },
      { name: "甘露寺蜜璃", emoji: "💖", description: "" },
      { name: "不死川玄彌", emoji: "🌪️", description: "" },
      { name: "悲鳴嶼行冥", emoji: "📿", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "attack-on-titan",
    name: "進擊的巨人",
    nameEn: "Attack on Titan",
    emoji: "🔶",
    characters: [
      { name: "艾連·葉卡", emoji: "⚔️", description: "" },
      { name: "米卡莎·阿卡曼", emoji: "🗡️", description: "" },
      { name: "阿爾敏·艾連", emoji: "📖", description: "" },
      { name: "約翰·基爾休亞", emoji: "🦅", description: "" },
      { name: "莎夏·布勞斯", emoji: "🥩", description: "" },
      { name: "康尼·史普林格", emoji: "😎", description: "" },
      { name: "漢吉·佐耶", emoji: "👓", description: "" },
      { name: "里維·阿卡曼", emoji: "🔪", description: "" },
      { name: "弗洛可·弗萊徹", emoji: "🎭", description: "" },
      { name: "佩托拉·拉爾", emoji: "🐴", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "sword-art-online",
    name: "刀劍神域",
    nameEn: "Sword Art Online",
    emoji: "🗡️",
    characters: [
      { name: "桐谷和人", emoji: "⚔️", description: "" },
      { name: "結城明日奈", emoji: "👸", description: "" },
      { name: "莉法", emoji: "🏹", description: "" },
      { name: "桐谷直葉", emoji: "⚔️", description: "" },
      { name: "艾基爾", emoji: "☕", description: "" },
      { name: "西莉卡", emoji: "🐉", description: "" },
      { name: "莉茲貝特", emoji: "🔨", description: "" },
      { name: "克萊因", emoji: "🎸", description: "" },
      { name: "阿爾戈", emoji: "🐭", description: "" },
      { name: "茅野智衣", emoji: "🎀", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "death-note",
    name: "死亡筆記本",
    nameEn: "Death Note",
    emoji: "📓",
    characters: [
      { name: "夜神月", emoji: "🌙", description: "" },
      { name: "L", emoji: "🍬", description: "" },
      { name: "彌海砂", emoji: "💜", description: "" },
      { name: "夜神總一郎", emoji: "👮", description: "" },
      { name: "松田丈助", emoji: "💼", description: "" },
      { name: "模木完造", emoji: "🎩", description: "" },
      { name: "魅上照", emoji: "⚖️", description: "" },
      { name: "高田清美", emoji: "🌸", description: "" },
      { name: "硫克", emoji: "🍎", description: "" },
      { name: "夜神妝裕", emoji: "👧", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "jujutsu-kaisen",
    name: "咒術迴戰",
    nameEn: "Jujutsu Kaisen",
    emoji: "👊",
    characters: [
      { name: "虎杖悠仁", emoji: "💪", description: "" },
      { name: "伏黑惠", emoji: "👤", description: "" },
      { name: "釘崎野薔薇", emoji: "🌹", description: "" },
      { name: "兩面宿儺", emoji: "😈", description: "" },
      { name: "五條悟", emoji: "🕶️", description: "" },
      { name: "禪院真希", emoji: "👓", description: "" },
      { name: "狗卷棘", emoji: "🥖", description: "" },
      { name: "熊貓", emoji: "🐼", description: "" },
      { name: "七海建人", emoji: "🐟", description: "" },
      { name: "庵歌姬", emoji: "🎤", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "one-punch-man",
    name: "一拳超人",
    nameEn: "One Punch Man",
    emoji: "💥",
    characters: [
      { name: "琦玉", emoji: "👨‍🦲", description: "" },
      { name: "傑諾斯", emoji: "🤖", description: "" },
      { name: "音速的索尼克", emoji: "💨", description: "" },
      { name: "地獄的明萊", emoji: "🦸", description: "" },
      { name: "銀牙", emoji: "🐕", description: "" },
      { name: "醜陋大總統", emoji: "🤮", description: "" },
      { name: "戰鬥員C", emoji: "🕷️", description: "" },
      { name: "豬神", emoji: "🐷", description: "" },
      { name: "金屬棒球", emoji: "⚾", description: "" },
      { name: "童帝", emoji: "🧒", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "spy-x-family",
    name: "間諜過家家",
    nameEn: "Spy x Family",
    emoji: "🕵️",
    characters: [
      { name: "洛伊德·佛傑", emoji: "🕶️", description: "" },
      { name: "安妮亞", emoji: "🤪", description: "" },
      { name: "約兒·佛傑", emoji: "🔪", description: "" },
      { name: "彭德", emoji: "🐕", description: "" },
      { name: "弗朗基", emoji: "📓", description: "" },
      { name: "貝尼托·佛傑", emoji: "👔", description: "" },
      { name: "艾蘭·佛傑", emoji: "👶", description: "" },
      { name: "彤恩", emoji: "📷", description: "" },
      { name: "達米安·戴斯蒙德", emoji: "🏫", description: "" },
      { name: "貝琪·安巴爾", emoji: "🎀", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
  {
    id: "chainsaw-man",
    name: "鏈鋸人",
    nameEn: "Chainsaw Man",
    emoji: "⛓️",
    characters: [
      { name: "電次", emoji: "⚡", description: "" },
      { name: "帕瓦", emoji: "😈", description: "" },
      { name: "早川秋", emoji: "🗡️", description: "" },
      { name: "瑪萊菈", emoji: "👩", description: "" },
      { name: "姬娜", emoji: "😿", description: "" },
      { name: "太股小孩", emoji: "👦", description: "" },
      { name: "澤渡茜", emoji: "🦇", description: "" },
      { name: "三鷹朝", emoji: "💫", description: "" },
      { name: "岸邊", emoji: "🧥", description: "" },
      { name: "帕瓦的貓", emoji: "🐱", description: "" },
    ],
    createdAt: Date.now(),
    useCount: 0,
  },
];

// ─── Analysis Engine ──────────────────────────────────────────────────────────
interface AnalysisResult {
  character: Character;
  pct: number;
}

function analyzeName(name: string, characters: Character[]): AnalysisResult[] {
  const n = name.trim().toLowerCase().replace(/\s/g, "");
  if (!n) return [];
  const seed = n.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = (i: number) =>
    ((seed * 9301 + i * 49297 + 233) % 233280) / 233280;
  const base = 1 / characters.length;
  const results = characters.map((char, i) => {
    const variation = (rand(i * 3) - 0.5) * 0.3;
    let pct = Math.max(
      3,
      Math.min(55, Math.round((base + variation) * 100))
    );
    return { character: char, pct };
  });
  const sum = results.reduce((acc, r) => acc + r.pct, 0);
  let diff = 100 - sum;
  const step = diff > 0 ? 1 : -1;
  let i = 0;
  while (Math.abs(diff) > 0 && i < results.length * 10) {
    results[i % results.length].pct += step;
    diff -= step;
    i++;
  }
  return results.sort((a, b) => b.pct - a.pct);
}

// ─── Storage Helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = "anime-analyzer-custom";
const RANKINGS_KEY = "anime-analyzer-rankings";

function loadCustomAnalyzers(): Analyzer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomAnalyzers(list: Analyzer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function loadRankings() {
  if (typeof window === "undefined")
    return { hot: [] as string[], new: [] as string[] };
  try {
    const raw = localStorage.getItem(RANKINGS_KEY);
    return raw ? JSON.parse(raw) : { hot: [] as string[], new: [] as string[] };
  } catch {
    return { hot: [] as string[], new: [] as string[] };
  }
}

function saveRankings(rankings: { hot: string[]; new: string[] }) {
  localStorage.setItem(RANKINGS_KEY, JSON.stringify(rankings));
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ lang, onLang }: { lang: Lang; onLang: (l: Lang) => void }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#50AF95" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="14" r="7" fill="#50AF95" opacity="0.15" />
              <circle cx="14" cy="14" r="3" fill="#50AF95" />
            </svg>
          </div>
          <span className="logo-text">
            <span className="logo-primary">Anime</span>
            <span className="logo-secondary"> Analyzer</span>
          </span>
        </div>
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => onLang("zh")}>中文</button>
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => onLang("en")}>EN</button>
        </div>
      </div>
    </header>
  );
}

// ─── Tab Bar ───────────────────────────────────────────────────────────────────
function TabBar({ tab, onTab, lang }: { tab: Tab; onTab: (t: Tab) => void; lang: Lang }) {
  const labels: Record<Tab, string> = {
    analyze: lang === "zh" ? "分析" : "Analyze",
    create: lang === "zh" ? "創建" : "Create",
    leaderboard: lang === "zh" ? "排行榜" : "Ranking",
  };
  return (
    <div className="tab-bar">
      {(Object.keys(labels) as Tab[]).map((t) => (
        <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => onTab(t)}>
          {labels[t]}
        </button>
      ))}
    </div>
  );
}

// ─── Analyzer Tab ─────────────────────────────────────────────────────────────
function AnalyzerTab({
  lang, allAnalyzers, selectedId, onSelect, name, setName, onAnalyze, results, isAnalyzing,
}: {
  lang: Lang; allAnalyzers: Analyzer[]; selectedId: string; onSelect: (id: string) => void;
  name: string; setName: (n: string) => void; onAnalyze: () => void;
  results: AnalysisResult[] | null; isAnalyzing: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? allAnalyzers : allAnalyzers.slice(0, 8);
  const current = allAnalyzers.find((a) => a.id === selectedId);

  return (
    <div className="content">
      <div className="name-input-section">
        <h3>{lang === "zh" ? "輸入你的名字" : "Enter Your Name"}</h3>
        <p>{lang === "zh" ? "選擇下方動漫分析器，輸入名字，看看你是哪個角色！" : "Pick an anime below, enter your name, and discover which character you are!"}</p>
        <div className="input-row">
          <input className="name-input" placeholder={lang === "zh" ? "例如：小明" : "e.g. John"} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onAnalyze()} />
          <button className="btn-accent" onClick={onAnalyze} disabled={isAnalyzing || !name.trim()}>
            {isAnalyzing ? <div className="spinner-sm" /> : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>{lang === "zh" ? "分析" : "Analyze"}</>}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <div className="section-header-row">
          <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)" }}>{lang === "zh" ? "選擇動漫分析器" : "Choose Anime Analyzer"}</h3>
        </div>
        <div className="analyzer-grid">
          {displayed.map((a) => (
            <div key={a.id} className={`analyzer-card ${selectedId === a.id ? "selected" : ""}`} onClick={() => onSelect(a.id)}>
              <div className="analyzer-emoji">{a.emoji}</div>
              <div className="analyzer-name">{lang === "zh" ? a.name : a.nameEn}</div>
              <div className="analyzer-desc">{a.characters.length} {lang === "zh" ? "個角色" : "characters"}</div>
              <div className="analyzer-tags"><span className="analyzer-tag">{lang === "zh" ? "點擊選擇" : "Click to select"}</span></div>
            </div>
          ))}
        </div>
        {allAnalyzers.length > 8 && (
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <button className="btn-ghost" onClick={() => setShowAll((p) => !p)}>
              {showAll ? (lang === "zh" ? "收起 ▲" : "Show Less ▲") : (lang === "zh" ? `查看全部 ${allAnalyzers.length} 個 ▼` : `Show All ${allAnalyzers.length} ▼`)}
            </button>
          </div>
        )}
      </div>

      {results && current && (
        <div className="result-card">
          <div className="result-header">
            <div className="result-name-block">
              <h3>{results[0].character.emoji} {name}</h3>
              <p>{lang === "zh" ? "分析結果 — " : "Analysis Result — "}{lang === "zh" ? current.name : current.nameEn}</p>
            </div>
            <div className="result-anime-badge">{current.emoji} {lang === "zh" ? current.name : current.nameEn}</div>
          </div>
          <div className="result-body">
            <div className="character-breakdown">
              <h4 className="character-breakdown-title">{lang === "zh" ? "角色占比分析" : "Character Breakdown"}</h4>
              <div className="breakdown-grid">
                {results.map((r, i) => {
                  const colors = ["#50AF95", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16"];
                  const color = colors[i % colors.length];
                  return (
                    <div key={r.character.name} className="breakdown-item">
                      <div className="breakdown-header">
                        <span className="breakdown-name">{r.character.emoji} {r.character.name}</span>
                        <span className="breakdown-pct" style={{ color }}>{r.pct}%</span>
                      </div>
                      <div className="breakdown-bar"><div className="breakdown-bar-fill" style={{ width: `${r.pct}%`, background: color }} /></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="result-tip">
              <h4>💡 {lang === "zh" ? "你是誰？" : "Who Are You?"}</h4>
              <p>{lang === "zh" ? `你的名字「${name}」與 ${results[0].character.name}（${results[0].character.emoji}）最為契合，契合度高達 ${results[0].pct}%！` : `Your name "${name}" matches ${results[0].character.name} (${results[0].character.emoji}) with a ${results[0].pct}% affinity!`}</p>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && <div className="loading-state"><div className="spinner" /><p>{lang === "zh" ? "正在分析中..." : "Analyzing..."}</p></div>}
    </div>
  );
}

// ─── Create Tab ───────────────────────────────────────────────────────────────
function CreateTab({ lang, onCreated }: { lang: Lang; onCreated: (a: Analyzer) => void }) {
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [emoji, setEmoji] = useState("🎌");
  const [chars, setChars] = useState<Character[]>([
    { name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" },
    { name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" },
    { name: "", emoji: "👤", description: "" },
  ]);
  const [error, setError] = useState("");

  const updateChar = (i: number, field: "name" | "emoji", val: string) => {
    setChars((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));
  };
  const addChar = () => setChars((p) => [...p, { name: "", emoji: "👤", description: "" }]);
  const removeChar = (i: number) => setChars((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!name.trim()) { setError(lang === "zh" ? "請輸入動漫名稱" : "Please enter an anime name"); return; }
    const filledChars = chars.filter((c) => c.name.trim());
    if (filledChars.length < 2) { setError(lang === "zh" ? "請至少填入 2 個角色" : "Please add at least 2 characters"); return; }
    const analyzer: Analyzer = { id: `custom-${Date.now()}`, name: name.trim(), nameEn: nameEn.trim() || name.trim(), emoji, characters: filledChars, createdAt: Date.now(), useCount: 0 };
    onCreated(analyzer);
    setName(""); setNameEn(""); setEmoji("🎌");
    setChars([{ name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" }, { name: "", emoji: "👤", description: "" }]);
    setError("");
  };

  return (
    <div className="content">
      <div className="create-form">
        <h3>🎨 {lang === "zh" ? "創建自訂動漫分析器" : "Create Custom Anime Analyzer"}</h3>
        <p>{lang === "zh" ? "建立你自己的動漫分析器，讓朋友也能用名字分析角色！" : "Create your own anime analyzer and let friends analyze characters by name!"}</p>
        {error && <div className="result-tip" style={{ marginBottom: "1rem" }}><p style={{ color: "#ef4444" }}>{error}</p></div>}
        <div className="form-group">
          <label>{lang === "zh" ? "動漫名稱（中文）" : "Anime Name (Chinese)"} *</label>
          <input className="form-input" placeholder={lang === "zh" ? "例如：我的英雄學園" : "e.g. My Hero Academia"} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{lang === "zh" ? "動漫名稱（英文）" : "Anime Name (English)"}</label>
          <input className="form-input" placeholder="e.g. My Hero Academia" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
        </div>
        <div className="form-group">
          <label>{lang === "zh" ? "表情符號" : "Emoji"}</label>
          <input className="form-input" placeholder="🎌" value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} />
        </div>
        <div className="divider" />
        <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1rem" }}>
          {lang === "zh" ? "角色列表" : "Character List"} ({chars.filter((c) => c.name.trim()).length})
        </h4>
        <div className="char-list">
          {chars.map((char, i) => (
            <div key={i} className="char-item">
              <div className="char-item-num">{i + 1}</div>
              <div className="char-item-fields">
                <input placeholder={lang === "zh" ? "角色名稱" : "Character name"} value={char.name} onChange={(e) => updateChar(i, "name", e.target.value)} />
                <input placeholder="😊" value={char.emoji} onChange={(e) => updateChar(i, "emoji", e.target.value)} maxLength={4} />
              </div>
              <button className="char-remove" onClick={() => removeChar(i)}>✕</button>
            </div>
          ))}
        </div>
        <button className="btn-ghost" onClick={addChar} style={{ marginTop: "8px" }}>+ {lang === "zh" ? "新增角色" : "Add Character"}</button>
        <div style={{ marginTop: "1.5rem" }}>
          <button className="btn-accent" onClick={handleSubmit}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            {lang === "zh" ? "創建分析器" : "Create Analyzer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Leaderboard Tab ──────────────────────────────────────────────────────────
function LeaderboardTab({ lang, allAnalyzers }: { lang: Lang; allAnalyzers: Analyzer[] }) {
  const [lbTab, setLbTab] = useState<LbTab>("hot");
  const sorted = lbTab === "hot" ? [...allAnalyzers].sort((a, b) => b.useCount - a.useCount) : [...allAnalyzers].sort((a, b) => b.createdAt - a.createdAt);
  const ranks = sorted.slice(0, 20);
  const rankClass = (i: number) => { if (i === 0) return "gold"; if (i === 1) return "silver"; if (i === 2) return "bronze"; return "normal"; };

  return (
    <div className="content">
      <div className="leaderboard-section">
        <div className="leaderboard-tabs">
          <button className={`lb-tab ${lbTab === "hot" ? "active" : ""}`} onClick={() => setLbTab("hot")}>🔥 {lang === "zh" ? "熱門榜" : "Hot"}</button>
          <button className={`lb-tab ${lbTab === "new" ? "active" : ""}`} onClick={() => setLbTab("new")}>✨ {lang === "zh" ? "最新榜" : "New"}</button>
        </div>
        <div className="leaderboard-list">
          {ranks.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">📊</div><h3>{lang === "zh" ? "暫無數據" : "No Data Yet"}</h3><p>{lang === "zh" ? "開始使用分析器來累積使用次數吧！" : "Start analyzing to build the rankings!"}</p></div>
          ) : ranks.map((a, i) => (
            <div key={a.id} className="lb-row">
              <div className={`lb-rank ${rankClass(i)}`}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</div>
              <div className="lb-emoji">{a.emoji}</div>
              <div className="lb-info">
                <div className="lb-name">{lang === "zh" ? a.name : a.nameEn}</div>
                <div className="lb-meta">{a.characters.length} {lang === "zh" ? "個角色" : "characters"} · {new Date(a.createdAt).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US")}</div>
              </div>
              <div className="lb-stat">{lbTab === "hot" ? `${a.useCount} ${lang === "zh" ? "次" : "uses"}` : new Date(a.createdAt).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { month: "short", day: "numeric" })}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState<Tab>("analyze");
  const [lang, setLang] = useState<Lang>("zh");
  const [name, setName] = useState("");
  const [selectedId, setSelectedId] = useState("one-piece");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [customAnalyzers, setCustomAnalyzers] = useState<Analyzer[]>([]);

  useEffect(() => { setCustomAnalyzers(loadCustomAnalyzers()); }, []);
  const allAnalyzers = [...DEFAULT_ANALYZERS, ...customAnalyzers];

  const handleAnalyze = async () => {
    if (!name.trim()) return;
    setIsAnalyzing(true);
    setResults(null);
    const analyzer = allAnalyzers.find((a) => a.id === selectedId);
    if (!analyzer) { setIsAnalyzing(false); return; }
    const isDefault = DEFAULT_ANALYZERS.some((a) => a.id === selectedId);
    if (!isDefault) {
      const updated = customAnalyzers.map((a) => a.id === selectedId ? { ...a, useCount: a.useCount + 1 } : a);
      setCustomAnalyzers(updated);
      saveCustomAnalyzers(updated);
    } else {
      const rankings = loadRankings();
      const hot = [selectedId, ...rankings.hot.filter((id) => id !== selectedId)].slice(0, 50);
      saveRankings({ ...rankings, hot });
    }
    await new Promise((r) => setTimeout(r, 800));
    const res = analyzeName(name, analyzer.characters);
    setResults(res);
    setIsAnalyzing(false);
  };

  const handleCreated = (a: Analyzer) => {
    const updated = [a, ...customAnalyzers];
    setCustomAnalyzers(updated);
    saveCustomAnalyzers(updated);
    const rankings = loadRankings();
    const newList = [a.id, ...rankings.new.filter((id) => id !== a.id)].slice(0, 50);
    saveRankings({ ...rankings, new: newList });
    setTab("analyze");
    setSelectedId(a.id);
  };

  return (
    <div className="page">
      <Header lang={lang} onLang={setLang} />
      <TabBar tab={tab} onTab={setTab} lang={lang} />
      <main className="main-content">
        {tab === "analyze" && (
          <AnalyzerTab lang={lang} allAnalyzers={allAnalyzers} selectedId={selectedId} onSelect={setSelectedId} name={name} setName={setName} onAnalyze={handleAnalyze} results={results} isAnalyzing={isAnalyzing} />
        )}
        {tab === "create" && <CreateTab lang={lang} onCreated={handleCreated} />}
        {tab === "leaderboard" && <LeaderboardTab lang={lang} allAnalyzers={allAnalyzers} />}
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#50AF95" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="14" r="3" fill="#50AF95" />
            </svg>
            © 2026 Anime Character Analyzer
          </div>
          <div className="footer-tagline">Powered by name-hash analysis engine</div>
        </div>
      </footer>
    </div>
  );
}
