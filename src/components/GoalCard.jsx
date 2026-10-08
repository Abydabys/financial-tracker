import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import Card from './Card'
import ProgressBar from './ProgressBar'
import { formatMoney } from '../utils/finance'
export default function GoalCard({ goal, currency, onAdd, onEdit, onDelete }) {
  const [adding, setAdding] = useState(false)
  const [amount, setAmount] = useState('')
  const pct = goal.target ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0
  const done = goal.current >= goal.target
  const monthsLeft = goal.deadline ? Math.ceil((new Date(goal.deadline) - new Date()) / (30 * 86400000)) : 0
  const submit = (e) => {
    e.preventDefault()
    if (Number(amount) > 0) onAdd(goal, Number(amount))
    setAmount('')
    setAdding(false)
  }
  return (
    <Card>
      <div className="row between">
        <strong>{goal.icon} {goal.name}</strong>
        <div className="row">
          <button className="icon-btn" aria-label={`Edit ${goal.name}`} onClick={() => onEdit(goal)}><Pencil size={16} /></button>
          <button className="icon-btn" aria-label={`Delete ${goal.name}`} onClick={() => onDelete(goal)}><Trash2 size={16} /></button>
        </div>
      </div>
      <p className="small muted">{formatMoney(goal.current, currency)} / {formatMoney(goal.target, currency)}</p>
      <ProgressBar value={goal.current} max={goal.target} />
      <div className="row between small">
        <span>{pct}%</span>
        {goal.deadline && !done && <span className="muted">{monthsLeft > 0 ? `~${formatMoney((goal.target - goal.current) / monthsLeft, currency)} / month to hit ${goal.deadline}` : 'Deadline passed'}</span>}
      </div>
      {done && <motion.p className="done" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1], rotate: [0, -8, 8, 0] }} transition={{ duration: 0.7 }}>🎉 Goal reached!</motion.p>}
      {!done && (adding ? (
        <form className="row" onSubmit={submit}>
          <input type="number" min="0" autoFocus aria-label="Amount to add" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ flex: 1 }} />
          <button className="btn primary" type="submit">Add</button>
        </form>
      ) : <button className="btn ghost" onClick={() => setAdding(true)}>Add money</button>)}
    </Card>
  )
}
