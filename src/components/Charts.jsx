import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import { formatEuro } from '../utils/helpers'

const COLORS = ['#1f7a6d', '#e07a5f', '#3d5a80', '#f2b134', '#8d6a9f', '#7a8b99']

export default function Charts({ byCategory, byMonth }) {
  if (byCategory.length === 0) return null
  return (
    <section className="charts">
      <div className="panel">
        <h2>Par catégorie</h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
              {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(v) => formatEuro(v)} />
          </PieChart>
        </ResponsiveContainer>
        <ul className="legend">
          {byCategory.map((c, i) => (
            <li key={c.name}><i style={{ background: COLORS[i % COLORS.length] }} />{c.name}</li>
          ))}
        </ul>
      </div>
      <div className="panel">
        <h2>Évolution mensuelle</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={byMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
            <XAxis dataKey="month" stroke="var(--muted)" />
            <YAxis stroke="var(--muted)" />
            <Tooltip formatter={(v) => formatEuro(v)} />
            <Line type="monotone" dataKey="total" stroke="#1f7a6d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
