# Smart Task & Productivity Platform

## Installation and Setup

### 1. Install Dependencies

```bash
# Install dependencies for entire project
npm install

# Or separately for each part
cd server && npm install
cd ../client && npm install
```

### 2. Database Setup

Create a PostgreSQL database and run the SQL script:

```bash
psql -U your_user -d your_database -f server/database.sql
```

### 3. Configure Environment Variables

**Backend (server/.env):**
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/smart_tasks
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

**Frontend (client/.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run Project

```bash
# Run entire project (frontend + backend)
npm run dev

# Or separately:
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

Backend will be available at `http://localhost:5000`
Frontend will be available at `http://localhost:3000`

## Project Structure

```
projultr/
├── client/              # Next.js frontend
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── lib/           # Utilities, API, store
│   └── types/         # TypeScript types
├── server/             # Express backend
│   ├── src/
│   │   ├── config/    # DB configuration
│   │   ├── controllers/ # Controllers
│   │   ├── middleware/  # Middleware
│   │   ├── routes/      # API routes
│   │   └── types/       # TypeScript types
│   └── database.sql    # SQL schema
└── package.json        # Root package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Registration
- `POST /api/auth/login` - Login

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `DELETE /api/projects/:id` - Delete project

### Analytics
- `GET /api/analytics` - Get analytics

## Features

- ✅ JWT Authentication
- ✅ CRUD operations for tasks and projects
- ✅ Kanban board (To Do, In Progress, Done)
- ✅ Task priorities (Low, Medium, High)
- ✅ Deadlines with warnings
- ✅ Productivity analytics
- ✅ Smart suggestions (overdue tasks, many tasks)
- ✅ Responsive design

## Technologies

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Axios (HTTP client)

**Backend:**
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT Authentication
- bcryptjs

## Future Development

- [ ] Drag & drop for Kanban
- [ ] Analytics charts (recharts)
- [ ] Real-time notifications
- [ ] Dark theme
- [ ] Data export
- [ ] Team collaboration
