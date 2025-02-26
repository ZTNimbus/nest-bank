# Bank API Backend

This repository contains the backend server for the Bank Transaction Management System. It provides RESTful API endpoints for managing bank accounts, users, and transactions.

## Features

- Bank account balance tracking
- Transaction processing
- Transaction history by user

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (v12 or later)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ZTNimbus/nest-bank
cd nest-bank
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory of the project based on the provided `.env.example`:

```bash
cp .env.example .env
```

Open the `.env` file and fill in the values:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=bank_database
```

### 4. Configure the database

Ensure PostgreSQL is running, then create a new database.

### 5. Configure CORS settings

Open the `src/main.ts` file and update the CORS configuration to allow requests from your frontend application:

```typescript
app.enableCors({
  origin: 'http://your-frontend-url.com', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
});
```

### 6. Run the application

```bash
npm run start:dev
```

The server will start at http://localhost:3000 (or the port you specified in the .env file).

## API Endpoints

### Bank

- `GET /bank` - Get bank details and balance

### Person

- `GET /person` - Get all persons

### Transactions

- `GET /transactions/:personId` - Get transactions for a person
- `POST /transactions` - Process new transactions

```

## Troubleshooting

### Database connection issues

- Ensure PostgreSQL is running
- Verify your database credentials in the `.env` file
- Make sure the database exists

### CORS errors

- Check that the CORS origin in `main.ts` matches your frontend URL exactly
```
