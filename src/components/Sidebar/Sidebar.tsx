import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const navigationItems = [
  { label: 'Início', icon: '⌂', to: '/home' },
  { label: 'Jornada', icon: '⌁', to: '/jornada' },
  { label: 'Bíblia', icon: '▤', to: '/biblia' },
  { label: 'Conquistas', icon: '♢', to: '/conquistas' },
  { label: 'Perfil', icon: '○', to: '/perfil' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="sidebar-logo" to="/home" aria-label="Verbo, início">
        <span className="sidebar-logo-mark">V</span>
        <span>Verbo</span>
      </NavLink>
      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            key={item.label}
            to={item.to}
          >
            <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-quote">“A tua palavra é lâmpada para os meus pés.”</div>
    </aside>
  )
}
