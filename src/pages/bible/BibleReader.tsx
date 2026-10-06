import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProgress, saveProgress } from '../../storage';

const sampleVerses = [
  { number: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
  { number: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
  { number: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
  { number: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum.' },
];

export function BibleReader() {
  const { book = 'Salmos', chapter = '23' } = useParams();
  const navigate = useNavigate();
  const [marked, setMarked] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  function toggleVerse(number: number) {
    const key = `${book}-${chapter}-${number}`;
    setMarked(value => value.includes(key) ? value.filter(item => item !== key) : [...value, key]);
  }
  function favorite() {
    const progress = getProgress();
    const key = `${book} ${chapter}`;
    const versesBookmarked = progress.versesBookmarked.includes(key) ? progress.versesBookmarked.filter(item => item !== key) : [...progress.versesBookmarked, key];
    saveProgress({ ...progress, versesBookmarked });
    setSaved(true);
  }
  return <div className="page"><button className="text-button" onClick={() => navigate('/biblia')}>← Voltar para a biblioteca</button><div className="reading-heading"><div><span className="eyebrow">LEITURA</span><h1>{book} {chapter}</h1><p>Leia, marque e transforme este capítulo em uma atividade.</p></div><button className="primary-button" onClick={favorite}>{saved ? '✓ Favoritado' : '☆ Favoritar capítulo'}</button></div><div className="reading-card">{sampleVerses.map(verse => { const key = `${book}-${chapter}-${verse.number}`; return <button className={`verse-row ${marked.includes(key) ? 'marked' : ''}`} onClick={() => toggleVerse(verse.number)} key={verse.number}><b>{verse.number}</b><span>{verse.text}</span><small>{marked.includes(key) ? '✓ marcado' : 'marcar'}</small></button>; })}</div><div className="reading-actions"><textarea value={note} onChange={event => setNote(event.target.value)} placeholder="Adicionar uma anotação mockada..." aria-label="Anotação do capítulo" /><div><button className="light-button" onClick={() => setNote('Copiado visualmente: ' + sampleVerses[0].text)}>Copiar versículo</button><button className="primary-button" onClick={() => navigate('/licao/4')}>Iniciar estudo</button></div></div></div>;
}
