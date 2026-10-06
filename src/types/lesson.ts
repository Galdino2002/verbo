export type Lesson = {
  id: number;
  title: string;
  description: string;
  unit: string;
  xp: number;
  locked: boolean;
  completed: boolean;
  progress: number;
  estimatedMinutes: number;
  type: 'lesson' | 'review' | 'boss';
};

export type ActivityType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'ordering' | 'matching' | 'verse' | 'speed' | 'boss';

export type Activity = {
  id: number;
  lessonId: number;
  type: ActivityType;
  question: string;
  explanation: string;
  options: string[];
  correctAnswer: string;
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type ActivityResult = {
  xp: number;
  correctAnswers: number;
  wrongAnswers: number;
  questionsAnswered: number;
  maxCombo: number;
  wrongActivityIds: number[];
};
