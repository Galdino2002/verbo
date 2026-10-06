import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  { id: 1, title: 'Conhecendo a Bíblia', description: 'Entenda como a Bíblia está organizada.', unit: 'Fundamentos', xp: 20, locked: false, completed: false, progress: 0, estimatedMinutes: 5, type: 'lesson' },
  { id: 2, title: 'Antigo Testamento', description: 'Conheça a primeira grande parte das Escrituras.', unit: 'Fundamentos', xp: 20, locked: false, completed: false, progress: 0, estimatedMinutes: 8, type: 'lesson' },
  { id: 3, title: 'Novo Testamento', description: 'Conheça os Evangelhos e a igreja primitiva.', unit: 'Fundamentos', xp: 20, locked: false, completed: false, progress: 0, estimatedMinutes: 8, type: 'lesson' },
  { id: 4, title: 'Salmos 23', description: 'Aprenda, pratique e entenda um dos salmos mais conhecidos.', unit: 'Versículos', xp: 30, locked: false, completed: false, progress: 0, estimatedMinutes: 10, type: 'review' },
  { id: 5, title: 'Vida de Jesus', description: 'Uma introdução aos acontecimentos centrais dos Evangelhos.', unit: 'Novo Testamento', xp: 30, locked: true, completed: false, progress: 0, estimatedMinutes: 12, type: 'lesson' },
  { id: 6, title: 'Personagens da Bíblia', description: 'Conheça histórias e contextos de grandes personagens bíblicos.', unit: 'Fundamentos', xp: 30, locked: true, completed: false, progress: 0, estimatedMinutes: 12, type: 'boss' },
];
