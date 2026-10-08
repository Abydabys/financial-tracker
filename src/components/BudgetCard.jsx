import Card from './Card'
import ProgressBar from './ProgressBar'
import { categoryIcons } from '../data/demoData'
import { formatMoney } from '../utils/finance'
export default function BudgetCard({ category, spent, limit, currency, onChange }) {
  const pct = limit ? Math.round((spent / limit) * 100) : 0
  return (
    <Card>
      <div className="row between">
        <strong>{categoryIcons[category]} {category}</strong>
        {onChange ? <input className="budget-input" type="number" min="0" aria-label={`${category} budget`} placeholder="Set limit" value={limit || ''} onChange={(e) => onChange(category, Number(e.target.value))} /> : <span className="muted small">{pct}%</span>}
      </div>
      {limit > 0 && <ProgressBar value={spent} max={limit} />}
      <p className="small muted">{formatMoney(spent, currency)}{limit ? ` / ${formatMoney(limit, currency)}` : ' spent · no budget set'}</p>
      {limit > 0 && spent > limit && <p className="small neg">⚠️ Over budget by {formatMoney(spent - limit, currency)}</p>}
      {limit > 0 && spent <= limit && pct >= 80 && <p className="small warn">⚠️ Close to your limit</p>}
    </Card>
  )
}
