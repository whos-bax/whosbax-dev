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
