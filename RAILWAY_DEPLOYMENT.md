# Railway Deployment Guide for PAFT Backend

## Prerequisites
1. Railway account (https://railway.app)
2. GitHub repository with your backend code

## Step 1: Create Railway Project
1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your backend repository

## Step 2: Add MySQL Database
1. In your Railway project, click "New Service"
2. Select "Database" → "MySQL"
3. Railway will create a MySQL instance and provide connection details

## Step 3: Configure Environment Variables
In Railway dashboard, go to your backend service → Variables tab and add:

```bash
# Required Variables
NODE_ENV=production

# Database (Railway will auto-populate these from MySQL service)
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USERNAME=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_DATABASE=${{MySQL.MYSQL_DATABASE}}

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=1d

# CORS (your frontend domain)
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

**⚠️ Important**: Make sure variable names match exactly:
- Use `DB_DATABASE` (not `DB_NAME`)
- Use single CORS_ORIGIN (not comma-separated)

## Step 4: Deploy
1. Railway will automatically deploy when you push to main branch
2. Check deployment logs in Railway dashboard
3. Your API will be available at: `https://your-service-name.railway.app/api`

## Step 5: Test Deployment
- Health check: `https://your-service-name.railway.app/api/health`
- Should return: `{"status":"ok","timestamp":"...","uptime":123,"environment":"production"}`

## Troubleshooting
1. **Build fails**: Check build logs in Railway dashboard
2. **Database connection**: Verify MySQL service is running and variables are set
3. **CORS errors**: Update CORS_ORIGIN with your frontend domain

### Common Database Errors:
- `ECONNREFUSED` → Database connection issue, check DB_HOST/PORT
- `ER_ACCESS_DENIED` → Wrong username/password, check DB_USERNAME/DB_PASSWORD  
- `Unknown database` → Wrong database name, check DB_DATABASE
- `Connection timeout` → Database starting up, wait 1-2 minutes

### Debug Steps:
1. Check Railway logs: `View Logs` in dashboard
2. Test health endpoint: `https://your-app.railway.app/api/health`
3. Verify all environment variables are set
4. Make sure MySQL service is running

## Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Configure proper CORS_ORIGIN
- [ ] Test health endpoint
- [ ] Monitor logs for errors