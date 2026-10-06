import { getProgress } from '../../storage';
import { getLevelInfo } from '../../utils/levels';
import { getFriends } from '../../storage';
import { useNavigate, useParams } from 'react-router-dom';

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const progress = getProgress();
  const level = getLevelInfo(progress.xp);
  const other = id ? getFriends().find(friend => friend.id === id) : undefined;
  if (other) return <div className="page"><div className="profile-header"><div className="large-avatar">{other.avatar}</div><div><span className="eyebrow">PERFIL PÚBLICO</span><h1>{other.name}</h1><p>Nível {other.level} • estudante do Verbo</p></div></div><div className="profile-stats"><div><strong>{other.xp}</strong><span>XP</span></div><div><strong>{other.streak}</strong><span>dias seguidos</span></div><div><strong>12</strong><span>lições</span></div><div><strong>86%</strong><span>precisão</span></div></div><div className="profile-actions"><button className="primary-button" onClick={() => navigate('/duplas')}>Desafiar</button><button className="light-button" onClick={() => navigate('/amigos')}>Adicionar amigo</button></div></div>;
  return <div className="page"><div className="profile-header"><div className="large-avatar">{progress.name[0]?.toUpperCase() || 'J'}</div><div><span className="eyebrow">SEU PERFIL</span><h1>{progress.name}</h1><p>Estudante • nível {level.level} • membro do Verbo</p></div></div><div className="profile-stats"><div><strong>{progress.xp.toLocaleString('pt-BR')}</strong><span>XP total</span></div><div><strong>{progress.streak}</strong><span>dias seguidos</span></div><div><strong>{progress.longestStreak}</strong><span>maior sequência</span></div><div><strong>{progress.accuracy}%</strong><span>precisão</span></div></div><section className="profile-card"><span className="eyebrow">NÍVEL {level.level} • {level.title}</span><h2>{level.current} / {level.next} XP</h2><div className="big-progress"><span style={{ width: `${level.percent}%` }} /></div><p>Mais {level.next - level.current} XP para subir de nível.</p></section><section className="stats-row profile-detail-stats"><div><strong>{progress.activitiesCompleted}</strong><small>atividades concluídas</small></div><div><strong>{progress.lessonsCompleted}</strong><small>lições concluídas</small></div><div><strong>{progress.versesLearned}</strong><small>versículos estudados</small></div><div><strong>{progress.studyMinutesToday}/{progress.studyMinutesGoal}</strong><small>minutos hoje</small></div></section></div>;
}
