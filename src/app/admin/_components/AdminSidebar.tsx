'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../admin.module.scss';

const navItems = [
  { href: '/admin', label: '대시보드', icon: '📊' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { divider: true },
  { href: '/admin/timeline', label: 'Timeline', icon: '📅' },
  { href: '/admin/experience', label: 'Experience', icon: '💼' },
  { href: '/admin/skills', label: 'Skills', icon: '🛠️' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h1>Admin</h1>
        <p>whosbax.dev</p>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item, index) => {
          if ('divider' in item) {
            return <li key={index} className={styles.navDivider} />;
          }
          return (
            <li
              key={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
            >
              <Link href={item.href}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
