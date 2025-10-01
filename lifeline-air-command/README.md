# 🚁 Life-Line Air Command

A comprehensive Medical Drone Fleet Management System with real-time monitoring, authentication, and mission control capabilities.

## 🌟 Features

- **Secure Authentication System** with role-based access
- **Real-time Performance Metrics** dashboard
- **Mission Management** interface
- **Drone Fleet Monitoring** with live status updates
- **Emergency Response** system
- **Responsive Design** for all devices
- **Debug Console** for system monitoring

## 🔐 Test Credentials

| Role | Username | Password | Access Code |
|------|----------|----------|-------------|
| **Medical Officer** | `admin` | `admin123` | `MEDICAL2025` |
| **Fleet Operator** | `operator` | `operator123` | `FLEET2025` |
| **Maintenance Tech** | `technician` | `tech123` | `MAINT2025` |
| **Fleet Commander** | `commander` | `commander123` | `COMMAND2025` |

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd lifeline-air-command
   vercel
   ```

3. **Production Deploy:**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Drag and drop** the entire folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Or connect** your GitHub repository to Netlify

### Option 3: GitHub Pages

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages** in repository settings

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```

3. **Deploy:**
   ```bash
   firebase deploy
   ```

## 🛠️ Local Development

```bash
# Start local server
python3 -m http.server 8080

# Or use Node.js
npx serve .

# Access at http://localhost:8080
```

## 📁 Project Structure

```
lifeline-air-command/
├── index.html          # Main application
├── app.js             # Core JavaScript logic
├── style.css          # Styling and themes
├── debug.html         # Debug console
├── login-test.html    # Login testing page
├── quick-test.html    # Quick authentication test
├── working-login.html  # Production login page
├── vercel.json        # Vercel configuration
├── package.json       # Project metadata
└── README.md         # This file
```

## 🔧 Configuration

### Environment Variables (Optional)

For production deployment, you may want to set:

- `GOOGLE_MAPS_API_KEY` - For map functionality
- `ANALYTICS_ID` - For usage tracking

### Security Notes

- All authentication is client-side (demo purposes)
- For production, implement proper backend authentication
- Consider adding HTTPS enforcement
- Implement proper session management

## 🌐 Live Demo

Once deployed, your application will be available at:
- **Vercel**: `https://your-project.vercel.app`
- **Netlify**: `https://your-project.netlify.app`
- **GitHub Pages**: `https://username.github.io/repository-name`

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the debug console at `/debug.html`
- Review browser console for errors
- Test with different browsers
- Verify network connectivity

---

**Life-Line Air Command** - Advanced Medical Drone Fleet Management System
