import type { GameQuestion, LocalTeam } from '../types/game';

export const gameQuestions: GameQuestion[] = [
  { id: 'q1', prompt: 'Quem construiu a arca antes do dilúvio?', options: ['Noé', 'Abraão', 'Moisés', 'Davi'], answer: 'Noé', reference: 'Gênesis 6' },
  { id: 'q2', prompt: 'Qual é o primeiro livro da Bíblia?', options: ['Êxodo', 'Gênesis', 'Salmos', 'Mateus'], answer: 'Gênesis', reference: 'Antigo Testamento' },
  { id: 'q3', prompt: 'Quem derrotou Golias?', options: ['Samuel', 'Davi', 'Josué', 'Salomão'], answer: 'Davi', reference: '1 Samuel 17' },
  { id: 'q4', prompt: 'Quantos discípulos Jesus escolheu?', options: ['7', '10', '12', '40'], answer: '12', reference: 'Marcos 3:14' },
  { id: 'q5', prompt: 'Qual fruto do Espírito aparece em Gálatas 5?', options: ['Paciência', 'Orgulho', 'Riqueza', 'Vingança'], answer: 'Paciência', reference: 'Gálatas 5:22' },
  { id: 'q6', prompt: 'Quem foi lançado na cova dos leões?', options: ['Daniel', 'Elias', 'Jó', 'Pedro'], answer: 'Daniel', reference: 'Daniel 6' },
  { id: 'q7', prompt: 'Qual era a profissão de Pedro antes de seguir Jesus?', options: ['Carpinteiro', 'Pescador', 'Pastor', 'Escriba'], answer: 'Pescador', reference: 'Mateus 4:18' },
  { id: 'q8', prompt: 'Em qual cidade Jesus nasceu?', options: ['Nazaré', 'Jerusalém', 'Belém', 'Cafarnaum'], answer: 'Belém', reference: 'Mateus 2:1' },
  { id: 'q9', prompt: 'Quem recebeu as tábuas dos Dez Mandamentos?', options: ['Moisés', 'Josué', 'Arão', 'Isaías'], answer: 'Moisés', reference: 'Êxodo 20' },
  { id: 'q10', prompt: 'Qual é o último livro da Bíblia?', options: ['Atos', 'Apocalipse', 'Judas', 'Romanos'], answer: 'Apocalipse', reference: 'Novo Testamento' },
];

export const defaultTeams: LocalTeam[] = [
  { id: 'guardioes', name: 'Guardiões da Palavra', motto: 'Juntos, firmes na Palavra', members: ['Jorge', 'Ana', 'Mateus'], weeklyScore: 3420 },
  { id: 'semeadores', name: 'Semeadores', motto: 'Conhecimento que floresce', members: ['Beatriz', 'Lucas'], weeklyScore: 2180 },
];
