import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/type/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the client if credentials are provided
export const supabase: SupabaseClient<Database> | null =
  supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-project-url'
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
