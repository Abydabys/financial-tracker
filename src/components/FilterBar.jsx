import { categories } from '../data/demoData'
export default function FilterBar({ filters, setFilters, accounts }) {
  const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })
  return (
    <div className="filters">
      <select aria-label="Type" value={filters.type} onChange={set('type')}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select aria-label="Category" value={filters.category} onChange={set('category')}>
        <option value="all">All categories</option>
        {categories.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select aria-label="Account" value={filters.account} onChange={set('account')}>
        <option value="all">All accounts</option>
        {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>
      <input type="month" aria-label="Month" value={filters.month} onChange={set('month')} />
    </div>
  )
}
