import { supabase } from '@/shared/lib/supabase';
import type { Database } from '@/types/supabase';
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
// TYPE DEFINITIONS
// =============================================
export type ExperienceSummaryInput = Database['public']['Tables']['experience_summary']['Insert'];
export type ExperiencePositionInput = Database['public']['Tables']['experience_positions']['Insert'];
export type ExperiencePositionTaskInput = Database['public']['Tables']['experience_position_tasks']['Insert'];
export type ExperienceDetailInput = Database['public']['Tables']['experience_detail']['Insert'];
export type ExperienceLinkInput = Database['public']['Tables']['experience_links']['Insert'];
export type ExperienceSkillInput = Database['public']['Tables']['experience_skills']['Insert'];
export type ExperienceSummaryItemInput = Database['public']['Tables']['experience_summary_items']['Insert'];

// =============================================
// ADMIN CRUD - Experience Summary
// =============================================
export async function getExperienceSummaryById(id: string): Promise<ExperienceSummaryWithPositions | null> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: summary, error } = await supabase
    .from('experience_summary')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!summary) return null;

  const { data: positions, error: positionsError } = await supabase
    .from('experience_positions')
    .select('*')
    .eq('summary_id', id)
    .order('sort_order', { ascending: true });

  if (positionsError) throw positionsError;

  const positionItems = (positions || []) as ExperiencePosition[];
  const positionIds = positionItems.map((p) => p.id);

  const { data: tasks, error: tasksError } = await (supabase as any)
    .from('experience_position_tasks')
    .select('*')
    .in('position_id', positionIds.length > 0 ? positionIds : [''])
    .order('sort_order', { ascending: true });

  if (tasksError) throw tasksError;

  const summaryData = summary as ExperienceSummary;
  const taskItems = (tasks || []) as ExperiencePositionTask[];

  return {
    ...summaryData,
    positions: positionItems.map((pos) => ({
      ...pos,
      tasks: taskItems.filter((task) => task.position_id === pos.id),
    })),
  };
}

export async function createExperienceSummary(input: ExperienceSummaryInput): Promise<ExperienceSummary> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_summary')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSummary;
}

export async function updateExperienceSummary(id: string, input: Partial<ExperienceSummaryInput>): Promise<ExperienceSummary> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_summary')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSummary;
}

export async function deleteExperienceSummary(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  // Delete related data first
  const { data: positions } = await (supabase as any)
    .from('experience_positions')
    .select('id')
    .eq('summary_id', id);

  if (positions && positions.length > 0) {
    const positionIds = (positions as { id: string }[]).map((p) => p.id);
    await (supabase as any).from('experience_position_tasks').delete().in('position_id', positionIds);
    await (supabase as any).from('experience_positions').delete().eq('summary_id', id);
  }

  const { error } = await (supabase as any).from('experience_summary').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Positions
// =============================================
export async function createExperiencePosition(input: ExperiencePositionInput): Promise<ExperiencePosition> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_positions')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperiencePosition;
}

export async function updateExperiencePosition(id: string, input: Partial<ExperiencePositionInput>): Promise<ExperiencePosition> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_positions')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperiencePosition;
}

export async function deleteExperiencePosition(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  await supabase.from('experience_position_tasks').delete().eq('position_id', id);
  const { error } = await supabase.from('experience_positions').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Position Tasks
// =============================================
export async function createExperiencePositionTask(input: ExperiencePositionTaskInput): Promise<ExperiencePositionTask> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_position_tasks')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperiencePositionTask;
}

export async function updateExperiencePositionTask(id: string, input: Partial<ExperiencePositionTaskInput>): Promise<ExperiencePositionTask> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_position_tasks')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperiencePositionTask;
}

export async function deleteExperiencePositionTask(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('experience_position_tasks').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Detail
// =============================================
export async function getExperienceDetailById(id: string): Promise<ExperienceDetailFull | null> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data: detail, error } = await supabase
    .from('experience_detail')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!detail) return null;

  const [linksRes, skillsRes, summaryItemsRes] = await Promise.all([
    supabase.from('experience_links').select('*').eq('detail_id', id).order('sort_order', { ascending: true }),
    supabase.from('experience_skills').select('*').eq('detail_id', id).order('sort_order', { ascending: true }),
    supabase.from('experience_summary_items').select('*').eq('detail_id', id).order('sort_order', { ascending: true }),
  ]);

  return {
    ...(detail as ExperienceDetail),
    links: (linksRes.data || []) as ExperienceLink[],
    skills: (skillsRes.data || []) as ExperienceSkill[],
    summary_items: (summaryItemsRes.data || []) as ExperienceSummaryItem[],
  };
}

export async function createExperienceDetail(input: ExperienceDetailInput): Promise<ExperienceDetail> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_detail')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceDetail;
}

export async function updateExperienceDetail(id: string, input: Partial<ExperienceDetailInput>): Promise<ExperienceDetail> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_detail')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceDetail;
}

export async function deleteExperienceDetail(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  await Promise.all([
    supabase.from('experience_links').delete().eq('detail_id', id),
    supabase.from('experience_skills').delete().eq('detail_id', id),
    supabase.from('experience_summary_items').delete().eq('detail_id', id),
  ]);

  const { error } = await supabase.from('experience_detail').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Links
// =============================================
export async function createExperienceLink(input: ExperienceLinkInput): Promise<ExperienceLink> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_links')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceLink;
}

export async function updateExperienceLink(id: string, input: Partial<ExperienceLinkInput>): Promise<ExperienceLink> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_links')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceLink;
}

export async function deleteExperienceLink(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('experience_links').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Skills (in Detail)
// =============================================
export async function createExperienceDetailSkill(input: ExperienceSkillInput): Promise<ExperienceSkill> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_skills')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSkill;
}

export async function updateExperienceDetailSkill(id: string, input: Partial<ExperienceSkillInput>): Promise<ExperienceSkill> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_skills')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSkill;
}

export async function deleteExperienceDetailSkill(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('experience_skills').delete().eq('id', id);
  if (error) throw error;
}

// =============================================
// ADMIN CRUD - Experience Summary Items
// =============================================
export async function createExperienceSummaryItem(input: ExperienceSummaryItemInput): Promise<ExperienceSummaryItem> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_summary_items')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSummaryItem;
}

export async function updateExperienceSummaryItem(id: string, input: Partial<ExperienceSummaryItemInput>): Promise<ExperienceSummaryItem> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('experience_summary_items')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ExperienceSummaryItem;
}

export async function deleteExperienceSummaryItem(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('experience_summary_items').delete().eq('id', id);
  if (error) throw error;
}

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
