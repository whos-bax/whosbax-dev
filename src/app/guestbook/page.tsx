'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './guestbook.module.scss';
import type { GuestbookWithReplies } from '@/features/guestbook';
import AuthorBadge from '@/app/_component/AuthorBadge';
import WriteForm from './_components/WriteForm';

type ModalType = 'edit' | 'delete' | null;
type SelectedEntry = { id: number; nickname: string; message: string } | null;

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookWithReplies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedEntry, setSelectedEntry] = useState<SelectedEntry>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Modal form state (수정/삭제용)
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

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  const resetForm = () => {
    setPassword('');
    setMessage('');
    setError(null);
    setSelectedEntry(null);
  };

  const openEditModal = (entry: GuestbookWithReplies) => {
    setSelectedEntry({ id: entry.id, nickname: entry.nickname, message: entry.message });
    setMessage(entry.message);
    setPassword('');
    setError(null);
    setModalType('edit');
    setOpenMenuId(null);
  };

  const openDeleteModal = (entry: GuestbookWithReplies) => {
    setSelectedEntry({ id: entry.id, nickname: entry.nickname, message: entry.message });
    setPassword('');
    setError(null);
    setModalType('delete');
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setModalType(null);
    resetForm();
  };

  // 수정
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntry) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/guestbook/${selectedEntry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '수정에 실패했습니다.');
        return;
      }

      closeModal();
      fetchEntries();
    } catch {
      setError('수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!selectedEntry || !password) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/guestbook/${selectedEntry.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '삭제에 실패했습니다.');
        return;
      }

      closeModal();
      fetchEntries();
    } catch {
      setError('삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const handlePasswordChange = (value: string) => {
    setPassword(value.replace(/[^0-9]/g, '').slice(0, 4));
  };

  return (
    <main className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.title}>방명록</h1>
        <p className={styles.subtitle}>소중한 한마디를 남겨주세요</p>
      </header>

      {/* 작성 폼 */}
      <WriteForm onSuccess={fetchEntries} />

      {/* 방명록 목록 */}
      <section className={styles.listSection}>
        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : entries.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 방명록이 없습니다</p>
            <span>첫 번째 글을 남겨주세요!</span>
          </div>
        ) : (
          <ul className={styles.list}>
            {entries.map((entry) => (
              <li key={entry.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <AuthorBadge name={entry.nickname} date={entry.created_at} />
                  <div className={styles.menuWrapper}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === entry.id ? null : entry.id);
                      }}
                      className={styles.menuButton}
                      aria-label="메뉴"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>
                    {openMenuId === entry.id && (
                      <div className={styles.menuDropdown}>
                        <button onClick={() => openEditModal(entry)}>수정</button>
                        <button onClick={() => openDeleteModal(entry)}>삭제</button>
                      </div>
                    )}
                  </div>
                </div>
                <p className={styles.message}>{entry.message}</p>

                {/* 관리자 답글 */}
                {entry.replies && entry.replies.length > 0 && (
                  <div className={styles.replies}>
                    {entry.replies.map((reply) => (
                      <div key={reply.id} className={styles.reply}>
                        <AuthorBadge
                          name="박상호"
                          date={reply.created_at}
                          avatarUrl="/assets/images/profile.jpg"
                        />
                        <p className={styles.replyMessage}>{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 수정 모달 */}
      {modalType === 'edit' && selectedEntry && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>방명록 수정</h2>
              <button onClick={closeModal} className={styles.closeButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEdit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="editMessage">메시지</label>
                <textarea
                  id="editMessage"
                  placeholder="남기고 싶은 말을 작성해주세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  required
                  rows={4}
                />
                <span className={styles.charCount}>{message.length}/500</span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editPassword">비밀번호</label>
                <input
                  id="editPassword"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  placeholder="숫자 4자리"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  maxLength={4}
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? '수정 중...' : '수정하기'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 삭제 모달 */}
      {modalType === 'delete' && selectedEntry && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>방명록 삭제</h2>
              <button onClick={closeModal} className={styles.closeButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={styles.deleteContent}>
              <p><strong>{selectedEntry.nickname}</strong>님의 글을 삭제합니다.</p>
              <div className={styles.formGroup}>
                <label htmlFor="deletePassword">비밀번호</label>
                <input
                  id="deletePassword"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{4}"
                  placeholder="숫자 4자리"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  maxLength={4}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.deleteActions}>
                <button onClick={closeModal} className={styles.cancelButton}>
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className={styles.deleteButton}
                >
                  {isSubmitting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
