import Link from 'next/link';
import { getDailyStats, getPaginatedPageViews } from '@/features/analytics';
import styles from '../../admin.module.scss';

interface Props {
  searchParams: Promise<{ page?: string }>;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatFullDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AnalyticsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);

  const [dailyStats, pageViews] = await Promise.all([
    getDailyStats(14),
    getPaginatedPageViews(currentPage, 15),
  ]);

  const maxViews = Math.max(...dailyStats.map((d) => d.views), 1);

  return (
    <div className={styles.analytics}>
      <h1>Analytics</h1>

      <section className={styles.chartSection}>
        <h2>일별 방문 추이 (최근 14일)</h2>
        <div className={styles.chartContainer}>
          <div className={styles.barChart}>
            {dailyStats.map((stat) => (
              <div key={stat.date} className={styles.barGroup}>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(stat.views / maxViews) * 100}%` }}
                  >
                    {stat.views > 0 && (
                      <span className={styles.barValue}>{stat.views}</span>
                    )}
                  </div>
                </div>
                <span className={styles.barLabel}>{formatDate(stat.date)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chartLegend}>
          <span>총 조회수: {dailyStats.reduce((sum, d) => sum + d.views, 0)}</span>
          <span>총 방문자: {dailyStats.reduce((sum, d) => sum + d.unique, 0)}</span>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2>전체 페이지뷰</h2>
          <span className={styles.totalCount}>총 {pageViews.total}건</span>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>경로</th>
                <th>세션 ID</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {pageViews.data.map((view) => (
                <tr key={view.id}>
                  <td className={styles.pathCell}>{view.page_path}</td>
                  <td className={styles.sessionCell}>{view.session_id.slice(0, 8)}...</td>
                  <td className={styles.timeCell}>{formatFullDate(view.created_at)}</td>
                </tr>
              ))}
              {pageViews.data.length === 0 && (
                <tr>
                  <td colSpan={3} className={styles.emptyCell}>
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pageViews.totalPages > 1 && (
          <div className={styles.pagination}>
            <Link
              href={`/admin/analytics?page=${currentPage - 1}`}
              className={`${styles.pageButton} ${currentPage <= 1 ? styles.disabled : ''}`}
              aria-disabled={currentPage <= 1}
            >
              이전
            </Link>
            <span className={styles.pageInfo}>
              {currentPage} / {pageViews.totalPages}
            </span>
            <Link
              href={`/admin/analytics?page=${currentPage + 1}`}
              className={`${styles.pageButton} ${currentPage >= pageViews.totalPages ? styles.disabled : ''}`}
              aria-disabled={currentPage >= pageViews.totalPages}
            >
              다음
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
