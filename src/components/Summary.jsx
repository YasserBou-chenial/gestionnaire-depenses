import { formatEuro } from '../utils/helpers'

export default function Summary({ total, budget, onBudgetChange }) {
  const left = budget - total
  const pct = budget > 0 ? Math.min(100, (total / budget) * 100) : 0
  return (
    <section className="panel summary">
      <div>
        <p className="muted">Dépensé ce mois</p>
        <p className="big">{formatEuro(total)}</p>
      </div>
      <div>
        <p className="muted">{left >= 0 ? 'Reste à dépenser' : 'Dépassement'}</p>
        <p className={`big ${left < 0 ? 'over' : ''}`}>{formatEuro(Math.abs(left))}</p>
      </div>
      <label>
        Budget mensuel (€)
        <input type="number" min="0" value={budget} onChange={(e) => onBudgetChange(Number(e.target.value) || 0)} />
      </label>
      <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin="0" aria-valuemax="100">
        <div className={pct >= 100 ? 'fill over' : 'fill'} style={{ width: `${pct}%` }} />
      </div>
    </section>
  )
}
