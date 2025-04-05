import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 根据ID查询题目
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  const id = (await params).id;

  const { data, error } = await supabase
    .from('interview_questions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ question: data });
}

// 根据ID修改题目内容
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const { content, source } = await req.json();

  if (!content) {
    return NextResponse.json({ error: 'content不能为空' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('interview_questions')
    .update({ content, source })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ question: data });
}

// 根据ID删除题目
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { error } = await supabase
    .from('interview_questions')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: '删除成功' });
}
