// Timeline 관련 타입 정의
// Supabase 스키마와 동기화됨

export interface TimelineTrack {
  id: string;
  timeline_id: string;
  name: string;
  track_num: number;
  is_title: boolean;
  sort_order: number;
}

export interface Timeline {
  id: string;
  date: string;
  type: 'music' | 'featuring' | 'career' | 'gap' | 'activity';
  tag: string;
  title: string;
  cover: string | null;
  artist: string | null;
  album: string | null;
  role: string | null;
  description: string | null;
  link: string | null;
  is_title: boolean;
  sort_order: number;
  created_at: string;
}

export interface TimelineWithTracks extends Timeline {
  tracks: TimelineTrack[];
}

// 컴포넌트에서 사용하는 변환된 타입
export interface TimelineItem {
  year: string;
  type: 'music' | 'featuring' | 'career' | 'gap' | 'activity';
  tag: string;
  title: string;
  cover?: string;
  artist?: string;
  album?: string;
  role?: string;
  desc?: string;
  link?: string;
  isTitle?: boolean;
  trackNum?: number;
  tracks?: (string | { name: string; isTitle?: boolean })[];
  featTracks?: { name: string; trackNum: number; isTitle?: boolean }[];
}
