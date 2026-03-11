# Contributing Guidelines

Thank you for your interest in contributing to the **Incident Ticket Management System**.

This document explains how to contribute to the project, the development standards to follow, and the workflow used in this repository.

---

# Project Philosophy

This project follows several key development principles:

* Clean and readable code
* Separation of responsibilities
* Consistent naming conventions
* Automated testing
* Clear documentation

All contributions should respect these principles.

---

# Getting Started

## 1. Fork and Clone the Repository

Fork the repository and clone it locally:

```bash
git clone https://github.com/EnzoGuillouche/tickets-de-qualitad
cd tickets-de-qualitad
```

Create a new branch for your work:

```bash
git checkout -b feature/my-feature-name
```

---

# Development Environment

## Requirements

* node

---

# Project Structure

```
tickets-de-qualitad/
│
├── public/
│
├── src/
│   ├── assets/            # images, icons, etc.
│   │
│   ├── components/        # composants React réutilisables
│   │   ├── TicketCard/
│   │   ├── TicketForm/
│   │   └── Navbar/
│   │
│   ├── pages/             # pages de l'application
│   │   ├── Dashboard.tsx
│   │   ├── TicketList.tsx
│   │   ├── TicketDetail.tsx
│   │   └── CreateTicket.tsx
│   │
│   ├── models/            # types TypeScript
│   │   ├── Ticket.ts
│   │   └── User.ts
│   │
│   ├── services/          # logique métier
│   │   └── ticketService.ts
│   │
│   ├── database/          # gestion JSON locale
│   │   └── tickets.json
│   │
│   ├── hooks/             # custom React hooks
│   │
│   ├── styles/            # CSS global
│   │   └── global.css
│   │
│   ├── tests/             # unit tests
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── docs/                  # documentation
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
│
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

Please respect the architecture when adding new features.

---

# Coding Standards

## General Rules

* Use **meaningful variable and function names**
* Keep functions **short and focused**
* Avoid duplicated code
* Write comments when necessary

## Naming Conventions

| Element   | Convention | Example              |
| --------- | ---------- | -------------------- |
| Classes   | PascalCase | `TicketManager`      |
| Functions | camelCase  | `createTicket()`     |
| Variables | camelCase  | `ticketPriority`     |
| Constants | UPPER_CASE | `MAX_TICKETS`        |
| Files     | snake_case | `ticket_manager.cpp` |

---

# Commit Guidelines

- Use clear commit messages.
- Don't commit to many files.

---

# Pull Request Process

1. Create a feature branch.
2. Implement your changes.
3. Add or update tests if needed.
4. Ensure the project builds successfully.
5. Submit a Pull Request.

Pull requests should include:

* A clear description
* The reason for the change
* Any relevant screenshots (if UI related)

---

# Testing

All core logic must be covered by **unit tests**.

Tests are located in the `tests/` directory.

---

# Reporting Issues

If you find a bug or want to suggest an improvement, please create an issue including:

* A clear description
* Steps to reproduce
* Expected behavior
* Actual behavior

---

# Code Review

All contributions are reviewed before merging.

Reviewers will check:

* Code readability
* Architecture respect
* Tests
* Documentation

Changes may be requested before approval.

---

# Documentation

All significant features should be documented in:

* `README.md`
* `docs/architecture.md`
* Code comments when needed

---

# Future Contributions

Future improvements may include:

* Authentication system
* Remote database
* Web API
* Multi-user synchronization
* Notification system

---

# Thank You

Thank you for contributing to the project and helping improve the system.
Your contributions are greatly appreciated.
