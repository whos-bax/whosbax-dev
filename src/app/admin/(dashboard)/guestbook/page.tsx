import { getGuestbookEntriesAdmin } from '@/features/guestbook';
import GuestbookList from '../../_components/GuestbookList';
import styles from '../../admin.module.scss';

export default async function GuestbookAdminPage() {
  const entries = await getGuestbookEntriesAdmin().catch(() => []);

  return (
    <div className={styles.adminPage}>
      <GuestbookList initialData={entries} />
    </div>
  );
}
