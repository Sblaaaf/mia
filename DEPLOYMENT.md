# Deployment Guide for Hostinger

This guide will help you deploy the Mia RAKU pottery website to Hostinger hosting.

## Prerequisites

- Hostinger account with Node.js hosting support
- MongoDB database (MongoDB Atlas recommended)
- Domain configured on Hostinger

## Step 1: Prepare Your MongoDB Database

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or allow access from anywhere for easier setup)
5. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

## Step 2: Build the Application

On your local machine:

```bash
# Install dependencies
npm install

# Create production build
npm run build
```

This will create a `.next` folder with the production build.

## Step 3: Upload Files to Hostinger

Upload the following files and folders to your Hostinger hosting via FTP or File Manager:

```
- .next/               (entire folder)
- public/              (entire folder)
- node_modules/        (entire folder - or run npm install on server)
- app/                 (entire folder)
- components/          (entire folder)
- lib/                 (entire folder)
- types/               (entire folder)
- package.json
- package-lock.json
- next.config.js
- tsconfig.json
- .env                 (create this with your production values)
```

## Step 4: Configure Environment Variables

Create a `.env` file on your Hostinger hosting with the following content:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-secure-random-secret-key-at-least-32-characters
NODE_ENV=production
```

Replace the values with your actual credentials.

## Step 5: Install Dependencies on Hostinger

If you didn't upload `node_modules`, SSH into your Hostinger server and run:

```bash
cd /path/to/your/app
npm install --production
```

## Step 6: Configure Node.js Application in Hostinger

1. Log into Hostinger control panel (hPanel)
2. Go to Advanced > Node.js
3. Create a new application with these settings:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: (path to your uploaded files)
   - Application URL: your domain
   - Application startup file: `node_modules/next/dist/bin/next`
   - Application startup command: `start`

## Step 7: Set Up Process Manager (PM2)

For better process management, use PM2:

1. SSH into your server
2. Install PM2 globally:
```bash
npm install -g pm2
```

3. Create a `ecosystem.config.js` file:
```javascript
module.exports = {
  apps: [{
    name: 'mia-raku',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/path/to/your/app',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

4. Start the application:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 8: Configure Reverse Proxy (Optional)

If needed, configure Nginx or Apache to proxy requests to your Node.js app:

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Step 9: Set Up SSL Certificate

1. In Hostinger hPanel, go to Security > SSL
2. Install a free Let's Encrypt SSL certificate for your domain
3. Enable "Force HTTPS" to redirect all HTTP traffic to HTTPS

## Step 10: Test Your Deployment

1. Visit your domain in a web browser
2. Test all pages: Home, About, Contact, Admin
3. Try logging into the admin panel with your credentials
4. Verify MongoDB connection is working

## Troubleshooting

### Issue: Application won't start
- Check Node.js version (must be 18+)
- Verify all files were uploaded
- Check `.env` file has correct values
- Review error logs in Hostinger control panel

### Issue: Database connection fails
- Verify MongoDB connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is allowed

### Issue: Images not loading
- Check `public` folder was uploaded
- Verify file permissions are correct
- Check Next.js image optimization settings

### Issue: 404 errors on routes
- Ensure `.next` folder was uploaded completely
- Check application startup command is correct
- Restart the Node.js application

## Maintenance

### Updating the Application
1. Build locally: `npm run build`
2. Upload new `.next` folder
3. Restart the application via PM2 or Hostinger panel

### Backups
- Set up automatic database backups in MongoDB Atlas
- Backup your `.env` file securely
- Keep a copy of uploaded image files

### Monitoring
- Use PM2 monitoring: `pm2 monit`
- Check application logs: `pm2 logs mia-raku`
- Monitor database usage in MongoDB Atlas dashboard

## Security Recommendations

1. Change default admin credentials immediately
2. Use strong, unique JWT_SECRET
3. Keep dependencies updated: `npm audit fix`
4. Enable Hostinger's security features (firewall, etc.)
5. Regular database backups
6. Monitor for suspicious activity in logs

## Support

For deployment issues:
- Hostinger Support: https://www.hostinger.com/support
- MongoDB Atlas Support: https://www.mongodb.com/support

For application issues:
- Check the README.md file
- Review Next.js documentation: https://nextjs.org/docs
