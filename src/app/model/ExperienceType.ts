export interface ExperienceType {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    linkList: {title: string; link: string}[];
    skills: string[];
    description: string;
    summaryList: string[];
}
