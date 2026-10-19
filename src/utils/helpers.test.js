import { describe, it, expect } from 'vitest'
import { filterExpenses, totalByCategory, toCSV } from './helpers'

const data = [
  { id: 1, amount: 10, category: 'Courses', date: '2026-10-02', note: 'Pain' },
  { id: 2, amount: 30, category: 'Loisirs', date: '2026-10-05', note: 'Ciné' },
  { id: 3, amount: 5, category: 'Courses', date: '2026-09-28', note: '' },
]

describe('helpers', () => {
  it('filtre par catégorie et par mois', () => {
    const r = filterExpenses(data, { category: 'Courses', month: '2026-10' })
    expect(r).toHaveLength(1)
  })
  it('somme par catégorie', () => {
    const r = totalByCategory(data)
    expect(r.find((c) => c.name === 'Courses').value).toBe(15)
  })
  it('exporte un CSV avec en-tête', () => {
    expect(toCSV(data).startsWith('Date;Catégorie;Montant;Note')).toBe(true)
  })
})
