import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import BottomNavigation from './components/BottomNavigation'
import TransactionModal from './components/TransactionModal'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import ComingSoon from './pages/ComingSoon'
import { useFinance } from './context/FinanceContext'
export default function App() {
  const location = useLocation()
  const { toast } = useFinance()
  const [adding, setAdding] = useState(false)
  return (
    <div className="layout">
      <BottomNavigation />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/statistics" element={<ComingSoon title="Statistics" />} />
              <Route path="/goals" element={<ComingSoon title="Goals" />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <button className="fab" aria-label="Add transaction" onClick={() => setAdding(true)}><Plus size={26} /></button>
      {adding && <TransactionModal onClose={() => setAdding(false)} />}
      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
    </div>
  )
}
