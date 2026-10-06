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
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">SEU ESPAÇO DE ESTUDO</span><h1>Olá, {progress.name}! <span className="greeting-mark" aria-hidden="true">✦</span></h1><p>Continue sua jornada de aprendizado.</p></div><button className="avatar" onClick={() => navigate('/perfil')} aria-label="Abrir meu perfil">{progress.name[0]?.toUpperCase() || 'J'}</button></div>
    <div className="home-grid"><section className="daily-card"><div><span className="card-label"><Icon name="book" size={14} /> VERSÍCULO DO DIA</span><h2>“{daily.text}”</h2><p className="reference">{daily.reference}</p><button className="light-button" onClick={() => navigate('/revisao')}>Estudar versículo <Icon name="arrow-right" size={15} /></button></div><div className="sun" aria-hidden="true"><Icon name="sparkle" size={64} strokeWidth={1.2} /></div></section><section className="progress-card"><div className="card-title-row"><span><Icon name="flame" size={16} /> Sua sequência</span><strong>{progress.streak} dias</strong></div><p>Continue estudando para manter seu ritmo.</p><div className="week">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => <div key={i} className={i < progress.streak % 7 || progress.streak >= 7 ? 'day done' : 'day'}><span>{d}</span><b><Icon name="check" size={14} /></b></div>)}</div></section></div>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">SUA JORNADA</span><h2>Continue aprendendo</h2></div><button className="text-button" onClick={() => navigate('/jornada')}>Ver jornada <Icon name="arrow-right" size={15} /></button></div><div className="lesson-grid">{lessons.slice(0, 3).map(l => <button key={l.id} className={`lesson-card ${l.locked ? 'locked' : ''}`} onClick={() => !l.locked && navigate(`/licao/${l.id}`)}><span className="lesson-icon"><Icon name={l.locked ? 'lock' : 'book'} size={21} /></span><span className="lesson-unit">{l.unit}</span><h3>{l.title}</h3><p>{l.description}</p><strong>+{l.xp} XP</strong></button>)}</div></section>
    <section className="home-extra"><MissionsHomeCard /><article className="progress-card level-card"><div className="card-title-row"><span>NÍVEL {level.level} • {level.title}</span><strong>{level.current}/{level.next} XP</strong></div><div className="mission-progress"><span style={{ width: `${level.percent}%` }} /></div><p>Faltam {level.next - level.current} XP para o próximo nível.</p></article></section>
    <section className="stats-row"><div><span><Icon name="star" /></span><strong>{progress.xp.toLocaleString('pt-BR')}</strong><small>XP total</small></div><div><span><Icon name="library" /></span><strong>{progress.lessonsCompleted}</strong><small>lições concluídas</small></div><div><span><Icon name="brain" /></span><strong>{progress.versesLearned}</strong><small>versículos estudados</small></div><div><span><Icon name="trophy" /></span><strong>{level.title}</strong><small>nível {level.level}</small></div></section>
  </div>;
}
