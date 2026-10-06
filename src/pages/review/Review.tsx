import { useNavigate } from 'react-router-dom';
import { verses } from '../../data';
import { Icon } from '../../components/ui/Icon';
import { getReviews } from '../../storage';

export function Review() {
  const navigate = useNavigate();
  const reviews = getReviews();
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MEMÓRIA</span><h1>Revisão de hoje</h1><p>{reviews.length ? 'Reforce o que você errou recentemente.' : 'Sua fila está limpa. Continue jogando para criar novas revisões.'}</p></div></div><div className="review-hero"><div><span className="card-label"><Icon name="brain" size={14} /> SESSÃO DE REVISÃO</span><h2>Seu cérebro aprende com repetição.</h2><p>{reviews.length ? 'Revise estas perguntas e fixe o conteúdo.' : 'Respostas erradas entram automaticamente nesta fila.'}</p><button className="primary-button" disabled={!reviews.length} onClick={() => navigate(`/licao/${reviews[0]?.lessonId || 4}`)}>Começar revisão <Icon name="arrow-right" size={15} /></button></div><div className="review-count"><strong>{reviews.length}</strong><span>conteúdos</span></div></div><div className="review-list">{(reviews.length ? reviews : verses.slice(0, 3).map(v => ({ id: v.id, question: v.reference, explanation: v.text, options: [], correctAnswer: '', xp: 0, difficulty: 'easy' as const, lessonId: 4, type: 'verse' as const }))).map(item => <div className="review-item" key={item.id}><Icon name="book" size={20} /><div><strong>{item.question}</strong><p>{item.explanation}</p></div><small>{item.type}</small></div>)}</div></div>;
}
