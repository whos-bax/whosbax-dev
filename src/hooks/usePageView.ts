'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SESSION_ID_KEY = 'whosbax_session_id';
const SESSION_DATE_KEY = 'whosbax_session_date';

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  const today = getTodayDateString();
  const storedDate = localStorage.getItem(SESSION_DATE_KEY);

  // 날짜가 바뀌면 세션 초기화
  if (storedDate !== today) {
    localStorage.setItem(SESSION_DATE_KEY, today);
    localStorage.removeItem(SESSION_ID_KEY);
  }

  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

async function updateViewedAt(recordId: number): Promise<void> {
  if (!supabase) return;

  try {
    await supabase
      .from('page_views')
      .update({ viewed_at: new Date().toISOString() } as never)
      .eq('id', recordId);
  } catch (err) {
    console.error('Failed to update page view:', err);
  }
}

export function usePageView() {
  const pathname = usePathname();
  const currentRecordIdRef = useRef<number | null>(null);
  const isRecordingRef = useRef<boolean>(false);

  // Record page view on every navigation
  useEffect(() => {
    if (!supabase) return;
    if (!pathname) return;
    if (isRecordingRef.current) return;

    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    isRecordingRef.current = true;

    const recordView = async () => {
      try {
        const client = supabase;
        if (!client) return;

        const { data, error } = await client
          .from('page_views')
          .insert({
            page_path: pathname,
            session_id: sessionId,
          } as never)
          .select('id')
          .single();

        if (!error && data) {
          currentRecordIdRef.current = (data as { id: number }).id;
        }
      } catch (err) {
        console.error('Failed to record page view:', err);
      } finally {
        isRecordingRef.current = false;
      }
    };

    recordView();
  }, [pathname]);

  // Update viewed_at when leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentRecordIdRef.current) {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/page_views?id=eq.${currentRecordIdRef.current}`;

        // fetch with keepalive allows the request to complete even after page unload
        fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ viewed_at: new Date().toISOString() }),
          keepalive: true,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (currentRecordIdRef.current) {
        updateViewedAt(currentRecordIdRef.current);
      }
    };
  }, [pathname]);
}
