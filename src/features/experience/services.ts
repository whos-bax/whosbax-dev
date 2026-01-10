import { supabase } from '@/shared/lib/supabase';
import type {
  ExperienceSummary,
  ExperiencePosition,
  ExperiencePositionTask,
  ExperienceSummaryWithPositions,
  ExperienceDetail,
  ExperienceLink,
  ExperienceSkill,
  ExperienceSummaryItem,
  ExperienceDetailFull,
  ExperienceType,
  SummaryType,
} from './types';
import { summaryList, experienceList } from './fallback-data';

// =============================================
// API QUERIES - Summary
// =============================================
export async function getExperienceSummary(): Promise<ExperienceSummaryWithPositions[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: summaries, error } = await supabase
    .from('experience_summary')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!summaries) return [];

  const { data: positions, error: positionsError } = await supabase
    .from('experience_positions')
    .select('*')
    .order('sort_order', { ascending: true });

  if (positionsError) throw positionsError;

  const { data: tasks, error: tasksError } = await supabase
    .from('experience_position_tasks')
    .select('*')
    .order('sort_order', { ascending: true });

  if (tasksError) throw tasksError;

  const summaryItems = summaries as ExperienceSummary[];
  const positionItems = (positions || []) as ExperiencePosition[];
  const taskItems = (tasks || []) as ExperiencePositionTask[];

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
// API QUERIES - Detail
// =============================================
export async function getExperienceDetail(): Promise<{ company: string; list: ExperienceDetailFull[] }[]> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: details, error } = await supabase
    .from('experience_detail')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  if (!details) return [];

  const { data: links, error: linksError } = await supabase
    .from('experience_links')
    .select('*')
    .order('sort_order', { ascending: true });

  if (linksError) throw linksError;

  const { data: skills, error: skillsError } = await supabase
    .from('experience_skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (skillsError) throw skillsError;

  const { data: summaryItems, error: summaryError } = await supabase
    .from('experience_summary_items')
    .select('*')
    .order('sort_order', { ascending: true });

  if (summaryError) throw summaryError;

  const detailItems = details as ExperienceDetail[];
  const linkItems = (links || []) as ExperienceLink[];
  const skillItems = (skills || []) as ExperienceSkill[];
  const summaryItemsList = (summaryItems || []) as ExperienceSummaryItem[];

  const detailsFull: ExperienceDetailFull[] = detailItems.map((detail) => ({
    ...detail,
    links: linkItems.filter((link) => link.detail_id === detail.id),
    skills: skillItems.filter((skill) => skill.detail_id === detail.id),
    summary_items: summaryItemsList.filter((item) => item.detail_id === detail.id),
  }));

  // Group by company
  const grouped = detailsFull.reduce(
    (acc, detail) => {
      const existing = acc.find((g) => g.company === detail.company_name);
      if (existing) {
        existing.list.push(detail);
      } else {
        acc.push({ company: detail.company_name, list: [detail] });
      }
      return acc;
    },
    [] as { company: string; list: ExperienceDetailFull[] }[]
  );

  return grouped;
}

// =============================================
// DATA TRANSFORMATION
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

function transformExperienceDetail(
  data: { company: string; list: ExperienceDetailFull[] }[]
): { company: string; list: ExperienceType[] }[] {
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

// =============================================
// PUBLIC API
// =============================================
const isSupabaseConfigured = () => !!supabase;

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
