# Quick Start Checklist

## ✅ Before Running

### 1. PostgreSQL Installation
- [ ] Install PostgreSQL (version 12+)
- [ ] Create database: `createdb smart_tasks`
- [ ] Run SQL script: `psql -d smart_tasks -f server/database.sql`

### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit .env file with your settings
npm install
```

### 3. Frontend Setup
```bash
cd client
cp .env.example .env.local
# Make sure NEXT_PUBLIC_API_URL points to backend
npm install
```

### 4. Run Project
```bash
# From root folder
npm install
npm run dev
```

Or separately:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🎯 Functionality Check

### Backend (http://localhost:5000)
- [ ] Open http://localhost:5000/api/health
- [ ] Should see: `{"status":"ok","message":"Server is running"}`

### Frontend (http://localhost:3000)
- [ ] Open http://localhost:3000
- [ ] Login page should open
- [ ] Register a new user
- [ ] Login to the system
- [ ] Check all pages: Dashboard, Tasks, Projects, Analytics

## 🧪 Test Scenario

1. **Registration**
   - [ ] Register a user
   - [ ] Check that token is saved

2. **Create Project**
   - [ ] Go to Projects
   - [ ] Create project "Test Project"
   - [ ] Choose a color

3. **Create Tasks**
   - [ ] Go to Tasks
   - [ ] Create task "High Priority Task" (priority: high, status: todo)
   - [ ] Create task "In Progress Task" (status: in_progress)
   - [ ] Create task "Completed Task" (status: done)
   - [ ] Add deadlines

4. **Check Dashboard**
   - [ ] Go to Dashboard
   - [ ] Check statistics (Total, To Do, In Progress, Done)
   - [ ] Check deadline warnings

5. **Check Analytics**
   - [ ] Go to Analytics
   - [ ] Check status charts
   - [ ] Check priority charts
   - [ ] Check smart suggestions

6. **Edit Tasks**
   - [ ] Change task status
   - [ ] Change priority
   - [ ] Update deadline

7. **Delete**
   - [ ] Delete a task
   - [ ] Delete a project

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check that PostgreSQL is running
pg_isready

# Check database connection
psql -d smart_tasks -c "SELECT 1"

# Check environment variables
cat server/.env
```

### Frontend won't connect to Backend
```bash
# Check that backend is running
curl http://localhost:5000/api/health

# Check environment variables
cat client/.env.local

# Check CORS settings in server/src/index.ts
```

### TypeScript Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check versions
node --version  # should be 18+
npm --version
```

### Database
```bash
# Recreate tables
psql -d smart_tasks -f server/database.sql

# Check tables
psql -d smart_tasks -c "\dt"
```

## 📦 Production Build

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## 🚀 Next Steps

After successful launch:
- [ ] Read ARCHITECTURE.md to understand the structure
- [ ] Study API_EXAMPLES.md for working with the API
- [ ] Check CONTRIBUTING.md if you want to make changes
- [ ] Read DEPLOYMENT.md for production deployment

## 📝 Useful Commands

```bash
# View PostgreSQL logs
tail -f /var/log/postgresql/postgresql-*.log

# Backup database
pg_dump smart_tasks > backup.sql

# Restore database
psql smart_tasks < backup.sql

# Check ports
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # PostgreSQL
```

## 🎉 Done!

If all checklists are passed - the project is ready to use!

For questions and bugs, create issues in the repository.
