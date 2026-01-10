'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { TimelineWithTracks } from '@/features/timeline';
import styles from '../admin.module.scss';

interface Props {
  initialData: TimelineWithTracks[];
}

const TYPE_LABELS: Record<string, string> = {
  music: 'Music',
  featuring: 'Feat.',
  career: 'Career',
  gap: 'Gap Year',
  activity: 'Activity',
};

export default function TimelineList({ initialData }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 항목을 삭제하시겠습니까?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/timeline/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('삭제되었습니다.');
      router.refresh();
    } catch {
      toast.error('삭제에 실패했습니다.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.timelineList}>
      {items.map((item) => (
        <div key={item.id} className={styles.timelineCard}>
          <div className={styles.timelineCardLeft}>
            {item.cover ? (
              <Image
                src={item.cover}
                alt={item.title}
                width={48}
                height={48}
                className={styles.timelineCover}
              />
            ) : (
              <div className={styles.timelineCoverPlaceholder}>
                {item.type === 'music' ? '🎵' : item.type === 'career' ? '💼' : '📌'}
              </div>
            )}
            <div className={styles.timelineCardInfo}>
              <div className={styles.timelineCardMeta}>
                <span className={styles.timelineCardDate}>{item.date}</span>
                <span className={`${styles.timelineCardType} ${styles[item.type]}`}>
                  {TYPE_LABELS[item.type]}
                </span>
              </div>
              <h3 className={styles.timelineCardTitle}>{item.title}</h3>
              {item.artist && (
                <p className={styles.timelineCardArtist}>{item.artist}</p>
              )}
              {item.tracks.length > 0 && (
                <p className={styles.timelineCardTracks}>
                  {item.tracks.length}개 트랙
                </p>
              )}
            </div>
          </div>
          <div className={styles.timelineCardActions}>
            <Link
              href={`/admin/timeline/${item.id}`}
              className={styles.editButton}
            >
              수정
            </Link>
            <button
              onClick={() => handleDelete(item.id, item.title)}
              disabled={deletingId === item.id}
              className={styles.deleteButton}
            >
              {deletingId === item.id ? '...' : '삭제'}
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className={styles.emptyState}>
          <p>등록된 타임라인이 없습니다.</p>
          <Link href="/admin/timeline/new" className={styles.addButton}>
            첫 항목 추가하기
          </Link>
        </div>
      )}
    </div>
  );
}
