# EventHub

EventHub is a full-stack event management app with a Node/Express backend and a React (Vite) frontend.

## Features

- User authentication and role-based access
- Event creation and management
- Event registration
- Protected routes

## Tech Stack

- Backend: Node.js, Express
- Frontend: React, Vite, Tailwind CSS
- Database: SQL (schema in backend/src/models/schema.sql)

## Project Structure

- backend/ - API server
- frontend/ - web client

## Getting Started

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Configure environment variables

Create a `.env` file in `backend/` with your database connection values and any auth secrets required by the server.

### 3) Run the app

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

## Notes

- Update CORS settings if the frontend and backend run on different hosts.
- See `backend/src/models/schema.sql` for database tables.
