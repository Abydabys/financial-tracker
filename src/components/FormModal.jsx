import { motion } from 'framer-motion'
import { X } from 'lucide-react'
export default function FormModal({ title, onClose, onSubmit, children, error, submitLabel = 'Save' }) {
  return (
    <div className="overlay" onClick={onClose}>
      <motion.form className="modal sheet" role="dialog" aria-modal="true" aria-label={title} onSubmit={onSubmit} onClick={(e) => e.stopPropagation()} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="row between">
          <h3>{title}</h3>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" type="submit">{submitLabel}</button>
      </motion.form>
    </div>
  )
}
