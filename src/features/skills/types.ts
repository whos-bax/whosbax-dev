// Skills 관련 타입 정의

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  sort_order: number;
  created_at: string;
}
