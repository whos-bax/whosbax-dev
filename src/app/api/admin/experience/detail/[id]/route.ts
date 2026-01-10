import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { getExperienceDetailById, updateExperienceDetail, deleteExperienceDetail } from '@/features/experience';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const data = await getExperienceDetailById(id);

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(data);
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
    const updated = await updateExperienceDetail(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update experience detail error:', error);
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
    await deleteExperienceDetail(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete experience detail error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
