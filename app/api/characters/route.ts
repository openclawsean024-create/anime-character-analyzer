import { NextRequest, NextResponse } from "next/server";

interface Character {
  name: string;
  emoji: string;
  description?: string;
}

const CHARACTERS_DB: Record<string, Character[]> = {
  "one-piece": [
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
  "naruto": [
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
  "demon-slayer": [
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
  "attack-on-titan": [
    { name: "艾連·葉卡", emoji: "🔶", description: "擁有始祖巨人之力" },
    { name: "米卡莎·阿卡曼", emoji: "🗡️", description: "艾連的青梅竹天，戰鬥天才" },
    { name: "阿爾敏·艾爾特", emoji: "🌊", description: "頭腦派的策略家" },
    { name: "里維·阿卡曼", emoji: "⚔️", description: "人類最強士兵" },
    { name: "米娜·卡羅萊納", emoji: "🌾", description: "訓練兵團同期生" },
    { name: "約翰·基爾休斯坦", emoji: "🏴", description: "艾爾文團長的左右手" },
    { name: "漢尼斯", emoji: "🍺", description: "遺憾最多的前輩" },
    { name: "艾爾文·史密斯", emoji: "📋", description: "調查兵團團長" },
    { name: "皮克西斯", emoji: "💡", description: "里維兵長的摯友" },
    { name: "弗洛克的後代", emoji: "💣", description: "艾連的狂熱追隨者" },
  ],
  "sword-art-online": [
    { name: "桐谷和人", emoji: "🗡️", description: "黑色劍士，SAO裡的頂尖玩家" },
    { name: "結城明日奈", emoji: "⚔️", description: "閃光之亞絲娜，公會副隊長" },
    { name: "莉法", emoji: "🌲", description: "桐人的妹妹，ALO精靈" },
    { name: "桐谷直葉", emoji: "⚔️", description: "現實中的直葉，劍道高手" },
    { name: "阿爾戈", emoji: "🐾", description: "資訊商贩，SAO唯一的老鼠" },
    { name: "克萊因", emoji: "🍜", description: "桐人的好友，獨狼玩家" },
    { name: "艾基爾", emoji: "🪓", description: "商人玩家，現實中是非裔美人" },
    { name: "希茲克利夫", emoji: "🏰", description: "SAO遊戲管理員，茅場晶彥" },
    { name: "莉茲貝特", emoji: "🔨", description: "鍛造師，武器工匠" },
    { name: "西莉卡", emoji: "🐉", description: "使魔伙伴，馴獸師" },
  ],
  "death-note": [
    { name: "夜神月", emoji: "📓", description: "基拉，追求理想世界的神" },
    { name: "L·龍崎", emoji: "🍕", description: "世界三大名偵探之一的L" },
    { name: "彌海砂", emoji: "💜", description: "第二基拉，嗜血模特" },
    { name: "琉克", emoji: "😈", description: "死神，可愛又可怕的旁白" },
    { name: "夜神總一郎", emoji: "👮", description: "月的父親，搜查本部的頭" },
    { name: "松田丈博", emoji: "💼", description: "搜查本部成員，磊落的前輩" },
    { name: "模木完結", emoji: "📰", description: "搜查本部成員，情報專家" },
    { name: "魅上照", emoji: "⚖️", description: "基拉的狂熱追隨者" },
    { name: "高田清美", emoji: "🌸", description: "月的未婚妻，才女" },
    { name: "流河旱樹", emoji: "🎭", description: "L的替代者，舞蹈演員" },
  ],
  "jujutsu-kaisen": [
    { name: "虎杖悠仁", emoji: "👊", description: "擁有特殊體質的詛咒師" },
    { name: "伏黑惠", emoji: "👤", description: "影子術師，黒閃達人" },
    { name: "釘崎野薔薇", emoji: "🌹", description: "喜歡玫瑰和恐怖片的女孩子" },
    { name: "兩面宿儺", emoji: "🔥", description: "千年前的詛咒之王" },
    { name: "五條悟", emoji: "🕶️", description: "最強咒術師，粉絲無數" },
    { name: "夏油傑", emoji: "👻", description: "大義叛變，前咒術師" },
    { name: "七海建人", emoji: "🐹", description: "加班最多的咒術師" },
    { name: "家入硝子", emoji: "💉", description: "反轉術式治療師" },
    { name: "真人", emoji: "🫠", description: "人類觀眾快樂的手榴彈" },
    { name: "漏瑚", emoji: "🌋", description: "火山的咒靈，有下巴" },
  ],
  "one-punch-man": [
    { name: "埼玉", emoji: "💥", description: "一杯洗澡就變強的興趣解除" },
    { name: "傑諾斯", emoji: "⚡", description: "埼玉的徒弟，機械改造人" },
    { name: "鳴人", emoji: "🗡️", description: "B級第1位，契約S級英雄" },
    { name: "KING", emoji: "👑", description: "地表最強，實際只是普通人" },
    { name: "索尼克", emoji: "💨", description: "忍術天才，興趣解除的競爭對手" },
    { name: "戰慄的龍捲", emoji: "🌪️", description: "S級第2位，魔法系吹雪姐姐" },
    { name: "地獄的吹雪", emoji: "❄️", description: "B級第1位，龍捲的妹妹" },
    { name: "金屬球棒", emoji: "⚾", description: "S級第13位，狂犬的正義" },
    { name: "豬神", emoji: "🐷", description: "S級英雄，吃是超能力" },
    { name: "童帝", emoji: "🤖", description: "S級第5位，天才少年" },
  ],
  "spy-x-family": [
    { name: "洛伊德·佛傑", emoji: "🕵️", description: "代敦鎮的瘋狗，編開國土戰略局" },
    { name: "安妮亞·佛傑", emoji: "🥜", description: "擁有讀心術的超能力小女孩" },
    { name: "約兒·佛傑", emoji: "💃", description: "黄昏的妻子，WISE最上位殺手" },
    { name: "彭德", emoji: "🐕", description: "預知未來的超能力狗" },
    { name: "米力·戴斯", emoji: "📚", description: "戴斯家的女僕，情報員" },
    { name: "弗朗基", emoji: "🔧", description: "瘋狂科學家，yadiana" },
    { name: "貝尼", emoji: "🎭", description: "安妮亞的同學，戰術系" },
    { name: "達米安·德斯康", emoji: "🏫", description: " Desmond的公子，目標是拿到星星" },
    { name: "貝克茲", emoji: "📖", description: "情報證人，ISIS亞紀的助手" },
    { name: "西爾維亞·薛伍德", emoji: "🎯", description: "WISE司令官，綽號“木曜”" },
  ],
  "chainsaw-man": [
    { name: "電次", emoji: "⛓️", description: "鏈鋸人，和惡魔融為一體的少年" },
    { name: "帕瓦", emoji: "🐱", description: "血之魔人，喜歡貓和番茄" },
    { name: "早川秋", emoji: "🔥", description: "復仇鬼，期待著平凡的幸福" },
    { name: "姬野生", emoji: "🔫", description: "魅愛的信徒，槍之惡魔" },
    { name: "田中資助", emoji: "💼", description: "國安對策局特異狀況對策一課" },
    { name: " POWER", emoji: "🐄", description: "血之惡魔，怕血但偽裝很勇敢" },
    { name: "圖奇", emoji: "🐭", description: "鼠之惡魔，怯怯可愛" },
    { name: " LPS", emoji: "👻", description: " LPS，死神小孩" },
    { name: "馬伽幽", emoji: "🗡️", description: "暗之惡魔，暗之橋梁" },
    { name: "薔薇咖啡館的女孩", emoji: "☕", description: "暗之惡魔的真身" },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const analyzerId = searchParams.get("analyzerId");

  if (!analyzerId) {
    return NextResponse.json(
      { error: "analyzerId is required" },
      { status: 400 }
    );
  }

  const characters = CHARACTERS_DB[analyzerId];
  if (!characters) {
    return NextResponse.json(
      { error: `Analyzer '${analyzerId}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({ analyzerId, characters });
}
