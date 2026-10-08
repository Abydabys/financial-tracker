import { Pencil, Trash2 } from 'lucide-react'
import { formatMoney } from '../utils/finance'
export default function AccountCard({ account, onEdit, onDelete }) {
  return (
    <li className="tx">
      <div className="tx-info">
        <strong>{account.name}</strong>
        <span className="muted small">{account.type} · {account.currency}</span>
      </div>
      <span className="tx-amount">{formatMoney(account.balance, account.currency)}</span>
      <button className="icon-btn" aria-label={`Edit ${account.name}`} onClick={() => onEdit(account)}><Pencil size={16} /></button>
      <button className="icon-btn" aria-label={`Delete ${account.name}`} onClick={() => onDelete(account)}><Trash2 size={16} /></button>
    </li>
  )
}
