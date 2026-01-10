import { supabase } from '@/shared/lib/supabase';
import type { Database } from '@/types/supabase';
import type { Skill } from './types';

// =============================================
// TYPE DEFINITIONS
// =============================================
export type SkillInput = Database['public']['Tables']['skills']['Insert'];

// Fallback data
const fallbackSkillList = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Zustand',
  'React-query',
  'Jotai',
  'AsyncStorage',
  'Axios',
  'scss',
  'Bootstrap',
  'Tailwind',
  'AntD',
  'Material UI',
  'GitHub',
  'IntelliJ',
  'WebStorm',
  'VSCode',
  'Cursor',
  'Nginx',
  'AWS (EC2, S3, CloudFront 등)',
  'Vultr',
  'Google Analytics',
  'Naver Search Advisor',
  'Google Search Console',
];

// =============================================
// API QUERIES
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

// =============================================
// ADMIN CRUD OPERATIONS
// =============================================
export async function getSkillById(id: string): Promise<Skill | null> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Skill | null;
}

export async function createSkill(input: SkillInput): Promise<Skill> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('skills')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Skill;
}

export async function updateSkill(id: string, input: Partial<SkillInput>): Promise<Skill> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('skills')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Skill;
}

export async function deleteSkill(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
}

export async function getMaxSkillSortOrder(): Promise<number> {
  if (!supabase) throw new Error('Supabase client not configured');

  const { data, error } = await (supabase as any)
    .from('skills')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return (data as { sort_order: number } | null)?.sort_order ?? 0;
}

// =============================================
// PUBLIC API
// =============================================
const isSupabaseConfigured = () => !!supabase;

export async function fetchSkills(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return fallbackSkillList;
  }

  try {
    return await getSkillNames();
  } catch (error) {
    console.error('Failed to fetch skills from Supabase:', error);
    return fallbackSkillList;
  }
}
