"use client";

import { useState } from "react";

type Lang = "zh" | "en";

interface Character {
  name: string;
  emoji: string;
}

export default function CreatePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [emoji, setEmoji] = useState("🎌");
  const [chars, setChars] = useState<Character[]>([
    { name: "", emoji: "👤" },
    { name: "", emoji: "👤" },
    { name: "", emoji: "👤" },
    { name: "", emoji: "👤" },
    { name: "", emoji: "👤" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateChar = (i: number, field: keyof Character, val: string) =>
    setChars((p) => p.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));

  const addChar = () =>
    setChars((p) => [...p, { name: "", emoji: "👤" }]);

  const removeChar = (i: number) =>
    setChars((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!name.trim()) return setError(lang === "zh" ? "請輸入動漫名稱" : "Please enter an anime name");
    const filledChars = chars.filter((c) => c.name.trim());
    if (filledChars.length < 2) return setError(lang === "zh" ? "請至少填入 2 個角色" : "Please add at least 2 characters");

    const newAnalyzer = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      nameEn: nameEn.trim() || name.trim(),
      emoji,
      characters: filledChars,
      createdAt: Date.now(),
      useCount: 0,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("anime-analyzer-custom") || "[]");
      localStorage.setItem("anime-analyzer-custom", JSON.stringify([...existing, newAnalyzer]));
      setSuccess(true);
      setName("");
      setNameEn("");
      setEmoji("🎌");
      setChars([{ name: "", emoji: "👤" }, { name: "", emoji: "👤" }, { name: "", emoji: "👤" }, { name: "", emoji: "👤" }, { name: "", emoji: "👤" }]);
      setError("");
    } catch {
      setError("儲存失敗，請稍後再試");
    }
  };

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
            <a href="/create" className="nav-link active">{lang === "zh" ? "創建" : "Create"}</a>
            <a href="/leaderboard" className="nav-link">{lang === "zh" ? "排行榜" : "Ranking"}</a>
          </nav>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      </header>

      <main className="main-content" style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              🎨 {lang === "zh" ? "創建自訂動漫分析器" : "Create Custom Anime Analyzer"}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {lang === "zh"
                ? "建立你自己的動漫分析器，讓朋友也能用名字分析角色！"
                : "Create your own anime analyzer and let friends analyze characters by name!"}
            </p>
          </div>

          {success && (
            <div className="card" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid #10B981", marginBottom: "1.5rem", padding: "1rem 1.25rem" }}>
              <p style={{ color: "#10B981", fontWeight: 600 }}>
                ✅ {lang === "zh" ? "分析器已建立！回首頁使用吧！" : "Analyzer created! Go back to use it!"}
              </p>
              <a href="/" style={{ color: "#10B981", marginTop: "0.5rem", display: "inline-block" }}>
                → {lang === "zh" ? "回到首頁" : "Go to homepage"}
              </a>
            </div>
          )}

          {error && (
            <div className="card" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", marginBottom: "1.5rem", padding: "1rem 1.25rem" }}>
              <p style={{ color: "#ef4444" }}>{error}</p>
            </div>
          )}

          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div className="form-group" style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                {lang === "zh" ? "動漫名稱（中文）" : "Anime Name (Chinese)"} *
              </label>
              <input
                className="form-input"
                placeholder={lang === "zh" ? "例如：我的英雄學園" : "e.g. My Hero Academia"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                {lang === "zh" ? "動漫名稱（英文）" : "Anime Name (English)"}
              </label>
              <input
                className="form-input"
                placeholder="e.g. My Hero Academia"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                {lang === "zh" ? "表情符號" : "Emoji"} 🔖
              </label>
              <input
                className="form-input"
                placeholder="🎌"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={4}
                style={{ width: "5rem" }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "1.5rem 0" }} />

            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
              {lang === "zh" ? "角色列表" : "Character List"} ({chars.filter((c) => c.name.trim()).length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {chars.map((char, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", minWidth: "1.5rem" }}>#{i + 1}</span>
                  <input
                    className="form-input"
                    placeholder={lang === "zh" ? "角色名稱" : "Character name"}
                    value={char.name}
                    onChange={(e) => updateChar(i, "name", e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <input
                    className="form-input"
                    placeholder="😊"
                    value={char.emoji}
                    onChange={(e) => updateChar(i, "emoji", e.target.value)}
                    maxLength={4}
                    style={{ width: "4rem", textAlign: "center" }}
                  />
                  <button
                    onClick={() => removeChar(i)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1rem", padding: "0.25rem 0.5rem" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addChar}
              className="btn-ghost"
              style={{ marginTop: "0.75rem" }}
            >
              + {lang === "zh" ? "新增角色" : "Add Character"}
            </button>
          </div>

          <button onClick={handleSubmit} className="btn-accent" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>
            🚀 {lang === "zh" ? "創建分析器" : "Create Analyzer"}
          </button>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <a href="/" style={{ color: "var(--accent)" }}>
              ← {lang === "zh" ? "返回首頁" : "Back to Analyze"}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
