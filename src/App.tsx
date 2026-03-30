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

export default function App() {
  const { t } = useTranslation();
  const [prebuilt, setPrebuilt] = useState<AnimeAnalyzer[]>([]);
  const [custom, setCustom] = useState<AnimeAnalyzer[]>([]);
  const [view, setView] = useState<View>('home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ name: string; analyzer: AnimeAnalyzer; chars: Character[] } | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState<'home' | 'rankings'>('home');

  useEffect(() => {
    const { prebuilt: p, custom: c } = getStorageData();
    setPrebuilt(p);
    setCustom(c);
  }, []);

  const handleAnalyze = async (name: string, analyzer: AnimeAnalyzer) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const chars = analyzeName(name, analyzer);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-pink-400" size={22} />
            <span className="font-black text-lg tracking-tight">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1">
              <button
                onClick={() => setTab('home')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'home' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('home')}
              </button>
              <button
                onClick={() => setTab('rankings')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'rankings' ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('popularRanking')}
              </button>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {tab === 'home' ? (
          view === 'home' ? (
            <div className="space-y-10">
              {/* Hero */}
              <div className="text-center py-10 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  {t('appName')}
                </h1>
                <p className="text-white/60 text-lg">{t('tagline')}</p>
              </div>

              {/* Analyze Form */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 md:p-8">
                <AnalyzeForm
                  analyzers={allAnalyzers}
                  onAnalyze={handleAnalyze}
                  loading={loading}
                />
              </div>

              {/* Custom Analyzers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">{t('yourAnalyzers')}</h2>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm hover:from-pink-600 hover:to-purple-600 transition-all"
                  >
                    <Plus size={16} /> {t('createNew')}
                  </button>
                </div>
                {custom.length === 0 ? (
                  <div className="text-center py-8 text-white/40 text-sm">
                    {t('noData')}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {custom.map(a => (
                      <button
                        key={a.id}
                        onClick={() => handleAnalyze('', a)}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all text-left"
                      >
                        <div className="text-xs text-white/50 mb-1">{a.animeName}</div>
                        <div className="font-bold text-white text-sm">{a.name}</div>
                        <div className="text-xs text-white/40 mt-1">{a.characters.length} {t('characters')}</div>
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
                onClose={() => setView('home')}
              />
            )
          )
        ) : (
          /* Rankings Tab */
          <div className="space-y-10">
            <div className="text-center py-6 space-y-2">
              <h1 className="text-3xl font-black tracking-tight">{t('popularRanking')}</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-400" /> {t('popularRanking')}
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
                  <RankingBoard analyzers={allAnalyzers} mode="popular" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ChevronLeft size={18} className="text-pink-400" style={{ transform: 'rotate(180deg)' }} /> {t('newestAnalyzers')}
                </h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
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
