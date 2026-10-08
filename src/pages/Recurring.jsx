import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Play, Trash2 } from 'lucide-react'
import Card from '../components/Card'
import RecurringModal from '../components/RecurringModal'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { useFinance } from '../context/FinanceContext'
import { formatMoney } from '../utils/finance'
export default function Recurring() {
  const { recurring, setRecurring, accounts, settings, processRecurring } = useFinance()
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(null)
  return (
    <div className="page">
      <div className="row between">
        <h1>Recurring</h1>
        <button className="btn primary row" onClick={() => setAdding(true)}><Plus size={18} /> New</button>
      </div>
      <Link to="/profile" className="link">Back to profile</Link>
      <Card>
        {recurring.length === 0 ? <EmptyState text="No recurring transactions yet." /> : (
          <ul className="list">
            {recurring.map((r) => (
              <li key={r.id} className="tx">
                <div className="tx-info"><strong>{r.name}</strong><span className="muted small">{r.category} · {r.frequency}</span></div>
                <span className={`tx-amount ${r.type}`}>{r.type === 'income' ? '+' : '-'}{formatMoney(r.amount, settings.currency)}</span>
                <button className="icon-btn" aria-label={`Process ${r.name} now`} onClick={() => processRecurring(r)}><Play size={16} /></button>
                <button className="icon-btn" aria-label={`Delete ${r.name}`} onClick={() => setDeleting(r)}><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <p className="muted small">Tap the play button to add the transaction for today.</p>
      {adding && <RecurringModal accounts={accounts} onClose={() => setAdding(false)} onSave={(r) => setRecurring([...recurring, r])} />}
      {deleting && <ConfirmDialog title="Delete recurring item?" text={`"${deleting.name}" will be removed.`} onCancel={() => setDeleting(null)} onConfirm={() => { setRecurring(recurring.filter((r) => r.id !== deleting.id)); setDeleting(null) }} />}
    </div>
  )
}
