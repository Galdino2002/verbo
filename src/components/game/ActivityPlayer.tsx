import { useState } from 'react';
import type { Activity } from '../../types';
import { calculateXp } from '../../utils/progress';
import { Icon } from '../ui/Icon';

type ActivityPlayerProps = {
  activities: Activity[];
  onComplete: (xp: number, correctCount: number) => void;
  onExit: () => void;
};

export function ActivityPlayer({ activities, onComplete, onExit }: ActivityPlayerProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [combo, setCombo] = useState(0);
  const [earned, setEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const activity = activities[index];

  function submit() {
    if (!answer || feedback) return;
    const correct = answer === activity.correctAnswer;
    if (correct) {
      const nextCombo = combo + 1;
      const reward = calculateXp(activity.xp, nextCombo, activity.difficulty);
      setCombo(nextCombo);
      setCorrectCount(value => value + 1);
      setEarned(value => value + reward);
      setFeedback('correct');
    } else {
      setCombo(0);
      setFeedback('wrong');
    }
  }

  function next() {
    if (index === activities.length - 1) {
      onComplete(earned, correctCount);
      return;
    }
    setIndex(value => value + 1);
    setAnswer('');
    setFeedback(null);
  }

  if (!activity) return <div className="empty-state"><strong>Atividade indisponível</strong><p>Não foi possível carregar esta atividade.</p><button className="primary-button" onClick={onExit}>Voltar</button></div>;
  return <div className="lesson-page">
    <div className="lesson-top">
      <button className="text-button" onClick={onExit}>← Sair da atividade</button>
      <div className="step-progress" aria-label={`Atividade ${index + 1} de ${activities.length}`}>{activities.map((item, itemIndex) => <span key={item.id} className={itemIndex <= index ? 'filled' : ''} />)}</div>
      <span aria-live="polite">{index + 1}/{activities.length}</span>
    </div>
    <div className="game-status" aria-live="polite"><span>⭐ {earned} XP</span>{combo > 1 && <strong>🔥 COMBO x{Math.min(combo, 4)}</strong>}</div>
    <div className="question-card">
      <span className="eyebrow">{activity.type.replace('-', ' ').toUpperCase()} • {activity.difficulty.toUpperCase()}</span>
      <h1>{activity.question}</h1>
      <div className="options" role="group" aria-label="Opções de resposta">{activity.options.map(option => <button key={option} type="button" className={answer === option ? 'option selected' : 'option'} aria-pressed={answer === option} disabled={Boolean(feedback)} onClick={() => setAnswer(option)}>{option}</button>)}</div>
      {feedback === 'correct' && <div className="answer-feedback success" role="status"><strong>✓ Correto!</strong><p>{activity.explanation}</p><b>+{calculateXp(activity.xp, combo, activity.difficulty)} XP {combo > 1 && `• Combo x${Math.min(combo, 4)}`}</b></div>}
      {feedback === 'wrong' && <div className="answer-feedback" role="alert"><strong>✕ Ainda não!</strong><p>A resposta correta é <b>{activity.correctAnswer}</b>.</p><p>{activity.explanation}</p></div>}
      {!feedback ? <button className="primary-button next-button" disabled={!answer} onClick={submit}>Responder <Icon name="arrow-right" size={16} /></button> : <button className="primary-button next-button" onClick={feedback === 'wrong' ? () => { setAnswer(''); setFeedback(null); } : next}>{feedback === 'wrong' ? 'Tentar novamente' : index === activities.length - 1 ? 'Concluir atividade' : 'Próxima pergunta'} <Icon name="arrow-right" size={16} /></button>}
    </div>
  </div>;
}
