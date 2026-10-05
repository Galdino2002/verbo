import { useState } from 'react'
import type { FormEvent } from 'react'
import './LoginForm.css'

interface FormErrors {
  email?: string
  password?: string
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Digite seu e-mail.'
    } else if (!isEmail(email)) {
      nextErrors.email = 'Digite um e-mail válido.'
    }
    if (!password) {
      nextErrors.password = 'Digite sua senha.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      console.log({ email, password, remember })
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">ACESSAR SUA CONTA</span>
        <h1>Bem-vindo ao Verbo</h1>
        <p>Continue sua jornada de aprendizado.</p>
      </div>

      <div className="field-group">
        <label htmlFor="email">E-mail</label>
        <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 6.5h16v11H4z" />
            <path d="m4.5 7 7.5 6 7.5-6" />
          </svg>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="password">Senha</label>
        <div className={`input-wrap ${errors.password ? 'has-error' : ''}`}>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" />
          </svg>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            className="password-toggle"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        {errors.password && <span className="error-message" id="password-error">{errors.password}</span>}
      </div>

      <div className="form-options">
        <label className="remember-option">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span className="custom-checkbox" aria-hidden="true">✓</span>
          <span>Lembrar de mim</span>
        </label>
        <button type="button" className="text-button" onClick={() => console.log('Recuperação de senha')}>
          Esqueci minha senha
        </button>
      </div>

      <button className="submit-button" type="submit">
        Entrar
        <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" /></svg>
      </button>

      <div className="divider"><span>ou</span></div>

      <button className="google-button" type="button" onClick={() => console.log('Continuar com Google')}>
        <span className="google-mark" aria-hidden="true">G</span>
        Continuar com Google
      </button>

      <p className="signup-prompt">
        Ainda não tem uma conta? <button type="button" onClick={() => console.log('Criar conta')}>Criar conta</button>
      </p>
    </form>
  )
}
