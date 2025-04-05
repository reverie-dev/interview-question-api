import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
// import { GoogleGenAI } from '@google/genai';

// 初始化 Gemini API 客户端
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!}); // 确保你设置了 GEMINI_API_KEY 环境变量

// export async function POST(req: NextRequest) {
//     const { raw_text } = await req.json();
  
//     if (!raw_text) {
//       return NextResponse.json({ error: 'raw_text required' }, { status: 400 });
//     }
  
//     const prompt = `请提取以下文本中的每道面试题目，只返回题目内容，不要编号和符号。示例返回格式：{"questions": [{"content": "JVM内存结构"},{"content": "JVM垃圾回收机制"}]} 文本内容：${raw_text}`;
  

//     try {
//       const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: [{ role: 'user', parts: [{ text: prompt }] }],
//       });
//       console.log(response.text)
//       const content = response.text;
//       const extractedData = JSON.parse(content || '{"questions":[]}');
  
//       return NextResponse.json(extractedData);
//     } catch (error) {
//       console.error('Gemini API error:', error);
//       return NextResponse.json({ error: 'Gemini AI提取失败' }, { status: 500 });
//     }
// }

const openai = new OpenAI({ 
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: NextRequest) {
  const { raw_text } = await req.json();

  if (!raw_text) {
    return NextResponse.json({ error: 'raw_text required' }, { status: 400 });
  }

  const prompt = `
    请提取以下文本中的每道面试题目，只返回题目内容，不要编号和符号。
    示例返回格式：
    {
      "questions": [
        {"content": "JVM内存结构"},
        {"content": "JVM垃圾回收机制"}
      ]
    }

    文本内容：
    ${raw_text}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: '你是数据提取助手。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
    });

    const content = completion.choices[0].message.content;
    const extractedData = JSON.parse(content || '{"questions":[]}');

    return NextResponse.json(extractedData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'AI提取失败' }, { status: 500 });
  }
}
