"use client";

import { useState, useRef, useCallback } from "react";

// Character analysis result types
interface CharacterResult {
  name: string;
  anime: string;
  personality: string[];
  traits: Record<string, number>;
  description: string;
  aura: string;
  voiceActor: string;
  firstAppearance: string;
}

// Simulated AI analysis
function analyzeCharacter(imageData: string): Promise<CharacterResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hash = imageData.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      const results: CharacterResult[] = [
        {
          name: "Keqing",
          anime: "Genshin Impact",
          personality: ["Determined", "Independent", "Hardworking", "Responsible", "Perfectionist"],
          traits: { "Intelligence": 92, "Strength": 68, "Charm": 78, "Kindness": 85, "Courage": 80 },
          description: "The Yuheng of the Liyue Qixing. She is someone who would rather dispatch ten thousand problems herself than entrust them to others. Her determination and self-reliance make her stand out.",
          aura: "⚡ Electro Energy",
          voiceActor: "Li Yiyi (CN) / Courtenay Taylor (EN)",
          firstAppearance: "2020",
        },
        {
          name: "Zero Two",
          anime: "Darling in the FranXX",
          personality: ["Playful", "Bold", "Passionate", "Protective", "Rebellious"],
          traits: { "Intelligence": 88, "Strength": 95, "Charm": 97, "Kindness": 72, "Courage": 99 },
          description: "A humanoid hybrid with klaxosaur blood, known for her horns and partner-hunting tendencies. She seeks a partner she can ride with, forming a deep bond.",
          aura: "🔴 Crimson Passion",
          voiceActor: "Saori Hayami (JP) / Cherami Leigh (EN)",
          firstAppearance: "2018",
        },
        {
          name: "Rem",
          anime: "Re:Zero − Starting Life in Another World",
          personality: ["Loyal", "Selfless", "Shy", "Diligent", "Devoted"],
          traits: { "Intelligence": 85, "Strength": 75, "Charm": 94, "Kindness": 98, "Courage": 88 },
          description: "A half-elf maid at the Roswaal Mansion. Despite her quiet demeanor, she possesses incredible combat abilities and unwavering loyalty.",
          aura: "💙 Blue Moon",
          voiceActor: "Rie Kugimiya (JP) / Reba Birtwistle (EN)",
          firstAppearance: "2016",
        },
        {
          name: "Sailor Moon",
          anime: "Sailor Moon",
          personality: ["Courageous", "Kind", "Energetic", "Romantic", "Insecure at times"],
          traits: { "Intelligence": 75, "Strength": 90, "Charm": 98, "Kindness": 97, "Courage": 95 },
          description: "Usagi Tsukino transforms into Sailor Moon, the destined guardian of love and justice. Her pure heart and determination drive her through any battle.",
          aura: "🌙 Moon Princess",
          voiceActor: "Kotono Mitsuishi (JP) / Tracey Rooney (EN)",
          firstAppearance: "1991",
        },
        {
          name: "Asuna",
          anime: "Sword Art Online",
          personality: ["Brave", "Compassionate", "Motherly", "Stubborn", "Ambitious"],
          traits: { "Intelligence": 82, "Strength": 88, "Charm": 95, "Kindness": 90, "Courage": 93 },
          description: "Known as the Flash, she is the top player of Sword Art Online. Behind her beauty lies a fierce warrior with a heart of gold.",
          aura: "⚔️ Sword Princess",
          voiceActor: "Haruka Tomatsu (JP) / Cherami Leigh (EN)",
          firstAppearance: "2012",
        },
        {
          name: "Hatsune Miku",
          anime: "Vocaloid",
          personality: ["Cheerful", "Eternal", "Melodious", "Trendsetting", "Iconic"],
          traits: { "Intelligence": 88, "Strength": 60, "Charm": 99, "Kindness": 90, "Courage": 85 },
          description: "A 16-year-old synthetic vocaloid with teal twintails. She sings songs written by composers worldwide, inspiring millions.",
          aura: "🎵 Digital Diva",
          voiceActor: "Fukuyama Mirai (Voicebank)",
          firstAppearance: "2007",
        },
        {
          name: "Kagome Higurashi",
          anime: "Inuyasha",
          personality: ["Brave", "Compassionate", "Stubborn", "Modern", "Resourceful"],
          traits: { "Intelligence": 86, "Strength": 72, "Charm": 88, "Kindness": 94, "Courage": 91 },
          description: "A modern-day high school girl transported 500 years to the feudal era, where she becomes the keeper of the Shikon Jewel.",
          aura: "✨ Shikon Shard",
          voiceActor: "Yūko Satō (JP) / Willow Johnson (EN)",
          firstAppearance: "2000",
        },
        {
          name: "Power",
          anime: "Chainsaw Man",
          personality: ["Beastly", "Selfish", "Loyal once earned", "Childlike", "Powerful"],
          traits: { "Intelligence": 65, "Strength": 97, "Charm": 75, "Kindness": 55, "Courage": 90 },
          description: "A blood fiend who traded her blood with the immortal cat, Nayuta. Despite her crude nature and cat obsession, she forms a genuine bond.",
          aura: "🩸 Bloodhungry",
          voiceActor: "Grace Wiley (EN)",
          firstAppearance: "2018",
        },
      ];
      resolve(results[Math.abs(hash) % results.length]);
    }, 2500);
  });
}

// Header
function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#26A17B" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="7" fill="#26A17B" opacity="0.15"/>
              <circle cx="14" cy="14" r="3" fill="#26A17B"/>
            </svg>
          </div>
          <span className="logo-text">
            <span className="logo-primary">Anime</span>
            <span className="logo-secondary">Character Analyzer</span>
          </span>
        </div>
        <nav className="header-nav">
          <a href="#analyze">Analyze</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-badge">
          <span className="badge-dot"></span>
          AI Engine v2.0
        </div>
      </div>
    </header>
  );
}

// Upload zone
function UploadZone({ onImageUpload, isLoading }: { onImageUpload: (file: string) => void; isLoading: boolean }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => onImageUpload(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onImageUpload(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`upload-zone ${isDragOver ? 'drag-over' : ''} ${isLoading ? 'loading' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !isLoading && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden-input" onChange={handleFileChange} />
      <div className={`upload-icon ${isLoading ? 'spinning' : ''}`}>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="10" width="36" height="28" rx="4" stroke="#26A17B" strokeWidth="1.5" fill="none"/>
            <circle cx="17" cy="21" r="4" stroke="#26A17B" strokeWidth="1.5"/>
            <path d="M6 32l10-10 8 8 10-12 8 10" stroke="#26A17B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div className="upload-text">
        {isLoading ? (
          <>
            <p className="upload-title">Analyzing character...</p>
            <p className="upload-sub">Extracting traits and personality data</p>
          </>
        ) : (
          <>
            <p className="upload-title">Drop anime character image here</p>
            <p className="upload-sub">or click to browse • JPG, PNG, WEBP supported</p>
          </>
        )}
      </div>
      {isLoading && <div className="upload-progress"><div className="upload-progress-bar"></div></div>}
    </div>
  );
}

// Trait bar
function TraitBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [width, setWidth] = useState(0);
  if (width === 0) setTimeout(() => setWidth(value), 100);
  return (
    <div className="trait-row">
      <div className="trait-label-row">
        <span className="trait-label">{label}</span>
        <span className="trait-value">{value}%</span>
      </div>
      <div className="trait-bar-track">
        <div className="trait-bar-fill" style={{ width: `${width}%`, background: color }}></div>
      </div>
    </div>
  );
}

// Results
function Results({ result, image, onReset }: { result: CharacterResult; image: string; onReset: () => void }) {
  const traitColors = ["#26A17B", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
  return (
    <div className="results-container">
      <div className="result-card">
        <div className="result-main">
          <div className="result-image-wrap">
            <img src={image} alt={result.name} className="result-image" />
            <div className="result-aura-badge">{result.aura}</div>
          </div>
          <div className="result-info">
            <div className="result-name">{result.name}</div>
            <div className="result-meta">from <span className="result-anime">{result.anime}</span> • {result.firstAppearance}</div>
            <p className="result-desc">{result.description}</p>
            <div className="result-tags">
              {result.personality.map(t => (
                <span key={t} className="result-tag">{t}</span>
              ))}
            </div>
            <div className="result-voice">🎙️ {result.voiceActor}</div>
          </div>
        </div>
      </div>

      <div className="traits-grid">
        {Object.entries(result.traits).map(([key, value], i) => (
          <div key={key} className="trait-card">
            <TraitBar label={key} value={value} color={traitColors[i % traitColors.length]} />
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={onReset}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          Analyze Another
        </button>
        <button className="btn-outline">📋 Share Results</button>
        <button className="btn-outline">💾 Save</button>
      </div>
    </div>
  );
}

// Features
function Features() {
  const features = [
    { icon: "🧠", title: "Deep Personality Analysis", desc: "AI-powered extraction of character traits, personality archetypes, and psychological profile." },
    { icon: "🎨", title: "Visual Trait Detection", desc: "Identifies hair color, eye color, clothing style, and distinctive visual features." },
    { icon: "📺", title: "Source Identification", desc: "Cross-references against thousands of anime titles to pinpoint the character's origin." },
    { icon: "⚡", title: "Instant Results", desc: "Get comprehensive character analysis in seconds with our optimized AI pipeline." },
    { icon: "🌐", title: "Multi-language Support", desc: "Results available in English, Japanese, Chinese, Korean, and more." },
    { icon: "📊", title: "Compatibility Score", desc: "Calculate how well you match with the character's personality traits." },
  ];
  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <div className="section-tag">Features</div>
        <h2 className="section-title">Built for <span className="accent">Precision</span></h2>
        <p className="section-sub">Cutting-edge AI models trained on thousands of anime characters</p>
      </div>
      <div className="features-grid">
        {features.map(f => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main page
export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<CharacterResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (imageData: string) => {
    setImage(imageData);
    setResult(null);
    setIsLoading(true);
    try {
      const analysis = await analyzeCharacter(imageData);
      setResult(analysis);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section id="analyze" className="hero-section">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI-powered analysis engine v2.0
            </div>
            <h1 className="hero-title">
              Discover Your<br />
              <span className="accent">Anime Character</span>
            </h1>
            <p className="hero-sub">
              Upload any anime character image and unlock their personality, traits, and origin story with our advanced AI analyzer.
            </p>
            <UploadZone onImageUpload={handleImageUpload} isLoading={isLoading} />
            <div className="hero-stats">
              {[{ num: "10K+", label: "Characters" }, { num: "2.5M+", label: "Analyses" }, { num: "99.4%", label: "Accuracy" }].map(s => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {result && image && (
          <section className="results-section">
            <Results result={result} image={image} onReset={handleReset} />
          </section>
        )}

        <Features />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#26A17B" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="3" fill="#26A17B"/>
            </svg>
            © 2026 Anime Character Analyzer
          </div>
          <div className="footer-tagline">Powered by advanced AI models</div>
        </div>
      </footer>
    </div>
  );
}
