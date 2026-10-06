import { getMissions, getProgress, saveMissions, saveProgress } from '../storage';
import { getLevelInfo } from './levels';

export function calculateXp(baseXp: number, combo = 0, difficulty: 'easy' | 'medium' | 'hard' = 'easy'): number {
  const difficultyBonus = difficulty === 'hard' ? 20 : difficulty === 'medium' ? 10 : 0;
  const comboBonus = Math.min(Math.max(combo - 1, 0) * 5, 20);
  return baseXp + difficultyBonus + comboBonus;
}

function localDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function updateProgress(xp: number, lessonId?: number, correct = true): void {
  const current = getProgress();
  if (lessonId !== undefined && current.completedLessonIds.includes(lessonId)) return;

  current.xp += xp;
  current.activitiesCompleted += 1;
  current.accuracy = Math.round(((current.accuracy * Math.max(current.activitiesCompleted - 1, 0)) + (correct ? 100 : 0)) / current.activitiesCompleted);
  if (lessonId !== undefined) {
    current.lessonsCompleted += 1;
    current.completedLessonIds = [...current.completedLessonIds, lessonId];
  }
  current.level = getLevelInfo(current.xp).title;
  const now = new Date();
  const today = localDate(now);
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(now.getDate() - 1);
  const yesterday = localDate(yesterdayDate);
  if (!current.activityDates.includes(today)) {
    current.activityDates = [...current.activityDates, today];
    current.streak = current.activityDates.includes(yesterday) ? current.streak + 1 : 1;
  }
  current.longestStreak = Math.max(current.longestStreak, current.streak);
  saveProgress(current);

  const missions = getMissions().map(mission => {
    if (mission.id === 'daily-activities' || mission.id === 'weekly-activities') {
      return { ...mission, progress: Math.min(mission.target, mission.progress + 1) };
    }
    if (mission.id === 'daily-xp') return { ...mission, progress: Math.min(mission.target, mission.progress + xp) };
    return mission;
  });
  saveMissions(missions);
}
