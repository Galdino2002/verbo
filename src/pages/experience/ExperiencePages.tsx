import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { friends as seedFriends } from '../../data/social';
import { defaultMissions } from '../../data/missions';
import { getFeed, getFriends, getMissions, getNotifications, getProgress, saveFeed, saveFriends, saveMissions, saveNotifications, saveProgress } from '../../storage';
import { Icon } from '../../components/ui/Icon';

function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></div>;
}

export function Missions() {
  const [missions, setMissions] = useState(getMissions);
  function advance(id: string) {
    const next = missions.map(m => m.id === id ? { ...m, progress: Math.min(m.target, m.progress + 1) } : m);
    setMissions(next);
    saveMissions(next);
  }
  return <div className="page"><PageTitle eyebrow="DESAFIOS DIÁRIOS" title="Missões" description="Pequenas metas para manter sua jornada em movimento." /><div className="mission-grid">{missions.map(mission => <article className="mission-card" key={mission.id}><div className="card-title-row"><span>{mission.cadence === 'daily' ? 'Hoje' : 'Esta semana'}</span><strong>+{mission.rewardXp} XP</strong></div><h2>{mission.title}</h2><p>{mission.description}</p><div className="mission-progress"><span style={{ width: `${(mission.progress / mission.target) * 100}%` }} /></div><div className="mission-footer"><small>{mission.progress}/{mission.target}</small><button className="text-button" disabled={mission.progress >= mission.target} onClick={() => advance(mission.id)}>{mission.progress >= mission.target ? '✓ Concluída' : 'Registrar progresso'}</button></div></article>)}</div></div>;
}

export function Social() {
  const [items, setItems] = useState(getFeed);
  function like(id: string) {
    const next = items.map(item => item.id === id ? { ...item, liked: !item.liked, likes: item.likes + (item.liked ? -1 : 1) } : item);
    setItems(next);
    saveFeed(next);
  }
  return <div className="page"><PageTitle eyebrow="COMUNIDADE" title="Feed" description="Celebre o progresso de quem está estudando com você." /><div className="feed-list">{items.map(item => <article className="feed-card" key={item.id}><div className="feed-avatar">{item.avatar}</div><div className="feed-content"><strong>{item.userName}</strong><p>{item.text}</p><span className="feed-reward">+{item.xp} XP</span><div className="feed-actions"><button className={`text-button ${item.liked ? 'liked' : ''}`} onClick={() => like(item.id)} aria-label={item.liked ? 'Remover curtida' : 'Curtir'}>♥ {item.likes}</button><button className="text-button" onClick={() => window.alert('Comentários mockados: continue incentivando seu amigo!')}>💬 {item.comments}</button></div></div></article>)}</div></div>;
}

export function Friends() {
  const [friends, setFriends] = useState(getFriends);
  const [search, setSearch] = useState('');
  const visible = friends.filter(friend => friend.name.toLowerCase().includes(search.toLowerCase()));
  function toggle(id: string) {
    const next = friends.map(friend => friend.id === id ? { ...friend, status: friend.status === 'friend' ? 'pending' as const : 'friend' as const } : friend);
    setFriends(next);
    saveFriends(next);
  }
  return <div className="page"><PageTitle eyebrow="COMUNIDADE" title="Meus amigos" description="Estude junto, celebre conquistas e envie desafios." /><label className="search-box" htmlFor="friend-search"><Icon name="search" size={17} /><input id="friend-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Encontrar pessoas..." /></label><div className="friend-list">{visible.map(friend => <article className="friend-card" key={friend.id}><div className="avatar">{friend.avatar}</div><div><strong>{friend.name}</strong><p>Nível {friend.level} • {friend.xp} XP • 🔥 {friend.streak} dias</p></div><button className="primary-button" onClick={() => toggle(friend.id)}>{friend.status === 'friend' ? 'Desafiar' : 'Aceitar'}</button></article>)}</div>{visible.length === 0 && <div className="empty-state"><strong>Nenhuma pessoa encontrada</strong><p>Tente outro nome para encontrar amigos.</p></div>}</div>;
}

export function Ranking() {
  const [tab, setTab] = useState<'global' | 'friends'>('global');
  const progress = getProgress();
  const entries = [{ name: progress.name, xp: progress.xp, avatar: progress.name[0] || 'V' }, ...seedFriends.map(friend => ({ name: friend.name, xp: friend.xp, avatar: friend.avatar }))].sort((a, b) => b.xp - a.xp);
  return <div className="page"><PageTitle eyebrow="COMPETIÇÃO SAUDÁVEL" title="Ranking" description="Compare seu progresso e mantenha o foco na sua jornada." /><div className="tabs"><button className={tab === 'global' ? 'tab active' : 'tab'} onClick={() => setTab('global')}>Global</button><button className={tab === 'friends' ? 'tab active' : 'tab'} onClick={() => setTab('friends')}>Amigos</button></div><div className="ranking-list">{entries.map((entry, index) => <div className={`ranking-row ${entry.name === progress.name ? 'current' : ''}`} key={entry.name}><b>{index + 1 <= 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}</b><span className="avatar">{entry.avatar}</span><strong>{entry.name}</strong><span>{entry.xp.toLocaleString('pt-BR')} XP</span></div>)}</div><p className="muted">{tab === 'friends' ? 'Ranking entre pessoas que você conhece.' : 'Ranking local simulado para esta temporada.'}</p></div>;
}

export function Competitions() {
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  if (started) return <div className="page"><PageTitle eyebrow="DUELO 1V1" title="Você vs João" description="Pergunta 1 de 5 • placar simulado localmente." /><div className="duel-score"><strong>Você<br /><span>0</span></strong><b>VS</b><strong>João<br /><span>0</span></strong></div><div className="question-card"><h2>Quem escreveu muitos dos Salmos?</h2><div className="options">{['Davi', 'Paulo', 'Moisés', 'Lucas'].map(option => <button key={option} className={answer === option ? 'option selected' : 'option'} onClick={() => setAnswer(option)}>{option}</button>)}</div><button className="primary-button" disabled={!answer} onClick={() => navigate('/competicoes/resultado')}>Responder</button></div></div>;
  return <div className="page"><PageTitle eyebrow="COMPETIÇÕES" title="Desafios" description="Teste seus conhecimentos em partidas rápidas." /><div className="competition-card"><span className="eyebrow">PARTIDA DISPONÍVEL</span><h2>Duelo bíblico 1v1</h2><p>5 perguntas • 150 XP para o vencedor</p><button className="primary-button" onClick={() => setStarted(true)}>Começar duelo <Icon name="arrow-right" size={16} /></button></div></div>;
}

export function CompetitionResult() {
  return <div className="lesson-result"><div className="result-icon"><Icon name="trophy" size={30} /></div><span className="eyebrow">PARTIDA CONCLUÍDA</span><h1>Você venceu!</h1><p>Você respondeu mais rápido nesta simulação local.</p><div className="result-xp">+150 XP</div><a className="primary-button" href="/ranking">Ver ranking</a></div>;
}

export function Teams() {
  const [joined, setJoined] = useState(false);
  return <div className="page"><PageTitle eyebrow="COMUNIDADE" title="Equipes" description="Aprenda em grupo e avance juntos." /><div className="team-card"><div className="team-emblem">V</div><div><h2>Guardiões da Palavra</h2><p>{joined ? 'Você faz parte desta equipe.' : '7 de 8 membros • 3.420 XP esta semana'}</p></div><button className="primary-button" onClick={() => setJoined(true)}>{joined ? 'Ver equipe' : 'Entrar na equipe'}</button></div>{joined && <div className="empty-state"><strong>Equipe desbloqueada!</strong><p>Os membros e o progresso semanal serão sincronizados localmente.</p></div>}</div>;
}

export function Tournaments() {
  const [phase, setPhase] = useState(0);
  const phases = ['Oitavas', 'Quartas', 'Semifinal', 'Final'];
  return <div className="page"><PageTitle eyebrow="TORNEIO SEMANAL" title="Copa Verbo" description="16 jogadores • avance pelas fases e conquiste o troféu." /><div className="tournament-card"><Icon name="trophy" size={35} /><h2>{phases[phase]}</h2><p>{phase === phases.length - 1 ? 'A grande final está pronta!' : 'Sua próxima partida está simulada e pronta para começar.'}</p><button className="primary-button" onClick={() => setPhase(value => Math.min(value + 1, phases.length - 1))}>{phase === phases.length - 1 ? 'Ver resultado' : 'Jogar próxima fase'}</button><div className="tournament-track">{phases.map((item, index) => <span className={index <= phase ? 'filled' : ''} key={item}>{item}</span>)}</div></div></div>;
}

export function Notifications() {
  const [items, setItems] = useState(getNotifications);
  function markRead(id: string) {
    const next = items.map(item => item.id === id ? { ...item, read: true } : item);
    setItems(next);
    saveNotifications(next);
  }
  return <div className="page"><PageTitle eyebrow="CENTRAL DE AVISOS" title="Notificações" description="Acompanhe recompensas, missões e novidades." /><div className="notification-list">{items.map(item => <button className={`notification ${item.read ? 'read' : ''}`} key={item.id} onClick={() => markRead(item.id)}><span className="notification-dot">{item.read ? '✓' : '!'}</span><span><strong>{item.title}</strong><small>{item.description}</small></span></button>)}</div></div>;
}

export function Settings() {
  const [saved, setSaved] = useState(false);
  const [sound, setSound] = useState(true);
  const [goal, setGoal] = useState(String(getProgress().studyMinutesGoal));
  return <div className="page"><PageTitle eyebrow="PREFERÊNCIAS" title="Configurações" description="Personalize sua experiência de estudo." /><div className="settings-list"><label className="setting-row"><span><strong>Som de feedback</strong><small>Ouvir efeitos ao acertar uma atividade.</small></span><input type="checkbox" checked={sound} onChange={event => setSound(event.target.checked)} /></label><label className="setting-row"><span><strong>Meta de estudo</strong><small>Escolha uma meta diária em minutos.</small></span><select value={goal} onChange={event => setGoal(event.target.value)}><option value="5">5 minutos</option><option value="10">10 minutos</option><option value="15">15 minutos</option><option value="20">20+ minutos</option></select></label><button className="primary-button" onClick={() => { saveProgress({ ...getProgress(), studyMinutesGoal: Number(goal) }); setSaved(true); }}>{saved ? '✓ Preferências salvas' : 'Salvar preferências'}</button></div></div>;
}

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('10');
  const choices: [string, string[]][] = [['Qual seu nível de conhecimento bíblico?', ['Iniciante', 'Intermediário', 'Avançado']], ['Quanto tempo deseja estudar por dia?', ['5', '10', '15', '20+']], ['Qual seu objetivo?', ['Conhecer a Bíblia', 'Criar hábito', 'Aprofundar conhecimento', 'Estudar com amigos']]];
  function finish() {
    const progress = getProgress();
    saveProgress({ ...progress, onboardingComplete: true, studyMinutesGoal: Number(goal) || 10 });
    navigate('/home');
  }

  const current = choices[step];
  return <main className="login-page onboarding-page"><section className="login-panel"><div className="login-card"><span className="eyebrow">SUA JORNADA</span><h1>{step === choices.length ? 'Tudo pronto!' : 'Bem-vindo ao Verbo'}</h1>{step < choices.length ? <><p className="muted">{current[0]}</p><div className="onboarding-options">{current[1].map(option => <button key={option} className="option" onClick={() => { if (step === 1) setGoal(option); setStep(value => value + 1); }}>{option}</button>)}</div></> : <><p className="muted">Sua experiência está pronta. Comece pela primeira atividade da jornada.</p><button className="primary-button" onClick={finish}>Começar <Icon name="arrow-right" size={16} /></button></>}<div className="onboarding-dots">{[0, 1, 2, 3].map(dot => <span className={dot <= step ? 'filled' : ''} key={dot} />)}</div></div></section></main>;
}

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const progress = getProgress();
    saveProgress({ ...progress, name: name.trim() || 'Jorge', email, onboardingComplete: false });
    localStorage.setItem('verbo_session', 'local');
    navigate('/onboarding');
  }
  return <main className="login-page onboarding-page"><section className="login-panel"><div className="login-card"><span className="eyebrow">COMECE AGORA</span><h1>Crie seu perfil</h1><p className="muted">Seu cadastro é local nesta versão de demonstração.</p><form onSubmit={submit}><label htmlFor="register-name">Nome<input id="register-name" required value={name} onChange={event => setName(event.target.value)} placeholder="Como devemos chamar você?" /></label><label htmlFor="register-email">E-mail<input id="register-email" required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="voce@email.com" /></label><button className="primary-button" type="submit">Continuar <Icon name="arrow-right" size={16} /></button></form><button className="text-button" onClick={() => navigate('/login')}>Já tenho uma conta</button></div></section></main>;
}

export function MissionsHomeCard() {
  const mission = useMemo(() => getMissions()[0] || defaultMissions[0], []);
  return <article className="mission-card compact"><span className="eyebrow">MISSÃO DE HOJE</span><h3>{mission.title}</h3><div className="mission-progress"><span style={{ width: `${(mission.progress / mission.target) * 100}%` }} /></div><small>{mission.progress}/{mission.target} • +{mission.rewardXp} XP</small></article>;
}
