import type { Activity } from '../types';

export const activities: Activity[] = [
  { id: 1, lessonId: 1, type: 'multiple-choice', question: 'Quantos livros formam a Bíblia na tradição protestante?', explanation: 'A Bíblia protestante possui 66 livros: 39 no Antigo Testamento e 27 no Novo Testamento.', options: ['39', '66', '73', '12'], correctAnswer: '66', xp: 20, difficulty: 'easy' },
  { id: 2, lessonId: 1, type: 'true-false', question: 'A Bíblia reúne diferentes gêneros literários.', explanation: 'Ela reúne poesia, história, profecia, cartas e outros gêneros.', options: ['Verdadeiro', 'Falso'], correctAnswer: 'Verdadeiro', xp: 20, difficulty: 'easy' },
  { id: 3, lessonId: 2, type: 'multiple-choice', question: 'Quantos livros existem no Antigo Testamento?', explanation: 'Na tradição protestante, são 39 livros.', options: ['27', '39', '66', '12'], correctAnswer: '39', xp: 20, difficulty: 'medium' },
  { id: 4, lessonId: 3, type: 'multiple-choice', question: 'Quem é o centro da mensagem dos Evangelhos?', explanation: 'Os Evangelhos apresentam a vida e a mensagem de Jesus.', options: ['Moisés', 'Davi', 'Jesus', 'Paulo'], correctAnswer: 'Jesus', xp: 20, difficulty: 'easy' },
  { id: 5, lessonId: 4, type: 'fill-blank', question: 'Complete: O Senhor é o meu ______; nada me faltará.', explanation: 'O Salmo 23 começa com a imagem de Deus como pastor que cuida e guia.', options: ['pastor', 'rei', 'mestre', 'amigo'], correctAnswer: 'pastor', xp: 30, difficulty: 'medium' },
  { id: 6, lessonId: 4, type: 'multiple-choice', question: 'A imagem do pastor no Salmo 23 destaca:', explanation: 'O pastor representa cuidado, direção e proteção.', options: ['Cuidado e direção', 'Poder político', 'Riqueza', 'Guerra'], correctAnswer: 'Cuidado e direção', xp: 30, difficulty: 'medium' },
  { id: 7, lessonId: 6, type: 'boss', question: 'Qual discípulo é conhecido por ter negado Jesus três vezes?', explanation: 'Pedro negou conhecer Jesus três vezes antes do canto do galo.', options: ['Pedro', 'João', 'Tomé', 'Tiago'], correctAnswer: 'Pedro', xp: 60, difficulty: 'hard' },
];
