import { NextResponse } from 'next/server';
import { deleteGuestbookEntryAdmin, toggleGuestbookVisibility } from '@/features/guestbook';

// PATCH: 숨김/복원 토글
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await toggleGuestbookVisibility(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error toggling guestbook visibility:', error);
    return NextResponse.json({ error: '변경에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 완전 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteGuestbookEntryAdmin(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting guestbook entry:', error);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
