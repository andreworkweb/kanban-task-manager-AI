# Quick Start Checklist

## ✅ Перед запуском

### 1. Установка PostgreSQL
- [ ] Установите PostgreSQL (версия 12+)
- [ ] Создайте базу данных: `createdb smart_tasks`
- [ ] Запустите SQL скрипт: `psql -d smart_tasks -f server/database.sql`

### 2. Настройка Backend
```bash
cd server
cp .env.example .env
# Отредактируйте .env файл с вашими настройками
npm install
```

### 3. Настройка Frontend
```bash
cd client
cp .env.example .env.local
# Убедитесь что NEXT_PUBLIC_API_URL указывает на backend
npm install
```

### 4. Запуск проекта
```bash
# Из корневой папки
npm install
npm run dev
```

Или отдельно:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🎯 Проверка работоспособности

### Backend (http://localhost:5000)
- [ ] Откройте http://localhost:5000/api/health
- [ ] Должны увидеть: `{"status":"ok","message":"Server is running"}`

### Frontend (http://localhost:3000)
- [ ] Откройте http://localhost:3000
- [ ] Должна открыться страница авторизации
- [ ] Зарегистрируйте нового пользователя
- [ ] Войдите в систему
- [ ] Проверьте все страницы: Dashboard, Tasks, Projects, Analytics

## 🧪 Тестовый сценарий

1. **Регистрация**
   - [ ] Зарегистрируйте пользователя
   - [ ] Проверьте что токен сохранился

2. **Создание проекта**
   - [ ] Перейдите в Projects
   - [ ] Создайте проект "Test Project"
   - [ ] Выберите цвет

3. **Создание задач**
   - [ ] Перейдите в Tasks
   - [ ] Создайте задачу "High Priority Task" (priority: high, status: todo)
   - [ ] Создайте задачу "In Progress Task" (status: in_progress)
   - [ ] Создайте задачу "Completed Task" (status: done)
   - [ ] Добавьте дедлайны

4. **Проверка Dashboard**
   - [ ] Перейдите в Dashboard
   - [ ] Проверьте статистику (Total, To Do, In Progress, Done)
   - [ ] Проверьте предупреждения о дедлайнах

5. **Проверка Analytics**
   - [ ] Перейдите в Analytics
   - [ ] Проверьте графики по статусам
   - [ ] Проверьте графики по приоритетам
   - [ ] Проверьте умные подсказки

6. **Редактирование задач**
   - [ ] Измените статус задачи
   - [ ] Измените приоритет
   - [ ] Обновите дедлайн

7. **Удаление**
   - [ ] Удалите задачу
   - [ ] Удалите проект

## 🐛 Troubleshooting

### Backend не запускается
```bash
# Проверьте что PostgreSQL запущен
pg_isready

# Проверьте подключение к БД
psql -d smart_tasks -c "SELECT 1"

# Проверьте переменные окружения
cat server/.env
```

### Frontend не подключается к Backend
```bash
# Проверьте что backend запущен
curl http://localhost:5000/api/health

# Проверьте переменные окружения
cat client/.env.local

# Проверьте CORS настройки в server/src/index.ts
```

### Ошибки TypeScript
```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install

# Проверьте версии
node --version  # должна быть 18+
npm --version
```

### База данных
```bash
# Пересоздайте таблицы
psql -d smart_tasks -f server/database.sql

# Проверьте таблицы
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

## 🚀 Следующие шаги

После успешного запуска:
- [ ] Прочитайте ARCHITECTURE.md для понимания структуры
- [ ] Изучите API_EXAMPLES.md для работы с API
- [ ] Посмотрите CONTRIBUTING.md если хотите внести изменения
- [ ] Прочитайте DEPLOYMENT.md для деплоя в production

## 📝 Полезные команды

```bash
# Просмотр логов PostgreSQL
tail -f /var/log/postgresql/postgresql-*.log

# Backup базы данных
pg_dump smart_tasks > backup.sql

# Restore базы данных
psql smart_tasks < backup.sql

# Проверка портов
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # PostgreSQL
```

## 🎉 Готово!

Если все чеклисты пройдены - проект готов к использованию!

Для вопросов и багов создавайте issues в репозитории.
