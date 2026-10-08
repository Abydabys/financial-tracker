import { useState } from 'react'
import FormModal from './FormModal'
export default function GoalModal({ goal, onSave, onClose }) {
  const [form, setForm] = useState(goal ? { ...goal, target: String(goal.target), current: String(goal.current) } : { name: '', target: '', current: '0', deadline: '', icon: '💰' })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !(Number(form.target) > 0)) return setError('Enter a name and a target above 0')
    onSave({ ...form, name: form.name.trim(), target: Number(form.target), current: Number(form.current) || 0, id: form.id || 'g' + Date.now() })
    onClose()
  }
  return (
    <FormModal title={goal ? 'Edit goal' : 'New goal'} onClose={onClose} onSubmit={submit} error={error}>
      <label>Name<input autoFocus value={form.name} onChange={set('name')} /></label>
      <label>Target amount<input type="number" min="0" value={form.target} onChange={set('target')} /></label>
      <label>Saved so far<input type="number" min="0" value={form.current} onChange={set('current')} /></label>
      <label>Deadline (optional)<input type="date" value={form.deadline} onChange={set('deadline')} /></label>
      <label>Icon<select value={form.icon} onChange={set('icon')}>{['💰', '🎧', '🏖️', '🚗', '🏠', '💻', '📱', '🎓', '🎁'].map((i) => <option key={i}>{i}</option>)}</select></label>
    </FormModal>
  )
}
