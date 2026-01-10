import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { updateMusicTrack, deleteMusicTrack } from '@/features/timeline';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; trackId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackId } = await params;
  const body = await request.json();

  try {
    const track = await updateMusicTrack(trackId, body);
    return NextResponse.json(track);
  } catch (error) {
    console.error('Update track error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; trackId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { trackId } = await params;

  try {
    await deleteMusicTrack(trackId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete track error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
