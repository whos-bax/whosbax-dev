import { supabase } from '@/shared/lib/supabase';
import type { Skill } from './types';

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
