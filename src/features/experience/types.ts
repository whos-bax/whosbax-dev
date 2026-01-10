// Experience 관련 타입 정의

// =============================================
// DATABASE TYPES (Supabase)
// =============================================
export interface ExperienceSummary {
  id: string;
  company_name: string;
  start_date: string;
  end_date: string | null;
  link: string | null;
  description: string | null;
  is_break_time: boolean;
  sort_order: number;
  created_at: string;
}

export interface ExperiencePosition {
  id: string;
  summary_id: string;
  position: string;
  sort_order: number;
}

export interface ExperiencePositionTask {
  id: string;
  position_id: string;
  task: string;
  sort_order: number;
}

export interface ExperiencePositionWithTasks extends ExperiencePosition {
  tasks: ExperiencePositionTask[];
}

export interface ExperienceSummaryWithPositions extends ExperienceSummary {
  positions: ExperiencePositionWithTasks[];
}

export interface ExperienceDetail {
  id: string;
  company_name: string;
  project_title: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  is_break_time: boolean;
  sort_order: number;
  created_at: string;
}

export interface ExperienceLink {
  id: string;
  detail_id: string;
  label: string;
  url: string;
  sort_order: number;
}

export interface ExperienceSkill {
  id: string;
  detail_id: string;
  skill: string;
  sort_order: number;
}

export interface ExperienceSummaryItem {
  id: string;
  detail_id: string;
  item: string;
  sort_order: number;
}

export interface ExperienceDetailFull extends ExperienceDetail {
  links: ExperienceLink[];
  skills: ExperienceSkill[];
  summary_items: ExperienceSummaryItem[];
}

// =============================================
// COMPONENT TYPES (UI에서 사용)
// =============================================
export interface ExperienceType {
  title: string;
  startDate: Date;
  endDate: Date | null;
  linkList: { label: string; url: string }[];
  skills: string[];
  description: string;
  summaryList: string[];
  isBreakTime?: boolean;
}

export interface Department {
  position: string;
  tasks: string[];
}

export interface SummaryType {
  startDate: string;
  endDate: string;
  name: string;
  department: Department[];
  link: string | null;
  description: string | null;
  isBreakTime?: boolean;
}
