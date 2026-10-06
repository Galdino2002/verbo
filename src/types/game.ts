export type GameQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  reference: string;
};

export type GameMode = 'friend' | 'random' | 'team';

export type GameMatch = {
  id: string;
  mode: GameMode;
  opponentName: string;
  questions: GameQuestion[];
  currentQuestion: number;
  score: number;
  opponentScore: number;
  combo: number;
  maxCombo: number;
  answers: string[];
  startedAt: string;
  finished: boolean;
};

export type GameResult = {
  matchId: string;
  mode: GameMode;
  opponentName: string;
  score: number;
  opponentScore: number;
  correctAnswers: number;
  totalQuestions: number;
  maxCombo: number;
  won: boolean;
  completedAt: string;
  rewardXp: number;
};

export type LocalTeam = {
  id: string;
  name: string;
  motto: string;
  members: string[];
  weeklyScore: number;
};
