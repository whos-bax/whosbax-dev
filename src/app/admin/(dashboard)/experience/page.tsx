import Link from 'next/link';
import { getExperienceSummary, getExperienceDetail } from '@/features/experience';
import styles from '../../admin.module.scss';

export default async function ExperienceAdminPage() {
  const [summaryData, detailData] = await Promise.all([
    getExperienceSummary().catch(() => []),
    getExperienceDetail().catch(() => []),
  ]);

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h1>경력 관리</h1>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>경력 요약 (Summary)</h2>
          <Link href="/admin/experience/summary/new" className={styles.addButton}>
            + 새 경력 추가
          </Link>
        </div>
        <div className={styles.dataList}>
          {summaryData.length === 0 ? (
            <p className={styles.emptyText}>등록된 경력 요약이 없습니다.</p>
          ) : (
            summaryData.map((item) => (
              <div key={item.id} className={styles.dataCard}>
                <div className={styles.dataCardInfo}>
                  <h3>{item.company_name}</h3>
                  <p className={styles.dateMeta}>
                    {item.start_date} ~ {item.end_date || '현재'}
                  </p>
                  <p className={styles.positionCount}>
                    {item.positions.length}개 포지션
                  </p>
                </div>
                <div className={styles.dataCardActions}>
                  <Link href={`/admin/experience/summary/${item.id}`} className={styles.editButton}>
                    수정
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>경력 상세 (Detail)</h2>
          <Link href="/admin/experience/detail/new" className={styles.addButton}>
            + 새 프로젝트 추가
          </Link>
        </div>
        <div className={styles.dataList}>
          {detailData.length === 0 ? (
            <p className={styles.emptyText}>등록된 경력 상세가 없습니다.</p>
          ) : (
            detailData.map((group) => (
              <div key={group.company} className={styles.companyGroup}>
                <h3 className={styles.companyName}>{group.company}</h3>
                {group.list.map((item) => (
                  <div key={item.id} className={styles.dataCard}>
                    <div className={styles.dataCardInfo}>
                      <h4>{item.project_title}</h4>
                      <p className={styles.dateMeta}>
                        {item.start_date} ~ {item.end_date || '현재'}
                      </p>
                    </div>
                    <div className={styles.dataCardActions}>
                      <Link href={`/admin/experience/detail/${item.id}`} className={styles.editButton}>
                        수정
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
