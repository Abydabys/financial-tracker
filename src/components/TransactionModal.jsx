import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { categories } from '../data/demoData'
import { toLocalDate } from '../utils/date'
import { useFinance } from '../context/FinanceContext'
export default function TransactionModal({ transaction, onClose }) {
  const { accounts, addTransaction, updateTransaction } = useFinance()
  const [form, setForm] = useState(transaction ? { ...transaction, amount: String(transaction.amount) } : { name: '', amount: '', type: 'expense', category: 'Food', accountId: accounts[0]?.id || '', date: toLocalDate(), note: '' })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const amount = Number(form.amount)
    if (!amount || amount <= 0) return setError('Enter an amount greater than 0')
    if (!form.accountId) return setError('Add an account first')
    const data = { ...form, amount, name: form.name.trim() || form.category }
    transaction ? updateTransaction(data) : addTransaction(data)
    onClose()
  }
  return (
    <div className="overlay" onClick={onClose}>
      <motion.form className="modal sheet" role="dialog" aria-modal="true" aria-labelledby="tx-title" onSubmit={submit} onClick={(e) => e.stopPropagation()} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="row between">
          <h3 id="tx-title">{transaction ? 'Edit transaction' : 'Add transaction'}</h3>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="segmented" role="group" aria-label="Type">
          <button type="button" className={form.type === 'expense' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'expense' })}>Expense</button>
          <button type="button" className={form.type === 'income' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'income' })}>Income</button>
        </div>
        <label>Amount<input type="number" min="0" step="any" inputMode="decimal" autoFocus value={form.amount} onChange={set('amount')} placeholder="0" /></label>
        <label>Name<input value={form.name} onChange={set('name')} placeholder="e.g. Lunch" /></label>
        <label>Category<select value={form.category} onChange={set('category')}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Account<select value={form.accountId} onChange={set('accountId')}>{accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
        <label>Date<input type="date" value={form.date} onChange={set('date')} /></label>
        <label>Note<input value={form.note} onChange={set('note')} placeholder="Optional" /></label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" type="submit">{transaction ? 'Save changes' : 'Add transaction'}</button>
      </motion.form>
    </div>
  )
}
