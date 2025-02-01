export interface PostAJobInterface {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'freelance'
    | 'internship';
  experienceLevel: 'entry-level' | 'mid-level' | 'senior-level';
  skills?: string[];
}
