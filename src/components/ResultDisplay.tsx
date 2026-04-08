import { useTranslation } from 'react-i18next';
import { Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { AnimeAnalyzer, Character } from '../data/animeData';

interface Props {
  name: string;
  analyzer: AnimeAnalyzer;
  result: Character[];
  onClose: () => void;
}

function getMatchClass(index: number): string {
  if (index === 0) return 'top';
  if (index === 1) return 'second';
  if (index === 2) return 'third';
  return 'other';
}

function getBarClass(index: number): string {
  if (index === 0) return 'breakdown-bar-fill top-match';
  if (index === 1) return 'breakdown-bar-fill second-match';
  if (index === 2) return 'breakdown-bar-fill';
  return 'breakdown-bar-fill other-match';
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
      {/* Page header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1 font-logo">{t('yourResult')}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {analyzer.name} — {name}
        </p>
      </div>

      {/* Result card */}
      <div className="result-card">
        <div className="result-header">
          <div>
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.25rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {analyzer.animeName}
            </div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
            }}>
              {analyzer.name}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCopy}
              style={{
                padding: '0.5rem',
                borderRadius: '0.625rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-default)',
                color: copied ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
              }}
              title={t('share')}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Character breakdown */}
        <div className="space-y-4">
          {result.map((char, i) => (
            <div key={i} style={{ animation: `fadeInUp 0.4s ${i * 0.1}s ease-out both` }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {i === 0 && (
                    <span className="match-badge top">
                      <Sparkles size={10} /> TOP
                    </span>
                  )}
                  {i === 1 && (
                    <span className="match-badge second">#2</span>
                  )}
                  {i === 2 && (
                    <span className="match-badge third">#3</span>
                  )}
                  <span style={{
                    color: i === 0 ? 'var(--text-primary)' : i === 1 ? 'var(--text-secondary)' : 'var(--text-muted)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}>
                    {char.name}
                  </span>
                </div>
                <span className={`match-percentage ${getMatchClass(i)}`} style={{ fontSize: i === 0 ? '1.6rem' : '1.25rem' }}>
                  {char.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="breakdown-bar">
                <div
                  className={getBarClass(i)}
                  style={{ width: `${char.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion text */}
      {result[0] && (
        <div style={{
          textAlign: 'center',
          padding: '1.25rem',
          borderRadius: '1rem',
          background: 'rgba(0, 229, 200, 0.05)',
          border: '1px solid rgba(0, 229, 200, 0.12)',
        }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 0 }}>
            你是{analyzer.animeName}裡的<span style={{ color: 'var(--neon-cyan)' }}>{result[0].name}</span>！
          </p>
        </div>
      )}

      {/* Back button */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
}
