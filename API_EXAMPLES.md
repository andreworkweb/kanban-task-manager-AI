# API Examples

## Authentication

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "name": "John Doe"
  }'
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

## Tasks

### Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "project_id": null,
    "title": "Complete project documentation",
    "description": "Write comprehensive docs",
    "status": "in_progress",
    "priority": "high",
    "due_date": "2026-04-30T00:00:00.000Z",
    "created_at": "2026-04-26T10:00:00.000Z",
    "updated_at": "2026-04-26T10:00:00.000Z",
    "completed_at": null
  }
]
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review pull requests",
    "description": "Check and merge pending PRs",
    "status": "todo",
    "priority": "medium",
    "due_date": "2026-04-28"
  }'
```

### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Projects

### Get All Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "color": "#3B82F6",
    "created_at": "2026-04-20T10:00:00.000Z"
  }
]
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile App",
    "description": "iOS and Android app development",
    "color": "#10B981"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Analytics

### Get Analytics
```bash
curl -X GET http://localhost:5000/api/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
{
  "tasksCompleted": [
    { "count": "3", "date": "2026-04-25" },
    { "count": "5", "date": "2026-04-26" }
  ],
  "tasksByPriority": [
    { "priority": "high", "count": "8" },
    { "priority": "medium", "count": "12" },
    { "priority": "low", "count": "5" }
  ],
  "tasksByStatus": [
    { "status": "todo", "count": "10" },
    { "status": "in_progress", "count": "7" },
    { "status": "done", "count": "8" }
  ],
  "upcomingDeadlines": [
    {
      "id": 5,
      "title": "Submit report",
      "due_date": "2026-04-28T00:00:00.000Z",
      "priority": "high",
      "status": "in_progress"
    }
  ]
}
```

## Frontend Usage Examples

### Login
```typescript
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

const handleLogin = async () => {
  try {
    const response = await authApi.login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    const { setAuth } = useAuthStore.getState();
    setAuth(response.data.user, response.data.token);
    
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
  }
};
```

### Create Task
```typescript
import { tasksApi } from '@/lib/api';

const createTask = async () => {
  try {
    const response = await tasksApi.create({
      title: 'New Task',
      description: 'Task description',
      status: 'todo',
      priority: 'high',
      due_date: '2026-04-30'
    });
    
    console.log('Task created:', response.data);
  } catch (error) {
    console.error('Failed to create task', error);
  }
};
```

### Get Analytics
```typescript
import { analyticsApi } from '@/lib/api';

const fetchAnalytics = async () => {
  try {
    const response = await analyticsApi.get();
    setAnalytics(response.data);
  } catch (error) {
    console.error('Failed to fetch analytics', error);
  }
};
```

## Error Responses

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 400 Bad Request
```json
{
  "message": "User already exists"
}
```

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error"
}
```

## Testing with Postman

1. Import collection from `postman_collection.json`
2. Set environment variable `{{baseUrl}}` = `http://localhost:5000/api`
3. After login, set `{{token}}` with the received JWT
4. All protected routes will use `Authorization: Bearer {{token}}`

## Rate Limiting (Future)

```javascript
// Example rate limiting middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```
