import { useEffect, useState } from 'react'
import { CATEGORIES } from '../utils/helpers'

const today = () => new Date().toISOString().slice(0, 10)
const empty = () => ({ amount: '', category: CATEGORIES[0], date: today(), note: '' })

export default function ExpenseForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty())
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : empty())
    setError('')
  }, [editing])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = parseFloat(form.amount.replace(',', '.'))
    if (!amount || amount <= 0) return setError('Saisissez un montant supérieur à 0.')
    if (!form.date) return setError('Choisissez une date.')
    onSubmit({ ...form, amount, note: form.note.trim() })
    setForm(empty())
    setError('')
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>{editing ? 'Modifier la dépense' : 'Nouvelle dépense'}</h2>
      <label>
        Montant (€)
        <input inputMode="decimal" value={form.amount} onChange={update('amount')} placeholder="12,50" />
      </label>
      <label>
        Catégorie
        <select value={form.category} onChange={update('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>
        Date
        <input type="date" value={form.date} onChange={update('date')} />
      </label>
      <label>
        Note
        <input value={form.note} onChange={update('note')} placeholder="Facultatif" maxLength={80} />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="row">
        <button className="primary" type="submit">{editing ? 'Enregistrer' : 'Ajouter'}</button>
        {editing && <button type="button" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  )
}
