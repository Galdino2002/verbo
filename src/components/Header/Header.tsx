import type { UserProgress } from '../../data/home'
import './Header.css'

type HeaderProps = { progress: UserProgress }

export function Header({ progress }: HeaderProps) {
  return (
    <header className="home-header">
      <div className="header-welcome">
        <span className="header-kicker">SEU ESPAÇO DE APRENDIZADO</span>
        <h1>Olá, {progress.name}! <span aria-hidden="true">👋</span></h1>
        <p>Continue sua jornada de aprendizado.</p>
      </div>
      <div className="header-stats">
        <span><b>🔥</b> {progress.streak} dias</span>
        <span><b>⭐</b> {progress.xp.toLocaleString('pt-BR')} XP</span>
      </div>
    </header>
  )
}
