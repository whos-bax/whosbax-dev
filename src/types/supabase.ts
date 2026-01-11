export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      timeline: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['timeline']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['timeline']['Insert']>;
      };
      music_tracks: {
        Row: {
          id: string;
          timeline_id: string;
          track_num: number;
          name: string;
          is_title: boolean;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['music_tracks']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['music_tracks']['Insert']>;
      };
      experience_summary: {
        Row: {
          id: string;
          company_name: string;
          start_date: string;
          end_date: string | null;
          link: string | null;
          description: string | null;
          is_break_time: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experience_summary']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_summary']['Insert']>;
      };
      experience_positions: {
        Row: {
          id: string;
          summary_id: string;
          position: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_positions']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_positions']['Insert']>;
      };
      experience_position_tasks: {
        Row: {
          id: string;
          position_id: string;
          task: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_position_tasks']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_position_tasks']['Insert']>;
      };
      experience_detail: {
        Row: {
          id: string;
          company_name: string;
          project_title: string;
          start_date: string;
          end_date: string | null;
          description: string | null;
          is_break_time: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experience_detail']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_detail']['Insert']>;
      };
      experience_links: {
        Row: {
          id: string;
          detail_id: string;
          label: string;
          url: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_links']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_links']['Insert']>;
      };
      experience_skills: {
        Row: {
          id: string;
          detail_id: string;
          skill: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_skills']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_skills']['Insert']>;
      };
      experience_summary_items: {
        Row: {
          id: string;
          detail_id: string;
          item: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['experience_summary_items']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['experience_summary_items']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      page_views: {
        Row: {
          id: number;
          page_path: string;
          session_id: string;
          created_at: string;
          viewed_at: string | null;
        };
        Insert: {
          id?: number;
          page_path: string;
          session_id: string;
          created_at?: string;
          viewed_at?: string | null;
        };
        Update: {
          id?: number;
          page_path?: string;
          session_id?: string;
          created_at?: string;
          viewed_at?: string | null;
        };
      };
      guestbook: {
        Row: {
          id: string;
          nickname: string;
          password: string;
          message: string;
          created_at: string;
          is_hidden: boolean;
        };
        Insert: {
          id?: string;
          nickname: string;
          password: string;
          message: string;
          created_at?: string;
          is_hidden?: boolean;
        };
        Update: Partial<Database['public']['Tables']['guestbook']['Insert']>;
      };
    };
  };
};

// Utility types for easier usage
export type Timeline = Database['public']['Tables']['timeline']['Row'];
export type MusicTrack = Database['public']['Tables']['music_tracks']['Row'];
export type ExperienceSummary = Database['public']['Tables']['experience_summary']['Row'];
export type ExperiencePosition = Database['public']['Tables']['experience_positions']['Row'];
export type ExperiencePositionTask = Database['public']['Tables']['experience_position_tasks']['Row'];
export type ExperienceDetail = Database['public']['Tables']['experience_detail']['Row'];
export type ExperienceLink = Database['public']['Tables']['experience_links']['Row'];
export type ExperienceSkill = Database['public']['Tables']['experience_skills']['Row'];
export type ExperienceSummaryItem = Database['public']['Tables']['experience_summary_items']['Row'];
export type Skill = Database['public']['Tables']['skills']['Row'];
export type PageView = Database['public']['Tables']['page_views']['Row'];
export type PageViewInsert = Database['public']['Tables']['page_views']['Insert'];
export type PageViewUpdate = Database['public']['Tables']['page_views']['Update'];
export type Guestbook = Database['public']['Tables']['guestbook']['Row'];
export type GuestbookInsert = Database['public']['Tables']['guestbook']['Insert'];
export type GuestbookUpdate = Database['public']['Tables']['guestbook']['Update'];

// Extended types with relations
export type TimelineWithTracks = Timeline & {
  tracks: MusicTrack[];
};

export type ExperienceSummaryWithPositions = ExperienceSummary & {
  positions: (ExperiencePosition & {
    tasks: ExperiencePositionTask[];
  })[];
};

export type ExperienceDetailFull = ExperienceDetail & {
  links: ExperienceLink[];
  skills: ExperienceSkill[];
  summary_items: ExperienceSummaryItem[];
};
