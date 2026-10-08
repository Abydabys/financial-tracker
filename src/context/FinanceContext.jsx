import { createContext, useContext, useMemo, useCallback, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { demoData } from '../data/demoData'
import { calculateBalance, calculateIncome, calculateExpenses, calculateRemainingBudget, calculateCategorySpending, calculateFinancialScore } from '../utils/finance'
const FinanceContext = createContext(null)
export const useFinance = () => useContext(FinanceContext)
export function FinanceProvider({ children }) {
  const [accounts, setAccounts] = useLocalStorage('ft_accounts', demoData.accounts)
  const [transactions, setTransactions] = useLocalStorage('ft_transactions', demoData.transactions)
  const [budgets, setBudgets] = useLocalStorage('ft_budgets', demoData.budgets)
  const [goals, setGoals] = useLocalStorage('ft_goals', demoData.goals)
  const [recurring, setRecurring] = useLocalStorage('ft_recurring', demoData.recurring)
  const [settings, setSettings] = useLocalStorage('ft_settings', demoData.settings)
  const [toast, setToast] = useState(null)
  useEffect(() => {
    document.documentElement.dataset.theme = settings.darkMode ? 'dark' : 'light'
  }, [settings.darkMode])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast, setToast])
  const showToast = useCallback((message) => setToast(message), [setToast])
  const addTransaction = useCallback((t) => {
    const tx = { ...t, id: 't' + Date.now() }
    setTransactions((prev) => [tx, ...prev])
    setAccounts((prev) => prev.map((a) => (a.id === tx.accountId ? { ...a, balance: a.balance + (tx.type === 'income' ? tx.amount : -tx.amount) } : a)))
    showToast('Transaction added')
  }, [setTransactions, setAccounts, showToast])
  const updateTransaction = useCallback((updated) => {
    const old = transactions.find((t) => t.id === updated.id)
    setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setAccounts((prev) => prev.map((a) => {
      let balance = a.balance
      if (a.id === old.accountId) balance -= old.type === 'income' ? old.amount : -old.amount
      if (a.id === updated.accountId) balance += updated.type === 'income' ? updated.amount : -updated.amount
      return { ...a, balance }
    }))
    showToast('Transaction updated')
  }, [transactions, setTransactions, setAccounts, showToast])
  const deleteTransaction = useCallback((id) => {
    const old = transactions.find((t) => t.id === id)
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    setAccounts((prev) => prev.map((a) => (a.id === old.accountId ? { ...a, balance: a.balance - (old.type === 'income' ? old.amount : -old.amount) } : a)))
    showToast('Transaction deleted')
  }, [transactions, setTransactions, setAccounts, showToast])
  const resetDemo = useCallback(() => {
    setAccounts(demoData.accounts)
    setTransactions(demoData.transactions)
    setBudgets(demoData.budgets)
    setGoals(demoData.goals)
    setRecurring(demoData.recurring)
    setSettings(demoData.settings)
    showToast('Demo data restored')
  }, [setAccounts, setTransactions, setBudgets, setGoals, setRecurring, setSettings, showToast])
  const month = new Date().toISOString().slice(0, 7)
  const stats = useMemo(() => {
    const income = calculateIncome(transactions, month)
    const expenses = calculateExpenses(transactions, month)
    const spending = calculateCategorySpending(transactions, month)
    return {
      balance: calculateBalance(accounts),
      income,
      expenses,
      spending,
      remaining: calculateRemainingBudget(settings.monthlyBudget, expenses),
      score: calculateFinancialScore({ income, expenses, monthlyBudget: settings.monthlyBudget, budgets, spending, goals, recurring })
    }
  }, [accounts, transactions, budgets, goals, recurring, settings.monthlyBudget, month])
  const value = { accounts, transactions, budgets, goals, recurring, settings, setSettings, stats, toast, addTransaction, updateTransaction, deleteTransaction, resetDemo }
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
