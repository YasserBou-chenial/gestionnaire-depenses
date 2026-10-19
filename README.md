# Mes dépenses – gestionnaire de budget

Application React (Vite) pour suivre ses dépenses mensuelles et les comparer à un budget.

**Démo :** https://gestionnaire-depenses-five.vercel.app/
**Capture d'écran :** _ajoute ici une image_

## Fonctionnalités
- Ajout, modification et suppression de dépenses (montant, catégorie, date, note)
- Validation du formulaire (montant > 0, date obligatoire)
- Total du mois, reste à dépenser et barre de progression du budget
- Filtres par mois et par catégorie
- Graphiques : répartition par catégorie et évolution mensuelle (Recharts)
- Export CSV, mode sombre, design responsive
- Données sauvegardées dans `localStorage`

## Stack
React 18 · Vite · Recharts · CSS · Vitest

## Lancer le projet
```bash
npm install
npm run dev     # développement
npm test        # tests unitaires
npm run build   # build de production
```

## Structure
```
src/
  components/   ExpenseForm, ExpenseList, Summary, Charts
  hooks/        useLocalStorage
  utils/        calculs, filtres, export CSV (+ tests)
```

## Pistes d'évolution
- Back-end (Supabase ou Node/Express) avec authentification
- Dépenses récurrentes, budgets par catégorie
