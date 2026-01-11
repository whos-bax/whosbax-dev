'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './guestbook.module.scss';
import type { GuestbookPublic } from '@/features/guestbook';

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookPublic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Failed to fetch guestbook:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, password, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '작성에 실패했습니다.');
        return;
      }

      // 성공 시 폼 초기화 및 목록 갱신
      setNickname('');
      setPassword('');
      setMessage('');
      fetchEntries();
    } catch (err) {
      setError('작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || !deletePassword) return;

    try {
      const res = await fetch(`/api/guestbook/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '삭제에 실패했습니다.');
        return;
      }

      setDeleteId(null);
      setDeletePassword('');
      fetchEntries();
    } catch (err) {
      setError('삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>방명록</h1>
        <p className={styles.subtitle}>남기신 말씀 소중히 간직하겠습니다</p>
      </section>

      {/* 작성 폼 */}
      <section className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={50}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="비밀번호 (삭제 시 필요)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
              className={styles.input}
            />
          </div>
          <textarea
            placeholder="메시지를 남겨주세요 (최대 500자)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
            className={styles.textarea}
            rows={4}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? '작성 중...' : '작성하기'}
          </button>
        </form>
      </section>

      {/* 방명록 목록 */}
      <section className={styles.entriesSection}>
        {isLoading ? (
          <div className={styles.loading}>불러오는 중...</div>
        ) : entries.length === 0 ? (
          <div className={styles.empty}>
            아직 방명록이 없습니다. 첫 번째 글을 남겨주세요!
          </div>
        ) : (
          <ul className={styles.entries}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <span className={styles.nickname}>{entry.nickname}</span>
                  <span className={styles.date}>{formatDate(entry.created_at)}</span>
                </div>
                <p className={styles.message}>{entry.message}</p>
                <button
                  onClick={() => setDeleteId(entry.id)}
                  className={styles.deleteButton}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 삭제 확인 모달 */}
      {deleteId && (
        <div className={styles.modalOverlay} onClick={() => setDeleteId(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>방명록 삭제</h3>
            <p>비밀번호를 입력해주세요.</p>
            <input
              type="password"
              placeholder="비밀번호"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className={styles.input}
            />
            <div className={styles.modalButtons}>
              <button onClick={() => setDeleteId(null)} className={styles.cancelButton}>
                취소
              </button>
              <button onClick={handleDelete} className={styles.confirmButton}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
