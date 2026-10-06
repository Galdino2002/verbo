import { defaultMissions } from '../data/missions';
import { feed as defaultFeed, friends as defaultFriends, notifications as defaultNotifications } from '../data/social';
import type { FeedItem, Friend, Mission, Notification, UserProgress } from '../types';

export const defaultProgress: UserProgress = {
  name: 'Jorge',
  email: '',
  xp: 0,
  streak: 0,
  level: 'Iniciante',
  lessonsCompleted: 0,
  versesLearned: 0,
  completedLessonIds: [],
  longestStreak: 0,
  accuracy: 0,
  activitiesCompleted: 0,
  versesBookmarked: [],
  onboardingComplete: true,
  studyMinutesGoal: 10,
  studyMinutesToday: 0,
  activityDates: [],
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
      longestStreak: typeof stored.longestStreak === 'number' ? stored.longestStreak : defaultProgress.longestStreak,
      accuracy: typeof stored.accuracy === 'number' ? stored.accuracy : defaultProgress.accuracy,
      activitiesCompleted: typeof stored.activitiesCompleted === 'number' ? stored.activitiesCompleted : defaultProgress.activitiesCompleted,
      versesBookmarked: Array.isArray(stored.versesBookmarked) ? stored.versesBookmarked.filter((id): id is string => typeof id === 'string') : [],
      onboardingComplete: stored.onboardingComplete !== false,
      studyMinutesGoal: typeof stored.studyMinutesGoal === 'number' ? stored.studyMinutesGoal : defaultProgress.studyMinutesGoal,
      studyMinutesToday: typeof stored.studyMinutesToday === 'number' ? stored.studyMinutesToday : defaultProgress.studyMinutesToday,
      activityDates: Array.isArray(stored.activityDates) ? stored.activityDates.filter((date): date is string => typeof date === 'string') : [],
    };
  } catch (error) {
    console.warn('Não foi possível ler o progresso salvo; usando os valores padrão.', error);
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem('verbo_progress', JSON.stringify(progress));
}

export function hasSession(): boolean {
  return Boolean(localStorage.getItem('verbo_session'));
}

export function startSession(): void {
  localStorage.setItem('verbo_session', 'local');
}

export function clearSession(): void {
  localStorage.removeItem('verbo_session');
}

function getJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

export function getMissions(): Mission[] { return getJson('verbo_missions', defaultMissions.map(m => ({ ...m }))); }
export function saveMissions(missions: Mission[]): void { localStorage.setItem('verbo_missions', JSON.stringify(missions)); }
export function getFriends(): Friend[] { return getJson('verbo_friends', defaultFriends.map(f => ({ ...f }))); }
export function saveFriends(value: Friend[]): void { localStorage.setItem('verbo_friends', JSON.stringify(value)); }
export function getFeed(): FeedItem[] { return getJson('verbo_feed', defaultFeed.map(item => ({ ...item }))); }
export function saveFeed(value: FeedItem[]): void { localStorage.setItem('verbo_feed', JSON.stringify(value)); }
export function getNotifications(): Notification[] { return getJson('verbo_notifications', defaultNotifications.map(n => ({ ...n }))); }
export function saveNotifications(value: Notification[]): void { localStorage.setItem('verbo_notifications', JSON.stringify(value)); }
export function resetMockData(): void {
  ['verbo_progress', 'verbo_missions', 'verbo_friends', 'verbo_feed', 'verbo_notifications', 'verbo_onboarding'].forEach(key => localStorage.removeItem(key));
}
