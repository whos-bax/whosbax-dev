import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { getSkills, createSkill } from '@/features/skills';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getSkills();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Get skills error:', error);
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
    const data = await createSkill(body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
