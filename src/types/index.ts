export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack';
  liveUrl: string;
  repoUrl: string;
}