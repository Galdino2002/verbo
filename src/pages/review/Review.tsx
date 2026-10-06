import { useNavigate } from 'react-router-dom';
import { verses } from '../../data';
import { Icon } from '../../components/ui/Icon';

export function Review() {
  const navigate = useNavigate();
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MEMÓRIA</span><h1>Revisão de hoje</h1><p>Reforce o que você já estudou.</p></div></div><div className="review-hero"><div><span className="card-label"><Icon name="brain" size={14} /> SESSÃO DE REVISÃO</span><h2>Seu cérebro aprende com repetição.</h2><p>Revise versículos e conceitos em poucos minutos.</p><button className="primary-button" onClick={() => navigate('/licao/4')}>Começar revisão <Icon name="arrow-right" size={15} /></button></div><div className="review-count"><strong>3</strong><span>conteúdos</span></div></div><div className="review-list">{verses.slice(0, 3).map(v => <div className="review-item" key={v.id}><Icon name="book" size={20} /><div><strong>{v.reference}</strong><p>{v.text}</p></div><small>{v.theme}</small></div>)}</div></div>;
}
