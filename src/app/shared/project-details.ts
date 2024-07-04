export interface ProjectDetails {
  id: number;
  name: string;
  summary: string;
  description: string;
  projectLink: string;
  images?: string[];
  technologies: string[];
  currentImageIndex: number;
}
