import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { getTimelineById, updateTimeline, deleteTimeline } from '@/features/timeline';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const timeline = await getTimelineById(id);

  if (!timeline) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(timeline);
}

export async function PATCH(
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
    const updated = await updateTimeline(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update timeline error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteTimeline(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete timeline error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
