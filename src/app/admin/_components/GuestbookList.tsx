'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { GuestbookPublic } from '@/features/guestbook';
import styles from '../admin.module.scss';

interface GuestbookEntry extends GuestbookPublic {
  is_hidden: boolean;
}

interface Props {
  initialData: GuestbookEntry[];
}

export default function GuestbookList({ initialData }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleToggleVisibility = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error('변경 실패');

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_hidden: !item.is_hidden } : item
        )
      );
      toast.success('변경되었습니다.');
      router.refresh();
    } catch {
      toast.error('변경에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, nickname: string) => {
    if (!confirm(`"${nickname}"님의 방명록을 완전히 삭제하시겠습니까?`)) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('삭제되었습니다.');
      router.refresh();
    } catch {
      toast.error('삭제에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.guestbookList}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.guestbookCard} ${item.is_hidden ? styles.hidden : ''}`}
        >
          <div className={styles.guestbookCardHeader}>
            <div className={styles.guestbookCardInfo}>
              <span className={styles.guestbookNickname}>{item.nickname}</span>
              <span className={styles.guestbookDate}>{formatDate(item.created_at)}</span>
              {item.is_hidden && (
                <span className={styles.hiddenBadge}>숨김</span>
              )}
            </div>
            <div className={styles.guestbookCardActions}>
              <button
                onClick={() => handleToggleVisibility(item.id)}
                disabled={loadingId === item.id}
                className={styles.toggleButton}
              >
                {loadingId === item.id ? '...' : item.is_hidden ? '복원' : '숨김'}
              </button>
              <button
                onClick={() => handleDelete(item.id, item.nickname)}
                disabled={loadingId === item.id}
                className={styles.deleteButton}
              >
                {loadingId === item.id ? '...' : '삭제'}
              </button>
            </div>
          </div>
          <p className={styles.guestbookMessage}>{item.message}</p>
        </div>
      ))}
      {items.length === 0 && (
        <div className={styles.emptyState}>
          <p>등록된 방명록이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
