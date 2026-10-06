import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameQuestions } from '../../data/games';
import { getGameMatch, getGameResults, getProgress, getTeams, saveGameMatch, saveGameResult, saveTeams } from '../../storage';
import type { GameMode, GameResult, LocalTeam } from '../../types/game';
import { Icon } from '../../components/ui/Icon';
import { updateProgress } from '../../utils/progress';

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></div>;
}

export function GamesHome() {
  const navigate = useNavigate();
  const results = getGameResults();
  const wins = results.filter(result => result.won).length;
  const winRate = results.length ? Math.round((wins / results.length) * 100) : 0;
  return <div className="page game-page"><Heading eyebrow="JOGAR" title="Aprenda competindo" description="Escolha um desafio, responda com atenção e transforme conhecimento em pontos." />
    <div className="game-hero"><div><span className="eyebrow">ARENA VERBO</span><h2>Pronto para uma nova rodada?</h2><p>Partidas rápidas, bíblicas e salvas automaticamente neste dispositivo.</p></div><div className="game-hero-mark">⚔</div></div>
    <div className="game-mode-grid">
      <button className="game-mode-card featured" onClick={() => navigate('/jogar/duelo')}><span className="game-card-icon">⚔</span><span className="eyebrow">1X1 • 10 PERGUNTAS</span><h2>Duelo bíblico</h2><p>Enfrente um amigo ou um adversário aleatório em uma disputa de conhecimento.</p><strong>Jogar agora <Icon name="arrow-right" size={16} /></strong></button>
      <button className="game-mode-card" onClick={() => navigate('/jogar/equipes')}><span className="game-card-icon">♜</span><span className="eyebrow">BATALHA EM GRUPO</span><h2>Batalha de equipes</h2><p>Monte sua equipe, some contribuições e conquiste a liderança.</p><strong>Ver equipes <Icon name="arrow-right" size={16} /></strong></button>
    </div>
    <div className="game-stat-strip"><div><strong>{results.length}</strong><span>Partidas</span></div><div><strong>{wins}</strong><span>Vitórias</span></div><div><strong>{winRate}%</strong><span>Taxa de vitória</span></div><div><strong>{results[0]?.maxCombo || 0}</strong><span>Maior combo</span></div></div>
    <div className="game-how"><h2>Como funciona</h2><div><span>1</span><p><strong>Escolha seu modo</strong><br />Duelo individual ou força da equipe.</p></div><div><span>2</span><p><strong>Responda em até 10 segundos</strong><br />Acertos seguidos aumentam seu combo.</p></div><div><span>3</span><p><strong>Suba no placar</strong><br />Seu desempenho fica salvo para a próxima revanche.</p></div></div>
    {results.length > 0 && <section className="game-history"><div className="section-heading"><div><span className="eyebrow">SUAS PARTIDAS</span><h2>Histórico recente</h2></div><button className="text-button" onClick={() => navigate('/jogar/duelo')}>Nova partida <Icon name="arrow-right" size={14} /></button></div>{results.slice(0, 3).map(result => <div className="game-history-row" key={result.matchId}><span className={`history-badge ${result.won ? 'win' : 'loss'}`}>{result.won ? 'Vitória' : 'Derrota'}</span><strong>{result.score} <small>×</small> {result.opponentScore}</strong><span>vs. {result.opponentName}</span><time>{new Date(result.completedAt).toLocaleDateString('pt-BR')}</time></div>)}</section>}
  </div>;
}

export function DuelLobby() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<GameMode>('random');
  const [friend, setFriend] = useState('Ana');
  const progress = getProgress();
  function start() {
    const opponentName = mode === 'friend' ? friend : 'Rafael (aleatório)';
    saveGameMatch({ id: `match-${Date.now()}`, mode, opponentName, questions: gameQuestions, currentQuestion: 0, score: 0, opponentScore: 0, combo: 0, maxCombo: 0, answers: [], startedAt: new Date().toISOString(), finished: false });
    navigate('/jogar/duelo/partida');
  }
  return <div className="page game-page"><Heading eyebrow="DUELO 1X1" title="Quem vai jogar?" description="Escolha seu adversário e prepare-se para 10 perguntas bíblicas." />
    <div className="duel-lobby"><div className="duel-preview"><div className="avatar">{progress.name[0] || 'V'}</div><strong>{progress.name}</strong><span>Você</span><b>VS</b><div className="avatar opponent-avatar">{mode === 'friend' ? friend[0] : '?'}</div><strong>{mode === 'friend' ? friend : 'Aleatório'}</strong><span>Adversário</span></div>
      <div className="mode-options"><button className={mode === 'friend' ? 'mode-option active' : 'mode-option'} onClick={() => setMode('friend')}><strong>Convidar amigo</strong><small>Escolha alguém da sua lista</small></button><button className={mode === 'random' ? 'mode-option active' : 'mode-option'} onClick={() => setMode('random')}><strong>Jogar aleatório</strong><small>Encontre um adversário simulado</small></button></div>
      {mode === 'friend' && <label className="field-label">Amigo<select value={friend} onChange={event => setFriend(event.target.value)}><option>Ana</option><option>Lucas</option><option>Beatriz</option></select></label>}
      <div className="game-rules"><span>10 perguntas</span><span>10s por pergunta</span><span>Combo por acertos</span></div><button className="primary-button game-start-button" onClick={start}>Iniciar duelo <Icon name="arrow-right" size={16} /></button>
    </div></div>;
}

export function DuelMatch() {
  const navigate = useNavigate();
  const [match, setMatch] = useState(getGameMatch);
  const [time, setTime] = useState(10);
  const [selected, setSelected] = useState<string | null>(null);
  const question = match?.questions[match.currentQuestion];
  useEffect(() => {
    const timer = window.setInterval(() => setTime(value => value > 0 ? value - 1 : 0), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (time === 0 && selected === null) answer('');
  }, [time, selected]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!match || !question) { return <div className="page empty-state"><h2>Nenhuma partida em andamento</h2><button className="primary-button" onClick={() => navigate('/jogar/duelo')}>Voltar ao duelo</button></div>; }
  function answer(value: string) {
    if (selected !== null || !question) return;
    setSelected(value);
    const correct = value === question.answer;
    const combo = correct ? match.combo + 1 : 0;
    const next = { ...match, score: match.score + (correct ? 50 + Math.min(match.combo, 3) * 10 : 0), opponentScore: match.opponentScore + (match.currentQuestion % 2 === 0 ? 30 : 0), combo, maxCombo: Math.max(match.maxCombo, combo), answers: [...match.answers, value] };
    window.setTimeout(() => {
      if (next.currentQuestion === next.questions.length - 1) {
        const correctAnswers = next.answers.filter((answerValue, index) => answerValue === next.questions[index].answer).length;
        const rewardXp = next.score >= next.opponentScore ? 150 : 50;
        const result: GameResult = { matchId: next.id, mode: next.mode, opponentName: next.opponentName, score: next.score, opponentScore: next.opponentScore, correctAnswers, totalQuestions: next.questions.length, maxCombo: next.maxCombo, won: next.score >= next.opponentScore, completedAt: new Date().toISOString(), rewardXp };
        updateProgress(rewardXp, undefined, { correctAnswers, wrongAnswers: next.questions.length - correctAnswers, questionsAnswered: next.questions.length, wrongActivityIds: [] });
        saveGameMatch({ ...next, finished: true }); saveGameResult(result); navigate('/jogar/duelo/resultado');
      } else { const progressed = { ...next, currentQuestion: next.currentQuestion + 1 }; saveGameMatch(progressed); setMatch(progressed); setSelected(null); setTime(10); }
    }, 500);
  }
  const progressPercent = ((match.currentQuestion + (selected ? 1 : 0)) / match.questions.length) * 100;
  return <div className="page game-match"><div className="match-top"><button className="text-button" onClick={() => navigate('/jogar/duelo')}>← Sair</button><span>PERGUNTA {match.currentQuestion + 1} DE {match.questions.length}</span><strong className={time <= 3 ? 'timer urgent' : 'timer'} aria-live="polite">00:{String(time).padStart(2, '0')}</strong></div><div className="match-progress" aria-label={`Progresso: ${match.currentQuestion} de ${match.questions.length}`}><span style={{ width: `${progressPercent}%` }} /></div><div className="match-score"><span><small>VOCÊ</small><b>{match.score}</b><em>{match.combo > 0 ? `🔥 combo x${match.combo}` : 'Mantenha o foco'}</em></span><strong>VS</strong><span><small>{match.opponentName.toUpperCase()}</small><b>{match.opponentScore}</b><em>Adversário</em></span></div><div className="question-card"><span className="eyebrow">{question.reference}</span><h2>{question.prompt}</h2><div className="options">{question.options.map((option, index) => <button className={`option ${selected === option ? (option === question.answer ? 'correct' : 'wrong') : ''}`} disabled={selected !== null} onClick={() => answer(option)} key={option}><span className="option-key">{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{selected !== null && <div className={`answer-feedback ${selected === question.answer ? 'correct-text' : 'wrong-text'}`} role="status"><strong>{selected === question.answer ? '✓ Resposta correta!' : selected === '' ? '⌛ Tempo esgotado.' : '✕ Não foi dessa vez.'}</strong><span>{selected === question.answer ? `+${50 + Math.min(match.combo, 3) * 10} pontos • Combo x${match.combo + 1}` : `A resposta era ${question.answer}.`}</span></div>}</div></div>;
}

export function DuelResult() {
  const navigate = useNavigate();
  const result = getGameResults()[0];
  if (!result) return <div className="page empty-state"><h2>Resultado não encontrado</h2><button className="primary-button" onClick={() => navigate('/jogar')}>Voltar</button></div>;
  function revanche() { navigate('/jogar/duelo'); }
  return <div className="lesson-result"><div className="result-icon"><Icon name={result.won ? 'trophy' : 'brain'} size={30} /></div><span className="eyebrow">PARTIDA CONCLUÍDA</span><h1>{result.won ? 'Você venceu!' : 'Quase lá!'}</h1><p>{result.correctAnswers} de {result.totalQuestions} respostas corretas contra {result.opponentName}.</p><div className="result-score"><strong>{result.score}</strong><span>×</span><strong>{result.opponentScore}</strong></div><div className="result-summary"><span>Combo máximo <b>x{result.maxCombo}</b></span><span>Recompensa <b>+{result.won ? 150 : 50} XP</b></span></div><div className="result-actions"><button className="primary-button" onClick={revanche}>Jogar revanche</button><button className="light-button" onClick={() => navigate('/jogar')}>Voltar ao jogar</button></div></div>;
}

export function GameTeams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(getTeams);
  const [selected, setSelected] = useState<LocalTeam | null>(null);
  const [name, setName] = useState('');
  const [motto, setMotto] = useState('');
  const progress = getProgress();
  function join(team: LocalTeam) { const next = teams.map(item => item.id === team.id && !item.members.includes(progress.name) ? { ...item, members: [...item.members, progress.name] } : item); setTeams(next); saveTeams(next); setSelected(next.find(item => item.id === team.id) || team); }
  function create() { if (!name.trim()) return; const id = `team-${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${teams.length}`; const team = { id, name: name.trim(), motto: motto.trim() || 'Juntos, aprendemos mais', members: [progress.name], weeklyScore: 0 }; const next = [team, ...teams]; setTeams(next); saveTeams(next); setSelected(team); setName(''); setMotto(''); }
  return <div className="page"><Heading eyebrow="EQUIPES" title="Jogue em equipe" description="Crie ou entre em uma equipe. Tudo fica salvo apenas neste navegador." /><div className="team-layout"><div><div className="team-create"><h2>Criar equipe</h2><input value={name} onChange={event => setName(event.target.value)} placeholder="Nome da equipe" /><input value={motto} onChange={event => setMotto(event.target.value)} placeholder="Lema (opcional)" /><button className="primary-button" disabled={!name.trim()} onClick={create}>Criar equipe</button></div><div className="team-list">{teams.map(team => <article className="team-card" key={team.id}><div className="team-emblem">{team.name[0]}</div><div><h2>{team.name}</h2><p>{team.members.length} membros • {team.weeklyScore.toLocaleString('pt-BR')} XP na semana</p><small>{team.motto}</small></div><button className="light-button" onClick={() => join(team)}>{team.members.includes(progress.name) ? 'Ver equipe' : 'Entrar'}</button></article>)}</div></div>{selected && <aside className="team-detail"><span className="eyebrow">MINHA EQUIPE</span><h2>{selected.name}</h2><p>{selected.motto}</p><h3>Membros</h3>{selected.members.map(member => <div className="member-row" key={member}><span className="avatar">{member[0]}</span>{member}</div>)}<button className="primary-button" onClick={() => navigate('/jogar/equipes/batalha')}>Iniciar batalha mock</button></aside>}</div></div>;
}

export function TeamBattle() {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [teamScore, setTeamScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const questions = gameQuestions.slice(0, 5);
  const question = questions[questionIndex];
  const finished = questionIndex === questions.length - 1 && submitted;
  function submit(): void {
    if (!answer || submitted) return;
    const correct = answer === question.answer;
    setTeamScore(score => score + (correct ? 50 : 0));
    setRivalScore(score => score + (questionIndex % 2 === 0 ? 30 : 50));
    setSubmitted(true);
  }
  function next(): void {
    if (!submitted || finished) return;
    setQuestionIndex(index => index + 1);
    setAnswer('');
    setSubmitted(false);
  }
  return <div className="page game-page"><Heading eyebrow="BATALHA DE EQUIPES" title="Guardiões da Palavra vs Semeadores" description="Cada resposta soma para o placar da sua equipe. Mantenha o ritmo até a última rodada." /><div className="battle-progress-label"><span>RODADA {questionIndex + 1} DE {questions.length}</span><span>{Math.round(((questionIndex + (submitted ? 1 : 0)) / questions.length) * 100)}%</span></div><div className="match-progress"><span style={{ width: `${((questionIndex + (submitted ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="match-score"><span><small>GUARDIÕES</small><b>{teamScore}</b><em>Sua equipe</em></span><strong>VS</strong><span><small>SEMEADORES</small><b>{rivalScore}</b><em>Adversários</em></span></div><div className="question-card"><span className="eyebrow">{question.reference}</span><h2>{question.prompt}</h2><div className="options">{question.options.map((option, index) => <button className={`option ${answer === option ? (submitted ? (option === question.answer ? 'correct' : 'wrong') : 'selected') : ''}`} disabled={submitted} onClick={() => setAnswer(option)} key={option}><span className="option-key">{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{submitted && <div className={`answer-feedback ${answer === question.answer ? 'correct-text' : 'wrong-text'}`} role="status"><strong>{answer === question.answer ? '✓ Sua equipe marcou 50 pontos!' : '✕ A rodada passou.'}</strong><span>A resposta correta era {question.answer}.</span></div>}<button className="primary-button game-start-button" disabled={!answer || submitted} onClick={submit}>{submitted ? 'Resposta registrada' : 'Confirmar resposta'}</button>{submitted && !finished && <button className="light-button battle-next" onClick={next}>Próxima rodada <Icon name="arrow-right" size={15} /></button>}</div>{finished && <div className="battle-result-card"><span className="eyebrow">BATALHA ENCERRADA</span><h2>{teamScore >= rivalScore ? '🏆 Sua equipe venceu!' : 'Quase lá — boa batalha!'}</h2><p>{teamScore} × {rivalScore} • Sua contribuição foi registrada.</p><button className="primary-button" onClick={() => navigate('/jogar/equipes')}>Voltar para equipes</button></div>}</div>;
}
