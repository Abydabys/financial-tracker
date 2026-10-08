import Card from '../components/Card'
import { useFinance } from '../context/FinanceContext'
import { currencies } from '../data/demoData'
export default function Profile() {
  const { settings, setSettings, resetDemo } = useFinance()
  return (
    <div className="page">
      <h1>Profile</h1>
      <Card>
        <strong>{settings.userName}</strong>
        <p className="muted small">{settings.email}</p>
      </Card>
      <Card className="form">
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
        <button className="btn ghost" onClick={resetDemo}>Reset demo data</button>
      </Card>
    </div>
  )
}
