import { getGuestbookEntriesAdmin } from '@/features/guestbook';
import GuestbookList from '../../_components/GuestbookList';
import styles from '../../admin.module.scss';

export default async function GuestbookAdminPage() {
  const entries = await getGuestbookEntriesAdmin().catch(() => []);

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h1>방명록 관리</h1>
        <span className={styles.totalCount}>총 {entries.length}개</span>
      </div>
      <GuestbookList initialData={entries} />
    </div>
  );
}
