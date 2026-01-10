'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Skill } from '@/features/skills';
import styles from '../admin.module.scss';

interface Props {
  initialData: Skill[];
}

export default function SkillsList({ initialData }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 스킬을 삭제하시겠습니까?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
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

  // Group by category
  const grouped = items.reduce(
    (acc, skill) => {
      const category = skill.category || '기타';
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className={styles.skillsList}>
      {Object.keys(grouped).length === 0 ? (
        <div className={styles.emptyState}>
          <p>등록된 스킬이 없습니다.</p>
          <Link href="/admin/skills/new" className={styles.addButton}>
            첫 스킬 추가하기
          </Link>
        </div>
      ) : (
        Object.entries(grouped).map(([category, skills]) => (
          <div key={category} className={styles.skillCategory}>
            <h3>{category}</h3>
            <div className={styles.skillTags}>
              {skills.map((skill) => (
                <div key={skill.id} className={styles.skillTag}>
                  <span>{skill.name}</span>
                  <div className={styles.skillTagActions}>
                    <Link href={`/admin/skills/${skill.id}`} className={styles.editIcon}>
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id, skill.name)}
                      disabled={deletingId === skill.id}
                      className={styles.deleteIcon}
                    >
                      {deletingId === skill.id ? '...' : '×'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
