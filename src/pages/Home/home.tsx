import { DailyVerse } from '../../components/DailyVerse/DailyVerse'
import { Header } from '../../components/Header/Header'
import { LessonCard } from '../../components/LessonCard/LessonCard'
import { ProgressCard } from '../../components/ProgressCard/ProgressCard'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { StreakCard } from '../../components/StreakCard/StreakCard'
import { dailyVerse, lessons, userProgress, weekDays } from '../../data/home'
import './Home.css'

export function Home() {
  return (
    <div className="home-layout">
      <Sidebar />
      <main className="home-main">
        <Header progress={userProgress} />
        <DailyVerse verse={dailyVerse} />
        <section className="lessons-section" aria-labelledby="lessons-title">
          <div className="section-heading"><div><span className="section-kicker">SUA JORNADA</span><h2 id="lessons-title">Continue aprendendo</h2></div><span className="lesson-count">1 de 3 aulas</span></div>
          <div className="lessons-grid">{lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} />)}</div>
        </section>
        <section className="summary-grid" aria-label="Resumo do progresso">
          <StreakCard progress={userProgress} days={weekDays} />
          <ProgressCard progress={userProgress} />
        </section>
      </main>
    </div>
  )
}
