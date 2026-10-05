import type { UserProgress } from './types';

export const defaultProgress: UserProgress = {
  name: 'Jorge',
  email: '',
  xp: 0,
  streak: 7,
  level: 'Iniciante',
  lessonsCompleted: 0,
  versesLearned: 0,
  completedLessonIds: [],
};

export function getProgress(): UserProgress {
  const raw = localStorage.getItem('verbo_progress');
  if (!raw) return { ...defaultProgress };

  try {
    const stored = JSON.parse(raw) as Partial<UserProgress>;
    return {
      ...defaultProgress,
      ...stored,
      xp: typeof stored.xp === 'number' ? stored.xp : defaultProgress.xp,
      streak: typeof stored.streak === 'number' ? stored.streak : defaultProgress.streak,
      lessonsCompleted: typeof stored.lessonsCompleted === 'number' ? stored.lessonsCompleted : defaultProgress.lessonsCompleted,
      versesLearned: typeof stored.versesLearned === 'number' ? stored.versesLearned : defaultProgress.versesLearned,
      completedLessonIds: Array.isArray(stored.completedLessonIds) ? stored.completedLessonIds.filter((id): id is number => typeof id === 'number') : [],
    };
  } catch (error) {
    console.warn('Não foi possível ler o progresso salvo; usando os valores padrão.', error);
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress) {
  localStorage.setItem('verbo_progress', JSON.stringify(progress));
}
