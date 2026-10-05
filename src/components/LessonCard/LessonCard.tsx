import type { Lesson } from '../../data/home'
import './LessonCard.css'

type LessonCardProps = { lesson: Lesson }

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <article className={`lesson-card${lesson.locked ? ' locked' : ''}`}>
      <div className="lesson-icon" aria-hidden="true">{lesson.locked ? '▣' : '▤'}</div>
      <div className="lesson-status">{lesson.locked ? '🔒 Bloqueada' : 'Disponível'}</div>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <span className="lesson-xp">+{lesson.xp} XP</span>
    </article>
  )
}
