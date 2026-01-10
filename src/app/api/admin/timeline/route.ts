import { NextResponse } from 'next/server';
import { getSession } from '@/features/auth';
import { createTimeline, getMaxSortOrder } from '@/features/timeline';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  try {
    // Get next sort_order if not provided
    if (body.sort_order === undefined) {
      const maxOrder = await getMaxSortOrder();
      body.sort_order = maxOrder + 1;
    }

    const created = await createTimeline(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error('Create timeline error:', error);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
