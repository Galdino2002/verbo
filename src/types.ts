export type Lesson = { id: number; title: string; description: string; unit: string; xp: number; locked: boolean; completed: boolean };
export type Verse = { id: number; reference: string; text: string; theme: string };
export type UserProgress = { name: string; email: string; xp: number; streak: number; level: string; lessonsCompleted: number; versesLearned: number };
