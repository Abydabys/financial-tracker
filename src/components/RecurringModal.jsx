import { useState } from 'react'
import FormModal from './FormModal'
import { categories } from '../data/demoData'
export default function RecurringModal({ accounts, onSave, onClose }) {
  const [form, setForm] = useState({ name: '', amount: '', type: 'expense', category: 'Bills', frequency: 'monthly', accountId: accounts[0]?.id || '' })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !(Number(form.amount) > 0)) return setError('Enter a name and an amount above 0')
    onSave({ ...form, name: form.name.trim(), amount: Number(form.amount), id: 'r' + Date.now() })
    onClose()
  }
  return (
    <FormModal title="New recurring transaction" onClose={onClose} onSubmit={submit} error={error}>
      <div className="segmented" role="group" aria-label="Type">
        <button type="button" className={form.type === 'expense' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'expense' })}>Expense</button>
        <button type="button" className={form.type === 'income' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'income' })}>Income</button>
      </div>
      <label>Name<input autoFocus value={form.name} onChange={set('name')} /></label>
      <label>Amount<input type="number" min="0" value={form.amount} onChange={set('amount')} /></label>
      <label>Category<select value={form.category} onChange={set('category')}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>Frequency<select value={form.frequency} onChange={set('frequency')}>{['weekly', 'monthly', 'yearly'].map((f) => <option key={f}>{f}</option>)}</select></label>
      <label>Account<select value={form.accountId} onChange={set('accountId')}>{accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
    </FormModal>
  )
}
