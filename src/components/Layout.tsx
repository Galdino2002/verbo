import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const nav = [
    ['🏠', 'Início', '/home'],
    ['🗺️', 'Jornada', '/jornada'],
    ['📖', 'Bíblia', '/biblia'],
    ['🧠', 'Revisão', '/revisao'],
    ['🏆', 'Conquistas', '/conquistas'],
    ['👤', 'Perfil', '/perfil'],
  ];

  function logout() {
    localStorage.removeItem('verbo_session');
    navigate('/login');
  }

  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <button className="brand" onClick={() => navigate('/home')}><span className="brand-mark">V</span><span>Verbo</span></button>
      <nav>{nav.map(([icon, label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}><span>{icon}</span>{label}</NavLink>)}</nav>
      <div className="sidebar-bottom">
        <button className="nav-link logout" onClick={logout}><span>↪</span>Sair</button>
      </div>
    </aside>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">☰</button>
    <main className="main-content">
      <header className="topbar">
        <div className="topbar-spacer" />
        <div className="top-stats"><span>🔥 7 dias</span><span>⭐ 1.240 XP</span></div>
      </header>
      {children}
    </main>
  </div>;
}
