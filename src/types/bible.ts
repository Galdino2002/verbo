export type Verse = {
  id: number;
  reference: string;
  text: string;
  theme: string;
};

export type BibleBookGroup = {
  group: string;
  books: string[];
};
