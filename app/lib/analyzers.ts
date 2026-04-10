export interface Character {
  name: string;
  emoji: string;
  description?: string;
}

export interface Analyzer {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  characters: Character[];
  createdAt: number;
  useCount: number;
}

export const DEFAULT_ANALYZERS: Analyzer[] = [
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
      { name: "羅賓", emoji: "📚", description: "考古學家，能讀懂歷史正文" },
      { name: "佛朗基", emoji: "🔧", description: "變態船匠，改造人船醫" },
      { name: "布魯克", emoji: "💀", description: "骨骨果實的音樂家" },
      { name: "吉貝爾", emoji: "🐟", description: "海俠甚平，太空海俠" },
    ],
    createdAt: 1712712000000,
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
    createdAt: 1712715600000,
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
      { name: "嘴平伊之助", emoji: "🐗", description: "野豬面具，獸之呼吸" },
      { name: "冨岡義勇", emoji: "❄️", description: "水之呼吸，冷面劍士" },
      { name: "蝴蝶忍", emoji: "🦋", description: "蟲之呼吸，毒術專家" },
      { name: "甘露寺蜜璃", emoji: "💖", description: "戀之呼吸，戀愛腦的怪力" },
      { name: "煉獄杏壽郎", emoji: "🔥", description: "炎之呼吸，熱血大哥" },
      { name: "悲鳴嶼行冥", emoji: "📿", description: "岩之呼吸，最強的岩柱" },
      { name: "不死川玄彌", emoji: "🌾", description: "槍之呼吸，兄長の背中" },
    ],
    createdAt: 1712719200000,
    useCount: 512,
  },
  {
    id: "attack-on-titan",
    name: "進擊的巨人",
    nameEn: "Attack on Titan",
    emoji: "🔶",
    characters: [
      { name: "艾倫", emoji: "🔥", description: "追求自由的調查兵團成員" },
      { name: "米卡莎", emoji: "🧣", description: "沉默寡言，戰鬥力極強" },
      { name: "阿爾敏", emoji: "🧠", description: "聰明的戰略家" },
      { name: "兵長", emoji: "🗡️", description: "人類最強戰士" },
      { name: "艾爾文", emoji: "📣", description: "調查兵團團長" },
      { name: "漢吉", emoji: "🔬", description: "巨人研究狂熱者" },
      { name: "萊納", emoji: "🛡️", description: "鎧之巨人繼承者" },
      { name: "貝爾托特", emoji: "🏢", description: "超大型巨人" },
      { name: "尤彌爾", emoji: "🌙", description: "自由奔放的巨人戰士" },
      { name: "莎夏", emoji: "🥔", description: "馬鈴薯女孩" },
    ],
    createdAt: 1712722800000,
    useCount: 398,
  },
  {
    id: "sword-art-online",
    name: "刀劍神域",
    nameEn: "Sword Art Online",
    emoji: "🗡️",
    characters: [
      { name: "桐人", emoji: "⚫", description: "黑色劍士" },
      { name: "亞絲娜", emoji: "💫", description: "閃光的亞絲娜" },
      { name: "莉法", emoji: "🌿", description: "桐人的妹妹" },
      { name: "詩乃", emoji: "🎯", description: "神槍手" },
      { name: "亞絲琳", emoji: "👑", description: "血盟騎士團副團長" },
      { name: "克萊因", emoji: "🍶", description: "熱血武士" },
      { name: "艾基爾", emoji: "🪓", description: "商人戰士" },
      { name: "尤吉歐", emoji: "🔷", description: "藍薔薇劍士" },
      { name: "愛麗絲", emoji: "🌟", description: "整合騎士" },
      { name: "結衣", emoji: "🧚", description: "小精靈 AI" },
    ],
    createdAt: 1712726400000,
    useCount: 334,
  },
  {
    id: "death-note",
    name: "死亡筆記本",
    nameEn: "Death Note",
    emoji: "📓",
    characters: [
      { name: "夜神月", emoji: "📝", description: "智商爆表的天才高中生" },
      { name: "L", emoji: "🍰", description: "神秘偵探" },
      { name: "彌海砂", emoji: "🎀", description: "死神之眼偶像" },
      { name: "死神雷姆", emoji: "💀", description: "守護彌海砂的死神" },
      { name: "死神琉克", emoji: "🍎", description: "愛吃蘋果的死神" },
      { name: "尼亞", emoji: "🧩", description: "L 的繼承者" },
      { name: "梅洛", emoji: "🚬", description: "激進的繼承者" },
      { name: "高田清美", emoji: "📺", description: "月的代言人" },
      { name: "松田", emoji: "🔫", description: "捧場型搜查官" },
      { name: "夜神總一郎", emoji: "👔", description: "月的父親，搜查本部長" },
    ],
    createdAt: 1712730000000,
    useCount: 287,
  },
  {
    id: "jujutsu-kaisen",
    name: "咒術迴戰",
    nameEn: "Jujutsu Kaisen",
    emoji: "👊",
    characters: [
      { name: "虎杖悠仁", emoji: "✊", description: "宿儺容器" },
      { name: "伏黑惠", emoji: "🐺", description: "十種影法術" },
      { name: "釘崎野薔薇", emoji: "🌹", description: "芻靈咒法" },
      { name: "五條悟", emoji: "😎", description: "最強咒術師" },
      { name: "夏油傑", emoji: "☯️", description: "詛咒師首領" },
      { name: "真人", emoji: "👤", description: "改造人類的咒靈" },
      { name: "東堂葵", emoji: "👏", description: "拍手即發動術式" },
      { name: "七海建人", emoji: "💼", description: "社畜咒術師" },
      { name: "乙骨憂太", emoji: "🗡️", description: "特級咒術師" },
      { name: "狗卷棘", emoji: "🍙", description: "飯糰語系" },
    ],
    createdAt: 1712733600000,
    useCount: 256,
  },
  {
    id: "one-punch-man",
    name: "一拳超人",
    nameEn: "One Punch Man",
    emoji: "💥",
    characters: [
      { name: "埼玉", emoji: "😐", description: "無敵禿頭披風俠" },
      { name: "傑諾斯", emoji: "🔥", description: "改造人弟子" },
      { name: "戰慄的龍卷", emoji: "🌪️", description: "S級英雄" },
      { name: "銀牙", emoji: "🥋", description: "武術大師" },
      { name: "童帝", emoji: "🧒", description: "天才少年英雄" },
      { name: "KING", emoji: "👑", description: "地表最強男人" },
      { name: "餓狼", emoji: "🐺", description: "怪人狩獵者" },
      { name: "爆破", emoji: "💣", description: "最神秘的英雄" },
      { name: "吹雪", emoji: "❄️", description: "地獄吹雪" },
      { name: "無證騎士", emoji: "🚲", description: "C級英雄榜首" },
    ],
    createdAt: 1712737200000,
    useCount: 219,
  },
  {
    id: "spy-x-family",
    name: "間諜過家家",
    nameEn: "Spy x Family",
    emoji: "🕵️",
    characters: [
      { name: "洛伊德", emoji: "🕶️", description: "黃昏間諜" },
      { name: "約兒", emoji: "🌺", description: "荊棘公主" },
      { name: "安妮亞", emoji: "🧠", description: "會讀心的小孩" },
      { name: "彭德", emoji: "🐶", description: "預知未來的大狗" },
      { name: "達米安", emoji: "😤", description: "安妮亞同學" },
      { name: "貝琪", emoji: "💎", description: "富家千金" },
      { name: "弗朗基", emoji: "🧪", description: "情報販子" },
      { name: "亨利", emoji: "🎓", description: "伊甸學園教師" },
      { name: "尤里", emoji: "🚓", description: "約兒的弟弟" },
      { name: "西爾維亞", emoji: "📎", description: "WISE 聯絡員" },
    ],
    createdAt: 1712740800000,
    useCount: 178,
  },
  {
    id: "chainsaw-man",
    name: "鏈鋸人",
    nameEn: "Chainsaw Man",
    emoji: "⛓️",
    characters: [
      { name: "淀治", emoji: "🪚", description: "鏈鋸人本體" },
      { name: "波奇塔", emoji: "🐕", description: "可愛的惡魔狗" },
      { name: "瑪奇瑪", emoji: "🍵", description: "神祕上司" },
      { name: "帕瓦", emoji: "😈", description: "血之魔人" },
      { name: "早川秋", emoji: "🗡️", description: "冰冷的獵魔人" },
      { name: "天使惡魔", emoji: "👼", description: "天使與災厄" },
      { name: "姬野", emoji: "🚬", description: "前輩獵魔人" },
      { name: "電次", emoji: "🔌", description: "餓肚子的少年" },
      { name: "東山小紅", emoji: "🍦", description: "怕死的公務員" },
      { name: "武器人", emoji: "⚙️", description: "武器化惡魔" },
    ],
    createdAt: 1712744400000,
    useCount: 145,
  },
];

export const customAnalyzersStorageKey = "anime-analyzer-custom";

export function normalizeAnalyzer(input: unknown): Analyzer | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Partial<Analyzer>;
  if (
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    typeof value.nameEn !== "string" ||
    typeof value.emoji !== "string" ||
    !Array.isArray(value.characters)
  ) {
    return null;
  }

  const characters = value.characters
    .filter((char): char is Character => {
      if (!char || typeof char !== "object") return false;
      const c = char as Character;
      return typeof c.name === "string" && typeof c.emoji === "string";
    })
    .map((char) => ({
      name: char.name,
      emoji: char.emoji,
      description: typeof char.description === "string" ? char.description : "",
    }));

  if (characters.length < 2) return null;

  return {
    id: value.id,
    name: value.name,
    nameEn: value.nameEn,
    emoji: value.emoji,
    characters,
    createdAt: typeof value.createdAt === "number" ? value.createdAt : Date.now(),
    useCount: typeof value.useCount === "number" ? value.useCount : 0,
  };
}
