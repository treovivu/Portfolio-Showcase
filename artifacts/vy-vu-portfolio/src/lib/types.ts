export type MediaItem = {
  id: string;
  label: string;
  caption: string;
  alt: string;
  src?: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

// Illustrated covers explain projects without screenshots; 'photo' uses the project's first media item.
export type CoverArt = 'aurabeat' | 'herbuddy' | 'halloween' | 'photo';

export type ProjectDetail = {
  number: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
  cover: CoverArt;
  media: MediaItem[];
  featured?: boolean;
  award?: string;
  links?: ProjectLink[];
};
