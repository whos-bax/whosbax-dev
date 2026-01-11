import Link from 'next/link';
import { getSkills } from '@/features/skills';
import SkillsList from '../../_components/SkillsList';
import styles from '../../admin.module.scss';

export default async function SkillsAdminPage() {
  const skills = await getSkills().catch(() => []);

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <Link href="/admin/skills/new" className={styles.addButton}>
          + 새 스킬 추가
        </Link>
      </div>

      <SkillsList initialData={skills} />
    </div>
  );
}
