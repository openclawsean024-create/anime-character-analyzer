import { useTranslation } from 'react-i18next';
import { Trophy, Clock } from 'lucide-react';
import type { AnimeAnalyzer } from '../data/animeData';

interface Props {
  analyzers: AnimeAnalyzer[];
  mode: 'popular' | 'newest';
}

export default function RankingBoard({ analyzers, mode }: Props) {
  const { t } = useTranslation();

  const sorted = [...analyzers].sort((a, b) =>
    mode === 'popular' ? b.usageCount - a.usageCount : b.createdAt - a.createdAt
  ).slice(0, 10);

  if (sorted.length === 0) {
    return (
      <div className="text-center text-white/40 py-8 text-sm">
        {t('noData')}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sorted.map((a, i) => (
        <div
          key={a.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
            i === 0 ? 'bg-yellow-400 text-yellow-900' :
            i === 1 ? 'bg-gray-300 text-gray-800' :
            i === 2 ? 'bg-amber-600 text-white' :
            'bg-white/10 text-white/60'
          }`}>
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">{a.name}</div>
            <div className="text-white/50 text-xs">{a.animeName}</div>
          </div>
          <div className="text-right shrink-0">
            {mode === 'popular' ? (
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Trophy size={12} />
                <span>{a.usageCount}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Clock size={12} />
                <span>{new Date(a.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
