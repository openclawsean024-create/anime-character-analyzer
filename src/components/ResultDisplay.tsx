import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { AnimeAnalyzer, Character } from '../data/animeData';

interface Props {
  name: string;
  analyzer: AnimeAnalyzer;
  result: Character[];
  onClose: () => void;
}

export default function ResultDisplay({ name, analyzer, result, onClose }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shareText = `${name} 最適合的 ${analyzer.name} 角色是：${result[0].name}（${result[0].percentage}%）！快來試試動漫角色分析器！`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">{t('yourResult')}</h2>
        <p className="text-white/60 text-sm">{analyzer.name} — {name}</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-white/60 uppercase tracking-wider">{analyzer.animeName}</div>
            <div className="text-2xl font-black text-white">{analyzer.name}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
              title={t('share')}
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {result.map((char, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium flex items-center gap-2">
                  {i === 0 && <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded font-bold">TOP</span>}
                  {char.name}
                </span>
                <span className="text-white/80 font-bold">{char.percentage}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${char.percentage}%`,
                    backgroundColor: char.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all border border-white/20"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
}
