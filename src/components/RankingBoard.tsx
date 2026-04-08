import { Trophy, Clock } from 'lucide-react';
import type { AnimeAnalyzer } from '../data/animeData';

interface Props {
  analyzers: AnimeAnalyzer[];
  mode: 'popular' | 'newest';
}

function RankBadge({ index }: { index: number }) {
  if (index === 0) return <div className="rank-gold" style={{
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', flexShrink: 0,
  }}>1</div>;
  if (index === 1) return <div className="rank-silver" style={{
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', flexShrink: 0,
  }}>2</div>;
  if (index === 2) return <div className="rank-bronze" style={{
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', flexShrink: 0,
  }}>3</div>;
  return <div style={{
    width: 28, height: 28, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)',
    flexShrink: 0,
  }}>{index + 1}</div>;
}

export default function RankingBoard({ analyzers, mode }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const sorted = [...analyzers].sort((a, b) =>
    mode === 'popular' ? b.usageCount - a.usageCount : b.createdAt - a.createdAt
  ).slice(0, 10);

  if (sorted.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🏆</span>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500, margin: '0.5rem 0' }}>
          成為第一個上榜的動漫！
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.5rem 0' }}>
          建立自訂分析器，開始累積使用次數
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sorted.map((a, i) => (
        <div
          key={a.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            borderRadius: '0.875rem',
            background: i === 0 ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255,255,255,0.03)',
            border: i === 0 ? '1px solid rgba(255, 215, 0, 0.15)' : '1px solid var(--border-subtle)',
            transition: 'all 0.15s',
            cursor: 'default',
          }}
        >
          <RankBadge index={i} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: i === 0 ? 'var(--text-primary)' : 'var(--text-primary)',
              fontWeight: i === 0 ? 700 : 500,
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {a.name}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{a.animeName}</div>
          </div>

          <div style={{ flexShrink: 0 }}>
            {mode === 'popular' ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: i === 0 ? 'var(--amber)' : 'var(--text-muted)',
                fontSize: '0.8rem',
              }}>
                <Trophy size={13} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>
                  {a.usageCount}
                </span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
              }}>
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
