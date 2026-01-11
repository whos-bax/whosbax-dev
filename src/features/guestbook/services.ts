import { supabase } from '@/shared/lib/supabase';
import type { GuestbookPublic, GuestbookInput, GuestbookWithReplies, GuestbookReplyType } from './types';

// 방명록 목록 조회 (답글 포함)
export async function getGuestbookEntries(): Promise<GuestbookWithReplies[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: entries, error } = await (supabase as any)
    .from('guestbook')
    .select('id, nickname, message, created_at')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guestbook:', error);
    return [];
  }

  if (!entries || entries.length === 0) return [];

  // 답글 조회
  const entryIds = entries.map((e: GuestbookPublic) => e.id);
  const { data: replies, error: repliesError } = await (supabase as any)
    .from('guestbook_replies')
    .select('id, guestbook_id, message, created_at')
    .in('guestbook_id', entryIds)
    .order('created_at', { ascending: true });

  if (repliesError) {
    console.error('Error fetching replies:', repliesError);
  }

  // 방명록에 답글 매핑
  const repliesMap = new Map<number, GuestbookReplyType[]>();
  (replies || []).forEach((reply: GuestbookReplyType) => {
    const existing = repliesMap.get(reply.guestbook_id) || [];
    existing.push(reply);
    repliesMap.set(reply.guestbook_id, existing);
  });

  return entries.map((entry: GuestbookPublic) => ({
    ...entry,
    replies: repliesMap.get(entry.id) || [],
  }));
}

// 방명록 작성
export async function createGuestbookEntry(input: GuestbookInput): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await (supabase as any)
    .from('guestbook')
    .insert({
      nickname: input.nickname.trim(),
      pin: input.pin, // 평문 저장 (4자리 숫자)
      message: input.message.trim(),
    });

  if (error) {
    console.error('Error creating guestbook entry:', error);
    return { success: false, error: '방명록 작성에 실패했습니다.' };
  }

  return { success: true };
}

// 방명록 삭제 (비밀번호 확인)
export async function deleteGuestbookEntry(id: string, pin: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  // 해당 항목의 비밀번호 가져오기
  const { data: entry, error: fetchError } = await (supabase as any)
    .from('guestbook')
    .select('pin')
    .eq('id', id)
    .single();

  if (fetchError || !entry) {
    return { success: false, error: '방명록을 찾을 수 없습니다.' };
  }

  // 비밀번호 확인
  if (entry.pin !== pin) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  // 숨김 처리 (soft delete)
  const { error: updateError } = await (supabase as any)
    .from('guestbook')
    .update({ is_hidden: true })
    .eq('id', id);

  if (updateError) {
    console.error('Error deleting guestbook entry:', updateError);
    return { success: false, error: '삭제에 실패했습니다.' };
  }

  return { success: true };
}

// 방명록 수정 (비밀번호 확인)
export async function updateGuestbookEntry(id: string, pin: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  // 해당 항목의 비밀번호 가져오기
  const { data: entry, error: fetchError } = await (supabase as any)
    .from('guestbook')
    .select('pin')
    .eq('id', id)
    .single();

  if (fetchError || !entry) {
    return { success: false, error: '방명록을 찾을 수 없습니다.' };
  }

  // 비밀번호 확인
  if (entry.pin !== pin) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  // 메시지 수정
  const { error: updateError } = await (supabase as any)
    .from('guestbook')
    .update({ message: message.trim() })
    .eq('id', id);

  if (updateError) {
    console.error('Error updating guestbook entry:', updateError);
    return { success: false, error: '수정에 실패했습니다.' };
  }

  return { success: true };
}

// Admin: 전체 방명록 조회 (숨김 포함, 답글 포함)
export async function getGuestbookEntriesAdmin(): Promise<(GuestbookPublic & { is_hidden: boolean; replies: GuestbookReplyType[] })[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: entries, error } = await (supabase as any)
    .from('guestbook')
    .select('id, nickname, message, created_at, is_hidden')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guestbook admin:', error);
    return [];
  }

  if (!entries || entries.length === 0) return [];

  // 답글 조회
  const entryIds = entries.map((e: GuestbookPublic) => e.id);
  const { data: replies, error: repliesError } = await (supabase as any)
    .from('guestbook_replies')
    .select('id, guestbook_id, message, created_at')
    .in('guestbook_id', entryIds)
    .order('created_at', { ascending: true });

  if (repliesError) {
    console.error('Error fetching replies:', repliesError);
  }

  // 방명록에 답글 매핑
  const repliesMap = new Map<number, GuestbookReplyType[]>();
  (replies || []).forEach((reply: GuestbookReplyType) => {
    const existing = repliesMap.get(reply.guestbook_id) || [];
    existing.push(reply);
    repliesMap.set(reply.guestbook_id, existing);
  });

  return entries.map((entry: GuestbookPublic & { is_hidden: boolean }) => ({
    ...entry,
    replies: repliesMap.get(entry.id) || [],
  }));
}

// Admin: 방명록 숨김/복원 토글
export async function toggleGuestbookVisibility(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  // 현재 상태 확인
  const { data: entry, error: fetchError } = await (supabase as any)
    .from('guestbook')
    .select('is_hidden')
    .eq('id', id)
    .single();

  if (fetchError || !entry) {
    return { success: false, error: '방명록을 찾을 수 없습니다.' };
  }

  // 토글
  const { error: updateError } = await (supabase as any)
    .from('guestbook')
    .update({ is_hidden: !entry.is_hidden })
    .eq('id', id);

  if (updateError) {
    console.error('Error toggling guestbook visibility:', updateError);
    return { success: false, error: '변경에 실패했습니다.' };
  }

  return { success: true };
}

// Admin: 방명록 완전 삭제
export async function deleteGuestbookEntryAdmin(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await (supabase as any)
    .from('guestbook')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting guestbook entry:', error);
    return { success: false, error: '삭제에 실패했습니다.' };
  }

  return { success: true };
}

// =============================================
// 답글 관련 함수 (Admin 전용)
// =============================================

// Admin: 답글 작성
export async function createGuestbookReply(guestbookId: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await (supabase as any)
    .from('guestbook_replies')
    .insert({
      guestbook_id: guestbookId,
      message: message.trim(),
    });

  if (error) {
    console.error('Error creating reply:', error);
    return { success: false, error: '답글 작성에 실패했습니다.' };
  }

  return { success: true };
}

// Admin: 답글 수정
export async function updateGuestbookReply(replyId: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await (supabase as any)
    .from('guestbook_replies')
    .update({ message: message.trim() })
    .eq('id', replyId);

  if (error) {
    console.error('Error updating reply:', error);
    return { success: false, error: '답글 수정에 실패했습니다.' };
  }

  return { success: true };
}

// Admin: 답글 삭제
export async function deleteGuestbookReply(replyId: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await (supabase as any)
    .from('guestbook_replies')
    .delete()
    .eq('id', replyId);

  if (error) {
    console.error('Error deleting reply:', error);
    return { success: false, error: '답글 삭제에 실패했습니다.' };
  }

  return { success: true };
}
