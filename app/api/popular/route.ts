import { NextRequest, NextResponse } from "next/server";

interface Character {
  name: string;
  emoji: string;
  description?: string;
}

interface Analyzer {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  characters: Character[];
  createdAt: number;
  useCount: number;
}

const DEFAULT_ANALYZERS: Analyzer[] = [
  {
    id: "one-piece",
    name: "海賊王",
    nameEn: "One Piece",
    emoji: "🏴‍☠️",
    characters: [
      { name: "魯夫", emoji: "😁", description: "夢想成為海賊王的熱血船長" },
      { name: "索隆", emoji: "⚔️", description: "立志成為世界第一劍士的劍客" },
      { name: "娜美", emoji: "🗺️", description: "聰明的航海士，夢想繪製世界地圖" },
      { name: "烏索普", emoji: "🎯", description: "勇敢的狙擊王，說謊高手" },
      { name: "香吉士", emoji: "🍳", description: "紳士廚師，踢技高手" },
      { name: "喬巴", emoji: "🦌", description: "可愛的船醫，精通草藥學" },
      { name: "羅賓", emoji: "📚", description: "考古學家， 能讀懂歷史正文" },
      { name: "佛朗基", emoji: "🔧", description: "變態船匠，改造人船醫" },
      { name: "布魯克", emoji: "💀", description: "骨骨果實的音樂家" },
      { name: "吉貝爾", emoji: "🐟", description: "海俠甚平，太空海俠" },
    ],
    createdAt: Date.now(),
    useCount: 847,
  },
  {
    id: "naruto",
    name: "火影忍者",
    nameEn: "Naruto",
    emoji: "🍥",
    characters: [
      { name: "漩渦鳴人", emoji: "🐦", description: "吊車尾的忍術小子，夢想成為火影" },
      { name: "宇智波佐助", emoji: "🔥", description: "天才忍者，為復仇而戰" },
      { name: "春野櫻", emoji: "🌸", description: "醫療忍者，綱手的弟子" },
      { name: "旗木卡卡西", emoji: "🐱", description: "copy忍者，第七班老師" },
      { name: "薩克羅", emoji: "⚡", description: "雷之國雲隱村忍者" },
      { name: "綱手", emoji: "💪", description: "五代火影，怪力女忍者" },
      { name: "自來也", emoji: "🐸", description: "三忍之一，鳴人的師傅" },
      { name: "我愛羅", emoji: "🏜️", description: "風影，我抓狂的藝術" },
      { name: "日向雛田", emoji: "🥀", description: "鳴人的妻子，柔拳高手" },
      { name: "波風湊", emoji: "🌊", description: "四代火影，鳴人的父親" },
    ],
    createdAt: Date.now(),
    useCount: 623,
  },
  {
    id: "demon-slayer",
    name: "鬼滅之刃",
    nameEn: "Demon Slayer",
    emoji: "⚔️",
    characters: [
      { name: "竈門炭治郎", emoji: "🔥", description: "變成鬼的大正時代少年" },
      { name: "竈門禰豆子", emoji: "👧", description: "炭治郎的妹妹，回復人類" },
      { name: "我妻善逸", emoji: "⚡", description: "雷之呼吸，一睡就著" },
      { name: "嘴平伊助", emoji: "🐹", description: "動物之呼吸，嘴平家的和平" },
      { name: "冨岡義勇", emoji: "❄️", description: "水之呼吸，鬼殺隊當主" },
      { name: "蝴蝶忍", emoji: "🦋", description: "蟲之呼吸，毒術專家" },
      { name: "甘露寺蜜璃", emoji: "💖", description: "戀之呼吸，戀愛腦的怪力" },
      { name: "煉獄杏壽郎", emoji: "🔥", description: "炎之呼吸，熱血大哥" },
      { name: "悲鳴嶼行冥", emoji: "📿", description: "岩之呼吸，最強的岩柱" },
      { name: "不死川玄彌", emoji: "🌾", description: "槍之呼吸，兄長の背中" },
    ],
    createdAt: Date.now(),
    useCount: 512,
  },
];

export async function GET() {
  return NextResponse.json({
    analyzers: DEFAULT_ANALYZERS,
    total: DEFAULT_ANALYZERS.length,
  });
}
