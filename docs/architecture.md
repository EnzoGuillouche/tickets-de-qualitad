# Architecture du projet

Ce front-end est une application React construite avec Vite et TypeScript. Elle est organisée en dossiers
logiques afin de séparer les préoccupations :

- **components/** : composants réutilisables et petits blocs UI (Navbar, TicketCard, etc.).
- **pages/** : composants qui correspondent à des routes/pages de l'application (Dashboard, Liste de tickets,
  détail, création, login).
- **models/** : définitions de types TypeScript (`Ticket`, `User`).
- **services/** : logique métier et accès aux données. Le `ticketService` fournit une API asynchrone
  simulant une interaction avec un serveur.
- **database/** : fichier JSON initial (`tickets.json`) pour peupler l'état en mémoire.
- **hooks/** : hooks personnalisés, notamment `useAuth` pour la gestion d'authentification locale.
- **styles/** : styles CSS globaux.
- **tests/** : tests unitaires avec Vitest.

La navigation est assurée par `react-router-dom`. L'état de l'utilisateur courant (nom et rôle) est stocké
via un contexte React (`AuthContext`). Les droits d'accès sont appliqués au niveau des pages et du service
: les utilisateurs standard ne peuvent voir que leurs tickets, les superviseurs voient tout, etc.

L'application ne fait pas de requêtes réseau pour l'instant ; toutes les données sont conservées
en mémoire côté client. Cette architecture facilite l'ajout ultérieur d'une API backend en remplaçant simplement
`ticketService`.
