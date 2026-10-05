import { useState } from 'react'
import type { DailyVerse as DailyVerseData } from '../../data/home'
import './DailyVerse.css'

type DailyVerseProps = { verse: DailyVerseData }

export function DailyVerse({ verse }: DailyVerseProps) {
  const [studied, setStudied] = useState(false)

  return (
    <article className="daily-verse">
      <div className="verse-decoration" aria-hidden="true">“</div>
      <div className="verse-content">
        <span className="card-label">📖 &nbsp; VERSÍCULO DO DIA</span>
        <blockquote>“{verse.text}”</blockquote>
        <cite>{verse.reference}</cite>
        <button className="primary-button" type="button" onClick={() => setStudied(true)}>
          {studied ? 'Versículo estudado ✓' : 'Estudar versículo'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
