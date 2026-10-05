import { LoginForm } from '../../components/LoginForm/LoginForm'
import './Login.css'

function LeafIcon() {
  return (
    <svg className="leaf-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M25.8 5.7C17.2 6.1 9.2 9.6 7.1 16.1c-1.2 3.7.7 7.2 4.6 7.9 4.3.8 8.4-2.4 9.3-6.3.5-2.4-.3-5-1.9-6.7" />
      <path d="M6.2 27.1c3.7-6.2 8.1-9.5 14-12.1" />
    </svg>
  )
}

export function Login() {
  return (
    <main className="login-page">
      <section className="brand-panel" aria-label="Sobre o Verbo">
        <div className="brand-panel-content">
          <div className="brand-logo"><span className="logo-symbol"><LeafIcon /></span><span>Verbo</span></div>
          <div className="brand-message">
            <p className="brand-kicker">APRENDER. VIVER. COMPARTILHAR.</p>
            <h2>Conhecimento que<br /><em>transforma</em> todos os dias.</h2>
            <p className="brand-description">Uma nova forma de estudar a Bíblia, memorizar versículos e cultivar sua fé com propósito.</p>
          </div>
          <div className="verse-card">
            <span className="quote-mark">“</span>
            <p>Guardei no coração a tua palavra<br />para não pecar contra ti.</p>
            <span className="verse-reference">SALMOS 119:11</span>
          </div>
          <div className="panel-footer"><span className="progress-dots"><i /><i /><i /></span><span>Seu próximo passo começa aqui.</span></div>
        </div>
        <div className="decorative-orbit orbit-one" />
        <div className="decorative-orbit orbit-two" />
        <div className="decorative-cross">+</div>
      </section>

      <section className="form-panel">
        <div className="mobile-logo"><span className="logo-symbol"><LeafIcon /></span><span>Verbo</span></div>
        <LoginForm />
        <p className="legal-note">Ao entrar, você concorda com nossos <button type="button">termos de uso</button>.</p>
      </section>
    </main>
  )
}
