import { Search } from 'lucide-react'
export default function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <Search size={18} aria-hidden="true" />
      <input type="search" placeholder="Search name, category or note" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Search transactions" />
    </label>
  )
}
