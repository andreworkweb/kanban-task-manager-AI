# 🚀 Smart Task & Productivity Platform

Полноценная система управления задачами с аналитикой продуктивности, JWT авторизацией и REST API.

![Status](https://img.shields.io/badge/status-ready-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Node.js](https://img.shields.io/badge/Node.js-20-green)

## ✨ Возможности

- ✅ **Управление задачами** - создание, редактирование, удаление
- ✅ **Kanban-доска** - визуализация задач (To Do, In Progress, Done)
- ✅ **Проекты** - группировка задач по проектам
- ✅ **Приоритеты** - Low, Medium, High
- ✅ **Дедлайны** - отслеживание сроков с предупреждениями
- ✅ **Аналитика** - графики продуктивности и статистика
- ✅ **Умные подсказки** - предупреждения о перегрузке и дедлайнах
- ✅ **JWT авторизация** - безопасная аутентификация
- ✅ **Responsive дизайн** - работает на всех устройствах

## 🛠 Стек технологий

### Frontend
- **Next.js 15** - React framework с SSR
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Zustand** - state management
- **Axios** - HTTP клиент

### Backend
- **Node.js + Express** - REST API
- **TypeScript** - типизация
- **PostgreSQL** - база данных
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- PostgreSQL 12+
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
```bash
git clone <your-repo-url>
cd projultr
```

2. **Настройте базу данных**
```bash
createdb smart_tasks
psql -d smart_tasks -f server/database.sql
```

3. **Настройте переменные окружения**
```bash
# Backend
cp server/.env.example server/.env
# Отредактируйте server/.env

# Frontend
cp client/.env.example client/.env.local
```

4. **Установите зависимости и запустите**
```bash
npm install
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

📖 **Подробная инструкция:** [QUICKSTART.md](QUICKSTART.md)

## 📚 Документация

- [QUICKSTART.md](QUICKSTART.md) - Быстрый старт и чеклист
- [SETUP.md](SETUP.md) - Детальная установка
- [ARCHITECTURE.md](ARCHITECTURE.md) - Архитектура проекта
- [API_EXAMPLES.md](API_EXAMPLES.md) - Примеры API запросов
- [DEPLOYMENT.md](DEPLOYMENT.md) - Деплой в production
- [CONTRIBUTING.md](CONTRIBUTING.md) - Гайд для контрибьюторов

## 📁 Структура проекта

```
projultr/
├── client/              # Next.js Frontend
│   ├── app/            # Pages (App Router)
│   ├── components/     # React компоненты
│   ├── lib/           # API, store, utils
│   └── types/         # TypeScript типы
├── server/             # Express Backend
│   ├── src/
│   │   ├── controllers/  # Бизнес-логика
│   │   ├── routes/       # API маршруты
│   │   ├── middleware/   # JWT auth
│   │   └── config/       # Database config
│   └── database.sql    # SQL схема
└── docs/              # Документация
```

## 🎯 API Endpoints

### Auth
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Tasks (Protected)
- `GET /api/tasks` - Все задачи
- `POST /api/tasks` - Создать задачу
- `PUT /api/tasks/:id` - Обновить
- `DELETE /api/tasks/:id` - Удалить

### Projects (Protected)
- `GET /api/projects` - Все проекты
- `POST /api/projects` - Создать проект
- `DELETE /api/projects/:id` - Удалить

### Analytics (Protected)
- `GET /api/analytics` - Статистика

## 🎨 Скриншоты

### Dashboard
Обзор задач, статистика, предупреждения о дедлайнах

### Tasks (Kanban)
Kanban-доска с тремя колонками: To Do, In Progress, Done

### Analytics
Графики продуктивности, распределение по приоритетам и статусам

## 🔐 Безопасность

- Пароли хешируются с bcryptjs
- JWT токены с 7-дневным сроком действия
- Protected routes с middleware
- SQL injection защита через prepared statements
- CORS настроен

## 🚀 Деплой

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

Подробнее: [DEPLOYMENT.md](DEPLOYMENT.md)

## 🤝 Contributing

Contributions приветствуются! Прочитайте [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 License

MIT License

## 👨‍💻 Автор

Создано для демонстрации fullstack разработки с современным стеком технологий.

---

⭐ Если проект понравился - поставьте звезду!
