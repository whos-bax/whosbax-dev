'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FaSync } from 'react-icons/fa';
import type { GuestbookPublic, GuestbookReplyType } from '@/features/guestbook';
import styles from '../admin.module.scss';
import AuthorBadge from '@/app/_component/AuthorBadge';

interface GuestbookEntry extends GuestbookPublic {
  is_hidden: boolean;
  replies: GuestbookReplyType[];
}

interface Props {
  initialData: GuestbookEntry[];
}

export default function GuestbookList({ initialData }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/guestbook');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
      toast.success('목록을 새로고침했습니다.');
    } catch {
      toast.error('새로고침에 실패했습니다.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleRestore = async (id: number) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error('복원 실패');

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_hidden: false } : item
        )
      );
      toast.success('복원되었습니다.');
      router.refresh();
    } catch {
      toast.error('복원에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_hidden: true } : item
        )
      );
      toast.success('삭제되었습니다.');
      router.refresh();
    } catch {
      toast.error('삭제에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  // 답글 작성
  const handleCreateReply = async (guestbookId: number) => {
    if (!replyText.trim()) return;

    setLoadingId(guestbookId);
    try {
      const res = await fetch(`/api/admin/guestbook/${guestbookId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyText }),
      });

      if (!res.ok) throw new Error('답글 작성 실패');

      toast.success('답글이 작성되었습니다.');
      setReplyingId(null);
      setReplyText('');
      router.refresh();

      // 새로고침 후 데이터 갱신
      const listRes = await fetch('/api/admin/guestbook');
      const data = await listRes.json();
      setItems(data);
    } catch {
      toast.error('답글 작성에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  // 답글 수정
  const handleUpdateReply = async (replyId: number) => {
    if (!replyText.trim()) return;

    setLoadingId(replyId);
    try {
      const res = await fetch(`/api/admin/guestbook/replies/${replyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyText }),
      });

      if (!res.ok) throw new Error('답글 수정 실패');

      toast.success('답글이 수정되었습니다.');
      setEditingReplyId(null);
      setReplyText('');
      router.refresh();

      // 데이터 갱신
      const listRes = await fetch('/api/admin/guestbook');
      const data = await listRes.json();
      setItems(data);
    } catch {
      toast.error('답글 수정에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  // 답글 삭제
  const handleDeleteReply = async (replyId: number) => {
    if (!confirm('답글을 삭제하시겠습니까?')) return;

    setLoadingId(replyId);
    try {
      const res = await fetch(`/api/admin/guestbook/replies/${replyId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('답글 삭제 실패');

      toast.success('답글이 삭제되었습니다.');
      router.refresh();

      // 데이터 갱신
      const listRes = await fetch('/api/admin/guestbook');
      const data = await listRes.json();
      setItems(data);
    } catch {
      toast.error('답글 삭제에 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  const startEditReply = (reply: GuestbookReplyType) => {
    setEditingReplyId(reply.id);
    setReplyText(reply.message);
    setReplyingId(null);
  };

  const cancelEdit = () => {
    setEditingReplyId(null);
    setReplyingId(null);
    setReplyText('');
  };

  return (
    <>
      <div className={styles.listHeader}>
        <span className={styles.totalCount}>총 {items.length}개</span>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`${styles.refreshButton} ${isRefreshing ? styles.spinning : ''}`}
          aria-label="새로고침"
        >
          <FaSync />
        </button>
      </div>
      <div className={styles.guestbookList}>
        {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.guestbookCard} ${item.is_hidden ? styles.hidden : ''}`}
        >
          <div className={styles.guestbookCardHeader}>
            <div className={styles.guestbookCardInfo}>
              <AuthorBadge name={item.nickname} date={item.created_at} />
              {item.is_hidden && (
                <span className={styles.hiddenBadge}>숨김</span>
              )}
            </div>
            <div className={styles.guestbookCardActions}>
              {item.is_hidden && (
                <button
                  onClick={() => handleRestore(item.id)}
                  disabled={loadingId === item.id}
                  className={styles.toggleButton}
                >
                  {loadingId === item.id ? '...' : '복원'}
                </button>
              )}
              {!item.is_hidden && (
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={loadingId === item.id}
                  className={styles.deleteButton}
                >
                  {loadingId === item.id ? '...' : '삭제'}
                </button>
              )}
            </div>
          </div>
          <p className={styles.guestbookMessage}>{item.message}</p>

          {/* 답글 목록 */}
          {item.replies && item.replies.length > 0 && (
            <div className={styles.adminCommentsSection}>
              {item.replies.map((reply) => (
                <div key={reply.id} className={styles.adminComment}>
                  {editingReplyId === reply.id && !item.is_hidden ? (
                    <div className={styles.commentForm}>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className={styles.commentTextarea}
                        rows={2}
                        placeholder="답글을 입력하세요"
                      />
                      <div className={styles.commentFormActions}>
                        <button
                          onClick={cancelEdit}
                          className={styles.cancelButton}
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleUpdateReply(reply.id)}
                          disabled={loadingId === reply.id || !replyText.trim()}
                          className={styles.submitButton}
                        >
                          {loadingId === reply.id ? '저장 중...' : '저장'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.adminCommentHeader}>
                        <AuthorBadge
                          name="박상호"
                          date={reply.created_at}
                          avatarUrl="/assets/images/profile.jpg"
                        />
                        {!item.is_hidden && (
                          <div className={styles.adminCommentActions}>
                            <button
                              onClick={() => startEditReply(reply)}
                              className={styles.editIcon}
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDeleteReply(reply.id)}
                              disabled={loadingId === reply.id}
                              className={styles.deleteIcon}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                      <p className={styles.adminCommentMessage}>{reply.message}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 답글 작성 폼 */}
          {replyingId === item.id ? (
            <div className={styles.commentFormWrapper}>
              <div className={styles.commentForm}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={styles.commentTextarea}
                  rows={2}
                  placeholder="답글을 입력하세요"
                  autoFocus
                />
                <div className={styles.commentFormActions}>
                  <button
                    onClick={cancelEdit}
                    className={styles.cancelButton}
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleCreateReply(item.id)}
                    disabled={loadingId === item.id || !replyText.trim()}
                    className={styles.submitButton}
                  >
                    {loadingId === item.id ? '작성 중...' : '작성'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            !item.is_hidden && (
              <button
                onClick={() => {
                  setReplyingId(item.id);
                  setEditingReplyId(null);
                  setReplyText('');
                }}
                className={styles.addCommentButton}
              >
                + 답글 작성
              </button>
            )
          )}
        </div>
      ))}
      {items.length === 0 && (
        <div className={styles.emptyState}>
          <p>등록된 방명록이 없습니다.</p>
        </div>
      )}
      </div>
    </>
  );
}
