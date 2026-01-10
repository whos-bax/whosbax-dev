import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { getExperienceSummaryById, updateExperienceSummary, deleteExperienceSummary } from '@/features/experience';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const data = await getExperienceSummaryById(id);

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
    const updated = await updateExperienceSummary(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update experience summary error:', error);
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
    await deleteExperienceSummary(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete experience summary error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
