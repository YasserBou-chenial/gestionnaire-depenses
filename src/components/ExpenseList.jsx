import { formatEuro } from '../utils/helpers'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty">Aucune dépense pour ces filtres. Ajoutez-en une depuis le formulaire.</p>
  }
  return (
    <ul className="list">
      {expenses.map((e) => (
        <li key={e.id}>
          <div>
            <strong>{e.category}</strong>
            <span className="muted">{new Date(e.date).toLocaleDateString('fr-FR')}{e.note && ` – ${e.note}`}</span>
          </div>
          <span className="amount">{formatEuro(e.amount)}</span>
          <button onClick={() => onEdit(e)} aria-label={`Modifier ${e.category}`}>Modifier</button>
          <button className="danger" onClick={() => onDelete(e.id)} aria-label={`Supprimer ${e.category}`}>Supprimer</button>
        </li>
      ))}
    </ul>
  )
}
