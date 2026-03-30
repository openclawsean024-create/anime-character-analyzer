import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Trash2 } from 'lucide-react';
import type { AnimeAnalyzer } from '../data/animeData';

interface Props {
  onCreate: (analyzer: AnimeAnalyzer) => void;
  onClose: () => void;
}

export default function CreateAnalyzerModal({ onCreate, onClose }: Props) {
  const { t } = useTranslation();
  const [animeName, setAnimeName] = useState('');
  const [characters, setCharacters] = useState<{ name: string; percentage: number }[]>([
    { name: '', percentage: 25 },
    { name: '', percentage: 25 },
    { name: '', percentage: 25 },
    { name: '', percentage: 25 },
  ]);

  const totalPct = characters.reduce((s, c) => s + c.percentage, 0);

  const addChar = () => {
    setCharacters([...characters, { name: '', percentage: 0 }]);
  };

  const removeChar = (i: number) => {
    if (characters.length <= 2) return;
    setCharacters(characters.filter((_, idx) => idx !== i));
  };

  const updateChar = (i: number, field: 'name' | 'percentage', value: string | number) => {
    const updated = [...characters];
    if (field === 'name') updated[i].name = value as string;
    else updated[i].percentage = Math.max(0, Math.min(100, Number(value)));
    setCharacters(updated);
  };

  const handleCreate = () => {
    if (!animeName.trim() || characters.some(c => !c.name.trim())) return;
    const id = `custom-${Date.now()}`;
    const colors = ['#FF5722', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800', '#E91E63', '#00BCD4', '#FF5722'];
    const analyzer: AnimeAnalyzer = {
      id,
      name: animeName.trim(),
      animeName: animeName.trim().toUpperCase(),
      characters: characters.map((c, i) => ({ ...c, color: colors[i % colors.length] })),
      usageCount: 0,
      createdAt: Date.now(),
      isPrebuilt: false,
    };
    onCreate(analyzer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] rounded-2xl border border-white/20 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">{t('createAnalyzer')}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <label className="block text-white/70 text-sm mb-2">{t('animeNameLabel')}</label>
            <input
              type="text"
              value={animeName}
              onChange={e => setAnimeName(e.target.value)}
              placeholder="例如：我的作品"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500"
              maxLength={50}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white/70 text-sm">{t('characters')}</label>
              <span className={`text-xs ${totalPct === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                總計: {totalPct}% {totalPct !== 100 && '(應為 100%)'}
              </span>
            </div>
            <div className="space-y-2">
              {characters.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={c.name}
                    onChange={e => updateChar(i, 'name', e.target.value)}
                    placeholder={`角色 ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    maxLength={30}
                  />
                  <div className="relative w-20">
                    <input
                      type="number"
                      value={c.percentage}
                      onChange={e => updateChar(i, 'percentage', e.target.value)}
                      min={0}
                      max={100}
                      className="w-full px-3 py-2 pr-7 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs">%</span>
                  </div>
                  <button
                    onClick={() => removeChar(i)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addChar}
              className="mt-3 flex items-center gap-2 text-pink-400 text-sm hover:text-pink-300 transition-colors"
            >
              <Plus size={16} /> 新增角色
            </button>
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 hover:bg-white/15 transition-all font-medium"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleCreate}
            disabled={!animeName.trim() || characters.some(c => !c.name.trim()) || totalPct !== 100}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('create')}
          </button>
        </div>
      </div>
    </div>
  );
}
