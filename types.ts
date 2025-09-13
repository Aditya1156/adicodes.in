export type ProjectStatus = 'Completed' | 'In Progress' | 'Deployed';

export interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  imageUrls: string[];
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  status: ProjectStatus;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
}