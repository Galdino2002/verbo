import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProgress, saveProgress } from '../../storage';

const sampleVerses = [
  { number: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
  { number: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
  { number: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
  { number: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum.' },
];
const chapterVerses: Record<string, typeof sampleVerses> = {
  Gênesis: [{ number: 1, text: 'No princípio, criou Deus os céus e a terra.' }, { number: 2, text: 'A terra, porém, estava sem forma e vazia.' }],
  João: [{ number: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus.' }, { number: 2, text: 'Ele estava no princípio com Deus.' }],
  Provérbios: [{ number: 1, text: 'O temor do Senhor é o princípio do conhecimento.' }, { number: 2, text: 'O sábio ouvirá e crescerá em conhecimento.' }],
};

export function BibleReader() {
  const { book = 'Salmos', chapter = '23' } = useParams();
  const navigate = useNavigate();
  const chapterContent = chapterVerses[book] || sampleVerses;
  const initial = getProgress();
  const [marked, setMarked] = useState<string[]>(initial.markedVerses);
  const [note, setNote] = useState(initial.notes[`${book}-${chapter}`] || '');
  const [saved, setSaved] = useState(initial.versesBookmarked.includes(`${book} ${chapter}`));
  function toggleVerse(number: number) {
    const key = `${book}-${chapter}-${number}`;
    const next = marked.includes(key) ? marked.filter(item => item !== key) : [...marked, key];
    setMarked(next);
    saveProgress({ ...getProgress(), markedVerses: next });
  }
  function favorite() {
    const progress = getProgress();
    const key = `${book} ${chapter}`;
    const versesBookmarked = progress.versesBookmarked.includes(key) ? progress.versesBookmarked.filter(item => item !== key) : [...progress.versesBookmarked, key];
    saveProgress({ ...progress, versesBookmarked });
    setSaved(versesBookmarked.includes(key));
  }
  function saveNote(value: string) {
    setNote(value);
    const progress = getProgress();
    saveProgress({ ...progress, notes: { ...progress.notes, [`${book}-${chapter}`]: value } });
  }
  return <div className="page"><button className="text-button" onClick={() => navigate('/biblia')}>← Voltar para a biblioteca</button><div className="reading-heading"><div><span className="eyebrow">LEITURA</span><h1>{book} {chapter}</h1><p>Leia, marque e transforme este capítulo em uma atividade.</p></div><button className="primary-button" onClick={favorite}>{saved ? '✓ Favoritado' : '☆ Favoritar capítulo'}</button></div><div className="reading-card">{chapterContent.map(verse => { const key = `${book}-${chapter}-${verse.number}`; return <button className={`verse-row ${marked.includes(key) ? 'marked' : ''}`} onClick={() => toggleVerse(verse.number)} key={verse.number}><b>{verse.number}</b><span>{verse.text}</span><small>{marked.includes(key) ? '✓ marcado' : 'marcar'}</small></button>; })}</div><div className="reading-actions"><textarea value={note} onChange={event => saveNote(event.target.value)} placeholder="Adicionar uma anotação..." aria-label="Anotação do capítulo" /><div><button className="light-button" onClick={() => saveNote('Copiado visualmente: ' + chapterContent[0].text)}>Copiar versículo</button><button className="primary-button" onClick={() => navigate('/licao/4')}>Estudar este capítulo</button></div></div></div>;
}
