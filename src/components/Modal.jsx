function Modal({ title, onClose, children }) {
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }
  return (
    <div className="modal-backdrop" onClick={onBackdrop} role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h3>{title}</h3>
          <button className="button secondary close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
