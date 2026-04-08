import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, name, analyzer } = req.body as {
      image?: string;
      name?: string;
      analyzer?: {
        name: string;
        animeName: string;
        characters: { name: string; percentage: number }[];
      };
    };

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // If image is a base64 data URL, extract the base64 part
    let imageData = image;
    if (image.startsWith('data:')) {
      imageData = image;
    }

    const characterList = analyzer?.characters
      ?.map((c) => `${c.name}（${c.percentage}%）`)
      .join('、') || '魯夫、娜美、索隆';

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageData.includes(',') ? imageData.split(',')[1] : imageData,
              },
            },
            {
              type: 'text',
              text: `你是一個專業的動漫角色分析師。請分析這張圖片中人物的外表特徵（髮色、髮型、眼睛顏色、穿著風格、表情、整體氣質等），並根據以下角色列表，找出最適合這個角色的角色前三名：${characterList}

請用以下 JSON 格式回覆（只回覆 JSON，不要有其他文字）：
{
  "features": "描述這個人物的外表特徵（2-3句話）",
  "match1": "角色名稱",
  "match1_reason": "為什麼這個角色最像？",
  "match2": "角色名稱",
  "match2_reason": "為什麼這個角色第二像？",
  "match3": "角色名稱",
  "match3_reason": "為什麼這個角色第三像？"
}`,
            },
          ],
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      // Fallback: extract key info from text
      result = {
        features: '分析完成',
        match1: analyzer?.characters?.[0]?.name || '魯夫',
        match1_reason: responseText.slice(0, 100),
        match2: analyzer?.characters?.[1]?.name || '娜美',
        match2_reason: '',
        match3: analyzer?.characters?.[2]?.name || '索隆',
        match3_reason: '',
      };
    }

    return res.status(200).json({ success: true, result });
  } catch (error: unknown) {
    console.error('Analyze error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: `Analysis failed: ${message}` });
  }
}
