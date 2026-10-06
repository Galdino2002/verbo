import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress, saveProgress, startSession } from '../../../storage';
import { Icon } from '../../../components/ui/Icon';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem('verbo_remember_email')));
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 4) {
      setError('Confira seu e-mail e use uma senha com pelo menos 4 caracteres.');
      return;
    }
    if (remember) localStorage.setItem('verbo_remember_email', email);
    else localStorage.removeItem('verbo_remember_email');
    startSession();
    const progress = getProgress();
    saveProgress({ ...progress, name: progress.name || email.split('@')[0] || 'Jorge', email });
    navigate('/onboarding');
  }
  return <main className="login-page">
    <section className="login-hero" aria-label="Apresentação do Verbo"><div className="login-logo"><span className="brand-mark">V</span> Verbo</div><div className="hero-copy"><span className="eyebrow">APRENDER • PRATICAR • VIVER</span><h1>Conheça a Bíblia.<br /><em>Construa sua jornada.</em></h1><p>Uma experiência de aprendizado bíblico feita para você estudar um pouco todos os dias.</p></div><div className="hero-verse">“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”<small>Salmos 119:105</small></div></section>
    <section className="login-panel" aria-labelledby="login-title"><div className="mobile-login-brand"><span className="brand-mark">V</span><span>Verbo</span></div><div className="login-card"><span className="eyebrow">BEM-VINDO DE VOLTA</span><h1 id="login-title">Entre no Verbo</h1><p className="muted">Retome sua jornada de aprendizado.</p>{notice && <div className="form-notice" role="status">{notice}</div>}<form onSubmit={submit} noValidate><label htmlFor="login-email">E-mail<input id="login-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); setNotice(''); }} placeholder="voce@email.com" autoComplete="email" aria-invalid={Boolean(error)} aria-describedby={error ? 'login-error' : undefined} required /></label><label htmlFor="login-password">Senha<div className="password-field"><input id="login-password" type={show ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Sua senha" autoComplete="current-password" aria-invalid={Boolean(error)} aria-describedby={error ? 'login-error' : 'password-hint'} minLength={4} required /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}><Icon name={show ? 'eye-off' : 'eye'} size={16} /> <span>{show ? 'Ocultar' : 'Mostrar'}</span></button></div><small id="password-hint" className="field-hint">Mínimo de 4 caracteres.</small></label>{error && <div id="login-error" className="form-error" role="alert">{error}</div>}<div className="form-row"><label className="check"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> <span>Lembrar de mim</span></label><button type="button" className="text-button" onClick={() => setNotice('A recuperação de senha será simulada localmente nesta versão.')}>Esqueci minha senha</button></div><button className="primary-button login-submit" type="submit">Entrar no Verbo <Icon name="arrow-right" size={16} /></button></form><div className="divider"><span>ou continue com</span></div><button className="google-button" type="button" onClick={() => setNotice('A entrada com Google ficará disponível quando o backend for conectado.') }><span className="google-mark">G</span><span>Google</span></button><p className="signup">Ainda não tem uma conta? <button className="text-button" onClick={() => navigate('/cadastro')}>Criar conta</button></p></div><p className="login-footnote">Ao entrar, você concorda com a experiência local de demonstração do Verbo.</p></section>
  </main>;
}
