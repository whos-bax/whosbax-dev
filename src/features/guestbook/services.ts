import { supabase } from '@/shared/lib/supabase';
import bcrypt from 'bcryptjs';
import type { GuestbookPublic, GuestbookInput } from './types';

const SALT_ROUNDS = 10;

// 방명록 목록 조회
export async function getGuestbookEntries(): Promise<GuestbookPublic[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('guestbook')
    .select('id, nickname, message, created_at')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guestbook:', error);
    return [];
  }

  return data || [];
}

// 방명록 작성
export async function createGuestbookEntry(input: GuestbookInput): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  // 비밀번호 해시
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const { error } = await (supabase as any)
    .from('guestbook')
    .insert({
      nickname: input.nickname.trim(),
      password: hashedPassword,
      message: input.message.trim(),
    });

  if (error) {
    console.error('Error creating guestbook entry:', error);
    return { success: false, error: '방명록 작성에 실패했습니다.' };
  }

  return { success: true };
}

// 방명록 삭제 (비밀번호 확인)
export async function deleteGuestbookEntry(id: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) throw new Error('Supabase client not configured');

  // 먼저 해당 항목의 비밀번호 해시 가져오기
  const { data: entry, error: fetchError } = await (supabase as any)
    .from('guestbook')
    .select('password')
    .eq('id', id)
    .single();

  if (fetchError || !entry) {
    return { success: false, error: '방명록을 찾을 수 없습니다.' };
  }

  // 비밀번호 확인
  const isValid = await bcrypt.compare(password, entry.password);
  if (!isValid) {
    return { success: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  // 삭제 대신 숨김 처리 (soft delete)
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

// Admin: 전체 방명록 조회 (숨김 포함)
export async function getGuestbookEntriesAdmin(): Promise<(GuestbookPublic & { is_hidden: boolean })[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('guestbook')
    .select('id, nickname, message, created_at, is_hidden')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guestbook admin:', error);
    return [];
  }

  return data || [];
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
