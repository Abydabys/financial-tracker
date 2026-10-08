import { Link } from 'react-router-dom'
import BudgetCard from '../components/BudgetCard'
import { useFinance } from '../context/FinanceContext'
import { categories } from '../data/demoData'
export default function Budgets() {
  const { budgets, setBudgets, stats, settings } = useFinance()
  return (
    <div className="page">
      <div className="row between">
        <h1>Budgets</h1>
        <Link to="/" className="link">Back</Link>
      </div>
      <p className="muted small">Set a monthly limit per category. Leave empty for no limit.</p>
      {categories.filter((c) => c !== 'Salary').map((c) => (
        <BudgetCard key={c} category={c} spent={stats.spending[c] || 0} limit={budgets[c] || 0} currency={settings.currency} onChange={(cat, v) => setBudgets(v > 0 ? { ...budgets, [cat]: v } : Object.fromEntries(Object.entries(budgets).filter(([k]) => k !== cat)))} />
      ))}
    </div>
  )
}
