import { NextResponse } from 'next/server';
import { updateGuestbookReply, deleteGuestbookReply } from '@/features/guestbook';

// PATCH: 답글 수정
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ replyId: string }> }
) {
  try {
    const { replyId } = await params;
    const body = await request.json();
    const { message } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: '답글 내용을 입력해주세요.' }, { status: 400 });
    }

    const result = await updateGuestbookReply(replyId, message);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating reply:', error);
    return NextResponse.json({ error: '답글 수정에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 답글 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ replyId: string }> }
) {
  try {
    const { replyId } = await params;
    const result = await deleteGuestbookReply(replyId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reply:', error);
    return NextResponse.json({ error: '답글 삭제에 실패했습니다.' }, { status: 500 });
  }
}
