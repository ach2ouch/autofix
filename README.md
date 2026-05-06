# AutoPieces.tn — Outil Vendeur (Demo)

Outil IA pour les vendeurs de casse auto en Tunisie. Téléchargez la photo d'un véhicule accidenté, recevez :
- Identification du véhicule (marque, modèle, année)
- Cartographie 2D interactive des dégâts par zone
- Inventaire complet des pièces avec prix en TND
- Compatibilité croisée avec d'autres modèles
- Potentiel total de revenus en pièces détachées

## Structure

```
autopieces/
├── index.html
├── netlify.toml
├── .gitignore
├── README.md
└── netlify/
    └── functions/
        └── analyze.js
```

## Déploiement

Identique au projet précédent :

1. Push to GitHub (replace contents of your existing repo)
2. Netlify will auto-deploy via the connected repo (or trigger manually)
3. Make sure the `ANTHROPIC_API_KEY` environment variable is still set in Netlify
4. After replacing files, **trigger a new deploy** in Netlify

That's it — the API key from your previous setup carries over.

## Personnalisation

- Couleurs principales : ambre/jaune (`amber-`) sur fond pierre clair (`stone-`)
- Pour changer la marque, chercher "AutoPieces" dans `index.html`
- Pour modifier le prompt IA, voir `netlify/functions/analyze.js`
- Le diagramme 2D de la voiture est en SVG inline — modifiable directement dans le code
