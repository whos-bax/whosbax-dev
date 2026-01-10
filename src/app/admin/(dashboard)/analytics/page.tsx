import Link from 'next/link';
import {
  getDailyStats,
  getPaginatedPageViews,
  getAllPageViewCounts,
} from '@/features/analytics';
import { DailyVisitorChart, PageViewPieChart } from '../../_components/AnalyticsCharts';
import DateRangePicker from '../../_components/DateRangePicker';
import styles from '../../admin.module.scss';

interface Props {
  searchParams: Promise<{ page?: string; days?: string; start?: string; end?: string }>;
}

const VALID_DAY_OPTIONS = [1, 3, 7, 14, 30, 90];

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
  const days = parseInt(params.days || '3', 10);
  const startDate = params.start;
  const endDate = params.end;

  const isCustomRange = startDate && endDate;
  const validDays = VALID_DAY_OPTIONS.includes(days) ? days : 3;

  const [dailyStats, pageViews, pageStats] = await Promise.all([
    isCustomRange
      ? getDailyStats(undefined, startDate, endDate)
      : getDailyStats(validDays),
    getPaginatedPageViews(currentPage, 15),
    isCustomRange
      ? getAllPageViewCounts(undefined, startDate, endDate)
      : getAllPageViewCounts(validDays),
  ]);

  const sortedPageStats = pageStats.sort((a, b) => b.count - a.count);

  const paginationQuery = isCustomRange
    ? `start=${startDate}&end=${endDate}`
    : `days=${validDays}`;

  return (
    <div className={styles.analytics}>
      <div className={styles.filterSection}>
        <DateRangePicker />
      </div>

      <div className={styles.chartsGrid}>
        <section className={styles.chartSection}>
          <h2>일별 방문 추이</h2>
          <DailyVisitorChart data={dailyStats} />
          <div className={styles.chartSummary}>
            <span>총 조회수: {dailyStats.reduce((sum, d) => sum + d.views, 0)}</span>
            <span>총 방문자: {dailyStats.reduce((sum, d) => sum + d.unique, 0)}</span>
          </div>
        </section>

        <section className={styles.chartSection}>
          <h2>페이지별 조회수</h2>
          <PageViewPieChart data={sortedPageStats} />
        </section>
      </div>

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
                  <td className={styles.sessionCell}>{view.session_id.slice(0, 4)}</td>
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
              href={`/admin/analytics?${paginationQuery}&page=${currentPage - 1}`}
              className={`${styles.pageButton} ${currentPage <= 1 ? styles.disabled : ''}`}
              aria-disabled={currentPage <= 1}
            >
              이전
            </Link>
            <span className={styles.pageInfo}>
              {currentPage} / {pageViews.totalPages}
            </span>
            <Link
              href={`/admin/analytics?${paginationQuery}&page=${currentPage + 1}`}
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
