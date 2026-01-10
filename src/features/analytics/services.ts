import { supabase } from '@/shared/lib/supabase';
import type {
  PageView,
  PageViewInsert,
  DashboardStats,
  PageStat,
  DailyStat,
  PaginatedPageViews,
} from './types';

// =============================================
// PAGE VIEW QUERIES
// =============================================
export async function insertPageView(data: PageViewInsert): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('page_views').insert(data as never);

  if (error) throw error;
}

export async function getPageViewCount(pagePath: string): Promise<number> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { count, error } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .eq('page_path', pagePath);

  if (error) throw error;
  return count || 0;
}

export async function getAllPageViewCounts(): Promise<PageStat[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await supabase.from('page_views').select('page_path');

  if (error) throw error;
  if (!data) return [];

  const counts = data.reduce(
    (acc, { page_path }) => {
      acc[page_path] = (acc[page_path] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(counts).map(([page_path, count]) => ({
    page_path,
    count,
  }));
}

export async function getRecentPageViews(limit: number = 50): Promise<PageView[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await supabase
    .from('page_views')
    .select('*')
    .order('viewed_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []) as PageView[];
}

// =============================================
// DASHBOARD STATS
// =============================================
export async function getDashboardStats(): Promise<DashboardStats> {
  if (!supabase) throw new Error('Supabase client not configured');

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
  const { data: allViews } = await supabase.from('page_views').select('page_path');

  const pageStats =
    (allViews as { page_path: string }[] | null)?.reduce(
      (acc, { page_path }) => {
        acc[page_path] = (acc[page_path] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const topPages = Object.entries(pageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) as [string, number][];

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

// =============================================
// ANALYTICS PAGE
// =============================================
export async function getDailyStats(days: number = 30): Promise<DailyStat[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('page_views')
    .select('created_at, session_id')
    .gte('created_at', startDate.toISOString());

  if (error) throw error;
  if (!data) return [];

  // 날짜별로 그룹핑
  const views = data as { created_at: string; session_id: string }[];
  const grouped = views.reduce(
    (acc, item) => {
      const date = item.created_at.split('T')[0];
      if (!acc[date]) {
        acc[date] = { views: 0, sessions: new Set<string>() };
      }
      acc[date].views++;
      acc[date].sessions.add(item.session_id);
      return acc;
    },
    {} as Record<string, { views: number; sessions: Set<string> }>
  );

  // 모든 날짜를 포함하도록 배열 생성
  const result: DailyStat[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const stat = grouped[dateStr];
    result.push({
      date: dateStr,
      views: stat?.views || 0,
      unique: stat?.sessions.size || 0,
    });
  }

  return result;
}

export async function getPaginatedPageViews(
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedPageViews> {
  if (!supabase) throw new Error('Supabase client not configured');

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('page_views')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const total = count || 0;

  return {
    data: (data || []) as PageView[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
