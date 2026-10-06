export type UserProgress = {
  name: string;
  email: string;
  xp: number;
  streak: number;
  level: string;
  lessonsCompleted: number;
  versesLearned: number;
  completedLessonIds: number[];
  longestStreak: number;
  accuracy: number;
  activitiesCompleted: number;
  versesBookmarked: string[];
  onboardingComplete: boolean;
  studyMinutesGoal: number;
  studyMinutesToday: number;
  activityDates: string[];
};

export type User = UserProgress & {
  id: string;
  avatar: string;
  createdAt: string;
};
