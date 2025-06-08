# Template React TypeScript

Ce template fournit une base solide pour créer des applications React modernes avec TypeScript.

## 🚀 Fonctionnalités

- ⚡️ Vite pour un développement ultra-rapide
- 🎨 Tailwind CSS pour le styling
- 📱 React Router pour la navigation
- 🔄 React Query pour la gestion des données
- 📝 TypeScript pour la sécurité du type
- 🧹 ESLint pour la qualité du code

## 📁 Structure du Projet

```
src/
├── components/     # Composants réutilisables
│   ├── common/     # Composants génériques (boutons, inputs, etc.)
│   ├── layout/     # Composants de mise en page
│   └── features/   # Composants spécifiques aux fonctionnalités
├── pages/         # Pages de l'application
├── hooks/         # Hooks personnalisés
├── services/      # Services API et autres services
├── utils/         # Fonctions utilitaires
├── assets/        # Images, fonts, etc.
├── styles/        # Styles globaux et configurations Tailwind
├── types/         # Types TypeScript
└── context/       # Contextes React
```

## 🛠️ Installation

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualisation du build
npm run preview
```

## 📝 Bonnes Pratiques

### Organisation des Composants

1. **Composants Communs** (`components/common/`)
   - Boutons, inputs, cards, etc.
   - Doivent être réutilisables
   - Inclure des tests unitaires

2. **Composants de Layout** (`components/layout/`)
   - Header, Footer, Sidebar, etc.
   - Gèrent la structure globale

3. **Composants de Fonctionnalités** (`components/features/`)
   - Composants spécifiques aux fonctionnalités
   - Organisés par domaine

### Gestion des États

- Utiliser React Query pour les données serveur
- Context API pour l'état global
- useState pour l'état local

### Routing

- Organiser les routes dans `src/App.tsx`
- Utiliser des routes imbriquées pour les layouts
- Implémenter la protection des routes si nécessaire

### API et Services

- Centraliser les appels API dans `services/`
- Utiliser des types pour les réponses API
- Implémenter la gestion des erreurs

## 🔧 Configuration

### Vite

Le fichier `vite.config.ts` contient la configuration de base. Personnalisez-le selon vos besoins :

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### TypeScript

La configuration TypeScript se trouve dans `tsconfig.json`. Ajustez les options selon vos besoins.

### Tailwind

Configurez Tailwind dans `tailwind.config.js` pour personnaliser votre design system.

## 🧪 Tests

- Utiliser Vitest pour les tests unitaires
- React Testing Library pour les tests d'intégration
- Cypress pour les tests E2E

## 📦 Déploiement

1. Build de l'application :
   ```bash
   npm run build
   ```

2. Les fichiers de build se trouvent dans `dist/`

3. Déployer sur votre plateforme préférée (Vercel, Netlify, etc.)

## 🔍 Linting

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement
npm run lint -- --fix
```

## 📚 Ressources

- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Tailwind](https://tailwindcss.com/) 