import TimelineForm from '../../../_components/TimelineForm';
import styles from '../../../admin.module.scss';

export default function NewTimelinePage() {
  return (
    <div className={styles.adminPage}>
      <TimelineForm mode="create" />
    </div>
  );
}
