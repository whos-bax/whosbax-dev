import { NextResponse } from 'next/server';
import { getGuestbookEntries, createGuestbookEntry } from '@/features/guestbook';

// GET: 방명록 목록 조회
export async function GET() {
  try {
    const entries = await getGuestbookEntries();
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching guestbook:', error);
    return NextResponse.json({ error: '방명록을 불러오는데 실패했습니다.' }, { status: 500 });
  }
}

// POST: 방명록 작성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nickname, password: pin, message } = body;

    // 유효성 검사
    if (!nickname || !pin || !message) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    if (nickname.length > 50) {
      return NextResponse.json({ error: '닉네임은 50자 이내로 입력해주세요.' }, { status: 400 });
    }

    if (pin.length < 4) {
      return NextResponse.json({ error: '비밀번호는 4자 이상 입력해주세요.' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: '메시지는 500자 이내로 입력해주세요.' }, { status: 400 });
    }

    const result = await createGuestbookEntry({ nickname, pin, message });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating guestbook entry:', error);
    return NextResponse.json({ error: '방명록 작성에 실패했습니다.' }, { status: 500 });
  }
}
