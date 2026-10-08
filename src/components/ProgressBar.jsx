import { motion } from 'framer-motion'
export default function ProgressBar({ value, max }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0
  const color = value > max ? 'var(--red)' : pct >= 80 ? 'var(--orange)' : 'var(--green)'
  return (
    <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <motion.div className="progress-fill" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} />
    </div>
  )
}
