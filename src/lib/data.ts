import { getTimeline, getExperienceSummary, getExperienceDetail, getSkillNames } from './queries';
import { supabase } from './supabase';
import { summaryList, experienceList } from '@/app/_utils/experienceMocks';
import { skillList } from '@/app/_utils/utils';
import type { TimelineWithTracks, ExperienceSummaryWithPositions, ExperienceDetailFull } from '@/type/supabase';
import type { SummaryType, ExperienceType } from '@/type/ExperienceType';

// Check if Supabase is configured
const isSupabaseConfigured = () => !!supabase;

// =============================================
// TIMELINE DATA
// =============================================
type TimelineItem = {
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
};

// Hardcoded timeline data (fallback)
const hardcodedTimelineData: TimelineItem[] = [
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
    cover: '/assets/images/albums/where-ive-been.jpg',
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
    cover: '/assets/images/albums/aspiration.jpg',
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
    cover: '/assets/images/albums/im-not-alone.jpg',
    tracks: [
      { name: "I'm not alone", isTitle: true },
    ],
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
    cover: '/assets/images/albums/who-am-i.jpg',
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
    cover: '/assets/images/albums/red-rose.jpg',
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
    cover: '/assets/images/albums/aurora-caffeine.jpg',
    tracks: [
      { name: 'Aurora Caffeine (Prod. 9una)', isTitle: true },
    ],
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

// Transform Supabase timeline data to match component format
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

    // Handle tracks
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

export async function fetchTimelineData(): Promise<TimelineItem[]> {
  if (!isSupabaseConfigured()) {
    return hardcodedTimelineData;
  }

  try {
    const data = await getTimeline();
    return transformTimelineData(data);
  } catch (error) {
    console.error('Failed to fetch timeline from Supabase:', error);
    return hardcodedTimelineData;
  }
}

// =============================================
// EXPERIENCE SUMMARY DATA
// =============================================
function transformExperienceSummary(data: ExperienceSummaryWithPositions[]): SummaryType[] {
  return data.map((item) => ({
    startDate: item.start_date,
    endDate: item.end_date || '',
    name: item.company_name,
    department: item.positions.map((pos) => ({
      position: pos.position,
      tasks: pos.tasks.map((t) => t.task),
    })),
    link: item.link,
    description: item.description,
    isBreakTime: item.is_break_time,
  }));
}

export async function fetchExperienceSummary(): Promise<SummaryType[]> {
  if (!isSupabaseConfigured()) {
    return summaryList;
  }

  try {
    const data = await getExperienceSummary();
    return transformExperienceSummary(data);
  } catch (error) {
    console.error('Failed to fetch experience summary from Supabase:', error);
    return summaryList;
  }
}

// =============================================
// EXPERIENCE DETAIL DATA
// =============================================
function transformExperienceDetail(data: { company: string; list: ExperienceDetailFull[] }[]): { company: string; list: ExperienceType[] }[] {
  return data.map((group) => ({
    company: group.company,
    list: group.list.map((item) => ({
      title: item.project_title,
      startDate: new Date(item.start_date),
      endDate: item.end_date ? new Date(item.end_date) : null,
      linkList: item.links.map((link) => ({
        label: link.label,
        url: link.url,
      })),
      skills: item.skills.map((s) => s.skill),
      description: item.description || '',
      isBreakTime: item.is_break_time,
      summaryList: item.summary_items.map((s) => s.item),
    })),
  }));
}

export async function fetchExperienceDetail(): Promise<{ company: string; list: ExperienceType[] }[]> {
  if (!isSupabaseConfigured()) {
    return experienceList;
  }

  try {
    const data = await getExperienceDetail();
    return transformExperienceDetail(data);
  } catch (error) {
    console.error('Failed to fetch experience detail from Supabase:', error);
    return experienceList;
  }
}

// =============================================
// SKILLS DATA
// =============================================
export async function fetchSkills(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return skillList;
  }

  try {
    return await getSkillNames();
  } catch (error) {
    console.error('Failed to fetch skills from Supabase:', error);
    return skillList;
  }
}
