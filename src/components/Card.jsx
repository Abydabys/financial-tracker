import { motion } from 'framer-motion'
export default function Card({ children, className = '', ...props }) {
  return <motion.div className={`card ${className}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} {...props}>{children}</motion.div>
}
