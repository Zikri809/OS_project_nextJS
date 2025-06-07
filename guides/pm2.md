# ⚙️ PM2 & Environment Variables Guide

Complete guide for managing PM2 processes and environment variables for Next.js applications.

## 📋 Quick Reference

```bash
# Reload with environment updates
pm2 reload OS_project_nextJS --update-env

# Check status
pm2 status

# View logs
pm2 logs OS_project_nextJS

# Monitor resources
pm2 monit
```

## 🏗️ PM2 Setup

### Initial Setup
```bash
# Install PM2 globally
npm install -g pm2

# Start your app
pm2 start npm --name "OS_project_nextJS" -- start

# Save PM2 configuration
pm2 save

# Setup auto-startup
pm2 startup
# Follow the command it provides
```

### Current Configuration
- **App Name**: `OS_project_nextJS`
- **Process ID**: `0`
- **Script**: `npm start`
- **Working Directory**: `/var/www/OS_project_nextJS`
- **Port**: `3000`

## 📄 Ecosystem Configuration

Create `ecosystem.config.js` in your project root:

```javascript
module.exports = {
  apps: [{
    name: 'OS_project_nextJS',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/OS_project_nextJS',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    // Production environment
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_API_URL: 'https://api.production.com',
      DATABASE_URL: 'postgresql://prod_user:pass@localhost:5432/prod_db'
    },
    
    // Development environment
    env_development: {
      NODE_ENV: 'development',
      PORT: 3001,
      NEXT_PUBLIC_API_URL: 'https://api.dev.com',
      DATABASE_URL: 'postgresql://dev_user:pass@localhost:5432/dev_db'
    },
    
    // Staging environment
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 3002,
      NEXT_PUBLIC_API_URL: 'https://api.staging.com',
      DATABASE_URL: 'postgresql://staging_user:pass@localhost:5432/staging_db'
    }
  }]
};
```

### Using Ecosystem File
```bash
# Start with ecosystem file
pm2 start ecosystem.config.js

# Start specific environment
pm2 start ecosystem.config.js --env development
pm2 start ecosystem.config.js --env staging
pm2 start ecosystem.config.js --env production
```

## 🌍 Environment Variables Management

### Method 1: .env Files

#### .env.local (Next.js)
```bash
# Create environment file
nano /var/www/OS_project_nextJS/.env.local
```

```env
# Public variables (accessible in browser)
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_SITE_URL=https://yourapp.com

# Private variables (server-side only)
DATABASE_URL=postgresql://user:password@localhost:5432/database
SECRET_KEY=your-super-secret-key
JWT_SECRET=your-jwt-secret
API_KEY=your-api-key

# External services
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG.xxx
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### .env.production
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=postgresql://prod:pass@prod-db:5432/app
```

### Method 2: PM2 Environment Variables

#### Set Individual Variables
```bash
# Set environment variables
pm2 set OS_project_nextJS:NODE_ENV production
pm2 set OS_project_nextJS:PORT 3000
pm2 set OS_project_nextJS:API_URL https://api.yourapp.com
pm2 set OS_project_nextJS:DATABASE_URL postgresql://user:pass@localhost:5432/db

# View current environment
pm2 env 0  # where 0 is your app ID
```

#### Bulk Set Variables
```bash
# Create env file for PM2
cat > pm2.env << 'EOF'
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.yourapp.com
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SECRET_KEY=your-secret-key
EOF

# Load environment file
pm2 restart OS_project_nextJS --env pm2.env
```

### Method 3: System Environment Variables

#### Global Environment (/etc/environment)
```bash
sudo nano /etc/environment
```

Add:
```
NODE_ENV=production
PORT=3000
API_URL=https://api.yourapp.com
```

#### User Environment (~/.bashrc)
```bash
nano ~/.bashrc
```

Add:
```bash
export NODE_ENV=production
export PORT=3000
export API_URL=https://api.yourapp.com
```

```bash
source ~/.bashrc
```

## 🔄 Reloading with Environment Updates

### Basic Reload with Environment
```bash
# Reload with environment variable updates
pm2 reload OS_project_nextJS --update-env
```

### Restart with Environment
```bash
# Full restart with environment updates
pm2 restart OS_project_nextJS --update-env
```

### Reload All Apps
```bash
# Reload all PM2 apps with environment updates
pm2 reload all --update-env
```

## 📊 PM2 Commands Reference

### Process Management
```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop OS_project_nextJS

# Restart application
pm2 restart OS_project_nextJS

# Reload application (zero-downtime)
pm2 reload OS_project_nextJS

# Delete application
pm2 delete OS_project_nextJS

# List all processes
pm2 list
pm2 status
```

### Monitoring & Logs
```bash
# View logs
pm2 logs OS_project_nextJS

# Follow logs in real-time
pm2 logs OS_project_nextJS -f

# View last 100 lines
pm2 logs OS_project_nextJS --lines 100

# Clear logs
pm2 flush OS_project_nextJS

# Monitor CPU/Memory usage
pm2 monit

# Detailed process info
pm2 describe OS_project_nextJS
```

### Configuration Management
```bash
# Save current PM2 configuration
pm2 save

# Dump configuration to file
pm2 dump

# Restore from dump
pm2 resurrect

# Reset PM2
pm2 kill
pm2 resurrect
```

## 🔧 Advanced PM2 Configuration

### Cluster Mode (Load Balancing)
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'OS_project_nextJS',
    script: 'npm',
    args: 'start',
    instances: 'max', // or specific number like 4
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### Memory & CPU Limits
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'OS_project_nextJS',
    script: 'npm',
    args: 'start',
    max_memory_restart: '500M',
    min_uptime: '10s',
    max_restarts: 5,
    kill_timeout: 5000,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

### Auto-restart on File Changes (Development)
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'OS_project_nextJS',
    script: 'npm',
    args: 'start',
    watch: true,
    watch_delay: 1000,
    ignore_watch: [
      "node_modules",
      ".git",
      ".next",
      "logs"
    ],
    env: {
      NODE_ENV: 'development'
    }
  }]
};
```

## 🚨 Troubleshooting

### Common Issues

#### PM2 Process Not Starting
```bash
# Check PM2 logs
pm2 logs OS_project_nextJS

# Check if port is in use
sudo netstat -tulpn | grep :3000

# Kill process using port
sudo kill -9 <PID>
```

#### Environment Variables Not Loading
```bash
# Check current environment
pm2 env 0

# Restart with environment update
pm2 restart OS_project_nextJS --update-env

# Verify .env file exists and has correct permissions
ls -la .env.local
```

#### High Memory Usage
```bash
# Monitor memory usage
pm2 monit

# Set memory limit in ecosystem.config.js
max_memory_restart: '500M'

# Restart to apply changes
pm2 restart OS_project_nextJS
```

#### Application Crashes
```bash
# Check error logs
pm2 logs OS_project_nextJS --err

# Check process description
pm2 describe OS_project_nextJS

# Increase restart attempts
pm2 set OS_project_nextJS:max_restarts 10
```

## 📋 Environment Variables Checklist

### Next.js Specific Variables
- [ ] `NODE_ENV` (production/development/staging)
- [ ] `PORT` (application port)
- [ ] `NEXT_PUBLIC_*` (client-side variables)

### Database Variables
- [ ] `DATABASE_URL`
- [ ] `DB_HOST`
- [ ] `DB_PORT`
- [ ] `DB_NAME`
- [ ] `DB_USER`
- [ ] `DB_PASSWORD`

### Authentication Variables
- [ ] `JWT_SECRET`
- [ ] `SESSION_SECRET`
- [ ] `AUTH_SECRET`

### External Services
- [ ] `STRIPE_SECRET_KEY`
- [ ] `SENDGRID_API_KEY`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`

## 🎯 Best Practices

### Security
1. **Never commit** `.env` files to version control
2. **Use different** secrets for each environment
3. **Rotate secrets** regularly
4. **Limit access** to environment variables

### Performance
1. **Use cluster mode** for production
2. **Set memory limits** to prevent crashes
3. **Monitor resource usage** regularly
4. **Use zero-downtime** reloads

### Maintenance
1. **Backup configurations** before changes
2. **Test environment changes** in staging first
3. **Monitor logs** after environment updates
4. **Document** all environment variables

## 🔍 Quick Diagnostic Commands

```bash
# Full health check
pm2 status && pm2 monit

# Check environment
pm2 env 0

# Test application
curl http://192.168.210.138:3000

# Check logs for errors
pm2 logs OS_project_nextJS --err --lines 50

# Verify Next.js environment
node -e "console.log(process.env.NODE_ENV)"
```

---

**Application**: Next.js with PM2  
**Server**: http://192.168.210.138:3000  
**PM2 App Name**: OS_project_nextJS  
**Project Path**: /var/www/OS_project_nextJS