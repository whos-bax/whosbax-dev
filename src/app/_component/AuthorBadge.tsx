'use client';

import styles from './authorBadge.module.scss';

interface AuthorBadgeProps {
  name: string;
  date: string;
  avatarUrl?: string;
  showTime?: boolean;
}

export default function AuthorBadge({ name, date, avatarUrl, showTime = true }: AuthorBadgeProps) {
  const initial = name.charAt(0).toUpperCase();

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(showTime && { hour: '2-digit', minute: '2-digit' }),
    };
    return dateObj.toLocaleDateString('ko-KR', options);
  };

  return (
    <div className={styles.authorBadge}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className={styles.avatar} />
      ) : (
        <div className={styles.avatarInitial}>{initial}</div>
      )}
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.date}>{formatDate(date)}</span>
      </div>
    </div>
  );
}
