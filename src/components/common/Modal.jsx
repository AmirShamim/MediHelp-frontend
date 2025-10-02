import React, { useEffect } from 'react';

const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-live="assertive">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-white/60 animate-[fadeIn_.25s_ease] max-h-[90vh] flex flex-col overflow-hidden" role="document">
        <div className="px-6 py-5 border-b bg-gradient-to-r from-primary-50 to-white flex items-center justify-between">
          <h3 id="modal-title" className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <span className="h-10 w-10 rounded-lg bg-brand flex items-center justify-center text-white text-xl">✨</span>
            {title}
          </h3>
          <button onClick={onClose} aria-label="Close dialog" className="text-gray-500 hover:text-white hover:bg-brand p-2 rounded-lg focus-ring transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto p-6 space-y-5">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;