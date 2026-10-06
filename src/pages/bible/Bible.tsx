import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bibleBooks } from '../../data';
import { Icon } from '../../components/ui/Icon';

export function Bible() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const filtered = bibleBooks.map(g => ({ ...g, books: g.books.filter(b => b.toLowerCase().includes(search.toLowerCase())) })).filter(g => g.books.length);
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">BIBLIOTECA</span><h1>Bíblia</h1><p>Explore os livros e encontre seu próximo estudo.</p></div></div><label className="search-box" htmlFor="book-search"><Icon name="search" size={17} /><input id="book-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar livro..." /></label><div className="book-groups">{filtered.length > 0 ? filtered.map(g => <section key={g.group}><span className="eyebrow">{g.group}</span><div className="books">{g.books.map(b => <button type="button" key={b} className="book-card" onClick={() => navigate(`/biblia/${encodeURIComponent(b)}/1`)}><Icon name="book" size={22} /><strong>{b}</strong><small>Explorar capítulo 1</small></button>)}</div></section>) : <div className="empty-state"><strong>Nenhum livro encontrado</strong><p>Tente buscar por outro nome, como “Salmos” ou “João”.</p></div>}</div></div>;
}
