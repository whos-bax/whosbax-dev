import { NextResponse } from 'next/server';
import { deleteGuestbookEntry } from '@/features/guestbook';

// DELETE: 방명록 삭제 (비밀번호 확인)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 });
    }

    const result = await deleteGuestbookEntry(id, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting guestbook entry:', error);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
