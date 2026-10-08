import { currencies } from '../data/demoData'
const sameMonth = (date, ref) => date.slice(0, 7) === ref.slice(0, 7)
export const formatMoney = (n, currency = 'KZT') => `${n < 0 ? '-' : ''}${Math.abs(Math.round(n)).toLocaleString('en-US')} ${currencies[currency]}`
export const calculateBalance = (accounts) => accounts.reduce((sum, a) => sum + a.balance, 0)
export const calculateIncome = (transactions, month) => transactions.filter((t) => t.type === 'income' && sameMonth(t.date, month)).reduce((s, t) => s + t.amount, 0)
export const calculateExpenses = (transactions, month) => transactions.filter((t) => t.type === 'expense' && sameMonth(t.date, month)).reduce((s, t) => s + t.amount, 0)
export const calculateRemainingBudget = (monthlyBudget, expenses) => monthlyBudget - expenses
export const calculateCategorySpending = (transactions, month) => transactions.filter((t) => t.type === 'expense' && sameMonth(t.date, month)).reduce((acc, t) => ({ ...acc, [t.category]: (acc[t.category] || 0) + t.amount }), {})
export const calculateFinancialScore = ({ income, expenses, monthlyBudget, budgets, spending, goals, recurring }) => {
  let score = 50
  const usage = monthlyBudget ? expenses / monthlyBudget : 0
  score += usage <= 0.7 ? 20 : usage <= 1 ? 10 : -10
  const ratio = income ? expenses / income : 1
  score += ratio <= 0.5 ? 15 : ratio <= 0.8 ? 8 : ratio <= 1 ? 0 : -10
  const exceeded = Object.keys(budgets).filter((c) => (spending[c] || 0) > budgets[c]).length
  score -= exceeded * 8
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)
  const progress = totalTarget ? goals.reduce((s, g) => s + g.current, 0) / totalTarget : 0
  score += Math.round(progress * 15)
  const fixed = recurring.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0)
  score += income && fixed / income > 0.5 ? -5 : 5
  score = Math.max(0, Math.min(100, score))
  let rating = 'Critical'
  let text = 'Your finances need urgent attention. Cut spending and review your budgets.'
  if (score >= 90) { rating = 'Excellent'; text = 'Outstanding. Your spending is low and your savings are growing.' }
  else if (score >= 75) { rating = 'Good'; text = "You're doing well. Your spending is under control, but you could increase your savings." }
  else if (score >= 60) { rating = 'Fair'; text = 'Not bad, but watch your budgets and try to save a bit more each month.' }
  else if (score >= 40) { rating = 'Needs Attention'; text = 'Spending is getting high compared to your income. Review your largest categories.' }
  return { score, rating, text }
}
