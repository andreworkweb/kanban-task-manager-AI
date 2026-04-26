# Contributing Guide

## Development Workflow

1. **Fork и клонирование**
```bash
git clone https://github.com/yourusername/smart-task-platform.git
cd smart-task-platform
```

2. **Создание ветки**
```bash
git checkout -b feature/your-feature-name
```

3. **Разработка**
- Следуйте существующему стилю кода
- Пишите понятные commit messages
- Тестируйте изменения локально

4. **Commit и Push**
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

5. **Pull Request**
- Создайте PR с описанием изменений
- Дождитесь review

## Code Style

### TypeScript
- Используйте строгую типизацию
- Избегайте `any`
- Используйте интерфейсы для объектов

### React
- Функциональные компоненты с hooks
- Используйте `'use client'` для клиентских компонентов
- Разделяйте логику и UI

### Naming Conventions
- Components: PascalCase (TaskCard.tsx)
- Functions: camelCase (fetchTasks)
- Constants: UPPER_SNAKE_CASE (API_URL)
- Files: kebab-case или PascalCase

## Commit Messages

Используйте conventional commits:
- `feat:` - новая функция
- `fix:` - исправление бага
- `docs:` - документация
- `style:` - форматирование
- `refactor:` - рефакторинг
- `test:` - тесты
- `chore:` - обслуживание

Примеры:
```
feat: add task filtering by priority
fix: resolve authentication token expiry issue
docs: update API documentation
```

## Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## Feature Ideas

- [ ] Drag & drop для Kanban доски
- [ ] Темная тема
- [ ] Мобильное приложение (React Native)
- [ ] Интеграция с календарем
- [ ] Email уведомления
- [ ] Экспорт в PDF/CSV
- [ ] Командная работа
- [ ] Подзадачи
- [ ] Теги для задач
- [ ] Поиск и фильтрация
- [ ] Повторяющиеся задачи
- [ ] Таймер Pomodoro
- [ ] Интеграция с GitHub/Jira
