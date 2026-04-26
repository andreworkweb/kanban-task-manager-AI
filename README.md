# 🚀 Smart Task & Productivity Platform

A comprehensive task management system with productivity analytics, JWT authentication, and REST API.

![Status](https://img.shields.io/badge/status-ready-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Node.js](https://img.shields.io/badge/Node.js-20-green)

## ✨ Features

- ✅ **Task Management** - create, edit, delete
- ✅ **Kanban Board** - task visualization (To Do, In Progress, Done)
- ✅ **Projects** - group tasks by projects
- ✅ **Priorities** - Low, Medium, High
- ✅ **Deadlines** - track due dates with warnings
- ✅ **Analytics** - productivity charts and statistics
- ✅ **Smart Suggestions** - overload and deadline warnings
- ✅ **JWT Authentication** - secure authentication
- ✅ **Responsive Design** - works on all devices

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with SSR
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Zustand** - state management
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - REST API
- **TypeScript** - type safety
- **PostgreSQL** - database
- **JWT** - authentication
- **bcryptjs** - password hashing

## 🚀 Quick Start

### Requirements
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd projultr
```

2. **Set up the database**
```bash
createdb smart_tasks
psql -d smart_tasks -f server/database.sql
```

3. **Configure environment variables**
```bash
# Backend
cp server/.env.example server/.env
# Edit server/.env

# Frontend
cp client/.env.example client/.env.local
```

4. **Install dependencies and run**
```bash
npm install
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

📖 **Detailed guide:** [QUICKSTART.md](QUICKSTART.md)

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick start and checklist
- [SETUP.md](SETUP.md) - Detailed installation
- [ARCHITECTURE.md](ARCHITECTURE.md) - Project architecture
- [API_EXAMPLES.md](API_EXAMPLES.md) - API request examples
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributor guide

## 📁 Project Structure

```
projultr/
├── client/              # Next.js Frontend
│   ├── app/            # Pages (App Router)
│   ├── components/     # React components
│   ├── lib/           # API, store, utils
│   └── types/         # TypeScript types
├── server/             # Express Backend
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # JWT auth
│   │   └── config/       # Database config
│   └── database.sql    # SQL schema
└── docs/              # Documentation
```

## 🎯 API Endpoints

### Auth
- `POST /api/auth/register` - Registration
- `POST /api/auth/login` - Login

### Tasks (Protected)
- `GET /api/tasks` - All tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update
- `DELETE /api/tasks/:id` - Delete

### Projects (Protected)
- `GET /api/projects` - All projects
- `POST /api/projects` - Create project
- `DELETE /api/projects/:id` - Delete

### Analytics (Protected)
- `GET /api/analytics` - Statistics

## 🎨 Screenshots

### Dashboard
Task overview, statistics, deadline warnings

### Tasks (Kanban)
Kanban board with three columns: To Do, In Progress, Done

### Analytics
Productivity charts, distribution by priorities and statuses

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens with 7-day expiration
- Protected routes with middleware
- SQL injection protection via prepared statements
- CORS configured

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel --prod
```

### Heroku (Backend)
```bash
heroku create
heroku addons:create heroku-postgresql
git push heroku main
```

More details: [DEPLOYMENT.md](DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 License

MIT License

## 👨‍💻 Author

Created to demonstrate fullstack development with modern tech stack.

---

⭐ If you like the project - give it a star!
