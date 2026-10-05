export type Lesson = {
  id: number
  title: string
  description: string
  xp: number
  locked: boolean
}

export type UserProgress = {
  name: string
  xp: number
  level: string
  streak: number
}

export type DailyVerse = {
  text: string
  reference: string
}

export const userProgress: UserProgress = {
  name: 'Jorge',
  xp: 1240,
  level: 'Estudante',
  streak: 7,
}

export const dailyVerse: DailyVerse = {
  text: 'O Senhor é o meu pastor; nada me faltará.',
  reference: 'Salmos 23:1',
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Conhecendo a Bíblia',
    description: 'Aprenda como a Bíblia está organizada.',
    xp: 20,
    locked: false,
  },
  {
    id: 2,
    title: 'Antigo Testamento',
    description: 'Conheça os primeiros livros da Bíblia.',
    xp: 20,
    locked: true,
  },
  {
    id: 3,
    title: 'Novo Testamento',
    description: 'Conheça os Evangelhos.',
    xp: 20,
    locked: true,
  },
]

export const weekDays = [
  { name: 'Seg', completed: true },
  { name: 'Ter', completed: true },
  { name: 'Qua', completed: true },
  { name: 'Qui', completed: true },
  { name: 'Sex', completed: true },
  { name: 'Sáb', completed: true },
  { name: 'Dom', completed: false },
]
