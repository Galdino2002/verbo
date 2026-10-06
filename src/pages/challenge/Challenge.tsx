import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProgress } from '../../utils/progress';
import { Icon } from '../../components/ui/Icon';

export function Challenge() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState('');
  if (done) return <div className="lesson-result"><div className="result-icon"><Icon name="trophy" size={30} /></div><span className="eyebrow">DESAFIO CONCLUÍDO</span><h1>Você foi muito bem!</h1><p>+100 XP adicionados ao seu progresso.</p><div className="result-xp">100 XP</div><button className="primary-button" onClick={() => navigate('/home')}>Voltar ao início <Icon name="arrow-right" size={16} /></button></div>;
  return <div className="lesson-page"><div className="question-card challenge-card"><span className="eyebrow"><Icon name="sparkle" size={14} /> DESAFIO BÍBLICO • 1/5</span><h1>Quem é tradicionalmente associado à autoria do Salmo 23?</h1><div className="options" role="group" aria-label="Opções de resposta">{['Moisés', 'Davi', 'Pedro', 'Paulo'].map(o => <button type="button" key={o} className={answer === o ? 'option selected' : 'option'} aria-pressed={answer === o} onClick={() => { setAnswer(o); setFeedback(''); }}>{o}</button>)}</div>{feedback && <p className="answer-feedback" role="alert">{feedback}</p>}<button className="primary-button next-button" disabled={!answer} onClick={() => { if (answer === 'Davi') { updateProgress(100); setDone(true); } else setFeedback('A resposta correta é Davi. Tente novamente.'); }}>Responder <Icon name="arrow-right" size={16} /></button></div></div>;
}
