import { Pencil, Trash2 } from 'lucide-react'
import { categoryIcons } from '../data/demoData'
import { formatMoney } from '../utils/finance'
export default function TransactionItem({ t, accountName, currency, onEdit, onDelete }) {
  return (
    <li className="tx">
      <span className="tx-icon" aria-hidden="true">{categoryIcons[t.category] || '📦'}</span>
      <div className="tx-info">
        <strong>{t.name}</strong>
        <span className="muted small">{t.category}{accountName ? ` · ${accountName}` : ''} · {t.date}</span>
      </div>
      <span className={`tx-amount ${t.type}`}>{t.type === 'income' ? '+' : '-'}{formatMoney(t.amount, currency)}</span>
      {onEdit && <button className="icon-btn" aria-label={`Edit ${t.name}`} onClick={() => onEdit(t)}><Pencil size={16} /></button>}
      {onDelete && <button className="icon-btn" aria-label={`Delete ${t.name}`} onClick={() => onDelete(t)}><Trash2 size={16} /></button>}
    </li>
  )
}
