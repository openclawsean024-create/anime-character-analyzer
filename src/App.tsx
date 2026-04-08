import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Plus, ChevronLeft } from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import AnalyzeForm from './components/AnalyzeForm';
import ResultDisplay from './components/ResultDisplay';
import RankingBoard from './components/RankingBoard';
import CreateAnalyzerModal from './components/CreateAnalyzerModal';
import { getStorageData, saveStorageData, analyzeName } from './data/animeData';
import type { AnimeAnalyzer, Character } from './data/animeData';

type View = 'home' | 'result';
type Tab = 'home' | 'rankings';

export default function App() {
  const { t } = useTranslation();
  const [prebuilt, setPrebuilt] = useState<AnimeAnalyzer[]>([]);
  const [custom, setCustom] = useState<AnimeAnalyzer[]>([]);
  const [view, setView] = useState<View>('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; analyzer: AnimeAnalyzer; chars: Character[] } | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState<Tab>('home');
  const [quickName, setQuickName] = useState('');

  useEffect(() => {
    const { prebuilt: p, custom: c } = getStorageData();
    setPrebuilt(p);
    setCustom(c);
  }, []);

  const handleAnalyze = async (name: string, analyzer: AnimeAnalyzer, imageBase64?: string) => {
    setLoading(true);

    let chars = analyzeName(name, analyzer);

    if (imageBase64) {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageBase64, name, analyzer }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.result) {
            const matched = [data.result.match1, data.result.match2, data.result.match3].filter(Boolean);
            const totalPct = chars.reduce((s, c) => s + c.percentage, 0);
            if (matched.length > 0) {
              chars = matched.map((m: string, i: number) => {
                const original = analyzer.characters.find(c => c.name === m);
                return {
                  name: m,
                  percentage: i === 0 ? Math.round(totalPct * 0.4) : i === 1 ? Math.round(totalPct * 0.3) : Math.round(totalPct * 0.3),
                  color: original?.color || ['#FF5722', '#2196F3', '#4CAF50'][i],
                };
              });
            }
          }
        }
      } catch (err) {
        console.warn('AI analysis failed, using fallback:', err);
      }
    }

    const updateList = (list: AnimeAnalyzer[]) =>
      list.map(a => a.id === analyzer.id ? { ...a, usageCount: a.usageCount + 1 } : a);
    const newPrebuilt = updateList(prebuilt);
    const newCustom = updateList(custom);
    setPrebuilt(newPrebuilt);
    setCustom(newCustom);
    saveStorageData(newPrebuilt, newCustom);

    setResult({ name, analyzer, chars });
    setView('result');
    setLoading(false);
  };

  const handleCreate = (analyzer: AnimeAnalyzer) => {
    const newCustom = [analyzer, ...custom];
    setCustom(newCustom);
    saveStorageData(prebuilt, newCustom);
  };

  const allAnalyzers = [...prebuilt, ...custom];

  const handleHeroAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim()) return;
    // Navigate to analyze with pre-selected first analyzer
    const firstAnalyzer = allAnalyzers[0];
    if (firstAnalyzer) {
      handleAnalyze(quickName.trim(), firstAnalyzer);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--bg-base)' }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 229, 200, 0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255, 77, 166, 0.05) 0%, transparent 50%)',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(5, 8, 16, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-[var(--neon-cyan)]" size={22} style={{ filter: 'drop-shadow(0 0 6px var(--neon-cyan-glow))' }} />
            <span className="font-black text-lg tracking-tight font-logo">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1">
              <button
                onClick={() => setTab('home')}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '0.625rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: tab === 'home' ? 'rgba(0, 229, 200, 0.12)' : 'transparent',
                  color: tab === 'home' ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                }}
              >
                {t('home')}
              </button>
              <button
                onClick={() => setTab('rankings')}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '0.625rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: tab === 'rankings' ? 'rgba(255, 77, 166, 0.12)' : 'transparent',
                  color: tab === 'rankings' ? 'var(--neon-pink)' : 'var(--text-secondary)',
                }}
              >
                {t('popularRanking')}
              </button>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 relative z-10">
        {tab === 'home' ? (
          view === 'home' ? (
            <div className="space-y-10">
              {/* ── HERO SECTION ── */}
              <div className="hero-section">
                <div className="hero-glow hero-glow-1" />
                <div className="hero-glow hero-glow-2" />

                <div className="hero-badge">
                  <span className="dot" />
                  <span>10+ 動漫分析器 · 100% 免費</span>
                </div>

                <h1 className="hero-title">
                  測測你是哪個<br />
                  <span className="text-gradient-cyan-pink">動漫角色</span>
                </h1>

                <p className="hero-sub">
                  輸入你的名字，選擇喜歡的動漫<br />
                  AI 名字分析引擎告訴你答案
                </p>

                <form className="hero-cta" onSubmit={handleHeroAnalyze}>
                  <input
                    className="hero-quick-input"
                    placeholder="輸入名字立即分析..."
                    value={quickName}
                    onChange={e => setQuickName(e.target.value)}
                    maxLength={30}
                  />
                  <button type="submit" className="btn-primary" disabled={loading}>
                    <Sparkles size={18} /> 開始分析 ⚡
                  </button>
                </form>

                <div className="hero-tags">
                  {['🏴‍☠️ 海賊王', '🍥 火影忍者', '⚔️ 鬼滅之刃', '👊 咒術迴戰', '🕵️ 間諜過家家'].map(tag => (
                    <span key={tag} className="hero-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* ── ANALYZE FORM ── */}
              <div className="glass-card p-6 md:p-8">
                <AnalyzeForm
                  analyzers={allAnalyzers}
                  onAnalyze={handleAnalyze}
                  loading={loading}
                />
              </div>

              {/* ── CUSTOM ANALYZERS ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">{t('yourAnalyzers')}</h2>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '0.75rem' }}
                  >
                    <Plus size={16} /> {t('createNew')}
                  </button>
                </div>
                {custom.length === 0 ? (
                  <div className="text-center py-8" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {t('noData')}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {custom.map(a => (
                      <button
                        key={a.id}
                        onClick={() => handleAnalyze('', a)}
                        className="analyzer-card"
                        style={{ textAlign: 'left' }}
                      >
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{a.animeName}</div>
                        <div className="font-bold text-white text-sm">{a.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{a.characters.length} {t('characters')}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            result && (
              <ResultDisplay
                name={result.name}
                analyzer={result.analyzer}
                result={result.chars}
                onClose={() => { setView('home'); setQuickName(''); }}
              />
            )
          )
        ) : (
          /* Rankings Tab */
          <div className="space-y-10 page-enter">
            <div className="text-center py-6 space-y-2">
              <h1 className="text-3xl font-black tracking-tight font-logo">{t('popularRanking')}</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={18} style={{ color: 'var(--amber)' }} /> {t('popularRanking')}
                </h2>
                <div className="glass-card p-4">
                  <RankingBoard analyzers={allAnalyzers} mode="popular" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ChevronLeft size={18} style={{ color: 'var(--neon-pink)', transform: 'rotate(180deg)' }} /> {t('newestAnalyzers')}
                </h2>
                <div className="glass-card p-4">
                  <RankingBoard analyzers={allAnalyzers} mode="newest" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showCreate && (
        <CreateAnalyzerModal
          onCreate={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}
