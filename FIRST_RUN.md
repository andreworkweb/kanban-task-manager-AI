# 🎉 Первый запуск - Пошаговая инструкция

## Шаг 1: Проверка требований

Убедитесь что установлено:
```bash
node --version    # должно быть 18+
npm --version     # должно быть 9+
psql --version    # PostgreSQL 12+
```

Если чего-то нет:
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

## Шаг 2: Создание базы данных

### Windows (PowerShell/CMD):
```bash
# Запустите PostgreSQL
# Обычно запускается автоматически после установки

# Создайте базу данных
createdb -U postgres smart_tasks

# Если нужен пароль, используйте:
# psql -U postgres
# CREATE DATABASE smart_tasks;
# \q
```

### Linux/Mac:
```bash
sudo -u postgres createdb smart_tasks
```

## Шаг 3: Инициализация таблиц

```bash
cd "A:\I WONNA\projultr"

# Запустите SQL скрипт
psql -U postgres -d smart_tasks -f server/database.sql

# Проверьте что таблицы созданы
psql -U postgres -d smart_tasks -c "\dt"
```

Вы должны увидеть 4 таблицы:
- users
- projects
- tasks
- activity_logs

## Шаг 4: Настройка Backend

```bash
cd server

# Создайте .env файл
copy .env.example .env    # Windows
# или
cp .env.example .env      # Linux/Mac

# Откройте .env и настройте:
```

**server/.env:**
```env
PORT=5000
NODE_ENV=development

# Замените на ваши данные PostgreSQL
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/smart_tasks

# Сгенерируйте случайный секрет (или используйте любую строку)
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=my_refresh_secret_key_67890
JWT_REFRESH_EXPIRES_IN=30d
```

**Как сгенерировать секрет:**
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32
```

## Шаг 5: Установка зависимостей Backend

```bash
# Находясь в папке server
npm install

# Дождитесь завершения установки
```

## Шаг 6: Настройка Frontend

```bash
cd ../client

# Создайте .env.local файл
copy .env.example .env.local    # Windows
# или
cp .env.example .env.local      # Linux/Mac
```

**client/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Шаг 7: Установка зависимостей Frontend

```bash
# Находясь в папке client
npm install

# Дождитесь завершения установки
```

## Шаг 8: Запуск проекта

### Вариант 1: Запуск всего проекта (рекомендуется)

```bash
# Вернитесь в корневую папку
cd ..

# Установите зависимости для root
npm install

# Запустите оба сервера одновременно
npm run dev
```

### Вариант 2: Запуск отдельно (два терминала)

**Терминал 1 - Backend:**
```bash
cd server
npm run dev
```

Вы должны увидеть:
```
🚀 Server running on port 5000
```

**Терминал 2 - Frontend:**
```bash
cd client
npm run dev
```

Вы должны увидеть:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

## Шаг 9: Проверка работы

### 1. Проверьте Backend
Откройте в браузере: http://localhost:5000/api/health

Должны увидеть:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Проверьте Frontend
Откройте в браузере: http://localhost:3000

Должна открыться страница авторизации.

## Шаг 10: Первое использование

1. **Регистрация**
   - Нажмите "Register"
   - Введите:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
   - Нажмите "Register"

2. **Вход в систему**
   - Вы автоматически войдете после регистрации
   - Откроется Dashboard

3. **Создайте первую задачу**
   - Перейдите в "Tasks"
   - Нажмите "+ New Task"
   - Заполните форму:
     - Title: Моя первая задача
     - Description: Тестовая задача
     - Status: To Do
     - Priority: High
     - Due Date: выберите завтрашнюю дату
   - Нажмите "Create"

4. **Создайте проект**
   - Перейдите в "Projects"
   - Нажмите "+ New Project"
   - Заполните:
     - Name: Тестовый проект
     - Description: Мой первый проект
     - Color: выберите любой цвет
   - Нажмите "Create"

5. **Проверьте аналитику**
   - Перейдите в "Analytics"
   - Посмотрите статистику по задачам

## 🐛 Возможные проблемы

### Backend не запускается

**Ошибка: "Cannot connect to database"**
```bash
# Проверьте что PostgreSQL запущен
pg_isready

# Проверьте DATABASE_URL в server/.env
# Убедитесь что пароль правильный
```

**Ошибка: "Port 5000 already in use"**
```bash
# Измените порт в server/.env
PORT=5001

# И в client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Frontend не подключается к Backend

**Ошибка: "Network Error"**
```bash
# Убедитесь что backend запущен
curl http://localhost:5000/api/health

# Проверьте NEXT_PUBLIC_API_URL в client/.env.local
```

### Ошибки при установке зависимостей

```bash
# Очистите кеш и переустановите
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📝 Полезные команды

```bash
# Остановить серверы
Ctrl + C (в терминале)

# Перезапустить backend
cd server
npm run dev

# Перезапустить frontend
cd client
npm run dev

# Просмотр логов PostgreSQL (Linux/Mac)
tail -f /var/log/postgresql/postgresql-*.log

# Backup базы данных
pg_dump -U postgres smart_tasks > backup.sql

# Restore базы данных
psql -U postgres smart_tasks < backup.sql
```

## ✅ Чеклист готовности

- [ ] PostgreSQL установлен и запущен
- [ ] База данных smart_tasks создана
- [ ] Таблицы созданы (users, tasks, projects, activity_logs)
- [ ] Backend .env настроен
- [ ] Frontend .env.local настроен
- [ ] Backend запущен на порту 5000
- [ ] Frontend запущен на порту 3000
- [ ] http://localhost:5000/api/health возвращает OK
- [ ] http://localhost:3000 открывает страницу авторизации
- [ ] Регистрация работает
- [ ] Можно создать задачу
- [ ] Можно создать проект

## 🎉 Готово!

Если все пункты чеклиста выполнены - проект работает!

**Следующие шаги:**
- Изучите [ARCHITECTURE.md](ARCHITECTURE.md) для понимания структуры
- Посмотрите [API_EXAMPLES.md](API_EXAMPLES.md) для работы с API
- Прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) если хотите что-то добавить

**Нужна помощь?**
- Проверьте [QUICKSTART.md](QUICKSTART.md)
- Посмотрите troubleshooting секцию
- Создайте issue в репозитории
