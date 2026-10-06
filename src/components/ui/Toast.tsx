export function Toast({ message, onClose }: { message: string; onClose?: () => void }) {
  return <div className="toast" role="status" aria-live="polite"><span>✓</span>{message}{onClose && <button onClick={onClose} aria-label="Fechar aviso">×</button>}</div>;
}
