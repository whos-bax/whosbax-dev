export interface ExperienceType {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date | null;
  linkList: { title: string; link: string }[];
  skills: string[];
  description: string;
  summaryList: string[];
}

type Department = {
  position: string;
  tasks: string[];
};

export type SummaryType = {
  startDate: string;
  endDate: string;
  name: string;
  department: Department[];
  link: string | null;
  description: string | null;
  isBreakTime?: boolean;
};
