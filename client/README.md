# Real-Time Polling Frontend Showcase

A modern Next.js website showcasing the features and capabilities of our TypeScript Node.js real-time polling backend API.

## 🚀 Features

- 🎨 **Modern UI Design** - Clean, responsive interface built with Tailwind CSS
- 📚 **Comprehensive Documentation** - Interactive API documentation with examples
- 🚀 **Live Demo** - Interactive components to test backend functionality
- ⚡ **Real-time Updates** - Socket.IO integration for live polling demonstrations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔧 **TypeScript** - Full type safety throughout the application

## 🛠 Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Beautiful icons
- **React Hooks** - Modern React patterns

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Backend server** running (see backend README)

## 🔧 Installation & Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd voting/client
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏃‍♂️ Quick Start Guide

### Step 1: Start the Backend Server
First, ensure your backend server is running:

```bash
# In a separate terminal, navigate to the backend
cd ../server

# Install dependencies (if not done already)
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database configuration

# Run database migrations
npm run prisma:migrate

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### Step 2: Start the Frontend
```bash
# In the client directory
npm run dev
```

The frontend will run on `http://localhost:3000`

### Step 3: Explore the Features
1. **Overview Tab** - Learn about backend capabilities
2. **API Endpoints Tab** - View API documentation
3. **Tech Stack Tab** - Understand the technology choices
4. **Live Demo Tab** - Test real-time functionality

## 📖 Features Overview

### 1. Landing Page (`/`)
- **Hero Section** - Highlights backend capabilities
- **Tabbed Navigation** - Four main sections:
  - Overview of backend features
  - API endpoints documentation
  - Technology stack information
  - Interactive live demo
- **Modern Design** - Professional showcase layout

### 2. API Documentation (`/api-docs`)
- **Complete Reference** - All endpoints documented
- **Interactive Examples** - Copy-to-clipboard functionality
- **WebSocket Events** - Socket.IO documentation
- **Error Codes** - Common error responses
- **Request/Response Schemas** - Detailed data structures

### 3. Interactive Demo
- **User Creation** - Test user registration functionality
- **Poll Management** - Create polls with multiple options
- **Real-time Voting** - Experience live vote updates
- **Socket.IO Integration** - See real-time connections in action
- **Live Updates Feed** - Monitor real-time events

## 🔌 Backend Integration

The frontend connects to your backend server for:

### REST API Calls
- `POST /users` - Create users in the demo
- `POST /polls` - Create polls with options
- `POST /votes` - Submit votes
- `GET /polls` - Retrieve polls and vote counts

### WebSocket Connection
- Connects to `http://localhost:3001` via Socket.IO
- Joins poll rooms for real-time updates
- Displays live vote count changes
- Shows connection status

## 🗂 Project Structure

```
client/
├── app/                    # Next.js 13+ app directory
│   ├── api-docs/          # API documentation page
│   │   └── page.tsx       # Interactive API docs
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main landing page
├── components/            # Reusable React components
│   ├── ui/               # UI component library
│   │   ├── Button.tsx    # Reusable button component
│   │   └── Card.tsx      # Card component variants
│   └── DemoSection.tsx   # Interactive demo component
├── public/               # Static assets
├── .eslintrc.json        # ESLint configuration
├── .gitignore           # Git ignore patterns
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔍 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
The website uses Tailwind CSS for styling. Customize by:

1. **Update Tailwind Configuration**
   ```javascript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           primary: {
             // Add your brand colors
           }
         }
       }
     }
   }
   ```

2. **Modify Components**
   All components use Tailwind utility classes for easy customization.

### Content
- **Features**: Update descriptions in `app/page.tsx`
- **API Documentation**: Modify content in `app/api-docs/page.tsx`
- **Demo Functionality**: Customize in `components/DemoSection.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically
4. Set environment variables if needed

### Other Platforms
Deploy to any platform supporting Next.js:
- **Netlify** - Static site generation
- **AWS Amplify** - Full-stack deployment
- **Railway** - Container deployment
- **Heroku** - Traditional hosting

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` for custom configuration:

```env
# Optional: Custom backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Configuration
The `next.config.js` includes:
- ESLint configuration
- Build optimizations
- Static export settings

## 🚨 Troubleshooting

### Common Issues

**Frontend Won't Start**
```
Error: Cannot find module 'next'
```
- Run `npm install` to install dependencies
- Ensure Node.js 18+ is installed

**Backend Connection Failed**
```
Socket.IO connection failed
```
- Verify backend is running on port 3001
- Check backend server logs
- Ensure no firewall blocking connections

**Build Errors**
```
Type error in components
```
- Check TypeScript configuration
- Verify all imports are correct
- Run `npm run lint` to identify issues

**Styling Issues**
```
Tailwind classes not working
```
- Verify Tailwind is properly configured
- Check `globals.css` imports
- Restart development server

## 📚 Backend Features Showcased

The frontend demonstrates these backend capabilities:

### Core Functionality
- **User Management** - Secure registration with password hashing
- **Poll Creation** - Multiple options with publish/unpublish
- **Real-time Voting** - Live updates via Socket.IO
- **Database Integration** - PostgreSQL with Prisma ORM
- **Input Validation** - Zod schema validation
- **RESTful API** - Express.js with error handling

### Real-time Features
- **Socket.IO Rooms** - Per-poll broadcasting
- **Live Vote Updates** - Instant count changes
- **Connection Management** - Join/leave poll rooms
- **Event Broadcasting** - Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind for styling
- Maintain component reusability
- Add proper error handling
- Test real-time functionality

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Getting Help
- **API Documentation**: Visit `/api-docs` for complete reference
- **Interactive Demo**: Use the live demo to test functionality
- **Backend Setup**: Check the backend README for server setup

### Reporting Issues
1. Check existing issues on GitHub
2. Provide detailed reproduction steps
3. Include browser and Node.js versions
4. Attach relevant logs or screenshots

---

**Ready to showcase your backend?** Start both servers and explore the interactive demo!

## 🎯 Next Steps

1. **Start Backend**: Follow backend README to set up the server
2. **Run Frontend**: Use `npm run dev` to start the showcase
3. **Explore Features**: Navigate through all tabs and demo sections
4. **Test Real-time**: Create polls and vote to see live updates
5. **Customize**: Modify styling and content to match your brand
