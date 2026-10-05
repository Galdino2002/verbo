import type { UserProgress } from '../../data/home'
import './ProgressCard.css'

type ProgressCardProps = { progress: UserProgress }

export function ProgressCard({ progress }: ProgressCardProps) {
  const percentage = Math.round((progress.xp / 2000) * 100)
  return (
    <article className="info-card progress-card">
      <div className="info-card-heading"><span className="info-card-icon star">⭐</span><div><span className="card-label">SEU PROGRESSO</span><h2>{progress.level}</h2></div></div>
      <div className="xp-row"><strong>{progress.xp.toLocaleString('pt-BR')} XP</strong><span>Meta: 2.000 XP</span></div>
      <div className="progress-track" aria-label={`${percentage}% do nível concluído`}><span style={{ width: `${percentage}%` }} /></div>
      <p>{progress.xp.toLocaleString('pt-BR')} / 2.000 XP</p>
    </article>
  )
}
