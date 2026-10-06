import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultProgress, saveProgress, startSession } from '../../../storage';
import { Icon } from '../../../components/ui/Icon';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 4) {
      setError('Informe um e-mail válido e uma senha com pelo menos 4 caracteres.');
      return;
    }
    startSession();
    saveProgress({ ...defaultProgress, name: email.split('@')[0] || 'Jorge', email });
    navigate('/onboarding');
  }
  return <main className="login-page">
    <section className="login-hero" aria-label="Apresentação do Verbo"><div className="login-logo"><span className="brand-mark">V</span> Verbo</div><div className="hero-copy"><span className="eyebrow">APRENDER • PRATICAR • VIVER</span><h1>Conheça a Bíblia.<br /><em>Construa sua jornada.</em></h1><p>Uma experiência de aprendizado bíblico feita para você estudar um pouco todos os dias.</p></div><div className="hero-verse">“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”<small>Salmos 119:105</small></div></section>
    <section className="login-panel" aria-labelledby="login-title"><div className="login-card"><span className="eyebrow">BEM-VINDO</span><h1 id="login-title">Entre no Verbo</h1><p className="muted">Continue sua jornada de aprendizado.</p><form onSubmit={submit} noValidate><label htmlFor="login-email">E-mail<input id="login-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="voce@email.com" autoComplete="email" aria-invalid={Boolean(error)} /></label><label htmlFor="login-password">Senha<div className="password-field"><input id="login-password" type={show ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Sua senha" autoComplete="current-password" aria-invalid={Boolean(error)} /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ocultar conteúdo da senha' : 'Mostrar conteúdo da senha'}><Icon name={show ? 'eye-off' : 'eye'} size={16} /> <span>{show ? 'Ocultar' : 'Mostrar'}</span></button></div></label>{error && <div className="form-error" role="alert">{error}</div>}<div className="form-row"><label className="check"><input type="checkbox" /> <span>Lembrar de mim</span></label><button type="button" className="text-button" onClick={() => window.alert('Recuperação de senha mockada: em uma próxima versão enviaremos um e-mail.')}>Esqueci minha senha</button></div><button className="primary-button" type="submit">Entrar no Verbo <Icon name="arrow-right" size={16} /></button></form><div className="divider"><span>ou</span></div><button className="google-button" type="button" onClick={() => window.alert('Google será conectado em uma próxima etapa.') }><span className="google-mark">G</span><span>Continuar com Google</span></button><p className="signup">Ainda não tem uma conta? <button className="text-button" onClick={() => navigate('/cadastro')}>Criar conta</button></p></div></section>
  </main>;
}
