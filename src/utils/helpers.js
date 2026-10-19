export const CATEGORIES = ['Logement', 'Courses', 'Transport', 'Loisirs', 'Santé', 'Autre']

export const formatEuro = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)

export const monthKey = (isoDate) => isoDate.slice(0, 7) // "2026-10"

export const currentMonth = () => new Date().toISOString().slice(0, 7)

export function filterExpenses(expenses, { category, month }) {
  return expenses.filter(
    (e) =>
      (category === 'Toutes' || e.category === category) &&
      (!month || monthKey(e.date) === month)
  )
}

export function totalByCategory(expenses) {
  const map = {}
  for (const e of expenses) map[e.category] = (map[e.category] || 0) + e.amount
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function totalByMonth(expenses) {
  const map = {}
  for (const e of expenses) {
    const k = monthKey(e.date)
    map[k] = (map[k] || 0) + e.amount
  }
  return Object.keys(map)
    .sort()
    .map((month) => ({ month, total: map[month] }))
}

export function toCSV(expenses) {
  const escape = (v) => `"${String(v).replace(/"/g, '""')}"`
  const rows = expenses.map((e) =>
    [e.date, e.category, e.amount, e.note].map(escape).join(';')
  )
  return ['Date;Catégorie;Montant;Note', ...rows].join('\n')
}

export function downloadCSV(expenses) {
  const blob = new Blob(['\uFEFF' + toCSV(expenses)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'depenses.csv'
  a.click()
  URL.revokeObjectURL(url)
}
