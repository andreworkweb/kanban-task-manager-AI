# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (Port 3000)             │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │   Pages    │  │ Components │  │   Zustand  │     │  │
│  │  │  (Routes)  │  │    (UI)    │  │   (State)  │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  │         │                │                │           │  │
│  │         └────────────────┴────────────────┘           │  │
│  │                      │                                │  │
│  │                 ┌────▼────┐                          │  │
│  │                 │ API Lib │ (Axios)                  │  │
│  │                 └────┬────┘                          │  │
│  └──────────────────────┼───────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP/REST
                          │
┌─────────────────────────▼───────────────────────────────────┐
│              Express Backend (Port 5000)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   API Routes                          │  │
│  │  /auth  /tasks  /projects  /analytics                │  │
│  │     │       │        │           │                    │  │
│  │     └───────┴────────┴───────────┘                    │  │
│  │              │                                        │  │
│  │         ┌────▼────────┐                              │  │
│  │         │ Controllers │                              │  │
│  │         └────┬────────┘                              │  │
│  │              │                                        │  │
│  │         ┌────▼────────┐                              │  │
│  │         │  Middleware │ (JWT Auth)                   │  │
│  │         └────┬────────┘                              │  │
│  └──────────────┼───────────────────────────────────────┘  │
└─────────────────┼───────────────────────────────────────────┘
                  │ SQL
┌─────────────────▼───────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  users   │  │  tasks   │  │ projects │  │ activity │   │
│  │          │  │          │  │          │  │  _logs   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Pages (Next.js App Router)
- `/` - Redirect to auth
- `/auth` - Login/Register
- `/dashboard` - Overview with stats
- `/tasks` - Task management (Kanban)
- `/projects` - Project management
- `/analytics` - Productivity analytics

### State Management (Zustand)
```typescript
AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth(user, token)
  logout()
}
```

### API Layer (Axios)
- Centralized API client with interceptors
- Automatic JWT token injection
- Error handling

## Backend Architecture

### API Endpoints

**Auth Routes** (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication

**Task Routes** (`/api/tasks`) - Protected
- `GET /` - Get all user tasks
- `POST /` - Create new task
- `PUT /:id` - Update task
- `DELETE /:id` - Delete task

**Project Routes** (`/api/projects`) - Protected
- `GET /` - Get all user projects
- `POST /` - Create new project
- `DELETE /:id` - Delete project

**Analytics Routes** (`/api/analytics`) - Protected
- `GET /` - Get user analytics

### Middleware
- **authMiddleware** - JWT verification
- **CORS** - Cross-origin requests
- **express.json()** - JSON parsing

### Controllers
Business logic for each resource:
- authController - Registration, login
- taskController - CRUD operations
- projectController - CRUD operations
- analyticsController - Data aggregation

## Database Schema

### users
```sql
id SERIAL PRIMARY KEY
email VARCHAR(255) UNIQUE NOT NULL
password VARCHAR(255) NOT NULL (hashed)
name VARCHAR(255) NOT NULL
created_at TIMESTAMP
```

### projects
```sql
id SERIAL PRIMARY KEY
user_id INTEGER REFERENCES users(id)
name VARCHAR(255) NOT NULL
description TEXT
color VARCHAR(50)
created_at TIMESTAMP
```

### tasks
```sql
id SERIAL PRIMARY KEY
user_id INTEGER REFERENCES users(id)
project_id INTEGER REFERENCES projects(id)
title VARCHAR(255) NOT NULL
description TEXT
status ENUM('todo', 'in_progress', 'done')
priority ENUM('low', 'medium', 'high')
due_date TIMESTAMP
created_at TIMESTAMP
updated_at TIMESTAMP
completed_at TIMESTAMP
```

### activity_logs
```sql
id SERIAL PRIMARY KEY
user_id INTEGER REFERENCES users(id)
task_id INTEGER REFERENCES tasks(id)
action VARCHAR(100) NOT NULL
created_at TIMESTAMP
```

## Security

### Authentication Flow
1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in localStorage
5. Client sends token in Authorization header
6. Server validates token on protected routes

### Password Security
- Passwords hashed with bcryptjs (10 rounds)
- Never stored in plain text

### JWT Tokens
- Signed with secret key
- 7-day expiration
- Payload: { id, email }

## Data Flow Examples

### Creating a Task
```
User Input → TaskModal → handleSave() → tasksApi.create()
  → POST /api/tasks → authMiddleware → taskController.createTask()
  → INSERT INTO tasks → activity_logs → Response
  → Update UI → fetchTasks()
```

### Getting Analytics
```
Page Load → useEffect → analyticsApi.get()
  → GET /api/analytics → authMiddleware → analyticsController.getAnalytics()
  → Multiple SQL queries (aggregations) → Response
  → Update state → Render charts
```

## Performance Considerations

### Frontend
- Next.js SSR for fast initial load
- Client-side navigation (SPA)
- Optimistic UI updates
- Lazy loading components

### Backend
- Database indexes on foreign keys
- Efficient SQL queries with JOINs
- Connection pooling (pg.Pool)

### Database
- Indexes on user_id, status, due_date
- Cascading deletes for data integrity

## Scalability

### Horizontal Scaling
- Stateless backend (JWT)
- Load balancer ready
- Database connection pooling

### Future Improvements
- Redis for caching
- WebSocket for real-time updates
- CDN for static assets
- Database read replicas
- Microservices architecture
