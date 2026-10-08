import { motion } from 'framer-motion'
import Card from './Card'
export default function FinancialScore({ score, rating, text }) {
  const color = score >= 75 ? 'var(--green)' : score >= 60 ? 'var(--orange)' : 'var(--red)'
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <Card className="score-card">
      <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth="9" />
        <motion.circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (c * score) / 100 }} transition={{ duration: 0.8 }} transform="rotate(-90 55 55)" />
        <text x="55" y="61" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text)">{score}</text>
      </svg>
      <div>
        <p className="muted">Financial Score</p>
        <h3 style={{ color }}>{score} / 100 · {rating}</h3>
        <p className="muted small">{text}</p>
      </div>
    </Card>
  )
}
