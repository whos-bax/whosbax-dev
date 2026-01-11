import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase client
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-project-url'
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
