# Charte du développeur

Ce projet suit quelques bonnes pratiques de développement :

- **Typescript strict** : le mode strict est activé pour attraper les erreurs à la compilation.
- **Structure claire** : séparation par dossiers (composants/pages/services/models).
- **Tests unitaires** : le service de tickets est couvert par des tests Vitest.
- **Documentation** : architecture décrite, instructions de mise en route dans le README.
- **Linting** : ESLint est configuré (voir `eslint.config.js`). Avant de pousser, exécuter `npm run lint`.
- **Gestion de versions** : commit réguliers, messages explicites et `.gitignore` propre.
- **Responsabilité** : chaque composant/service ne fait qu'une seule chose et expose une API minimale.
- **Design simple** : style léger en CSS, pas de dépendances lourdes.

Pour contribuer :
1. Cloner le repo et créer une branche de fonctionnalité.
2. Écrire des tests pour toute logique nouvelle.
3. Valider le linter et les types (`npm run lint`, `npm run build`).
4. Ajouter une entrée dans la documentation si nécessaire.
5. Soumettre une pull request en décrivant les changements.

En cas de doute, communiquer avec l'équipe et documenter les choix techniques.
