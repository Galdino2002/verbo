import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { achievements, bibleBooks, lessons, verses } from './data';
import { defaultProgress, getProgress, saveProgress } from './storage';
import { Icon } from './components/Icon';

function updateProgress(xp: number, lessonId?: number) {
  const current = getProgress();
  if (lessonId !== undefined && current.completedLessonIds.includes(lessonId)) return;
  current.xp += xp;
  if (lessonId !== undefined) {
    current.lessonsCompleted += 1;
    current.completedLessonIds = [...current.completedLessonIds, lessonId];
  }
  current.level = current.xp >= 1000 ? 'Mestre' : current.xp >= 500 ? 'Discípulo' : current.xp >= 200 ? 'Estudante' : 'Iniciante';
  saveProgress(current);
}

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 4) { setError('Informe um e-mail válido e uma senha com pelo menos 4 caracteres.'); return; }
    localStorage.setItem('verbo_session', 'local');
    saveProgress({ ...defaultProgress, name: email.split('@')[0] || 'Jorge', email });
    navigate('/home');
  }
  return <main className="login-page">
    <section className="login-hero" aria-label="Apresentação do Verbo"><div className="login-logo"><span className="brand-mark">V</span> Verbo</div><div className="hero-copy"><span className="eyebrow">APRENDER • PRATICAR • VIVER</span><h1>Conheça a Bíblia.<br/><em>Construa sua jornada.</em></h1><p>Uma experiência de aprendizado bíblico feita para você estudar um pouco todos os dias.</p></div><div className="hero-verse">“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”<small>Salmos 119:105</small></div></section>
    <section className="login-panel" aria-labelledby="login-title"><div className="login-card"><span className="eyebrow">BEM-VINDO</span><h1 id="login-title">Entre no Verbo</h1><p className="muted">Continue sua jornada de aprendizado.</p><form onSubmit={submit} noValidate><label htmlFor="login-email">E-mail<input id="login-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="voce@email.com" autoComplete="email" /></label><label htmlFor="login-password">Senha<div className="password-field"><input id="login-password" type={show ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Sua senha" autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ocultar conteúdo da senha' : 'Mostrar conteúdo da senha'}><Icon name={show ? 'eye-off' : 'eye'} size={16} /> <span>{show ? 'Ocultar' : 'Mostrar'}</span></button></div></label>{error && <div className="form-error" role="alert">{error}</div>}<div className="form-row"><label className="check"><input type="checkbox"/> <span>Lembrar de mim</span></label><button type="button" className="text-button">Esqueci minha senha</button></div><button className="primary-button" type="submit">Entrar no Verbo <Icon name="arrow-right" size={16} /></button></form><div className="divider"><span>ou</span></div><button className="google-button" type="button"><span className="google-mark">G</span><span>Continuar com Google</span></button><p className="signup">Ainda não tem uma conta? <button className="text-button">Criar conta</button></p></div></section>
  </main>;
}

export function Home() {
  const navigate = useNavigate();
  const progress = getProgress();
  const daily = verses[0];
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">SEU ESPAÇO DE ESTUDO</span><h1>Olá, {progress.name}! <span className="greeting-mark" aria-hidden="true">✦</span></h1><p>Continue sua jornada de aprendizado.</p></div><button className="avatar" onClick={() => navigate('/perfil')} aria-label="Abrir meu perfil">{progress.name[0]?.toUpperCase() || 'J'}</button></div>
    <div className="home-grid">
      <section className="daily-card"><div><span className="card-label"><Icon name="book" size={14} /> VERSÍCULO DO DIA</span><h2>“{daily.text}”</h2><p className="reference">{daily.reference}</p><button className="light-button" onClick={() => navigate('/revisao')}>Estudar versículo <Icon name="arrow-right" size={15} /></button></div><div className="sun" aria-hidden="true"><Icon name="sparkle" size={64} strokeWidth={1.2} /></div></section>
      <section className="progress-card"><div className="card-title-row"><span><Icon name="flame" size={16} /> Sua sequência</span><strong>{progress.streak} dias</strong></div><p>Continue estudando para manter seu ritmo.</p><div className="week">{['S','T','Q','Q','S','S','D'].map((d,i)=><div key={i} className={i < progress.streak % 7 || progress.streak >= 7 ? 'day done' : 'day'}><span>{d}</span><b><Icon name="check" size={14} /></b></div>)}</div></section>
    </div>
    <section className="section"><div className="section-heading"><div><span className="eyebrow">SUA JORNADA</span><h2>Continue aprendendo</h2></div><button className="text-button" onClick={() => navigate('/jornada')}>Ver jornada <Icon name="arrow-right" size={15} /></button></div><div className="lesson-grid">{lessons.slice(0,3).map(l => <button key={l.id} className={`lesson-card ${l.locked ? 'locked' : ''}`} onClick={() => !l.locked && navigate('/licao/'+l.id)}><span className="lesson-icon"><Icon name={l.locked ? 'lock' : 'book'} size={21} /></span><span className="lesson-unit">{l.unit}</span><h3>{l.title}</h3><p>{l.description}</p><strong>+{l.xp} XP</strong></button>)}</div></section>
    <section className="stats-row"><div><span><Icon name="star" /></span><strong>{progress.xp.toLocaleString('pt-BR')}</strong><small>XP total</small></div><div><span><Icon name="library" /></span><strong>{progress.lessonsCompleted}</strong><small>lições concluídas</small></div><div><span><Icon name="brain" /></span><strong>{progress.versesLearned}</strong><small>versículos estudados</small></div><div><span><Icon name="trophy" /></span><strong>{progress.level}</strong><small>nível atual</small></div></section>
  </div>;
}

export function Journey() {
  const navigate = useNavigate();
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MAPA DE APRENDIZADO</span><h1>Sua jornada</h1><p>Avance no seu ritmo, uma lição por vez.</p></div></div>
    <div className="journey"><div className="journey-intro"><span className="unit-number">01</span><div><span className="eyebrow">UNIDADE 1</span><h2>Fundamentos da Bíblia</h2><p>Comece entendendo a estrutura e os grandes temas das Escrituras.</p></div></div>{lessons.map((l,i)=><div key={l.id} className={`journey-node ${l.locked ? 'locked' : ''}`}><div className="node-line"></div><button className="node-circle" aria-label={l.locked ? `${l.title} bloqueada` : `Abrir ${l.title}`} disabled={l.locked} onClick={() => navigate('/licao/'+l.id)}><Icon name={l.locked ? 'lock' : i === 0 ? 'play' : 'check'} size={17} /></button><div className="node-card"><span>{l.unit}</span><h3>{l.title}</h3><p>{l.description}</p><strong>+{l.xp} XP</strong></div></div>)}</div>
  </div>;
}

export function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find(l => l.id === Number(id)) || lessons[0];
  const [step,setStep] = useState(0); const [selected,setSelected] = useState(''); const [finished,setFinished] = useState(false); const [feedback,setFeedback] = useState('');
  const questions = [
    { title: 'Comece lendo', body: lesson.id === 4 ? '“O Senhor é o meu pastor; nada me faltará.”' : 'A Bíblia é uma coleção de livros que reúne diferentes gêneros, autores e contextos.', options: [], answer: '' },
    { title: 'Complete', body: lesson.id === 4 ? 'O Senhor é o meu ______; nada me faltará.' : 'O Antigo Testamento é formado por ______ livros na tradição protestante.', options: lesson.id === 4 ? ['pastor','rei','mestre','amigo'] : ['27','39','66','12'], answer: lesson.id === 4 ? 'pastor' : '39' },
    { title: 'Entenda', body: lesson.id === 4 ? 'No Salmo 23, a imagem do pastor destaca principalmente:' : 'Quem é apresentado como centro da mensagem dos Evangelhos?', options: lesson.id === 4 ? ['Cuidado e direção','Poder político','Riqueza','Guerra'] : ['Jesus','Moisés','Davi','Paulo'], answer: lesson.id === 4 ? 'Cuidado e direção' : 'Jesus' },
  ];
  const q = questions[step];
  function next(){ if(q.options.length > 0 && selected !== q.answer){ setFeedback('Ainda não. Leia a pergunta novamente e tente outra opção.'); return; } if(step < questions.length-1){ setSelected(''); setFeedback(''); setStep(step+1); } else { updateProgress(lesson.xp, lesson.id); setFinished(true); } }
  if(finished) return <div className="lesson-result"><div className="result-icon"><Icon name="check" size={30} /></div><span className="eyebrow">LIÇÃO CONCLUÍDA</span><h1>Muito bem!</h1><p>Você concluiu <strong>{lesson.title}</strong>.</p><div className="result-xp">+{lesson.xp} XP</div><button className="primary-button" onClick={() => navigate('/jornada')}>Voltar para a jornada <Icon name="arrow-right" size={16} /></button></div>;
  return <div className="lesson-page"><div className="lesson-top"><button className="text-button" onClick={() => navigate('/jornada')}>← Sair da lição</button><div className="step-progress" aria-label={`Etapa ${step + 1} de ${questions.length}`}>{questions.map((_,i)=><span key={i} className={i <= step ? 'filled' : ''}></span>)}</div><span aria-live="polite">{step+1}/{questions.length}</span></div><div className="question-card"><span className="eyebrow">{lesson.unit.toUpperCase()}</span><h1>{q.title}</h1><p className="question-body">{q.body}</p>{q.options.length > 0 && <div className="options" role="group" aria-label="Opções de resposta">{q.options.map(o=><button key={o} type="button" className={selected===o ? 'option selected' : 'option'} aria-pressed={selected===o} onClick={() => { setSelected(o); setFeedback(''); }}>{o}</button>)}</div>}{feedback && <p className="answer-feedback" role="alert">{feedback}</p>}<button className="primary-button next-button" disabled={q.options.length>0 && !selected} onClick={next}>{q.options.length > 0 && feedback ? 'Tentar novamente' : step === questions.length-1 ? 'Concluir lição' : 'Continuar →'}</button></div></div>;
}

export function Bible() {
  const [search,setSearch]=useState('');
  const filtered = bibleBooks.map(g=>({...g,books:g.books.filter(b=>b.toLowerCase().includes(search.toLowerCase()))})).filter(g=>g.books.length);
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">BIBLIOTECA</span><h1>Bíblia</h1><p>Explore os livros e encontre seu próximo estudo.</p></div></div><label className="search-box" htmlFor="book-search"><Icon name="search" size={17} /><input id="book-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar livro..." /></label><div className="book-groups">{filtered.length > 0 ? filtered.map(g=><section key={g.group}><span className="eyebrow">{g.group}</span><div className="books">{g.books.map(b=><button type="button" key={b} className="book-card"><Icon name="book" size={22} /><strong>{b}</strong><small>Explorar</small></button>)}</div></section>) : <div className="empty-state"><strong>Nenhum livro encontrado</strong><p>Tente buscar por outro nome, como “Salmos” ou “João”.</p></div>}</div></div>;
}

export function Review() {
  const navigate=useNavigate();
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MEMÓRIA</span><h1>Revisão de hoje</h1><p>Reforce o que você já estudou.</p></div></div><div className="review-hero"><div><span className="card-label"><Icon name="brain" size={14} /> SESSÃO DE REVISÃO</span><h2>Seu cérebro aprende com repetição.</h2><p>Revise versículos e conceitos em poucos minutos.</p><button className="primary-button" onClick={()=>navigate('/licao/4')}>Começar revisão <Icon name="arrow-right" size={15} /></button></div><div className="review-count"><strong>3</strong><span>conteúdos</span></div></div><div className="review-list">{verses.slice(0,3).map(v=><div className="review-item" key={v.id}><Icon name="book" size={20} /><div><strong>{v.reference}</strong><p>{v.text}</p></div><small>{v.theme}</small></div>)}</div></div>;
}

export function Achievements() {
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">CONQUISTAS</span><h1>Seus marcos</h1><p>Cada pequeno passo conta.</p></div></div><div className="achievement-grid">{achievements.map(([icon,title,desc,done])=><div className={`achievement ${done ? 'unlocked' : ''}`} key={title}><span><Icon name={icon} size={24} /></span><div><h3>{title}</h3><p>{desc}</p></div><b><Icon name={done ? 'check' : 'lock'} size={17} /></b></div>)}</div></div>;
}

export function Profile() {
  const progress = getProgress();
  return <div className="page"><div className="profile-header"><div className="large-avatar">{progress.name[0]?.toUpperCase() || 'J'}</div><div><span className="eyebrow">SEU PERFIL</span><h1>{progress.name}</h1><p>Estudante • membro do Verbo</p></div></div><div className="profile-stats"><div><strong>{progress.xp.toLocaleString('pt-BR')}</strong><span>XP</span></div><div><strong>{progress.streak}</strong><span>dias seguidos</span></div><div><strong>{progress.lessonsCompleted}</strong><span>lições</span></div><div><strong>{progress.versesLearned}</strong><span>versículos</span></div></div><section className="profile-card"><span className="eyebrow">PRÓXIMO NÍVEL</span><h2>{progress.level}</h2><div className="big-progress"><span style={{width:`${Math.min((progress.xp % 200)/2,100)}%`}}></span></div><p>Continue estudando para avançar.</p></section></div>;
}

export function Challenge() {
  const navigate=useNavigate(); const [answer,setAnswer]=useState(''); const [done,setDone]=useState(false); const [feedback,setFeedback]=useState('');
  if(done) return <div className="lesson-result"><div className="result-icon"><Icon name="trophy" size={30} /></div><span className="eyebrow">DESAFIO CONCLUÍDO</span><h1>Você foi muito bem!</h1><p>+100 XP adicionados ao seu progresso.</p><div className="result-xp">100 XP</div><button className="primary-button" onClick={()=>navigate('/home')}>Voltar ao início <Icon name="arrow-right" size={16} /></button></div>;
  return <div className="lesson-page"><div className="question-card challenge-card"><span className="eyebrow"><Icon name="sparkle" size={14} /> DESAFIO BÍBLICO • 1/5</span><h1>Quem é tradicionalmente associado à autoria do Salmo 23?</h1><div className="options" role="group" aria-label="Opções de resposta">{['Moisés','Davi','Pedro','Paulo'].map(o=><button type="button" key={o} className={answer===o?'option selected':'option'} aria-pressed={answer===o} onClick={()=>{setAnswer(o);setFeedback('')}}>{o}</button>)}</div>{feedback && <p className="answer-feedback" role="alert">{feedback}</p>}<button className="primary-button next-button" disabled={!answer} onClick={()=>{if(answer === 'Davi'){updateProgress(100);setDone(true)} else setFeedback('A resposta correta é Davi. Tente novamente.')}}>Responder <Icon name="arrow-right" size={16} /></button></div></div>;
}
