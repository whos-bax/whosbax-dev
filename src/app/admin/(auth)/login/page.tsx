'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { toast } from 'sonner';
import styles from '../../admin.module.scss';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      toast.success('로그인 성공!');
      window.location.href = '/admin';
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Admin Login</h1>

        {error && <p className={styles.loginError}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.loginButton}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <Link href="/" className={styles.backLink}>
          ← 사이트로 돌아가기
        </Link>
      </form>
    </div>
  );
}
