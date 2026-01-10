import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { getExperienceDetail, createExperienceDetail } from '@/features/experience';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getExperienceDetail();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Get experience detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await createExperienceDetail(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Create experience detail error:', error);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
