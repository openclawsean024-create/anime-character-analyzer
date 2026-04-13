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

  const addChar = () => setChars((p) => [...p, { name: "", emoji: "👤" }]);

  const removeChar = (i: number) =>
    setChars((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!name.trim()) return setError(lang === "zh" ? "請輸入動漫名稱" : "Please enter an anime name");
    const filledChars = chars.filter((c) => c.name.trim());
    if (filledChars.length < 2)
      return setError(lang === "zh" ? "請至少填入 2 個角色" : "Please add at least 2 characters");

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
      setName(""); setNameEn(""); setEmoji("🎌");
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
            <a href="/create" className="nav-link active">{lang === "zh" ? "創建" : "Create"}</a>
            <a href="/leaderboard" className="nav-link">{lang === "zh" ? "排行榜" : "Ranking"}</a>
          </nav>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === "zh" ? "active" : ""}`} onClick={() => setLang("zh")}>中文</button>
            <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>
      </header>

      <main className="page-main main-content">
        <div className="page-container-sm">

          {/* Page Header */}
          <div style={{ marginBottom: "2rem" }}>
            <div className="hero-badge" style={{ marginBottom: "1rem" }}>
              <span className="dot" />
              {lang === "zh" ? "自訂分析器" : "Custom Analyzer"}
            </div>
            <h1 className="page-title">
              🎨 {lang === "zh" ? "創建分析器" : "Create Analyzer"}
            </h1>
            <p className="page-subtitle">
              {lang === "zh"
                ? "建立你自己的動漫分析器，讓朋友也能用名字分析角色！"
                : "Create your own anime analyzer and let friends discover their character!"}
            </p>
          </div>

          {/* Alerts */}
          {success && (
            <div className="alert alert-success">
              <span>✅</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {lang === "zh" ? "分析器已建立！" : "Analyzer created!"}
                </div>
                <a href="/" style={{ color: "inherit", textDecoration: "underline" }}>
                  → {lang === "zh" ? "回到首頁使用" : "Go back to use it"}
                </a>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Main Form Card */}
          <div className="card card-accent-top" style={{ marginBottom: "1.25rem" }}>

            {/* Basic Info */}
            <div className="form-section">
              <p className="form-section-title">
                {lang === "zh" ? "基本資訊" : "Basic Info"}
              </p>
              <p className="form-section-desc">
                {lang === "zh" ? "為你的分析器取個好名字" : "Give your analyzer a name"}
              </p>

              <div className="form-group">
                <label className="form-group">
                  {lang === "zh" ? "動漫名稱（中文）" : "Anime Name (Chinese)"} *
                </label>
                <input
                  className="form-input"
                  placeholder={lang === "zh" ? "例如：我的英雄學園" : "e.g. 我的英雄學園"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-group">
                  {lang === "zh" ? "動漫名稱（英文）" : "Anime Name (English)"}
                </label>
                <input
                  className="form-input"
                  placeholder="e.g. My Hero Academia"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-group">
                  {lang === "zh" ? "代表表情符號" : "Emoji Icon"} 🔖
                </label>
                <input
                  className="form-input"
                  placeholder="🎌"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  maxLength={4}
                  style={{ width: "5rem", textAlign: "center", fontSize: "1.5rem" }}
                />
              </div>
            </div>

            <hr className="form-divider" />

            {/* Characters */}
            <div className="form-section">
              <p className="form-section-title">
                {lang === "zh" ? "角色列表" : "Character List"}
                <span style={{
                  marginLeft: "0.5rem",
                  padding: "1px 8px",
                  borderRadius: "99px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                  fontSize: "0.72rem",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 600,
                }}>
                  {chars.filter((c) => c.name.trim()).length} / {chars.length}
                </span>
              </p>
              <p className="form-section-desc">
                {lang === "zh" ? "至少填入 2 個角色，越多越有趣！" : "Add at least 2 characters — the more the merrier!"}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {chars.map((char, i) => (
                  <div key={i} className="char-item">
                    <div className="char-item-num">{i + 1}</div>
                    <div className="char-item-fields" style={{ gridTemplateColumns: "1fr auto auto" }}>
                      <input
                        className="form-input"
                        placeholder={lang === "zh" ? "角色名稱" : "Character name"}
                        value={char.name}
                        onChange={(e) => updateChar(i, "name", e.target.value)}
                        style={{ fontSize: "0.875rem" }}
                      />
                      <input
                        className="form-input"
                        placeholder="😊"
                        value={char.emoji}
                        onChange={(e) => updateChar(i, "emoji", e.target.value)}
                        maxLength={4}
                        style={{ width: "3.5rem", textAlign: "center", fontSize: "1.1rem" }}
                      />
                      <button
                        onClick={() => removeChar(i)}
                        className="char-remove"
                        title={lang === "zh" ? "移除角色" : "Remove"}
                      >
                        ✕
                      </button>
                    </div>
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
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="btn-accent"
            style={{ width: "100%", padding: "0.875rem", fontSize: "1rem" }}
          >
            🚀 {lang === "zh" ? "創建分析器" : "Create Analyzer"}
          </button>

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
