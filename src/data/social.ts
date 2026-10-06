import type { FeedItem, Friend, Notification } from '../types';

export const friends: Friend[] = [
  { id: 'joao', name: 'João Silva', avatar: 'J', level: 4, xp: 820, streak: 12, status: 'friend' },
  { id: 'maria', name: 'Maria Costa', avatar: 'M', level: 3, xp: 610, streak: 8, status: 'friend' },
  { id: 'ana', name: 'Ana Oliveira', avatar: 'A', level: 5, xp: 1240, streak: 21, status: 'pending' },
];

export const feed: FeedItem[] = [
  { id: 'feed-1', userId: 'joao', userName: 'João Silva', avatar: 'J', text: 'completou a lição Salmos 23.', xp: 50, likes: 12, liked: false, comments: 3 },
  { id: 'feed-2', userId: 'maria', userName: 'Maria Costa', avatar: 'M', text: 'manteve uma sequência de 8 dias!', xp: 20, likes: 8, liked: false, comments: 1 },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Missão disponível', description: 'Complete 3 atividades hoje e ganhe 50 XP.', type: 'mission', read: false },
  { id: 'n2', title: 'João está estudando', description: 'Seu amigo completou uma nova lição.', type: 'friend', read: false },
];
