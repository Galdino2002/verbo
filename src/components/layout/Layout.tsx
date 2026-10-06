import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearSession, getProgress } from '../../storage';
import { Icon, type IconName } from '../ui/Icon';

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const progress = getProgress();
  const nav: [IconName, string, string][] = [
    ['home', 'Início', '/home'], ['map', 'Jornada', '/jornada'], ['book', 'Bíblia', '/biblia'],
    ['brain', 'Revisão', '/revisao'], ['trophy', 'Conquistas', '/conquistas'], ['user', 'Perfil', '/perfil'],
    ['star', 'Missões', '/missoes'], ['user', 'Social', '/social'],
  ];

  function logout() {
    clearSession();
    navigate('/login');
  }

  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <button className="brand" onClick={() => navigate('/home')}><span className="brand-mark">V</span><span>Verbo</span></button>
      <nav aria-label="Navegação principal">{nav.map(([icon, label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Icon name={icon} />{label}</NavLink>)}</nav>
      <div className="sidebar-bottom"><button className="nav-link logout" onClick={logout}><Icon name="logout" />Sair</button></div>
    </aside>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}><Icon name="menu" /></button>
    <main className="main-content" id="main-content" tabIndex={-1}>
      <header className="topbar"><div className="topbar-spacer" /><div className="top-stats" aria-label="Resumo do seu progresso"><span><Icon name="flame" size={15} /> {progress.streak} dias</span><span><Icon name="star" size={15} /> {progress.xp.toLocaleString('pt-BR')} XP</span></div></header>
      {children}
    </main>
  </div>;
}
