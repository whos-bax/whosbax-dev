import { NextResponse } from 'next/server';
import { createGuestbookReply } from '@/features/guestbook';

// POST: 답글 작성
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guestbookId } = await params;
    const body = await request.json();
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: '답글 내용을 입력해주세요.' }, { status: 400 });
    }

    const result = await createGuestbookReply(guestbookId, message);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: '답글 작성에 실패했습니다.' }, { status: 500 });
  }
}
