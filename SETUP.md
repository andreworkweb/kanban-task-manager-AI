# Smart Task & Productivity Platform

## Установка и запуск

### 1. Установка зависимостей

```bash
# Установка зависимостей для всего проекта
npm install

# Или отдельно для каждой части
cd server && npm install
cd ../client && npm install
```

### 2. Настройка базы данных

Создайте PostgreSQL базу данных и выполните SQL-скрипт:

```bash
psql -U your_user -d your_database -f server/database.sql
```

### 3. Настройка переменных окружения

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

### 4. Запуск проекта

```bash
# Запуск всего проекта (frontend + backend)
npm run dev

# Или отдельно:
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

Backend будет доступен на `http://localhost:5000`
Frontend будет доступен на `http://localhost:3000`

## Структура проекта

```
projultr/
├── client/              # Next.js frontend
│   ├── app/            # Next.js app router pages
│   ├── components/     # React компоненты
│   ├── lib/           # Утилиты, API, store
│   └── types/         # TypeScript типы
├── server/             # Express backend
│   ├── src/
│   │   ├── config/    # Конфигурация БД
│   │   ├── controllers/ # Контроллеры
│   │   ├── middleware/  # Middleware
│   │   ├── routes/      # API маршруты
│   │   └── types/       # TypeScript типы
│   └── database.sql    # SQL схема
└── package.json        # Root package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Tasks
- `GET /api/tasks` - Получить все задачи
- `POST /api/tasks` - Создать задачу
- `PUT /api/tasks/:id` - Обновить задачу
- `DELETE /api/tasks/:id` - Удалить задачу

### Projects
- `GET /api/projects` - Получить все проекты
- `POST /api/projects` - Создать проект
- `DELETE /api/projects/:id` - Удалить проект

### Analytics
- `GET /api/analytics` - Получить аналитику

## Возможности

- ✅ Авторизация с JWT
- ✅ CRUD операции для задач и проектов
- ✅ Kanban-доска (To Do, In Progress, Done)
- ✅ Приоритеты задач (Low, Medium, High)
- ✅ Дедлайны с предупреждениями
- ✅ Аналитика продуктивности
- ✅ Умные подсказки (просроченные задачи, много задач)
- ✅ Responsive дизайн

## Технологии

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

## Дальнейшее развитие

- [ ] Drag & drop для Kanban
- [ ] Графики аналитики (recharts)
- [ ] Уведомления в реальном времени
- [ ] Темная тема
- [ ] Экспорт данных
- [ ] Совместная работа (команды)
