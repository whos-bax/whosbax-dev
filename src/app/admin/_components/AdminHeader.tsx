'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';
import styles from '../admin.module.scss';

const pageTitles: Record<string, string> = {
  '/admin': '대시보드',
  '/admin/analytics': 'Analytics',
  '/admin/timeline': 'Timeline 관리',
  '/admin/experience': 'Experience 관리',
  '/admin/skills': 'Skills 관리',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getTitle = () => {
    // 정확한 매칭 먼저 확인
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }
    // 부분 매칭 확인
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname.startsWith(path) && path !== '/admin') {
        return title;
      }
    }
    return 'Admin';
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.headerTitle}>{getTitle()}</h2>
      <div className={styles.headerActions}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          로그아웃
        </button>
      </div>
    </header>
  );
}
