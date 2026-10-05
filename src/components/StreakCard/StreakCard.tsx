import type { UserProgress } from '../../data/home'
import './StreakCard.css'

type StreakCardProps = { progress: UserProgress; days: { name: string; completed: boolean }[] }

export function StreakCard({ progress, days }: StreakCardProps) {
  return (
    <article className="info-card streak-card">
      <div className="info-card-heading"><span className="info-card-icon fire">🔥</span><div><span className="card-label">HÁBITO DE ESTUDO</span><h2>Sua sequência</h2></div></div>
      <strong className="streak-number">{progress.streak} dias</strong>
      <p>Continue estudando para manter sua sequência.</p>
      <div className="week-days">{days.map((day) => <div className="week-day" key={day.name}><span className={day.completed ? 'completed' : ''}>{day.completed ? '✓' : '·'}</span><small>{day.name}</small></div>)}</div>
    </article>
  )
}
