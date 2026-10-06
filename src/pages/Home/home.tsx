import { useNavigate } from 'react-router-dom';
import { lessons, verses } from '../../data';
import { getProgress } from '../../storage';
import { Icon } from '../../components/ui/Icon';
import { getLevelInfo } from '../../utils/levels';
import { MissionsHomeCard } from '../experience/ExperiencePages';

export function Home() {
  const navigate = useNavigate();
  const progress = getProgress();
  const daily = verses[0];
  const level = getLevelInfo(progress.xp);
  const nextLesson = lessons.find(lesson => !lesson.locked && !progress.completedLessonIds.includes(lesson.id)) || lessons[0];
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const completedToday = progress.activityDates.includes(today);
  const dayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const weekDays = dayLabels.map((label, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return { label, active: progress.activityDates.includes(dateKey) };
  });
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">SEU ESPAÇO DE ESTUDO</span><h1>Olá, {progress.name}! <span className="greeting-mark" aria-hidden="true">✦</span></h1><p>Continue sua jornada de aprendizado.</p></div><button className="avatar" onClick={() => navigate('/perfil')} aria-label="Abrir meu perfil">{progress.name[0]?.toUpperCase() || 'J'}</button></div>
    <section className="continue-card"><div><span className="eyebrow">PRÓXIMA ATIVIDADE</span><h2>{nextLesson.title}</h2><p>{nextLesson.description}</p></div><button className="primary-button" onClick={() => navigate(`/licao/${nextLesson.id}`)}>Continuar jornada <Icon name="arrow-right" size={16} /></button></section>
    <div className="home-grid"><section className="daily-card"><div><span className="card-label"><Icon name="book" size={14} /> VERSÍCULO DO DIA</span><h2>“{daily.text}”</h2><p className="reference">{daily.reference}</p><button className="light-button" onClick={() => navigate('/revisao')}>Estudar versículo <Icon name="arrow-right" size={15} /></button></div><div className="sun" aria-hidden="true"><Icon name="sparkle" size={64} strokeWidth={1.2} /></div></section><section className="progress-card"><div className="card-title-row"><span><Icon name="flame" size={16} /> Sua sequência</span><strong>{progress.streak} dias</strong></div><p>{completedToday ? 'Atividade de hoje concluída!' : 'Faça uma atividade hoje para manter seu ritmo.'}</p><div className="week">{weekDays.map((day, i) => <div key={`${day.label}-${i}`} className={day.active ? 'day done' : 'day'}><span>{day.label}</span><b>{day.active ? <Icon name="check" size={14} /> : '—'}</b></div>)}</div></section></div>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">SUA JORNADA</span><h2>Continue aprendendo</h2></div><button className="text-button" onClick={() => navigate('/jornada')}>Ver jornada <Icon name="arrow-right" size={15} /></button></div><div className="lesson-grid">{lessons.slice(0, 3).map(l => { const completed = progress.completedLessonIds.includes(l.id); return <button key={l.id} className={`lesson-card ${l.locked ? 'locked' : ''}`} disabled={l.locked} onClick={() => navigate(`/licao/${l.id}`)}><span className="lesson-icon"><Icon name={completed ? 'check' : l.locked ? 'lock' : 'book'} size={21} /></span><span className="lesson-unit">{completed ? 'CONCLUÍDA' : l.unit}</span><h3>{l.title}</h3><p>{l.description}</p><strong>+{l.xp} XP</strong></button>; })}</div></section>
    <section className="home-extra"><MissionsHomeCard /><article className="progress-card level-card"><div className="card-title-row"><span>NÍVEL {level.level} • {level.title}</span><strong>{level.current}/{level.next} XP</strong></div><div className="mission-progress"><span style={{ width: `${level.percent}%` }} /></div><p>Faltam {level.next - level.current} XP para o próximo nível.</p></article></section>
    <section className="stats-row"><div><span><Icon name="star" /></span><strong>{progress.xp.toLocaleString('pt-BR')}</strong><small>XP total</small></div><div><span><Icon name="library" /></span><strong>{progress.lessonsCompleted}</strong><small>lições concluídas</small></div><div><span><Icon name="brain" /></span><strong>{progress.versesLearned}</strong><small>versículos estudados</small></div><div><span><Icon name="trophy" /></span><strong>{level.title}</strong><small>nível {level.level}</small></div></section>
  </div>;
}
