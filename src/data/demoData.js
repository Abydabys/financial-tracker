import { toLocalDate } from '../utils/date'
const today = new Date()
const d = (n) => toLocalDate(new Date(today.getFullYear(), today.getMonth(), Math.max(1, today.getDate() - n)))
const m = (back, day) => toLocalDate(new Date(today.getFullYear(), today.getMonth() - back, day))
const history = [1, 2, 3, 4, 5].flatMap((b) => [
  { id: `h${b}a`, name: 'Company', amount: 250000, type: 'income', category: 'Salary', accountId: 'a1', date: m(b, 5), note: 'Monthly salary' },
  { id: `h${b}b`, name: 'Groceries', amount: 30000 + b * 3000, type: 'expense', category: 'Food', accountId: 'a1', date: m(b, 10), note: '' },
  { id: `h${b}c`, name: 'Taxi and bus', amount: 12000 + b * 1500, type: 'expense', category: 'Transport', accountId: 'a2', date: m(b, 14), note: '' },
  { id: `h${b}d`, name: 'Bills', amount: 16000, type: 'expense', category: 'Bills', accountId: 'a1', date: m(b, 18), note: '' },
  { id: `h${b}e`, name: 'Shopping', amount: 20000 + b * 2500, type: 'expense', category: 'Shopping', accountId: 'a1', date: m(b, 22), note: '' }
])
export const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Other', 'Salary']
export const categoryIcons = { Food: '🍔', Transport: '🚕', Shopping: '🛍️', Entertainment: '🎬', Bills: '💡', Health: '💊', Education: '📚', Other: '📦', Salary: '💼' }
export const currencies = { KZT: '₸', USD: '$', EUR: '€' }
export const demoData = {
  accounts: [
    { id: 'a1', name: 'Kaspi', balance: 120000, type: 'Card', currency: 'KZT' },
    { id: 'a2', name: 'Cash', balance: 35000, type: 'Cash', currency: 'KZT' },
    { id: 'a3', name: 'Savings', balance: 80000, type: 'Savings', currency: 'KZT' }
  ],
  transactions: [
    { id: 't1', name: 'Company', amount: 250000, type: 'income', category: 'Salary', accountId: 'a1', date: d(0), note: 'Monthly salary' },
    { id: 't2', name: "McDonald's", amount: 4500, type: 'expense', category: 'Food', accountId: 'a1', date: d(0), note: '' },
    { id: 't3', name: 'Taxi', amount: 2300, type: 'expense', category: 'Transport', accountId: 'a2', date: d(0), note: 'Ride home' },
    { id: 't4', name: 'Netflix', amount: 4500, type: 'expense', category: 'Entertainment', accountId: 'a1', date: d(0), note: 'Subscription' },
    { id: 't5', name: 'Clothes', amount: 18000, type: 'expense', category: 'Shopping', accountId: 'a1', date: d(0), note: '' },
    { id: 't6', name: 'Internet', amount: 8000, type: 'expense', category: 'Bills', accountId: 'a1', date: d(0), note: 'Monthly bill' },
    ...history
  ],
  budgets: { Food: 60000, Transport: 30000, Shopping: 40000, Entertainment: 25000, Bills: 50000 },
  goals: [
    { id: 'g1', name: 'New Headphones', target: 80000, current: 45000, deadline: '', icon: '🎧' },
    { id: 'g2', name: 'Vacation', target: 300000, current: 120000, deadline: '', icon: '🏖️' }
  ],
  recurring: [
    { id: 'r1', name: 'Netflix', amount: 4500, type: 'expense', category: 'Entertainment', accountId: 'a1', frequency: 'monthly' },
    { id: 'r2', name: 'Internet', amount: 8000, type: 'expense', category: 'Bills', accountId: 'a1', frequency: 'monthly' },
    { id: 'r3', name: 'Salary', amount: 250000, type: 'income', category: 'Salary', accountId: 'a1', frequency: 'monthly' }
  ],
  settings: { currency: 'KZT', darkMode: false, notifications: true, monthlyBudget: 200000, userName: 'Alex', email: 'alex@example.com' }
}
