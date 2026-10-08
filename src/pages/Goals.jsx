import { useState } from 'react'
import { Plus } from 'lucide-react'
import GoalCard from '../components/GoalCard'
import GoalModal from '../components/GoalModal'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { useFinance } from '../context/FinanceContext'
export default function Goals() {
  const { goals, setGoals, settings, showToast } = useFinance()
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  return (
    <div className="page">
      <div className="row between">
        <h1>Goals</h1>
        <button className="btn primary row" onClick={() => setEditing('new')}><Plus size={18} /> New goal</button>
      </div>
      {goals.length === 0 && <EmptyState text="No goals yet. Create your first one." />}
      {goals.map((g) => <GoalCard key={g.id} goal={g} currency={settings.currency} onEdit={setEditing} onDelete={setDeleting} onAdd={(goal, amount) => { setGoals(goals.map((x) => (x.id === goal.id ? { ...x, current: x.current + amount } : x))); showToast('Money added') }} />)}
      {editing && <GoalModal goal={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onSave={(g) => setGoals(editing === 'new' ? [...goals, g] : goals.map((x) => (x.id === g.id ? g : x)))} />}
      {deleting && <ConfirmDialog title="Delete goal?" text={`"${deleting.name}" will be removed.`} onCancel={() => setDeleting(null)} onConfirm={() => { setGoals(goals.filter((g) => g.id !== deleting.id)); setDeleting(null) }} />}
    </div>
  )
}
