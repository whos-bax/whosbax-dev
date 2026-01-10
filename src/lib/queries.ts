import { supabase } from './supabase';
import type {
  Timeline,
  TimelineTrack,
  TimelineWithTracks,
  ExperienceSummary,
  ExperiencePosition,
  ExperiencePositionTask,
  ExperienceSummaryWithPositions,
  ExperienceDetail,
  ExperienceLink,
  ExperienceSkill,
  ExperienceSummaryItem,
  ExperienceDetailFull,
  Skill,
} from '@/type/supabase';

// =============================================
// TIMELINE QUERIES
// =============================================
export async function getTimeline(): Promise<TimelineWithTracks[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: timeline, error } = await supabase
    .from('timeline')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!timeline) return [];

  // Fetch tracks for each timeline item
  const { data: tracks, error: tracksError } = await supabase
    .from('timeline_tracks')
    .select('*')
    .order('sort_order', { ascending: true });

  if (tracksError) throw tracksError;

  const timelineItems = timeline as Timeline[];
  const trackItems = (tracks || []) as TimelineTrack[];

  // Combine timeline with tracks
  return timelineItems.map((item) => ({
    ...item,
    tracks: trackItems.filter((track) => track.timeline_id === item.id),
  }));
}

// =============================================
// EXPERIENCE SUMMARY QUERIES
// =============================================
export async function getExperienceSummary(): Promise<ExperienceSummaryWithPositions[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: summaries, error } = await supabase
    .from('experience_summary')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!summaries) return [];

  // Fetch positions
  const { data: positions, error: positionsError } = await supabase
    .from('experience_positions')
    .select('*')
    .order('sort_order', { ascending: true });

  if (positionsError) throw positionsError;

  // Fetch tasks
  const { data: tasks, error: tasksError } = await supabase
    .from('experience_position_tasks')
    .select('*')
    .order('sort_order', { ascending: true });

  if (tasksError) throw tasksError;

  const summaryItems = summaries as ExperienceSummary[];
  const positionItems = (positions || []) as ExperiencePosition[];
  const taskItems = (tasks || []) as ExperiencePositionTask[];

  // Combine data
  return summaryItems.map((summary) => ({
    ...summary,
    positions: positionItems
      .filter((pos) => pos.summary_id === summary.id)
      .map((pos) => ({
        ...pos,
        tasks: taskItems.filter((task) => task.position_id === pos.id),
      })),
  }));
}

// =============================================
// EXPERIENCE DETAIL QUERIES
// =============================================
export async function getExperienceDetail(): Promise<{ company: string; list: ExperienceDetailFull[] }[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: details, error } = await supabase
    .from('experience_detail')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!details) return [];

  // Fetch links
  const { data: links, error: linksError } = await supabase
    .from('experience_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (linksError) throw linksError;

  // Fetch skills
  const { data: skills, error: skillsError } = await supabase
    .from('experience_skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (skillsError) throw skillsError;

  // Fetch summary items
  const { data: summaryItems, error: summaryError } = await supabase
    .from('experience_summary_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (summaryError) throw summaryError;

  const detailItems = details as ExperienceDetail[];
  const linkItems = (links || []) as ExperienceLink[];
  const skillItems = (skills || []) as ExperienceSkill[];
  const summaryItemsList = (summaryItems || []) as ExperienceSummaryItem[];

  // Combine data and group by company
  const detailsFull: ExperienceDetailFull[] = detailItems.map((detail) => ({
    ...detail,
    links: linkItems.filter((link) => link.detail_id === detail.id),
    skills: skillItems.filter((skill) => skill.detail_id === detail.id),
    summary_items: summaryItemsList.filter((item) => item.detail_id === detail.id),
  }));

  // Group by company
  const grouped = detailsFull.reduce((acc, detail) => {
    const existing = acc.find((g) => g.company === detail.company_name);
    if (existing) {
      existing.list.push(detail);
    } else {
      acc.push({ company: detail.company_name, list: [detail] });
    }
    return acc;
  }, [] as { company: string; list: ExperienceDetailFull[] }[]);

  return grouped;
}

// =============================================
// SKILLS QUERIES
// =============================================
export async function getSkills(): Promise<Skill[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data || []) as Skill[];
}

export async function getSkillNames(): Promise<string[]> {
  const skills = await getSkills();
  return skills.map((s) => s.name);
}
