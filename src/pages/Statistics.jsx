import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import Card from '../components/Card'
import EmptyState from '../components/EmptyState'
import { useFinance } from '../context/FinanceContext'
import { categoryIcons } from '../data/demoData'
import { formatMoney } from '../utils/finance'
import { toLocalDate } from '../utils/date'
const colors = ['#0f2347', '#16a34a', '#f59e0b', '#dc2626', '#6366f1', '#0ea5e9', '#a855f7', '#64748b']
export default function Statistics() {
  const { transactions, settings } = useFinance()
  const [period, setPeriod] = useState('monthly')
  const cur = settings.currency
  const data = useMemo(() => {
    const now = new Date()
    const y = now.getFullYear()
    const mo = now.getMonth()
    const day = now.getDate()
    const today = toLocalDate(now)
    const sum = (list, type) => list.filter((t) => t.type === type).reduce((s, t) => s + t.amount, 0)
    const days = [...Array(7)].map((_, i) => { const dt = new Date(y, mo, day - (6 - i)); return { label: dt.toLocaleDateString('en-US', { weekday: 'short' }), match: (t) => t.date === toLocalDate(dt) } })
    const months = (count, start) => [...Array(count)].map((_, i) => { const dt = new Date(y, start + i, 1); return { label: dt.toLocaleDateString('en-US', { month: 'short' }), match: (t) => t.date.startsWith(toLocalDate(dt).slice(0, 7)) } })
    const years = [...Array(5)].map((_, i) => ({ label: String(y - 4 + i), match: (t) => t.date.startsWith(String(y - 4 + i)) }))
    const monthDays = [...Array(day)].map((_, i) => ({ label: String(i + 1), match: (t) => t.date === toLocalDate(new Date(y, mo, i + 1)) }))
    const barKeys = period === 'weekly' ? days : period === 'monthly' ? months(6, mo - 5) : years
    const trendKeys = period === 'weekly' ? days : period === 'monthly' ? monthDays : months(12, 0)
    const bars = barKeys.map((k) => { const list = transactions.filter(k.match); return { label: k.label, Income: sum(list, 'income'), Expenses: sum(list, 'expense') } })
    const trend = trendKeys.map((k) => ({ label: k.label, Spending: sum(transactions.filter(k.match), 'expense') }))
    const weekStart = toLocalDate(new Date(y, mo, day - 6))
    const inPeriod = transactions.filter((t) => t.type === 'expense' && (period === 'weekly' ? t.date >= weekStart && t.date <= today : period === 'monthly' ? t.date.startsWith(today.slice(0, 7)) : t.date.startsWith(String(y))))
    const byCat = Object.entries(inPeriod.reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + t.amount }), {})).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
    return { bars, trend, byCat, total: byCat.reduce((s, c) => s + c.value, 0) }
  }, [transactions, period])
  const axis = (v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)
  const tip = (v) => formatMoney(v, cur)
  return (
    <div className="page">
      <h1>Statistics</h1>
      <div className="segmented" role="group" aria-label="Period">
        {['weekly', 'monthly', 'yearly'].map((p) => <button key={p} className={period === p ? 'active' : ''} onClick={() => setPeriod(p)}>{p[0].toUpperCase() + p.slice(1)}</button>)}
      </div>
      <Card>
        <h3>Spending by category</h3>
        {data.total === 0 ? <EmptyState text="No spending in this period." /> : (
          <div className="chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data.byCat} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {data.byCat.map((c, i) => <Cell key={c.name} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip formatter={tip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
      <Card>
        <h3>Category breakdown</h3>
        {data.byCat.length === 0 ? <EmptyState text="Nothing to show yet." /> : (
          <ul className="list">
            {data.byCat.map((c, i) => (
              <li key={c.name} className="tx">
                <span className="dot" style={{ background: colors[i % colors.length] }} />
                <div className="tx-info"><strong>{categoryIcons[c.name]} {c.name}</strong><span className="muted small">{formatMoney(c.value, cur)}</span></div>
                <strong>{Math.round((c.value / data.total) * 100)}%</strong>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <Card>
        <h3>Income vs expenses</h3>
        <div className="chart">
          <ResponsiveContainer>
            <BarChart data={data.bars}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis tickFormatter={axis} fontSize={12} width={40} />
              <Tooltip formatter={tip} />
              <Legend />
              <Bar dataKey="Income" fill="#16a34a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Expenses" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3>Spending trend</h3>
        <div className="chart">
          <ResponsiveContainer>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" fontSize={12} interval="preserveStartEnd" />
              <YAxis tickFormatter={axis} fontSize={12} width={40} />
              <Tooltip formatter={tip} />
              <Line type="monotone" dataKey="Spending" stroke="#0f2347" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
