# 🚀 Next.js Deployment Script Guide

Automated deployment script for Next.js applications with error handling and colored output.

## 📋 Quick Start

```bash
cd /var/www/OS_project_nextJS
chmod +x deploy.sh
./deploy.sh
```

## 📂 Script Overview

The `deploy.sh` script automates the complete deployment pipeline:

1. **Git Pull** - Fetches latest changes from `main` branch
2. **Dependencies** - Installs/updates npm packages with `npm ci`
3. **Build** - Creates production build with `npm run build`
4. **Restart** - Reloads PM2 application process
5. **Verification** - Checks deployment status

## 🔧 Prerequisites

- Git repository with `main` branch
- Node.js and npm installed
- PM2 process manager
- Executable permissions on script

## 📍 Installation

### Method 1: Project Directory (Recommended)
```bash
# Navigate to your project
cd /var/www/OS_project_nextJS

# Create the script
nano deploy.sh

# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Method 2: Global Access
```bash
# Copy to system PATH
sudo cp deploy.sh /usr/local/bin/deploy-nextjs
sudo chmod +x /usr/local/bin/deploy-nextjs

# Run from anywhere
deploy-nextjs
```

### Method 3: Create Alias
```bash
# Add to ~/.bashrc
echo "alias deploy='cd /var/www/OS_project_nextJS && ./deploy.sh'" >> ~/.bashrc
source ~/.bashrc

# Use alias
deploy
```

## 🎨 Script Features

### ✅ Error Handling
- Exits on any command failure (`set -e`)
- Validates project directory (checks for `package.json`)
- Provides fallback PM2 restart if reload fails

### 🌈 Colored Output
- **Blue**: Status messages
- **Green**: Success messages  
- **Red**: Error messages
- **Yellow**: Warning messages

### 🔍 Validation Checks
- Confirms `package.json` exists
- Verifies git pull success
- Validates npm install completion
- Checks build success
- Confirms PM2 restart

## 📋 Script Breakdown

```bash
#!/bin/bash
set -e  # Exit on error

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Main deployment steps:
1. Validate environment
2. Git pull origin main
3. npm ci (clean install)
4. npm run build
5. pm2 reload nextjs-app
6. Display status
```

## 🔄 Customization Options

### Change Branch
```bash
# Modify this line in the script
git pull origin main
# To:
git pull origin develop
```

### Different PM2 App Name
```bash
# Change this line
pm2 reload nextjs-app
# To your app name:
pm2 reload your-app-name
```

### Add Pre/Post Hooks
```bash
# Add before deployment
echo "🔧 Running pre-deployment tasks..."
# Your custom commands here

# Add after deployment
echo "📧 Sending deployment notification..."
# Your notification logic here
```

## 🚨 Troubleshooting

### Common Issues

#### Script Not Executable
```bash
chmod +x deploy.sh
```

#### Wrong Directory
```bash
cd /var/www/OS_project_nextJS
pwd  # Verify location
```

#### Git Pull Fails
```bash
# Check git status
git status
git log --oneline -5

# Reset if needed
git reset --hard HEAD
git pull origin main
```

#### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### PM2 Not Found
```bash
# Install PM2
npm install -g pm2

# Check PM2 apps
pm2 list
```

## 📊 Usage Examples

### Basic Deployment
```bash
./deploy.sh
```

### Deployment with Logging
```bash
./deploy.sh 2>&1 | tee deployment.log
```

### Scheduled Deployment (Cron)
```bash
# Add to crontab
0 2 * * * cd /var/www/OS_project_nextJS && ./deploy.sh >> /var/log/deploy.log 2>&1
```

## 🔍 Output Examples

### Successful Deployment
```
🚀 Starting deployment...
📥 Pulling latest changes from main branch...
✅ Git pull successful
📦 Installing dependencies...
✅ Dependencies installed successfully
🔨 Building project...
✅ Build completed successfully
🔄 Restarting PM2 application...
✅ PM2 app restarted successfully
🎉 Deployment complete!
```

### Error Example
```
🚀 Starting deployment...
❌ Error: package.json not found. Make sure you're in the project root directory.
```

## 🛠️ Advanced Usage

### Multi-Environment Script
```bash
#!/bin/bash
ENVIRONMENT=${1:-production}

case $ENVIRONMENT in
  production)
    git pull origin main
    npm run build
    pm2 reload app-prod
    ;;
  staging)
    git pull origin develop
    npm run build:staging
    pm2 reload app-staging
    ;;
esac
```

### With Backup
```bash
# Add backup before deployment
echo "💾 Creating backup..."
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz .next
```

## 📝 Best Practices

1. **Always test** the script in a staging environment first
2. **Backup** before major deployments
3. **Monitor logs** during and after deployment
4. **Verify** application is running post-deployment
5. **Keep scripts** in version control
6. **Document** any customizations

## 🎯 Quick Commands Reference

```bash
# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh

# View script content
cat deploy.sh

# Edit script
nano deploy.sh

# Check PM2 status
pm2 status

# View build output
ls -la .next/

# Check app is running
curl http://192.168.210.138:3000
```

---

**Script Location**: `/var/www/OS_project_nextJS/deploy.sh`  
**Target Application**: Next.js with PM2  
**Server**: http://192.168.210.138