import { supabase } from '@/shared/lib/supabase';
import type { Timeline, TimelineTrack, TimelineWithTracks, TimelineItem } from './types';

// =============================================
// API QUERIES
// =============================================
export async function getTimeline(): Promise<TimelineWithTracks[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: timeline, error } = await supabase
    .from('timeline')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!timeline) return [];

  const { data: tracks, error: tracksError } = await supabase
    .from('timeline_tracks')
    .select('*')
    .order('sort_order', { ascending: true });

  if (tracksError) throw tracksError;

  const timelineItems = timeline as Timeline[];
  const trackItems = (tracks || []) as TimelineTrack[];

  return timelineItems.map((item) => ({
    ...item,
    tracks: trackItems.filter((track) => track.timeline_id === item.id),
  }));
}

// =============================================
// DATA TRANSFORMATION
// =============================================
function transformTimelineData(data: TimelineWithTracks[]): TimelineItem[] {
  return data.map((item) => {
    const base: TimelineItem = {
      year: item.date,
      type: item.type,
      tag: item.tag,
      title: item.title,
    };

    if (item.cover) base.cover = item.cover;
    if (item.artist) base.artist = item.artist;
    if (item.album) base.album = item.album;
    if (item.role) base.role = item.role;
    if (item.description) base.desc = item.description;
    if (item.link) base.link = item.link;
    if (item.is_title) base.isTitle = item.is_title;

    if (item.tracks && item.tracks.length > 0) {
      if (item.type === 'music') {
        base.tracks = item.tracks.map((track) =>
          track.is_title ? { name: track.name, isTitle: true } : track.name
        );
      } else if (item.type === 'featuring') {
        if (item.tracks.length === 1) {
          base.trackNum = item.tracks[0].track_num;
        } else {
          base.featTracks = item.tracks.map((track) => ({
            name: track.name,
            trackNum: track.track_num,
            isTitle: track.is_title,
          }));
        }
      }
    }

    return base;
  });
}

// =============================================
// FALLBACK DATA
// =============================================
const fallbackTimelineData: TimelineItem[] = [
  {
    year: '2025.12.23',
    type: 'featuring',
    tag: 'Feat.',
    title: 'Blueprint (feat. whosbax)',
    artist: 'MAKO, Soo!',
    album: 'SUDAKO',
    trackNum: 2,
  },
  {
    year: '2025.05.22',
    type: 'music',
    tag: 'EP',
    title: "자리 (Where I've Been)",
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/where-ive-been.jpg',
    tracks: [
      'Now I Know',
      '진심 (I meant it)',
      { name: 'Comedy', isTitle: true },
      { name: '이르지 (Too Soon)', isTitle: true },
      "I'm a fool",
    ],
  },
  {
    year: '2025.04.21',
    type: 'career',
    tag: 'Career',
    title: '데이티움',
    role: 'Software Developer',
    desc: 'LLM 활용 블로그 콘텐츠 자동 생성 기능 개발, React Native 앱 리팩토링으로 렌더링 속도 30% 개선',
    link: 'https://www.linkedin.com/company/datium-corp/?originalSubdomain=kr',
  },
  {
    year: '2024.08.14',
    type: 'featuring',
    tag: 'Feat.',
    title: '기도 (feat. whosbax)',
    artist: 'MAKO',
    album: 'makomentary',
    trackNum: 3,
  },
  {
    year: '2024.07.01',
    type: 'career',
    tag: 'Career',
    title: '텐서큐브',
    role: 'Software Developer',
    desc: 'AI 데이터 라벨링 SaaS 개발, WebSocket 기반 대용량 파일 전송 최적화, Docker/Nginx MSA 구축 및 CI/CD 무중단 배포',
    link: 'https://tensorcube.net/',
  },
  {
    year: '2024.04 ~ 06',
    type: 'gap',
    tag: 'Gap Year',
    title: '경력 휴식기',
    desc: '정보처리기사 취득, 컨퍼런스 참가',
  },
  {
    year: '2022.11.04',
    type: 'music',
    tag: 'EP',
    title: 'Aspiration',
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/aspiration.jpg',
    tracks: [
      'Open',
      '타협',
      'Let me up (feat. ONDO)',
      { name: 'Swing (feat. Hardii)', isTitle: true },
      '낭만고양이 (feat. kishy)',
      { name: '홀로 (feat. Godiflow)', isTitle: true },
      'Already know (feat. MAKO)',
    ],
  },
  {
    year: '2022.08.24',
    type: 'career',
    tag: 'Career',
    title: '하우투약',
    role: 'Frontend Developer · PM',
    desc: 'React→Next.js 마이그레이션으로 SEO 300%↑ 매출 10배↑, React Native 앱 개발, PM으로 MAU 10만·매출 23억 달성',
    link: 'https://howtoyak.com/',
  },
  {
    year: '2022.04.09',
    type: 'music',
    tag: 'Single',
    title: "I'm not alone",
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/im-not-alone.jpg',
    tracks: [{ name: "I'm not alone", isTitle: true }],
  },
  {
    year: '2022.04',
    type: 'activity',
    tag: 'Activity',
    title: '푸른나무재단 정기 기부 시작',
  },
  {
    year: '2022.01.18',
    type: 'featuring',
    tag: 'Feat.',
    title: 'walk flow',
    artist: 'Jiyoon Heo',
    album: 'walk flow',
    featTracks: [
      { name: 'Do it (feat. whosbax, UMiN)', trackNum: 1, isTitle: true },
      { name: '괜찮아 (feat. NØVA, whosbax)', trackNum: 4 },
    ],
  },
  {
    year: '2021.12.06',
    type: 'music',
    tag: 'EP',
    title: 'who am I ?',
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/who-am-i.jpg',
    tracks: [
      'Moonlight',
      'Paradise',
      'With no Stop',
      { name: 'Goodbye (feat. DOPA)', isTitle: true },
      "Don't taste me (feat. 가우(GOW))",
      'Color',
      'Way out',
    ],
  },
  {
    year: '2021.05',
    type: 'activity',
    tag: 'Activity',
    title: '세종 UNION 창업캠프 최우수상',
  },
  {
    year: '2020.10.05',
    type: 'music',
    tag: 'Single',
    title: 'Red Rose',
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/red-rose.jpg',
    tracks: [
      'True (Prod. 9una)',
      { name: 'Another Sight (feat. kishy) (Prod. 9una)', isTitle: true },
    ],
  },
  {
    year: '2020.09.21',
    type: 'featuring',
    tag: 'Feat.',
    title: '잘난놈 (feat. whosbax)',
    artist: 'Hardii, inkL',
    album: 'BLUE HIDEOUT MADE',
    trackNum: 2,
  },
  {
    year: '2020.09.07',
    type: 'music',
    tag: 'Single',
    title: 'Aurora Caffeine',
    cover: 'https://ordhsjmydtojtkkwbzcq.supabase.co/storage/v1/object/public/albums/aurora-caffeine.jpg',
    tracks: [{ name: 'Aurora Caffeine (Prod. 9una)', isTitle: true }],
  },
  {
    year: '2020.08',
    type: 'featuring',
    tag: 'Feat.',
    title: 'Purple Sunset (feat. whosbax)',
    artist: 'I.L.LAVINE',
    album: 'Purple Sunset',
    trackNum: 1,
    isTitle: true,
  },
];

// =============================================
// PUBLIC API
// =============================================
const isSupabaseConfigured = () => !!supabase;

export async function fetchTimelineData(): Promise<TimelineItem[]> {
  if (!isSupabaseConfigured()) {
    return fallbackTimelineData;
  }

  try {
    const data = await getTimeline();
    return transformTimelineData(data);
  } catch (error) {
    console.error('Failed to fetch timeline from Supabase:', error);
    return fallbackTimelineData;
  }
}
