# 🏋️‍♂️ GymPass API

A Node.js API for a GymPass-style application that allows users to check in at gyms. Built using SOLID principles, modern design patterns, Docker, and PostgreSQL.

## 📋 About the Project

This project was developed as part of the Rocketseat programming course to study advanced API concepts in Node.js including:

- SOLID architecture principles
- Design Patterns
- Docker containerization
- Database interactions with PostgreSQL
- Authentication using JWT and refresh tokens
- Role-Based Access Control (RBAC)

## ✅ Functional Requirements

- It should be possible to register
- It should be possible to authenticate
- It should be possible to obtain the profile of a logged-in user
- It should be possible to obtain the number of check-ins performed by the logged-in user
- It should be possible for the user to obtain their check-in history
- It should be possible for the user to search for nearby gyms
- It should be possible for the user to search for gyms by name
- It should be possible for the user to check in at a gym
- It should be possible to validate a user's check-in
- It should be possible to register a gym

## 📏 Business Rules

- Users should not be able to register with a duplicate email
- Users cannot make 2 check-ins on the same day
- Users cannot check in if they are not near (100m) the gym
- Check-ins can only be validated up to 20 minutes after creation
- Check-ins can only be validated by administrators
- Gyms can only be registered by administrators

## 🔧 Non-Functional Requirements

- User passwords need to be encrypted
- Application data needs to be persisted in a PostgreSQL database
- All data lists need to be paginated with 20 items per page
- Users must be identified by a JWT

## 🚀 Installation

### Prerequisites

- Node.js
- Docker and Docker Compose
- PostgreSQL

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/msvalandro/03-api-solid.git
   cd 03-api-solid
   ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Set up environment variables:
  ```bash
  cp .env.example .env
  ```
Edit the .env file with your database and JWT configuration.
4. Start the application:
  ```bash
  npm run dev
  ```

## 💻 Technologies Used

Node.js
TypeScript
Express
PostgreSQL
Prisma ORM
JWT Authentication
Docker
Jest for testing
Vitest for unit testing
Supertest for e2e testing

## 🏗️ Architecture
This project follows SOLID principles:

S - Single Responsibility Principle
O - Open/Closed Principle
L - Liskov Substitution Principle
I - Interface Segregation Principle
D - Dependency Inversion Principle

The architecture is divided into:

Controllers
Use Cases
Repositories
Entities
DTOs (Data Transfer Objects)

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
