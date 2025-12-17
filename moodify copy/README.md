# Moodify - AI-Powered Emotional Intelligence Platform

A comprehensive React-based application that combines real-time emotion detection, biometric analytics, AI-powered content generation, and academic integration to create an intelligent emotional well-being ecosystem for students and professionals.

## 🚀 Core Features

### 🧠 AI-Powered Modules
- **Real-Time Emotion Dashboard** - Live emotion detection using camera integration with biometric analytics
- **Academic Integration & Code Emotion Analysis** - Emotion-aware coding environment with study session tracking
- **AI-Powered Study Assistant** - Personalized learning with adaptive algorithms and concept explanation
- **AI-Powered Content Generation Hub** - Dynamic content creation based on emotional state and preferences
- **Biometric Analytics & Health Monitoring** - Comprehensive health tracking with predictive insights
- **Social Mood Synchronization & Campus Insights** - Community mood mapping and peer support networks
- **Privacy Controls & Data Management** - Advanced privacy settings with explainable AI and data encryption
- **Code Editor** - Emotion-aware development environment with real-time analysis

### 🎯 Advanced Capabilities
- **Voice Control System** - Natural language voice commands across all modules
- **Camera Integration** - Real-time emotion detection with facial recognition
- **Biometric Monitoring** - Heart rate, stress levels, and wellness scoring
- **Data Visualization** - Interactive charts and graphs using D3.js and Recharts
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Real-time Synchronization** - Live updates across all connected devices
- **Privacy-First Architecture** - End-to-end encryption and user data control

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with concurrent features and improved rendering
- **Vite** - Lightning-fast build tool and development server
- **React Router v6** - Declarative routing for single-page applications

### State Management & Data
- **Redux Toolkit** - Simplified Redux setup for state management
- **Axios** - HTTP client for API communications
- **React Hook Form** - Efficient form handling and validation

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Radix UI** - Accessible component primitives

### Data Visualization
- **D3.js** - Powerful data visualization library
- **Recharts** - Composable charting library built on React and D3
- **Date-fns** - Modern JavaScript date utility library

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing with autoprefixer
- **Jest & React Testing Library** - Testing framework setup

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Modern web browser with camera support (for emotion detection)
- HTTPS environment (required for camera access in production)

## 🛠️ Installation & Setup

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanyaprajapati155-collab/moodify.git
   cd moodify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application:**
   - Open your browser to `http://localhost:5173`
   - The application will automatically open in your default browser

### Development Environment Setup

#### For Camera Features (Emotion Detection)
- **Local Development:** Use `http://localhost:5173` (camera works on localhost)
- **Production:** Ensure HTTPS is enabled for camera access
- **Browser Permissions:** Grant camera and microphone permissions when prompted

#### Environment Variables
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_BASE_URL=https://api.moodify.com
VITE_WS_URL=wss://ws.moodify.com

# Feature Flags
VITE_ENABLE_CAMERA=true
VITE_ENABLE_VOICE_CONTROL=true
VITE_ENABLE_ANALYTICS=true

# Development
VITE_DEV_MODE=true
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

### Browser Compatibility
- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📱 Application Modules

### 1. 🎭 Real-Time Emotion Dashboard
**Path:** `/real-time-emotion-dashboard`
- Live emotion detection using camera integration
- Biometric monitoring (heart rate, stress levels)
- Personalized content recommendations
- Mood timeline visualization
- Quick actions for wellness interventions

### 2. 🎓 Academic Integration & Code Emotion Analysis
**Path:** `/academic-integration-code-emotion-analysis`
- Emotion-aware coding environment
- Study session tracking and analytics
- AI-powered career guidance
- Collaboration optimization tools
- Academic stress mapping

### 3. 🤖 AI-Powered Study Assistant
**Path:** `/ai-powered-study-assistant`
- Adaptive learning algorithms
- Concept explanation and tutoring
- Flashcard generation
- Practice problem creation
- Study plan optimization

### 4. 🎨 AI-Powered Content Generation Hub
**Path:** `/ai-powered-content-generation-hub`
- Dynamic content creation based on mood
- Content type selection (music, quotes, articles)
- Generation history tracking
- Personalized recommendations

### 5. 💓 Biometric Analytics & Health Monitoring
**Path:** `/biometric-analytics-health-monitoring`
- Comprehensive health tracking
- Vital signs monitoring
- Predictive health insights
- Peer comparison analytics
- Wellness scoring system

### 6. 🌐 Social Mood Synchronization & Campus Insights
**Path:** `/social-mood-synchronization-campus-insights`
- Campus-wide mood heatmap
- Anonymous peer support network
- Study group optimization
- Emotional contagion tracking
- Viral meme and trend analysis

### 7. 🔒 Privacy Controls & Data Management
**Path:** `/privacy-controls-data-management`
- Advanced privacy settings
- Data export and visualization
- Encryption configuration
- Explainable AI transparency
- Emergency data controls

### 8. 💻 Code Editor
**Path:** `/code-editor`
- Emotion-aware development environment
- Real-time code analysis
- Productivity tracking
- Integrated debugging tools

## 📁 Project Structure

```
moodify/
├── public/                    # Static assets and images
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (Button, Input, etc.)
│   │   ├── AppIcon.jsx      # Icon component
│   │   ├── VoiceControl.jsx # Voice command system
│   │   └── ErrorBoundary.jsx # Error handling
│   ├── pages/               # Main application modules
│   │   ├── real-time-emotion-dashboard/
│   │   ├── academic-integration-code-emotion-analysis/
│   │   ├── ai-powered-study-assistant/
│   │   ├── ai-powered-content-generation-hub/
│   │   ├── biometric-analytics-health-monitoring/
│   │   ├── social-mood-synchronization-campus-insights/
│   │   ├── privacy-controls-data-management/
│   │   └── code-editor/
│   ├── styles/              # Global styles and Tailwind configuration
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   ├── Routes.jsx           # Application routing
│   └── index.jsx            # Application entry point
├── CAMERA_SETUP.md          # Camera integration documentation
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.mjs          # Vite configuration
└── netlify.toml             # Deployment configuration
```

## 🎤 Voice Control System

Moodify features an advanced voice control system that allows users to interact with all modules using natural language commands.

### Features
- **Natural Language Processing** - Understands conversational commands
- **Page-Specific Commands** - Context-aware commands for each module
- **Speech Recognition** - Real-time voice input processing
- **Text-to-Speech** - Audio feedback and confirmations
- **Command History** - Track and display recent commands

### Available Commands by Module

#### Global Commands (Available Everywhere)
- `"navigate to dashboard"` - Go to emotion dashboard
- `"navigate to analytics"` - Go to biometric analytics
- `"navigate to study assistant"` - Go to study assistant
- `"navigate to code editor"` - Go to code editor
- `"show help"` - Display available commands
- `"toggle voice control"` - Enable/disable voice control
- `"refresh page"` - Reload current page
- `"go back"` - Navigate back

#### Real-Time Emotion Dashboard
- `"show emotions"` - Focus on emotion analysis panel
- `"show biometrics"` - Display biometric data
- `"start monitoring"` - Begin real-time monitoring
- `"export data"` - Export current data
- `"show timeline"` - Display emotion timeline

#### Code Editor
- `"run code"` - Execute current code
- `"save file"` - Save current file
- `"new file"` - Create new file
- `"format code"` - Format current code
- `"show errors"` - Display code errors

#### Study Assistant
- `"generate study plan"` - Create personalized study plan
- `"create flashcards"` - Generate study flashcards
- `"explain concept"` - Get concept explanation
- `"start practice"` - Begin practice problems
- `"show progress"` - Display study progress

### Usage
1. Click the microphone button to activate voice control
2. Say "Hey Moodify" followed by your command
3. The system will process and execute your request
4. Audio feedback confirms successful execution

### Browser Requirements
- Modern browser with Web Speech API support
- Microphone permissions granted
- HTTPS connection (required for production)

## 📷 Camera Integration & Emotion Detection

Moodify includes real-time emotion detection using camera integration. See [CAMERA_SETUP.md](./CAMERA_SETUP.md) for detailed setup instructions.

### Features
- **Real-time Emotion Analysis** - Live facial expression recognition
- **Biometric Correlation** - Emotion data correlated with biometric metrics
- **Privacy-First Design** - Local processing with no data transmission
- **Cross-Platform Support** - Works on desktop and mobile devices

### Requirements
- **HTTPS or Localhost** - Camera access requires secure connection
- **Modern Browser** - Chrome, Firefox, Safari, or Edge
- **Camera Permissions** - User must grant camera access
- **WebRTC Support** - Browser must support getUserMedia API

### Setup Instructions
1. Ensure you're running on HTTPS or localhost
2. Grant camera permissions when prompted
3. Navigate to Real-Time Emotion Dashboard
4. Click "Start" to begin emotion detection
5. The system will analyze facial expressions in real-time

### Troubleshooting
- **"Camera access not supported"** - Use a modern browser
- **"HTTPS required"** - Access via HTTPS or localhost
- **"Permission denied"** - Check browser camera settings
- **"No video feed"** - Ensure camera isn't used by another app

## 🎨 Styling & Design

This project uses Tailwind CSS with extensive customization:

### Design System
- **Neomorphic Design** - Soft, modern UI with depth and shadows
- **Emotion-Based Theming** - Dynamic colors based on detected emotions
- **Responsive Breakpoints** - Mobile-first responsive design
- **Accessibility** - WCAG compliant with proper contrast ratios

### Tailwind Configuration
- Forms plugin for enhanced form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities for smooth transitions
- Custom color palette for emotion states

### Emotion Color Scheme
- **Calm** - Soft blues and greens
- **Focus** - Deep purples and indigos
- **Energy** - Vibrant oranges and yellows
- **Stress** - Warm reds and pinks


## 📦 Deployment

### Production Build
Build the application for production:
```bash
npm run build
```

### Deployment Options

#### Netlify (Recommended)
The project includes `netlify.toml` configuration for easy deployment:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Vercel
The project includes `vercel.json` configuration:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

#### Manual Deployment
1. Build the application: `npm run build`
2. Upload the `dist/` directory to your web server
3. Configure your server to serve the `index.html` file for all routes
4. Ensure HTTPS is enabled for camera and voice features

### Environment Configuration

#### Production Environment Variables
```env
# Production API Configuration
VITE_API_BASE_URL=https://api.moodify.com
VITE_WS_URL=wss://ws.moodify.com

# Feature Flags
VITE_ENABLE_CAMERA=true
VITE_ENABLE_VOICE_CONTROL=true
VITE_ENABLE_ANALYTICS=true

# Production
VITE_DEV_MODE=false
```

### HTTPS Requirements
- **Camera Access:** Requires HTTPS in production
- **Voice Control:** Requires HTTPS for microphone access
- **WebRTC:** Secure context required for media devices

### Performance Optimization
- **Code Splitting:** Automatic route-based code splitting
- **Asset Optimization:** Images and assets are optimized during build
- **Caching:** Static assets are cached with proper headers
- **Compression:** Gzip compression enabled for text assets

### Monitoring & Analytics
- **Error Tracking:** Built-in error boundary for crash reporting
- **Performance Monitoring:** Core Web Vitals tracking
- **User Analytics:** Privacy-compliant usage analytics
- **Health Checks:** Application health monitoring endpoints

## 🤝 Contributing

We welcome contributions to improve the Moodify platform!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex functionality
- Test changes across different browsers
- Update documentation for new features
- Ensure camera and voice features work properly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Shashank Chaurasia** - *Initial work* - [shashankchaurasiya27-boop](https://github.com/shashankchaurasiya27-boop)

## 🙏 Acknowledgments

- React and Vite for the development framework
- Tailwind CSS for styling
- The open-source community for inspiration and tools
- Emotion detection and biometric analysis research

## 📞 Support

For support, questions, or feature requests:

- Create an issue on [GitHub](https://github.com/tanyaprajapati155-collab/moodify/issues)
- Contact: [tanyaprajapati155-collab](https://github.com/tanyaprajapati155-collab)

---

**Moodify** - Advancing emotional intelligence through AI-powered technology 🧠💙
