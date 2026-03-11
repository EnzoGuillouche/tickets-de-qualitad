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

* **C++**
* **SFML** – graphical user interface
* **JSON** – local database
* **Git** – version control
* **Unit Testing with Google Test**

Libraries:

* `SFML`
* `nlohmann/json`

---

## Project Architecture

The project follows a **layered architecture** separating responsibilities.

```
Application
│
├── UI Layer (SFML)
│   Handles graphical interface and user interactions
│
├── Service Layer
│   Business logic for ticket management
│
├── Model Layer
│   Data structures (User, Ticket, etc.)
│
└── Data Layer
    JSON storage management
```

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

* C++17 or newer
* CMake

### Clone the repository

```bash
git clone https://github.com/EnzoGuillouche/tickets-de-qualitad.git
cd tickets-de-qualitad
```

### Build the project

```bash
cd src
cmake -B build
cmake --build build
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
├── src/
│   ├── ticket_system.cpp
│   ├── ui/
│   ├── models/
│   └── database/
│
├── tests/
│
├── data/
│   └── tickets.json
│
├── docs/
│
├── CMakeLists.txt
└── CONTRIBUTING.md
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
