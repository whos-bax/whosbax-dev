'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@/features/auth';
import Icons from '@/app/_component/headerIcon/icons';
import styles from '../admin.module.scss';

const pageTitles: Record<string, string> = {
  '/admin': '대시보드',
  '/admin/analytics': 'Analytics',
  '/admin/timeline': 'Timeline 관리',
  '/admin/experience': 'Experience 관리',
  '/admin/skills': 'Skills 관리',
};

const navItems = [
  { href: '/admin', label: '대시보드', icon: '📊' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { divider: true },
  { href: '/admin/timeline', label: 'Timeline', icon: '📅' },
  { href: '/admin/experience', label: 'Experience', icon: '💼' },
  { href: '/admin/skills', label: 'Skills', icon: '🛠️' },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getTitle = () => {
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname.startsWith(path) && path !== '/admin') {
        return title;
      }
    }
    return 'Admin';
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <Icons.close /> : <Icons.hamburger />}
        </button>
        <h2 className={styles.headerTitle}>{getTitle()}</h2>
      </div>

      <nav className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item, index) => {
            if ('divider' in item) {
              return <li key={index} className={styles.mobileNavDivider} />;
            }
            return (
              <li
                key={item.href}
                className={`${styles.mobileNavItem} ${isActive(item.href) ? styles.active : ''}`}
              >
                <Link href={item.href} onClick={handleNavClick}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className={styles.mobileNavDivider} />
          <li className={styles.mobileNavItem}>
            <button onClick={handleLogout} className={styles.mobileLogoutButton}>
              <span>🚪</span>
              <span>로그아웃</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
