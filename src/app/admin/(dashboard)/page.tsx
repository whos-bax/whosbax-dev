import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { PageView } from '@/type/supabase';
import styles from '../admin.module.scss';

async function getDashboardStats() {
  const supabase = await createServerSupabaseClient();

  const today = new Date().toISOString().split('T')[0];

  // 오늘 페이지뷰
  const { data: todayViews } = await supabase
    .from('page_views')
    .select('session_id')
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`);

  // 전체 페이지뷰
  const { count: totalViews } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true });

  // 최근 방문
  const { data: recentViews } = await supabase
    .from('page_views')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // 페이지별 조회수
  const { data: allViews } = await supabase
    .from('page_views')
    .select('page_path');

  const pageStats = (allViews as { page_path: string }[] | null)?.reduce((acc, { page_path }) => {
    acc[page_path] = (acc[page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const topPages = Object.entries(pageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const uniqueSessions = new Set(
    (todayViews as { session_id: string }[] | null)?.map((v) => v.session_id)
  ).size;

  return {
    todayViews: todayViews?.length || 0,
    todayUnique: uniqueSessions,
    totalViews: totalViews || 0,
    recentViews: (recentViews || []) as PageView[],
    topPages,
  };
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className={styles.dashboard}>
      <h1>대시보드</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>오늘 방문자</h3>
          <p className={styles.statValue}>{stats.todayUnique}</p>
        </div>
        <div className={styles.statCard}>
          <h3>오늘 페이지뷰</h3>
          <p className={styles.statValue}>{stats.todayViews}</p>
        </div>
        <div className={styles.statCard}>
          <h3>총 페이지뷰</h3>
          <p className={styles.statValue}>{stats.totalViews.toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.sectionsGrid}>
        <div className={styles.recentSection}>
          <h2>최근 방문</h2>
          <ul className={styles.recentList}>
            {stats.recentViews.map((view) => (
              <li key={view.id} className={styles.recentItem}>
                <span className={styles.path}>{view.page_path}</span>
                <span className={styles.time}>{formatTime(view.created_at)}</span>
              </li>
            ))}
            {stats.recentViews.length === 0 && (
              <li className={styles.recentItem}>
                <span className={styles.path}>아직 방문 기록이 없습니다.</span>
              </li>
            )}
          </ul>
        </div>

        <div className={styles.recentSection}>
          <h2>인기 페이지</h2>
          <ul className={styles.recentList}>
            {stats.topPages.map(([path, count]) => (
              <li key={path} className={styles.recentItem}>
                <span className={styles.path}>{path}</span>
                <span className={styles.time}>{count}회</span>
              </li>
            ))}
            {stats.topPages.length === 0 && (
              <li className={styles.recentItem}>
                <span className={styles.path}>아직 데이터가 없습니다.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
