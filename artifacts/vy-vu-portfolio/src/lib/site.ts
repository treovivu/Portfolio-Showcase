export const links = {
  linkedin: 'https://www.linkedin.com/in/vy-vu22/',
  github: 'https://github.com/treovivu',
  notes: 'https://vivunote.substack.com/',
  email: 'vvu22@student.gsu.edu',
  resume: `${import.meta.env.BASE_URL}Vy_Vu_resume.pdf`,
};

export const external = { target: '_blank', rel: 'noreferrer' } as const;

// Portfolio soundtrack (Cozy Lo-fi × Soft Piano). The player stays hidden until `src` is set.
// To add one: put a licensed file in public/audio/ and point `src` at it, e.g.
//   src: `${import.meta.env.BASE_URL}audio/cozy-lofi-soft-piano.mp3`,
// Fill in `credit` if the license asks for attribution. Full steps: SOUNDTRACK.md.
export const soundtrack: {
  src: string | null;
  title: string;
  artist: string;
  credit: string;
} = {
  src: `${import.meta.env.BASE_URL}audio/tears-of-joy.mp3`,
  title: 'Tears of Joy',
  artist: '',
  credit: 'Mixkit',
};
