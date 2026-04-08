import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Upload, X, Camera } from 'lucide-react';
import type { AnimeAnalyzer } from '../data/animeData';

interface Props {
  analyzers: AnimeAnalyzer[];
  onAnalyze: (name: string, analyzer: AnimeAnalyzer, imageBase64?: string) => void;
  loading: boolean;
}

export default function AnalyzeForm({ analyzers, onAnalyze, loading }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<AnimeAnalyzer | null>(null);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('請上傳圖片檔案');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('圖片大小不能超過 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError(t('nameRequired')); return; }
    if (!selected) { setError(t('animeRequired')); return; }
    setError('');
    onAnalyze(name.trim(), selected, imageBase64 || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name input */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-3 font-logo">{t('enterName')}</h2>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          placeholder={t('namePlaceholder')}
          className="anime-input"
          maxLength={30}
        />
      </div>

      {/* Image upload */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-white mb-3" style={{ color: 'var(--text-secondary)' }}>
          上傳角色圖片（可選）
        </h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id="image-upload"
        />
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxHeight: '10rem',
                margin: '0 auto',
                borderRadius: '1rem',
                border: '2px solid rgba(255, 77, 166, 0.5)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                display: 'block',
              }}
            />
            <button
              type="button"
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                padding: '0.375rem',
                borderRadius: '50%',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                transition: 'background 0.15s',
              }}
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <label
              htmlFor="image-upload"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '0.875rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.15s',
              }}
            >
              <Upload size={16} />
              <span>上傳圖片</span>
            </label>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.readText().then(text => {
                  if (text.startsWith('data:image') || text.startsWith('http')) {
                    setImagePreview(text);
                    setImageBase64(text);
                  }
                }).catch(() => {});
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                borderRadius: '0.875rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.15s',
              }}
            >
              <Camera size={16} />
              <span>貼上圖片</span>
            </button>
          </div>
        )}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          支援 JPG/PNG，最大 5MB
        </p>
      </div>

      {/* Analyzer grid */}
      <div>
        <h3 className="text-sm font-semibold text-white text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {t('selectAnime')}
        </h3>
        <div className="analyzer-grid">
          {analyzers.map(a => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setSelected(a); setError(''); }}
              className={`analyzer-card ${selected?.id === a.id ? 'selected' : ''}`}
            >
              {selected?.id === a.id && <span className="card-dot" />}
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.animeName}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3, fontFamily: "'Space Grotesk', sans-serif" }}>
                {a.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                👥 {a.characters.length} 角色
              </div>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p style={{ color: '#f87171', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>
      )}

      {/* Submit button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ padding: '0.875rem 2.5rem', fontSize: '1.1rem', borderRadius: '0.875rem' }}
        >
          {loading ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
              {' '}{t('analyzing')}
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
