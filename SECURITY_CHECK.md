# 🔐 Security Checklist

## ✅ Что БЕЗОПАСНО загружать на GitHub

### Файлы в репозитории:
- ✅ **server/.env.example** - только примеры, без реальных данных
- ✅ **client/.env.example** - только примеры
- ✅ Весь исходный код (TypeScript, React)
- ✅ Документация (.md файлы)
- ✅ package.json файлы
- ✅ Конфигурационные файлы (tsconfig.json, etc.)

### Что содержат .env.example файлы:
```
DATABASE_URL=postgresql://user:password@localhost:5432/smart_tasks
JWT_SECRET=your-secret-key-change-in-production
```
- Это **placeholder** значения
- Не содержат реальных паролей
- Показывают только формат

## 🔒 Что ЗАЩИЩЕНО от загрузки

### .gitignore исключает:
- ❌ `.env` - реальные секреты
- ❌ `.env.local` - локальные настройки
- ❌ `.env.production` - production секреты
- ❌ `node_modules/` - зависимости
- ❌ `dist/` - скомпилированный код
- ❌ `*.log` - логи

### Найденные защищенные файлы:
- `client/.env.local` - НЕ будет загружен (в .gitignore)

## ⚠️ Важно перед загрузкой

### Проверьте что НЕТ:
- [ ] Реальных паролей от базы данных
- [ ] Реальных JWT секретов
- [ ] API ключей (AWS, Stripe, etc.)
- [ ] Приватных ключей (.pem, .key)
- [ ] Персональных данных
- [ ] Токенов доступа

### Команда для проверки:
```bash
# Проверить что будет загружено
git ls-files

# Проверить на секреты
git ls-files | xargs grep -i "password\|secret\|key" | grep -v "example\|placeholder"
```

## ✅ Финальная проверка

### Что в .env.example:
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/smart_tasks
JWT_SECRET=your-secret-key-change-in-production
```
- ✅ Все значения - примеры
- ✅ Нет реальных данных
- ✅ Безопасно для публикации

### Что в client/.env.example:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
- ✅ Только localhost URL
- ✅ Нет секретов
- ✅ Безопасно для публикации

## 🎯 Рекомендации

### После загрузки на GitHub:

1. **Для других разработчиков:**
   ```bash
   # Они должны создать свои .env файлы
   cp server/.env.example server/.env
   cp client/.env.example client/.env.local
   
   # И заполнить своими данными
   ```

2. **Для production:**
   - Используйте переменные окружения на хостинге
   - Heroku: `heroku config:set JWT_SECRET=...`
   - Vercel: добавьте в Environment Variables
   - Никогда не коммитьте production .env

3. **GitHub Secrets:**
   - Для CI/CD используйте GitHub Secrets
   - Settings → Secrets and variables → Actions

## 🚨 Что делать если случайно закоммитили секрет

### Если секрет попал в git:

1. **Немедленно смените секрет** (пароль, токен, ключ)

2. **Удалите из истории git:**
   ```bash
   # Удалить файл из истории
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch server/.env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Или используйте BFG Repo-Cleaner
   bfg --delete-files .env
   ```

3. **Force push (ОСТОРОЖНО!):**
   ```bash
   git push origin --force --all
   ```

4. **Сообщите команде** что секрет был скомпрометирован

## ✅ Итог

**Проект БЕЗОПАСЕН для загрузки на GitHub!**

- Все секреты защищены .gitignore
- .env.example содержит только примеры
- Нет реальных паролей или ключей
- Нет персональных данных

**Можно смело загружать! 🚀**
