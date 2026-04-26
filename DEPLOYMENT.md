# Deployment Guide

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Preparation**
```bash
cd server
npm run build
```

2. **Environment Variables**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=your_production_database_url
JWT_SECRET=strong_random_secret
JWT_EXPIRES_IN=7d
```

3. **Heroku**
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend Deployment (Vercel)

1. **Connect GitHub repository to Vercel**

2. **Configure environment variables in Vercel:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

3. **Build settings:**
- Framework: Next.js
- Root Directory: client
- Build Command: `npm run build`
- Output Directory: `.next`

### Database Setup (Production)

**Create production database:**

```bash
# For Heroku Postgres
heroku pg:psql < server/database.sql

# For other providers
psql $DATABASE_URL < server/database.sql
```

## Docker Deployment (optional)

### Backend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: smart_tasks
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/smart_tasks
      JWT_SECRET: your_secret
    depends_on:
      - postgres

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS in production
- [ ] Configure CORS correctly
- [ ] Use environment variables for secrets
- [ ] Regularly update dependencies
- [ ] Add rate limiting
- [ ] Validate all input data
- [ ] Use prepared statements for SQL

## Monitoring

Recommended tools:
- **Backend**: PM2, New Relic, Sentry
- **Frontend**: Vercel Analytics, Google Analytics
- **Database**: pgAdmin, DataDog

## Backup Strategy

```bash
# Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20260426.sql
```
