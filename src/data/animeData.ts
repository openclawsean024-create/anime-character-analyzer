export interface Character {
  name: string;
  percentage: number;
  color: string;
}

export interface AnimeAnalyzer {
  id: string;
  name: string;
  animeName: string;
  characters: Character[];
  usageCount: number;
  createdAt: number;
  isPrebuilt: boolean;
  cover?: string;
}

const prebuiltAnalyzers: AnimeAnalyzer[] = [
  {
    id: 'one-piece',
    name: '海賊王',
    animeName: 'ONE PIECE',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704067200000,
    cover: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&q=80',
    characters: [
      { name: '魯夫', percentage: 30, color: '#FF6B35' },
      { name: '娜美', percentage: 20, color: '#F7C948' },
      { name: '烏索普', percentage: 15, color: '#4CAF50' },
      { name: '索隆', percentage: 15, color: '#2196F3' },
      { name: '香吉士', percentage: 10, color: '#FF9800' },
      { name: '喬巴', percentage: 5, color: '#E91E63' },
      { name: '羅賓', percentage: 5, color: '#9C27B0' },
    ],
  },
  {
    id: 'naruto',
    name: '火影忍者',
    animeName: 'NARUTO',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704153600000,
    cover: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80',
    characters: [
      { name: '漩渦鳴人', percentage: 35, color: '#FF9800' },
      { name: '宇智波佐助', percentage: 25, color: '#3F51B5' },
      { name: '春野櫻', percentage: 15, color: '#E91E63' },
      { name: '卡卡西', percentage: 15, color: '#607D8B' },
      { name: '我愛羅', percentage: 10, color: '#795548' },
    ],
  },
  {
    id: 'demon-slayer',
    name: '鬼滅之刃',
    animeName: 'Demon Slayer',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704240000000,
    cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    characters: [
      { name: '竈門炭治郎', percentage: 30, color: '#FF5722' },
      { name: '竈門禰豆子', percentage: 25, color: '#E91E63' },
      { name: '富岡義勇', percentage: 15, color: '#2196F3' },
      { name: '煉獄杏壽郎', percentage: 15, color: '#FF9800' },
      { name: '我妻善逸', percentage: 10, color: '#FFD700' },
      { name: '嘴平伊之助', percentage: 5, color: '#4CAF50' },
    ],
  },
  {
    id: 'jujutsu-kaisen',
    name: '咒術迴戰',
    animeName: 'Jujutsu Kaisen',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704326400000,
    cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80',
    characters: [
      { name: '虎杖悠仁', percentage: 30, color: '#FF5722' },
      { name: '伏黑惠', percentage: 25, color: '#3F51B5' },
      { name: '釘崎野薔薇', percentage: 20, color: '#E91E63' },
      { name: '兩面宿儺', percentage: 15, color: '#9C27B0' },
      { name: '五條悟', percentage: 10, color: '#2196F3' },
    ],
  },
  {
    id: 'attack-on-titan',
    name: '進擊的巨人',
    animeName: 'Attack on Titan',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704412800000,
    cover: 'https://images.unsplash.com/photo-1607604276583-b39e66f044ab?w=400&q=80',
    characters: [
      { name: '艾連·葉卡', percentage: 30, color: '#3F51B5' },
      { name: '米卡莎·阿卡曼', percentage: 25, color: '#795548' },
      { name: '阿爾敏·亞魯雷特', percentage: 20, color: '#FFD700' },
      { name: '里維', percentage: 15, color: '#607D8B' },
      { name: '漢吉', percentage: 10, color: '#FF9800' },
    ],
  },
  {
    id: 'spy-x-family',
    name: '間諜過家家',
    animeName: 'Spy x Family',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704499200000,
    cover: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&q=80',
    characters: [
      { name: '黃昏', percentage: 30, color: '#2196F3' },
      { name: '安妮亞', percentage: 35, color: '#E91E63' },
      { name: '約兒', percentage: 20, color: '#FF5722' },
      { name: '彭德', percentage: 15, color: '#4CAF50' },
    ],
  },
  {
    id: 'my-hero-academia',
    name: '我的英雄學院',
    animeName: 'My Hero Academia',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704585600000,
    cover: 'https://images.unsplash.com/photo-1560972550-aba3456e8a7e?w=400&q=80',
    characters: [
      { name: '綠谷出久', percentage: 35, color: '#4CAF50' },
      { name: '爆豪勝己', percentage: 25, color: '#FF5722' },
      { name: '麗日御茶子', percentage: 20, color: '#E91E63' },
      { name: '轟焦凍', percentage: 15, color: '#00BCD4' },
      { name: '飯田天哉', percentage: 5, color: '#2196F3' },
    ],
  },
  {
    id: 'dragon-ball',
    name: '七龍珠',
    animeName: 'Dragon Ball',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704672000000,
    cover: 'https://images.unsplash.com/photo-1609741199744-aa31fe7e72cd?w=400&q=80',
    characters: [
      { name: '孫悟空', percentage: 35, color: '#FF5722' },
      { name: '貝吉塔', percentage: 25, color: '#3F51B5' },
      { name: '悟飯', percentage: 15, color: '#2196F3' },
      { name: '比克', percentage: 15, color: '#4CAF50' },
      { name: '弗利沙', percentage: 10, color: '#9C27B0' },
    ],
  },
  {
    id: 'sword-art-online',
    name: '刀劍神域',
    animeName: 'Sword Art Online',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704758400000,
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    characters: [
      { name: '桐谷和人', percentage: 35, color: '#3F51B5' },
      { name: '結城明日奈', percentage: 30, color: '#E91E63' },
      { name: '尤吉歐', percentage: 15, color: '#00BCD4' },
      { name: '愛麗絲', percentage: 10, color: '#FFD700' },
      { name: '莉法', percentage: 10, color: '#4CAF50' },
    ],
  },
  {
    id: 'haikyuu',
    name: '排球少年',
    animeName: 'Haikyuu!!',
    isPrebuilt: true,
    usageCount: 0,
    createdAt: 1704844800000,
    cover: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80',
    characters: [
      { name: '日向翔陽', percentage: 30, color: '#FF5722' },
      { name: '影山飛雄', percentage: 30, color: '#3F51B5' },
      { name: '及川徹', percentage: 20, color: '#4CAF50' },
      { name: '牛島若利', percentage: 15, color: '#795548' },
      { name: '孤爪研磨', percentage: 5, color: '#FF9800' },
    ],
  },
];

export function getStorageData(): {
  prebuilt: AnimeAnalyzer[];
  custom: AnimeAnalyzer[];
} {
  try {
    const stored = localStorage.getItem('anime-analyzer-data');
    if (stored) {
      const data = JSON.parse(stored);
      const merged = prebuiltAnalyzers.map(p => {
        const found = data.custom?.find((c: AnimeAnalyzer) => c.id === p.id);
        return { ...p, usageCount: found?.usageCount ?? p.usageCount };
      });
      return {
        prebuilt: merged,
        custom: data.custom || [],
      };
    }
  } catch {}
  return { prebuilt: prebuiltAnalyzers, custom: [] };
}

export function saveStorageData(prebuilt: AnimeAnalyzer[], custom: AnimeAnalyzer[]) {
  localStorage.setItem('anime-analyzer-data', JSON.stringify({ prebuilt, custom }));
}

// Deterministic hash-based analysis
export function analyzeName(name: string, analyzer: AnimeAnalyzer): Character[] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 1000000;
  }
  
  const chars = [...analyzer.characters];
  // Fisher-Yates shuffle with seeded random
  for (let i = chars.length - 1; i > 0; i--) {
    hash = (hash * 1103515245 + 12345) % 2147483648;
    const j = Math.floor((hash / 2147483648) * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  // Redistribute percentages based on order
  const total = chars.reduce((s, c) => s + c.percentage, 0);
  return chars.map(c => ({
    ...c,
    percentage: Math.round((c.percentage / total) * 100),
  }));
}
