export type Mission = {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  rewardXp: number;
  cadence: 'daily' | 'weekly';
};

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  status: 'friend' | 'pending';
};

export type FeedItem = {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  xp: number;
  likes: number;
  liked: boolean;
  comments: number;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'friend' | 'challenge' | 'mission' | 'reward';
  read: boolean;
};

export type BibleChapter = {
  book: string;
  chapter: number;
  verses: { number: number; text: string }[];
};
