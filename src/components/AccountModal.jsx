import { useState } from 'react'
import FormModal from './FormModal'
import { currencies } from '../data/demoData'
export default function AccountModal({ account, defaultCurrency, onSave, onClose }) {
  const [form, setForm] = useState(account ? { ...account, balance: String(account.balance) } : { name: '', balance: '', type: 'Card', currency: defaultCurrency })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return setError('Enter an account name')
    onSave({ ...form, name: form.name.trim(), balance: Number(form.balance) || 0, id: form.id || 'a' + Date.now() })
    onClose()
  }
  return (
    <FormModal title={account ? 'Edit account' : 'Add account'} onClose={onClose} onSubmit={submit} error={error}>
      <label>Name<input autoFocus value={form.name} onChange={set('name')} /></label>
      <label>Balance<input type="number" step="any" value={form.balance} onChange={set('balance')} placeholder="0" /></label>
      <label>Type<select value={form.type} onChange={set('type')}>{['Card', 'Cash', 'Savings', 'Other'].map((t) => <option key={t}>{t}</option>)}</select></label>
      <label>Currency<select value={form.currency} onChange={set('currency')}>{Object.keys(currencies).map((c) => <option key={c}>{c}</option>)}</select></label>
    </FormModal>
  )
}
