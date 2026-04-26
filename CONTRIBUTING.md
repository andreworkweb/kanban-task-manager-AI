# Contributing Guide

## Development Workflow

1. **Fork and Clone**
```bash
git clone https://github.com/yourusername/smart-task-platform.git
cd smart-task-platform
```

2. **Create Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Development**
- Follow existing code style
- Write clear commit messages
- Test changes locally

4. **Commit and Push**
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

5. **Pull Request**
- Create PR with description of changes
- Wait for review

## Code Style

### TypeScript
- Use strict typing
- Avoid `any`
- Use interfaces for objects

### React
- Functional components with hooks
- Use `'use client'` for client components
- Separate logic and UI

### Naming Conventions
- Components: PascalCase (TaskCard.tsx)
- Functions: camelCase (fetchTasks)
- Constants: UPPER_SNAKE_CASE (API_URL)
- Files: kebab-case or PascalCase

## Commit Messages

Use conventional commits:
- `feat:` - new feature
- `fix:` - bug fix
- `docs:` - documentation
- `style:` - formatting
- `refactor:` - refactoring
- `test:` - tests
- `chore:` - maintenance

Examples:
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

- [ ] Drag & drop for Kanban board
- [ ] Dark theme
- [ ] Mobile app (React Native)
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Export to PDF/CSV
- [ ] Team collaboration
- [ ] Subtasks
- [ ] Task tags
- [ ] Search and filtering
- [ ] Recurring tasks
- [ ] Pomodoro timer
- [ ] GitHub/Jira integration
