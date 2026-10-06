import type { BibleBookGroup, Verse } from '../types';

export const verses: Verse[] = [
  { id: 1, reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.', theme: 'Confiança' },
  { id: 2, reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.', theme: 'Amor' },
  { id: 3, reference: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.', theme: 'Força' },
  { id: 4, reference: 'Provérbios 3:5', text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.', theme: 'Sabedoria' },
];

export const bibleBooks: BibleBookGroup[] = [
  { group: 'Pentateuco', books: ['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio'] },
  { group: 'Históricos', books: ['Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', 'Esdras', 'Neemias', 'Ester'] },
  { group: 'Poéticos', books: ['Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cânticos'] },
  { group: 'Profetas', books: ['Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel'] },
  { group: 'Evangelhos', books: ['Mateus', 'Marcos', 'Lucas', 'João'] },
  { group: 'Igreja e Cartas', books: ['Atos', 'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses'] },
  { group: 'Cartas e Apocalipse', books: ['1 Timóteo', '2 Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João', 'Judas', 'Apocalipse'] },
];
