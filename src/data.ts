import type { Lesson, Verse } from './types';

export const verses: Verse[] = [
  { id: 1, reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.', theme: 'Confiança' },
  { id: 2, reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', theme: 'Amor' },
  { id: 3, reference: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.', theme: 'Força' },
  { id: 4, reference: 'Provérbios 3:5', text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', theme: 'Sabedoria' },
];

export const lessons: Lesson[] = [
  { id: 1, title: 'Conhecendo a Bíblia', description: 'Entenda como a Bíblia está organizada.', unit: 'Fundamentos', xp: 20, locked: false, completed: false },
  { id: 2, title: 'Antigo Testamento', description: 'Conheça a primeira grande parte das Escrituras.', unit: 'Fundamentos', xp: 20, locked: false, completed: false },
  { id: 3, title: 'Novo Testamento', description: 'Conheça os Evangelhos e a igreja primitiva.', unit: 'Fundamentos', xp: 20, locked: false, completed: false },
  { id: 4, title: 'Salmos 23', description: 'Aprenda, pratique e entenda um dos salmos mais conhecidos.', unit: 'Versículos', xp: 30, locked: false, completed: false },
  { id: 5, title: 'Vida de Jesus', description: 'Uma introdução aos acontecimentos centrais dos Evangelhos.', unit: 'Novo Testamento', xp: 30, locked: true, completed: false },
  { id: 6, title: 'Personagens da Bíblia', description: 'Conheça histórias e contextos de grandes personagens bíblicos.', unit: 'Fundamentos', xp: 30, locked: true, completed: false },
];

export const achievements = [
  ['🌱', 'Primeiros passos', 'Complete sua primeira lição.', true],
  ['📖', 'Primeiro versículo', 'Estude seu primeiro versículo.', true],
  ['🔥', 'Uma semana', 'Mantenha uma sequência de 7 dias.', true],
  ['⭐', '100 XP', 'Alcance 100 XP.', false],
  ['🏆', 'Estudioso', 'Complete 10 lições.', false],
  ['🧠', 'Memória afiada', 'Revise 10 conteúdos.', false],
];

export const bibleBooks = [
  { group: 'Pentateuco', books: ['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio'] },
  { group: 'Históricos', books: ['Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', 'Esdras', 'Neemias', 'Ester'] },
  { group: 'Poéticos', books: ['Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cânticos'] },
  { group: 'Profetas', books: ['Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel'] },
  { group: 'Evangelhos', books: ['Mateus', 'Marcos', 'Lucas', 'João'] },
  { group: 'Igreja e Cartas', books: ['Atos', 'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses'] },
  { group: 'Cartas e Apocalipse', books: ['1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'] },
];
