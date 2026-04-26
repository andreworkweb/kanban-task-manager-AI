# 🎉 First Run - Step-by-Step Guide

## Step 1: Check Requirements

Make sure you have installed:
```bash
node --version    # should be 18+
npm --version     # should be 9+
psql --version    # PostgreSQL 12+
```

If something is missing:
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

## Step 2: Create Database

### Windows (PowerShell/CMD):
```bash
# Start PostgreSQL
# Usually starts automatically after installation

# Create database
createdb -U postgres smart_tasks

# If password is required, use:
# psql -U postgres
# CREATE DATABASE smart_tasks;
# \q
```

### Linux/Mac:
```bash
sudo -u postgres createdb smart_tasks
```

## Step 3: Initialize Tables

```bash
cd "A:\I WONNA\projultr"

# Run SQL script
psql -U postgres -d smart_tasks -f server/database.sql

# Check that tables were created
psql -U postgres -d smart_tasks -c "\dt"
```

You should see 4 tables:
- users
- projects
- tasks
- activity_logs

## Step 4: Configure Backend

```bash
cd server

# Create .env file
copy .env.example .env    # Windows
# or
cp .env.example .env      # Linux/Mac

# Open .env and configure:
```

**server/.env:**
```env
PORT=5000
NODE_ENV=development

# Replace with your PostgreSQL credentials
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/smart_tasks

# Generate a random secret (or use any string)
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=my_refresh_secret_key_67890
JWT_REFRESH_EXPIRES_IN=30d
```

**How to generate a secret:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32
```

## Step 5: Install Backend Dependencies

```bash
# While in server folder
npm install

# Wait for installation to complete
```

## Step 6: Configure Frontend

```bash
cd ../client

# Create .env.local file
copy .env.example .env.local    # Windows
# or
cp .env.example .env.local      # Linux/Mac
```

**client/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 7: Install Frontend Dependencies

```bash
# While in client folder
npm install

# Wait for installation to complete
```

## Step 8: Run the Project

### Option 1: Run entire project (recommended)

```bash
# Return to root folder
cd ..

# Install dependencies for root
npm install

# Run both servers simultaneously
npm run dev
```

### Option 2: Run separately (two terminals)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

## Step 9: Verify It Works

### 1. Check Backend
Open in browser: http://localhost:5000/api/health

You should see:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Check Frontend
Open in browser: http://localhost:3000

The login page should open.

## Step 10: First Use

1. **Registration**
   - Click "Register"
   - Enter:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
   - Click "Register"

2. **Login**
   - You will be automatically logged in after registration
   - Dashboard will open

3. **Create first task**
   - Go to "Tasks"
   - Click "+ New Task"
   - Fill the form:
     - Title: My first task
     - Description: Test task
     - Status: To Do
     - Priority: High
     - Due Date: select tomorrow's date
   - Click "Create"

4. **Create project**
   - Go to "Projects"
   - Click "+ New Project"
   - Fill:
     - Name: Test project
     - Description: My first project
     - Color: choose any color
   - Click "Create"

5. **Check analytics**
   - Go to "Analytics"
   - View task statistics

## 🐛 Possible Issues

### Backend won't start

**Error: "Cannot connect to database"**
```bash
# Check that PostgreSQL is running
pg_isready

# Check DATABASE_URL in server/.env
# Make sure the password is correct
```

**Error: "Port 5000 already in use"**
```bash
# Change port in server/.env
PORT=5001

# And in client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Frontend won't connect to Backend

**Error: "Network Error"**
```bash
# Make sure backend is running
curl http://localhost:5000/api/health

# Check NEXT_PUBLIC_API_URL in client/.env.local
```

### Errors during dependency installation

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📝 Useful Commands

```bash
# Stop servers
Ctrl + C (in terminal)

# Restart backend
cd server
npm run dev

# Restart frontend
cd client
npm run dev

# View PostgreSQL logs (Linux/Mac)
tail -f /var/log/postgresql/postgresql-*.log

# Backup database
pg_dump -U postgres smart_tasks > backup.sql

# Restore database
psql -U postgres smart_tasks < backup.sql
```

## ✅ Readiness Checklist

- [ ] PostgreSQL installed and running
- [ ] smart_tasks database created
- [ ] Tables created (users, tasks, projects, activity_logs)
- [ ] Backend .env configured
- [ ] Frontend .env.local configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] http://localhost:5000/api/health returns OK
- [ ] http://localhost:3000 opens login page
- [ ] Registration works
- [ ] Can create a task
- [ ] Can create a project

## 🎉 Done!

If all checklist items are completed - the project works!

**Next steps:**
- Study [ARCHITECTURE.md](ARCHITECTURE.md) to understand the structure
- Check [API_EXAMPLES.md](API_EXAMPLES.md) for working with the API
- Read [CONTRIBUTING.md](CONTRIBUTING.md) if you want to add something

**Need help?**
- Check [QUICKSTART.md](QUICKSTART.md)
- Look at the troubleshooting section
- Create an issue in the repository
