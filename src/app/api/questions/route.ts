import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 查询所有题目
export async function GET() {
  const { data, error } = await supabase
    .from('interview_questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions: data });
}

// 创建单个或多个题目
export async function POST(req: NextRequest) {
  const { questions } = await req.json();

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json({ error: 'questions字段缺失或为空' }, { status: 400 });
  }

  const insertData = questions.map((q: { content: string; source?: string }) => ({
    content: q.content,
    source: q.source || null,
  }));

  const { data, error } = await supabase
    .from('interview_questions')
    .insert(insertData)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions: data });
}
