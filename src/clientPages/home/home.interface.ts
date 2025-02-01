export interface JobInterface {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType: string;
  experienceLevel: string;
  skills: string[];
  status: 'open' | 'closed' | 'filled';
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id?: string;
    name?: string;
  };
}
