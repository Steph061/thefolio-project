# TheFolio Project

A full-stack MERN blog application with React frontend and Node.js/Express/MongoDB backend.

## Project Structure

```
thefolio-project/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── config-overrides.js
└── backend/           # Node.js/Express API
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── server.js
    └── package.json
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000 and backend on http://localhost:5000.

## Features

- User authentication (JWT)
- Blog posts and comments
- Admin dashboard
- Dark mode toggle
- Responsive design
- BTS/ARIRANG promotional content
- Interactive quiz