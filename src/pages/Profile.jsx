import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Card from '../components/Card'
import AccountCard from '../components/AccountCard'
import AccountModal from '../components/AccountModal'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { useFinance } from '../context/FinanceContext'
import { currencies } from '../data/demoData'
export default function Profile() {
  const { settings, setSettings, resetDemo, clearAll, accounts, setAccounts, transactions, setTransactions } = useFinance()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [clearing, setClearing] = useState(false)
  return (
    <div className="page">
      <h1>Profile</h1>
      <Card>
        <strong>{settings.userName}</strong>
        <p className="muted small">{settings.email}</p>
      </Card>
      <Card className="form">
        <h3>Settings</h3>
        <label>Currency
          <select value={settings.currency} onChange={(e) => setSettings({ ...settings, currency: e.target.value })}>
            {Object.keys(currencies).map((c) => <option key={c} value={c}>{c} {currencies[c]}</option>)}
          </select>
        </label>
        <label>Monthly budget
          <input type="number" min="0" value={settings.monthlyBudget} onChange={(e) => setSettings({ ...settings, monthlyBudget: Number(e.target.value) })} />
        </label>
        <label className="row between">Dark mode
          <input type="checkbox" checked={settings.darkMode} onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })} />
        </label>
        <label className="row between">Notifications
          <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })} />
        </label>
      </Card>
      <Card>
        <div className="row between">
          <h3>Accounts</h3>
          <button className="btn ghost row" onClick={() => setEditing('new')}><Plus size={16} /> Add</button>
        </div>
        {accounts.length === 0 ? <EmptyState text="No accounts yet." /> : (
          <ul className="list">{accounts.map((a) => <AccountCard key={a.id} account={a} onEdit={setEditing} onDelete={setDeleting} />)}</ul>
        )}
      </Card>
      <Card>
        <Link to="/budgets" className="link">Manage category budgets →</Link>
        <Link to="/recurring" className="link">Recurring transactions →</Link>
      </Card>
      <Card>
        <h3>Data</h3>
        <button className="btn ghost" onClick={resetDemo}>Reset demo data</button>
        <button className="btn danger" onClick={() => setClearing(true)}>Clear all data</button>
      </Card>
      {editing && <AccountModal account={editing === 'new' ? null : editing} defaultCurrency={settings.currency} onClose={() => setEditing(null)} onSave={(a) => setAccounts(editing === 'new' ? [...accounts, a] : accounts.map((x) => (x.id === a.id ? a : x)))} />}
      {deleting && <ConfirmDialog title="Delete account?" text={`"${deleting.name}" and its transactions will be removed.`} onCancel={() => setDeleting(null)} onConfirm={() => { setTransactions(transactions.filter((t) => t.accountId !== deleting.id)); setAccounts(accounts.filter((a) => a.id !== deleting.id)); setDeleting(null) }} />}
      {clearing && <ConfirmDialog title="Clear all data?" text="Accounts, transactions, budgets, goals and recurring items will be removed. This can't be undone, but you can restore the demo data afterwards." confirmLabel="Clear everything" onCancel={() => setClearing(false)} onConfirm={() => { clearAll(); setClearing(false) }} />}
    </div>
  )
}
