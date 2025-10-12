# 🚀 adicodes.in - Portfolio Website

> A modern, responsive portfolio website showcasing full-stack development skills and AI integration expertise.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://adicodes.in)
[![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 About

Welcome to my personal portfolio website! I'm **Aditya Kumar**, a passionate Computer Science Engineering student specializing in full-stack development and AI integration. This portfolio showcases my journey, projects, and technical expertise in modern web technologies.

### 🎯 Key Highlights
- **🎓 Education**: 3rd Year Computer Science Engineering at PES Institute
- **💻 Specialization**: MERN Stack Development & AI Integration
- **🚀 Experience**: Built and deployed production applications serving 500+ users
- **🤖 AI Focus**: Expert in Google Gemini AI integration and conversational interfaces

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark Theme**: Professional dark mode with elegant gradients
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Professional Navbar**: Fixed positioning with real-time status indicators
- **Interactive Elements**: Hover effects, micro-interactions, and spring animations
- <img width="1189" height="789" alt="Screenshot 2025-09-14 143323" src="https://github.com/user-attachments/assets/9fbb0ddd-3e46-48a3-81d5-9158d7a35405" />
-<img width="3375" height="4219" alt="Beige Minimalist Modern New in my Blog Instagram Post" src="https://github.com/user-attachments/assets/bf12db8f-dc76-4c1b-8739-1486f88bcade" />


### 🔧 Technical Features
- **AI-Powered Chatbot**: Integrated Google Gemini AI for visitor interactions
- **Real-time Analytics**: Track user engagement and portfolio performance
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Meta tags, structured data, and search engine optimization
- **Progressive Web App**: Fast loading and offline capabilities

### 📱 Sections
- **🏠 Hero Section**: Dynamic introduction with animated profile and typewriter effects
- **👨‍💻 About**: Detailed background, education, and professional journey
- **🚀 Projects**: Interactive carousel showcasing featured development projects
- **🛠️ Skills**: Animated visualization of technical expertise
- **📚 Blog**: Technical articles and development insights
- **📄 Resume**: Downloadable CV with detailed experience
- **📞 Contact**: Enhanced contact form with real-time validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and interactions

### Backend & Services
- **Firebase** - Backend services and hosting
- **Google Gemini AI** - AI integration for chatbot
- **Vercel Analytics** - Performance and user tracking
- **Email.js** - Contact form functionality

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Git** - Version control
- **VS Code** - Development environment

## 🚀 Featured Projects

### 1. TypingPath.com
**AI-Powered Typing Training Platform**
- **Status**: 🟢 Live in Production
- **Users**: 500+ Active Users
- **Tech**: React 19, TypeScript, Firebase, Google AI API
- **Features**: Adaptive learning, real-time analytics, progress tracking

### 2. AI Logistics Chatbot
**Intelligent Customer Support System**
- **Status**: ✅ Completed
- **Satisfaction**: 95% User Satisfaction Rate
- **Tech**: React, Google Gemini API, Context-Aware AI
- **Features**: Natural language processing, automated responses

### 3. Portfolio Website (This Site!)
**Modern Developer Portfolio**
- **Status**: 🟢 Live & Continuously Updated
- **Tech**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Features**: AI chatbot, analytics, responsive design

## 📈 Performance Metrics

- **⚡ Page Speed**: 95+ Lighthouse Score
- **📱 Mobile Responsive**: 100% Mobile Optimized
- **🔍 SEO Score**: 98+ Search Engine Optimization
- **♿ Accessibility**: WCAG 2.1 AA Compliant
- **🎯 User Experience**: Smooth 60fps animations

## 🎨 Design Philosophy

- **Clean & Professional**: Minimalist design with focus on content
- **User-Centric**: Intuitive navigation and seamless interactions
- **Performance First**: Optimized for speed and accessibility
- **Modern Standards**: Following latest web development best practices

## 🌟 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aditya1156/adicodes.in.git
cd adicodes.in
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file with your configuration
cp .env.example .env
# Add your Firebase and API keys
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
adicodes.in/
├── public/                 # Static assets
│   ├── images/            # Profile and project images
│   └── favicon.svg        # Site favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx     # Professional navigation
│   │   ├── Footer.tsx     # Enhanced footer
│   │   └── ChatbotWidget.tsx # AI chatbot
│   ├── pages/             # Main application pages
│   │   ├── HomePage.tsx   # Landing page
│   │   ├── AboutPage.tsx  # About section
│   │   └── ProjectsPage.tsx # Projects showcase
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and configurations
│   │   ├── data.ts        # Project and content data
│   │   ├── gemini.ts      # AI integration
│   │   └── analytics.ts   # Analytics setup
│   └── types.ts           # TypeScript type definitions
├── README.md              # Project documentation
└── package.json           # Dependencies and scripts
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for **Vercel** deployment with automatic builds and previews.

#### Quick Deploy Steps:
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - Add `VITE_GEMINI_API_KEY` for AI chatbot
   - Add `VITE_GOOGLE_ANALYTICS_ID` for analytics (optional)

4. **Deploy**
   - Click "Deploy" and wait for build to complete
   - Your site will be live at `your-project.vercel.app`

#### Vercel Configuration
The project includes a `vercel.json` file with:
- ✅ Optimized build settings
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Cache control for assets
- ✅ SPA routing configuration
- ✅ Service worker support

#### Automatic Deployments
- **Production**: Deploys automatically on push to `main` branch
- **Preview**: Creates preview URLs for pull requests
- **Instant Rollbacks**: Easy rollback to previous deployments

## 🎨 Key Components

### Core Components
- **BackgroundWrapper**: Consistent animated backgrounds across pages
- **ChatbotWidget**: AI-powered chat assistant with Gemini integration
- **ProjectCard**: Interactive project showcases with animations
- **Navbar**: Professional navigation with real-time status indicators
- **Footer**: Comprehensive footer with social links and contact info

### Advanced Features
- **HeroSection**: Dynamic introduction with smoky glow effects
- **FeaturedProjectsCarousel**: Interactive project showcase
- **InteractiveTimeline**: Animated career and education journey
- **SkillsVisualization**: Animated display of technical expertise
- **EnhancedContactForm**: Real-time validation and submission

## 🤝 Contributing

While this is a personal portfolio, I welcome feedback and suggestions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact & Connect

- **🌐 Portfolio**: [adicodes.in](https://adicodes.in)
- **💼 LinkedIn**:[Linkedin](https://www.linkedin.com/in/aditya-kumar-165911339)
- **📧 Email**: adityaissc7@gmail.com
- **📱 GitHub**: [Aditya1156](https://github.com/Aditya1156)

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for beautiful animations
- **Google** for Gemini AI integration
- **Open Source Community** for incredible tools and inspiration

---

<div align="center">

**Made with ❤️ by Aditya Kumar**

*Building the future, one line of code at a time.*

⭐ **Star this repo if you found it helpful!** ⭐

</div>
