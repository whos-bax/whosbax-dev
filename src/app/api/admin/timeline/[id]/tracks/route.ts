import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { createTimelineTrack } from '@/features/timeline';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    const track = await createTimelineTrack({
      timeline_id: id,
      ...body,
    });
    return NextResponse.json(track);
  } catch (error) {
    console.error('Create track error:', error);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
