import { achievements } from '../../data';
import { Icon } from '../../components/ui/Icon';
import { getProgress } from '../../storage';
import { useState } from 'react';

export function Achievements() {
  const [category, setCategory] = useState('Todos');
  const progress = getProgress();
  const categories = ['Todos', 'Lições', 'XP', 'Sequência'];
  const visible = achievements.filter(([, title]) => category === 'Todos' || (category === 'Lições' && title.includes('passos')) || (category === 'XP' && title.includes('XP')) || (category === 'Sequência' && title.includes('semana')));
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">CONQUISTAS</span><h1>Seus marcos</h1><p>{progress.lessonsCompleted} lições concluídas • cada pequeno passo conta.</p></div></div><div className="tabs">{categories.map(item => <button className={category === item ? 'tab active' : 'tab'} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="achievement-grid">{visible.map(([icon, title, desc, done]) => { const unlocked = done || (title === '100 XP' && progress.xp >= 100) || (title === 'Estudioso' && progress.lessonsCompleted >= 10); return <div className={`achievement ${unlocked ? 'unlocked' : ''}`} key={title}><span><Icon name={icon} size={24} /></span><div><h3>{title}</h3><p>{desc}</p></div><b><Icon name={unlocked ? 'check' : 'lock'} size={17} /></b></div>; })}</div></div>;
}
