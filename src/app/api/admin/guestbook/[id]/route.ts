import { NextResponse } from 'next/server';
import { supabase } from '@/shared/lib/supabase';

// PATCH: 복원 (is_hidden = false)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { error } = await (supabase as any)
      .from('guestbook')
      .update({ is_hidden: false })
      .eq('id', id);

    if (error) {
      console.error('Error restoring guestbook:', error);
      return NextResponse.json({ error: '복원에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error restoring guestbook:', error);
    return NextResponse.json({ error: '복원에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 숨김 (soft delete, is_hidden = true)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('DELETE request for id:', id);

    if (!supabase) {
      console.error('Supabase client is null');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    console.log('Attempting to update is_hidden to true');
    const { data, error } = await (supabase as any)
      .from('guestbook')
      .update({ is_hidden: true })
      .eq('id', id)
      .select();

    console.log('Update result - data:', data, 'error:', error);

    if (error) {
      console.error('Error hiding guestbook:', error);
      return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Catch error hiding guestbook:', error);
    return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
  }
}
