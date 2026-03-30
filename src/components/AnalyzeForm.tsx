import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import type { AnimeAnalyzer } from '../data/animeData';

interface Props {
  analyzers: AnimeAnalyzer[];
  onAnalyze: (name: string, analyzer: AnimeAnalyzer) => void;
  loading: boolean;
}

export default function AnalyzeForm({ analyzers, onAnalyze, loading }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<AnimeAnalyzer | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError(t('nameRequired')); return; }
    if (!selected) { setError(t('animeRequired')); return; }
    setError('');
    onAnalyze(name.trim(), selected);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{t('enterName')}</h2>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          placeholder={t('namePlaceholder')}
          className="w-full max-w-sm mx-auto block px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
          maxLength={30}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white text-center mb-4">{t('selectAnime')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {analyzers.map(a => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setSelected(a); setError(''); }}
              className={`relative p-3 rounded-xl border-2 transition-all text-left overflow-hidden group ${
                selected?.id === a.id
                  ? 'border-pink-500 bg-pink-500/20 scale-105'
                  : 'border-white/20 bg-white/5 hover:border-white/50 hover:bg-white/10'
              }`}
            >
              <div className="text-xs text-white/60 mb-1">{a.animeName}</div>
              <div className="font-bold text-white text-sm leading-tight">{a.name}</div>
              {selected?.id === a.id && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-center text-sm">{error}</p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto shadow-lg shadow-pink-500/30"
        >
          {loading ? (
            <>
              <span className="animate-spin">⟳</span> {t('analyzing')}
            </>
          ) : (
            <>
              <Search size={20} /> {t('analyze')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
