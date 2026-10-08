import { useState, useMemo } from 'react'
import Card from '../components/Card'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import TransactionItem from '../components/TransactionItem'
import TransactionModal from '../components/TransactionModal'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { useFinance } from '../context/FinanceContext'
export default function Transactions() {
  const { transactions, accounts, settings, deleteTransaction } = useFinance()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ type: 'all', category: 'all', account: 'all', month: '' })
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions
      .filter((t) => !q || [t.name, t.category, t.note].some((v) => (v || '').toLowerCase().includes(q)))
      .filter((t) => filters.type === 'all' || t.type === filters.type)
      .filter((t) => filters.category === 'all' || t.category === filters.category)
      .filter((t) => filters.account === 'all' || t.accountId === filters.account)
      .filter((t) => !filters.month || t.date.startsWith(filters.month))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions, query, filters])
  return (
    <div className="page">
      <h1>Transactions</h1>
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar filters={filters} setFilters={setFilters} accounts={accounts} />
      <Card>
        {visible.length === 0 ? <EmptyState text="No transactions found." /> : (
          <ul className="list">
            {visible.map((t) => <TransactionItem key={t.id} t={t} currency={settings.currency} accountName={accounts.find((a) => a.id === t.accountId)?.name} onEdit={setEditing} onDelete={setDeleting} />)}
          </ul>
        )}
      </Card>
      {editing && <TransactionModal transaction={editing} onClose={() => setEditing(null)} />}
      {deleting && <ConfirmDialog title="Delete transaction?" text={`"${deleting.name}" will be removed and your account balance adjusted.`} onCancel={() => setDeleting(null)} onConfirm={() => { deleteTransaction(deleting.id); setDeleting(null) }} />}
    </div>
  )
}
