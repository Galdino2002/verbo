import type { Mission } from '../types';

export const defaultMissions: Mission[] = [
  { id: 'daily-activities', title: 'Praticante diário', description: 'Complete 3 atividades', target: 3, progress: 0, rewardXp: 50, cadence: 'daily' },
  { id: 'daily-xp', title: 'Colecionador de XP', description: 'Ganhe 100 XP', target: 100, progress: 0, rewardXp: 30, cadence: 'daily' },
  { id: 'weekly-activities', title: 'Constância', description: 'Complete 15 atividades', target: 15, progress: 0, rewardXp: 100, cadence: 'weekly' },
];
