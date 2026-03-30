# 🚀 MonsterASP.NET Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Build & Test Locally
- [x] `npm install` completed successfully
- [x] `npm run build` creates `dist/` folder
- [ ] `npm run start:prod` works locally
- [ ] Health endpoint `/api/health` returns JSON

### 2. Environment Variables Ready
- [ ] Database credentials from MonsterASP.NET control panel
- [ ] Strong JWT_SECRET generated (min 32 characters)
- [ ] Frontend domain URL for CORS_ORIGIN
- [ ] All variables copied to hosting environment

### 3. Files to Upload
- [ ] `dist/` folder (compiled app)
- [ ] `node_modules/` folder (dependencies)
- [ ] `package.json`
- [ ] `web.config`
- [ ] `uploads/` folder (if exists)

## 🔧 Deployment Steps

### Step 1: Prepare Files
```bash
# Build the application
npm run build

# Verify dist folder exists
ls dist/
```

### Step 2: Upload to MonsterASP.NET
1. Connect via FTP/File Manager
2. Upload all files to root directory
3. Ensure folder structure is maintained

### Step 3: Configure Environment
1. Go to MonsterASP.NET control panel
2. Find "Environment Variables" section
3. Add all variables from `.env.monsterasp`

### Step 4: Database Setup
1. Create MySQL database in control panel
2. Note: host, username, password, database name
3. Update environment variables with real values

## 🧪 Testing Deployment

### Essential Tests
1. **Root endpoint**: `https://yourdomain.com/`
   - Should show: "PAFT CMS API is running!"

2. **Health check**: `https://yourdomain.com/api/health`
   - Should return JSON with status "ok"

3. **API test**: `https://yourdomain.com/api/test`
   - Should return: `{"message": "Test endpoint working!"}`

### Database Connection Test
- Check logs for database connection errors
- Verify TypeORM entities are loaded
- Test a simple API endpoint that uses database

## 🐛 Common Issues & Solutions

### Issue: 404 Not Found
**Solution**: 
- Ensure `web.config` is in root directory
- Check IIS Node.js module is installed on server

### Issue: 500 Internal Server Error
**Solution**:
- Check application logs in hosting panel
- Verify all environment variables are set correctly
- Ensure `dist/main.js` exists and is executable

### Issue: Database Connection Failed
**Solution**:
- Double-check database credentials
- Verify MySQL service is running
- Check if database exists
- Test connection from hosting panel

### Issue: CORS Errors
**Solution**:
- Verify CORS_ORIGIN matches your frontend domain exactly
- Include protocol (https://) in the URL
- No trailing slash in the URL

## 📊 Monitoring

### What to Monitor
- Application uptime
- Database connection status
- API response times
- Error logs

### Log Locations
- Application logs: `logs/` folder
- IIS logs: Check hosting panel
- Node.js stdout: `logs/node-*.log`

## 🔐 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is active
- [ ] Input validation is working

## 📞 Support

If deployment fails:
1. Check this checklist again
2. Review error logs
3. Test locally first
4. Contact MonsterASP.NET support if server-related
5. Check NestJS documentation for framework issues