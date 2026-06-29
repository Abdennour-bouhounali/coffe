# Maison Saha

Architecture React/Vite d’un coffee shop lifestyle parisien.

## Démarrer

```bash
npm install
npm run dev
```

## Vérifier la production

```bash
npm run lint
npm run build
npm run preview
```

## Architecture

- `src/app` : initialisation, routeur et providers globaux.
- `src/components` : primitives UI et composants transversaux.
- `src/features` : sections et comportements propres à un domaine.
- `src/pages` : composition des routes, sans logique métier dupliquée.
- `src/data` : source éditoriale unique pour le menu et les contenus.
- `src/hooks` : comportements réutilisables.
- `src/lib` : utilitaires purs, SEO et animations.
- `src/styles` : tokens, styles globaux et accessibilité.

Les photos finales peuvent être déposées dans `public/images`. Le composant
`EditorialMedia` fournit un fallback graphique afin qu’aucun média cassé ne
soit affiché pendant l’intégration.

## Déploiement

Le projet utilise un routeur navigateur. Le serveur doit rediriger les routes
inconnues vers `index.html`. Définir `VITE_SITE_URL` avec le domaine de
production avant le build.
