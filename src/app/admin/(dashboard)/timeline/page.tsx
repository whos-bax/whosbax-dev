import Link from 'next/link';
import { getTimeline } from '@/features/timeline';
import TimelineList from '../../_components/TimelineList';
import styles from '../../admin.module.scss';

export default async function TimelineAdminPage() {
  const timeline = await getTimeline();

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <span className={styles.totalCount}>총 {timeline.length}개</span>
        <Link href="/admin/timeline/new" className={styles.addButton}>
          + 추가
        </Link>
      </div>
      <TimelineList initialData={timeline} />
    </div>
  );
}
