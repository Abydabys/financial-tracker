import { NavLink } from 'react-router-dom'
import { Home, ArrowLeftRight, PieChart, Target, User } from 'lucide-react'
const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/statistics', label: 'Statistics', icon: PieChart },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/profile', label: 'Profile', icon: User }
]
export default function BottomNavigation() {
  return (
    <nav className="nav" aria-label="Main">
      <div className="brand">💳 Finance Tracker</div>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <Icon size={22} aria-hidden="true" /><span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
