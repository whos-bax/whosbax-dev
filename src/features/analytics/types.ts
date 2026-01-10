// Analytics 관련 타입 정의

export interface PageView {
  id: number;
  page_path: string;
  session_id: string;
  created_at: string;
  viewed_at: string | null;
}

export interface PageViewInsert {
  page_path: string;
  session_id: string;
}

export interface DashboardStats {
  todayViews: number;
  todayUnique: number;
  totalViews: number;
  recentViews: PageView[];
  topPages: [string, number][];
}

export interface PageStat {
  page_path: string;
  count: number;
}

export interface DailyStat {
  date: string;
  views: number;
  unique: number;
}

export interface PaginatedPageViews {
  data: PageView[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
