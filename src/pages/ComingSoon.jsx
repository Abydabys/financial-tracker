import Card from '../components/Card'
export default function ComingSoon({ title }) {
  return (
    <div className="page">
      <h1>{title}</h1>
      <Card><p className="muted">Coming in the next step.</p></Card>
    </div>
  )
}
