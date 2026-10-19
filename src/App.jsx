import { useMemo, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import Charts from './components/Charts'
import { CATEGORIES, currentMonth, downloadCSV, filterExpenses, totalByCategory, totalByMonth } from './utils/helpers'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', [])
  const [budget, setBudget] = useLocalStorage('budget', 1000)
  const [dark, setDark] = useLocalStorage('dark', false)
  const [editing, setEditing] = useState(null)
  const [category, setCategory] = useState('Toutes')
  const [month, setMonth] = useState(currentMonth())

  const filtered = useMemo(
    () => filterExpenses(expenses, { category, month }).sort((a, b) => b.date.localeCompare(a.date)),
    [expenses, category, month]
  )
  const monthTotal = useMemo(
    () => filterExpenses(expenses, { category: 'Toutes', month }).reduce((s, e) => s + e.amount, 0),
    [expenses, month]
  )
  const byCategory = useMemo(() => totalByCategory(filtered), [filtered])
  const byMonth = useMemo(() => totalByMonth(expenses), [expenses])

  const save = (data) => {
    if (editing) {
      setExpenses(expenses.map((e) => (e.id === editing.id ? { ...e, ...data } : e)))
      setEditing(null)
    } else {
      setExpenses([...expenses, { ...data, id: crypto.randomUUID() }])
    }
  }
  const remove = (id) => setExpenses(expenses.filter((e) => e.id !== id))

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header>
        <h1>Mes dépenses</h1>
        <div className="row">
          <button onClick={() => downloadCSV(filtered)} disabled={!filtered.length}>Exporter en CSV</button>
          <button onClick={() => setDark(!dark)}>{dark ? 'Mode clair' : 'Mode sombre'}</button>
        </div>
      </header>

      <Summary total={monthTotal} budget={budget} onBudgetChange={setBudget} />

      <main className="grid">
        <ExpenseForm editing={editing} onSubmit={save} onCancel={() => setEditing(null)} />
        <section className="panel">
          <div className="filters">
            <label>
              Mois
              <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
            </label>
            <label>
              Catégorie
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Toutes</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <ExpenseList expenses={filtered} onEdit={setEditing} onDelete={remove} />
        </section>
      </main>

      <Charts byCategory={byCategory} byMonth={byMonth} />
    </div>
  )
}
