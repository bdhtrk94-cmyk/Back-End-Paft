# MonsterASP.NET Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Build the Application
```bash
npm install
npm run build
```

### 2. Upload Files to MonsterASP.NET
Upload these files/folders to your hosting root:
- `dist/` folder (compiled TypeScript)
- `node_modules/` folder
- `package.json`
- `web.config`
- `uploads/` folder (if exists)

### 3. Configure Environment Variables
In your MonsterASP.NET control panel, set these environment variables:

```
NODE_ENV=production
DB_HOST=your_mysql_host_from_monsterasp
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database_name
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=1d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### 4. Database Setup
- Create MySQL database in MonsterASP.NET control panel
- Note down: host, username, password, database name
- Update environment variables with these details

### 5. Test Deployment
Visit these URLs to verify:
- `https://yourdomain.com/` - Should show "PAFT CMS API is running!"
- `https://yourdomain.com/api/health` - Should return JSON health status

## 🔧 Configuration Details

### web.config
- Configured for IIS with Node.js
- Handles static files and API routing
- Sets PORT from HTTP_PLATFORM_PORT

### Database Connection
- Uses MySQL with connection pooling
- SSL enabled for production
- Retry logic for connection issues
- Synchronize disabled in production

### Security Features
- Helmet for HTTP headers
- CORS configured for your frontend
- Rate limiting (100 requests/minute)
- JWT authentication
- Input validation

## 🐛 Troubleshooting

### Common Issues:
1. **Database Connection Failed**
   - Check DB credentials in environment variables
   - Verify MySQL service is running
   - Check firewall/network access

2. **404 Not Found**
   - Ensure `web.config` is in root directory
   - Check IIS Node.js module is installed
   - Verify `dist/main.js` exists

3. **500 Internal Server Error**
   - Check application logs in hosting panel
   - Verify all environment variables are set
   - Ensure `node_modules` are uploaded

### Health Check
Always test: `https://yourdomain.com/api/health`
Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "production",
  "message": "PAFT Backend is healthy!"
}
```

## 📁 File Structure on Server
```
/
├── dist/           # Compiled application
├── node_modules/   # Dependencies
├── uploads/        # Static files
├── logs/          # Application logs
├── package.json   # Package info
└── web.config     # IIS configuration
```

## 🔐 Security Notes
- Change JWT_SECRET to a strong random value
- Use HTTPS for production
- Keep environment variables secure
- Regular security updates