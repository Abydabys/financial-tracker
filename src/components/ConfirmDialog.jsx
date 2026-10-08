import { motion } from 'framer-motion'
export default function ConfirmDialog({ title, text, onConfirm, onCancel, confirmLabel = 'Delete' }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <motion.div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <h3 id="confirm-title">{title}</h3>
        <p className="muted">{text}</p>
        <div className="row">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </motion.div>
    </div>
  )
}
