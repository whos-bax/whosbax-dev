import { NextResponse } from 'next/server';
import { getGuestbookEntriesAdmin } from '@/features/guestbook';

// GET: 전체 방명록 조회 (숨김 포함)
export async function GET() {
  try {
    const entries = await getGuestbookEntriesAdmin();
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching guestbook admin:', error);
    return NextResponse.json({ error: '방명록을 불러오는데 실패했습니다.' }, { status: 500 });
  }
}
