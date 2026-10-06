import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../../data';
import { Icon } from '../../components/ui/Icon';
import { Modal } from '../../components/ui/Modal';

export function Journey() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<(typeof lessons)[number] | null>(null);
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">MAPA DE APRENDIZADO</span><h1>Sua jornada</h1><p>Avance no seu ritmo, uma lição por vez.</p></div></div><div className="journey"><div className="journey-intro"><span className="unit-number">01</span><div><span className="eyebrow">UNIDADE 1</span><h2>Fundamentos da Bíblia</h2><p>Comece entendendo a estrutura e os grandes temas das Escrituras.</p></div></div>{lessons.map((l, i) => <div key={l.id} className={`journey-node ${l.locked ? 'locked' : ''}`}><div className="node-line" /><button className="node-circle" aria-label={l.locked ? `${l.title} bloqueada` : `Ver ${l.title}`} disabled={l.locked} onClick={() => setSelected(l)}><Icon name={l.locked ? 'lock' : i === 0 ? 'play' : 'check'} size={17} /></button><button className="node-card" disabled={l.locked} onClick={() => setSelected(l)}><span>{l.unit}</span><h3>{l.title}</h3><p>{l.description}</p><strong>+{l.xp} XP • {l.estimatedMinutes} min</strong></button></div>)}</div>{selected && <Modal title={selected.title} onClose={() => setSelected(null)}><p>{selected.description}</p><p className="muted">⭐ {selected.xp} XP • ⏱️ {selected.estimatedMinutes} minutos • dificuldade progressiva</p><button className="primary-button" onClick={() => navigate(`/licao/${selected.id}`)}>Começar atividade <Icon name="arrow-right" size={16} /></button></Modal>}</div>;
}
