import { Link } from 'react-router-dom'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import FinancialScore from '../components/FinancialScore'
import TransactionItem from '../components/TransactionItem'
import EmptyState from '../components/EmptyState'
import BudgetCard from '../components/BudgetCard'
import { useFinance } from '../context/FinanceContext'
import { formatMoney } from '../utils/finance'
export default function Home() {
  const { transactions, accounts, settings, stats, budgets } = useFinance()
  const cur = settings.currency
  const pct = settings.monthlyBudget ? Math.round((stats.expenses / settings.monthlyBudget) * 100) : 0
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  return (
    <div className="page">
      <h1>Hi, {settings.userName}</h1>
      <Card className="hero">
        <p>Remaining budget</p>
        <h2 className={stats.remaining < 0 ? 'neg' : ''}>{formatMoney(stats.remaining, cur)}</h2>
        <ProgressBar value={stats.expenses} max={settings.monthlyBudget} />
        <div className="row between small">
          <span>{formatMoney(stats.expenses, cur)} spent · {pct}%</span>
          <span>{formatMoney(settings.monthlyBudget, cur)} budget</span>
        </div>
      </Card>
      <div className="grid3">
        <Card><p className="muted small">Total balance</p><strong>{formatMoney(stats.balance, cur)}</strong></Card>
        <Card><p className="muted small">Income this month</p><strong className="pos">{formatMoney(stats.income, cur)}</strong></Card>
        <Card><p className="muted small">Expenses this month</p><strong className="neg">{formatMoney(stats.expenses, cur)}</strong></Card>
      </div>
      <FinancialScore {...stats.score} />
      <div className="row between">
        <h3>Category budgets</h3>
        <Link to="/budgets" className="link">Manage</Link>
      </div>
      {Object.keys(budgets).length === 0 ? <Card><EmptyState text="No budgets set yet." /></Card> : Object.keys(budgets).map((c) => <BudgetCard key={c} category={c} spent={stats.spending[c] || 0} limit={budgets[c]} currency={cur} />)}
      <Card>
        <div className="row between">
          <h3>Recent transactions</h3>
          <Link to="/transactions" className="link">View all</Link>
        </div>
        {recent.length === 0 ? <EmptyState text="No transactions yet." /> : (
          <ul className="list">
            {recent.map((t) => <TransactionItem key={t.id} t={t} currency={cur} accountName={accounts.find((a) => a.id === t.accountId)?.name} />)}
          </ul>
        )}
      </Card>
    </div>
  )
}
