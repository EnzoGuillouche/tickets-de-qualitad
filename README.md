# tickets-de-qualitad

## Overview

This project is an **Incident Ticket Management System** designed for an IT service department.

The application allows users to create and follow incident tickets while administrators manage, update, and resolve them.

The project includes a **graphical interface built with SFML** and uses a **local JSON database** for data persistence.

This repository contains the full implementation, documentation, and tests required to maintain and extend the system.

---

## Features

### User Features

* Create a new incident ticket
* View tickets created by the user
* View tickets assigned to the user
* Track ticket status

### Administrator Features

Administrators have additional capabilities:

* Respond to tickets
* Assign tickets to another administrator
* Set ticket priority
* Change ticket status:
  * Open
  * In Progress
  * Resolved
  * Closed

### Supervisor Features

Supervisors can:

* View **all tickets in the system**

---

## Technologies Used

* **React/Vite**
* **Typescript**
* **CSS**
* **Git** – version control
* **npm**
* **Unit Testing**

---

## Ticket Model

A ticket contains:

* `id`
* `title`
* `description`
* `author`
* `assigned_to`
* `priority`
* `status`
* `creation_date`
* `responses`

Example:

```json
{
  "id": 1,
  "title": "Network issue",
  "description": "Cannot connect to the VPN",
  "author": "user1",
  "assigned_to": "admin1",
  "priority": "high",
  "status": "open",
  "responses": []
}
```

---

## Roles

The system supports three roles:

| Role          | Permissions                 |
| ------------- | --------------------------- |
| User          | Create and view own tickets |
| Administrator | Manage and update tickets   |
| Supervisor    | View all tickets            |

---

## Installation

### Requirements

* node

### Clone the repository

```bash
git clone https://github.com/EnzoGuillouche/tickets-de-qualitad.git
cd tickets-de-qualitad
```

### Build the project

```bash
cd app

```

It will download all necessary libraries or tools for the good functionning of the application.

---

## Running the Application

After building:

```bash
./ticket-system
```

---

## Project Structure

```
tickets-de-qualitad/
│
├── docs/                     # documentation du projet
│   ├── architecture.md
│   └── developer-charter.md
│
├── ticket_system/            # application React/Vite
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/           # images / icones
│   │   │
│   │   ├── components/       # composants React réutilisables
│   │   │   ├── TicketCard/
│   │   │   ├── TicketForm/
│   │   │   └── Navbar/
│   │   │
│   │   ├── pages/            # pages de l'application
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TicketList.tsx
│   │   │   ├── TicketDetail.tsx
│   │   │   └── CreateTicket.tsx
│   │   │
│   │   ├── models/           # types TypeScript
│   │   │   ├── Ticket.ts
│   │   │   └── User.ts
│   │   │
│   │   ├── services/         # logique métier
│   │   │   └── ticketService.ts
│   │   │
│   │   ├── database/         # données JSON locales
│   │   │   └── tickets.json
│   │   │
│   │   ├── hooks/            # hooks React personnalisés
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── tests/            # unit tests
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── .gitignore
│   └── vite.config.ts
│
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

---

## Development Guidelines

The project follows several good development practices:

* Clear **code structure**
* **Separation of concerns**
* **Unit testing**
* **Version control with Git**
* Code documentation

---

## Unit Tests

Unit tests ensure that the ticket management logic behaves correctly.

Tests cover:

* Ticket creation
* Ticket assignment
* Status updates
* Permission checks

<!-- To run tests:

```bash
gtest
``` 
-->
---

## Future Improvements

Possible improvements include:

* Authentication system
* Remote local database
* REST API
* Web interface
* Notification system
* Multi-user synchronization

---

## Authors

- Enzo GUILLOUCHE
- Lucas MEGNAN

---

## License

This project is for educational purposes.

_ça c'est des vrais tickets_
