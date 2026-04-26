# 🔐 Security Checklist

## ✅ What is SAFE to upload to GitHub

### Files in repository:
- ✅ **server/.env.example** - only examples, no real data
- ✅ **client/.env.example** - only examples
- ✅ All source code (TypeScript, React)
- ✅ Documentation (.md files)
- ✅ package.json files
- ✅ Configuration files (tsconfig.json, etc.)

### What .env.example files contain:
```
DATABASE_URL=postgresql://user:password@localhost:5432/smart_tasks
JWT_SECRET=your-secret-key-change-in-production
```
- These are **placeholder** values
- Do not contain real passwords
- Show only the format

## 🔒 What is PROTECTED from upload

### .gitignore excludes:
- ❌ `.env` - real secrets
- ❌ `.env.local` - local settings
- ❌ `.env.production` - production secrets
- ❌ `node_modules/` - dependencies
- ❌ `dist/` - compiled code
- ❌ `*.log` - logs

### Found protected files:
- `client/.env.local` - will NOT be uploaded (in .gitignore)

## ⚠️ Important before uploading

### Check that there are NO:
- [ ] Real database passwords
- [ ] Real JWT secrets
- [ ] API keys (AWS, Stripe, etc.)
- [ ] Private keys (.pem, .key)
- [ ] Personal data
- [ ] Access tokens

### Command to check:
```bash
# Check what will be uploaded
git ls-files

# Check for secrets
git ls-files | xargs grep -i "password\|secret\|key" | grep -v "example\|placeholder"
```

## ✅ Final check

### What's in .env.example:
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/smart_tasks
JWT_SECRET=your-secret-key-change-in-production
```
- ✅ All values are examples
- ✅ No real data
- ✅ Safe for publication

### What's in client/.env.example:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
- ✅ Only localhost URL
- ✅ No secrets
- ✅ Safe for publication

## 🎯 Recommendations

### After uploading to GitHub:

1. **For other developers:**
   ```bash
   # They should create their own .env files
   cp server/.env.example server/.env
   cp client/.env.example client/.env.local
   
   # And fill with their own data
   ```

2. **For production:**
   - Use environment variables on hosting
   - Heroku: `heroku config:set JWT_SECRET=...`
   - Vercel: add to Environment Variables
   - Never commit production .env

3. **GitHub Secrets:**
   - For CI/CD use GitHub Secrets
   - Settings → Secrets and variables → Actions

## 🚨 What to do if you accidentally committed a secret

### If a secret got into git:

1. **Immediately change the secret** (password, token, key)

2. **Remove from git history:**
   ```bash
   # Remove file from history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch server/.env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Or use BFG Repo-Cleaner
   bfg --delete-files .env
   ```

3. **Force push (CAREFUL!):**
   ```bash
   git push origin --force --all
   ```

4. **Notify the team** that the secret was compromised

## ✅ Summary

**Project is SAFE to upload to GitHub!**

- All secrets protected by .gitignore
- .env.example contains only examples
- No real passwords or keys
- No personal data

**Safe to upload! 🚀**
