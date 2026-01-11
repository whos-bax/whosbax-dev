'use client';

import { useState } from 'react';
import styles from '../guestbook.module.scss';

interface WriteFormProps {
  onSuccess: () => void;
}

export default function WriteForm({ onSuccess }: WriteFormProps) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = (value: string) => {
    setPassword(value.replace(/[^0-9]/g, '').slice(0, 4));
  };

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

      // 폼 리셋
      setNickname('');
      setPassword('');
      setMessage('');
      setError(null);
      onSuccess();
    } catch {
      setError('작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = message.trim() && nickname.trim() && password.length === 4;

  return (
    <form onSubmit={handleSubmit} className={styles.writeForm}>
      <div className={styles.writeFormHeader}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={50}
          required
          className={styles.writeInput}
        />
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4}"
          placeholder="비밀번호 (숫자 4자리)"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          maxLength={4}
          required
          className={styles.writeInput}
        />
      </div>
      <textarea
        placeholder="남기고 싶은 말을 작성해주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={500}
        required
        rows={3}
        className={styles.writeTextarea}
      />
      {error && <p className={styles.writeError}>{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={styles.writeSubmit}
      >
        {isSubmitting ? '작성 중...' : '작성'}
      </button>
    </form>
  );
}
