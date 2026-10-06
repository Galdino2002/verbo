import { useEffect, useRef } from 'react';

export function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButton.current?.focus();
    function onKeyDown(event: KeyboardEvent) { if (event.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button ref={closeButton} className="modal-close" onClick={onClose} aria-label="Fechar">×</button><h2 id="modal-title">{title}</h2>{children}</section></div>;
}
