import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { activities, lessons } from '../../data';
import { updateProgress } from '../../utils/progress';
import { ActivityPlayer } from '../../components/game/ActivityPlayer';
import { Icon } from '../../components/ui/Icon';
import type { ActivityResult } from '../../types';

export function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find(l => l.id === Number(id)) || lessons[0];
  const [finished, setFinished] = useState(false);
  const [earnedXp, setEarnedXp] = useState(lesson.xp);
  const lessonActivities = activities.filter(activity => activity.lessonId === lesson.id);
  function finish(result: ActivityResult): void {
    updateProgress(result.xp, lesson.id, result);
    setEarnedXp(result.xp);
    setFinished(true);
  }
  if (finished) return   <div className="lesson-result"><div className="result-icon"><Icon name="check" size={30} /></div><span className="eyebrow">LIÇÃO CONCLUÍDA</span><h1>Muito bem!</h1><p>Você concluiu <strong>{lesson.title}</strong>.</p><div className="result-xp">+{earnedXp} XP</div><p className="muted">Sua próxima atividade já está esperando na jornada.</p><button className="primary-button" onClick={() => navigate('/jornada')}>Voltar para a jornada <Icon name="arrow-right" size={16} /></button></div>;
  return <ActivityPlayer activities={lessonActivities.length > 0 ? lessonActivities : activities.slice(0, 2)} onComplete={finish} onExit={() => navigate('/jornada')} />;
}
