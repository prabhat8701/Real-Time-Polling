# Real-Time Polling Backend Server

A production-ready TypeScript Node.js backend API featuring real-time voting capabilities with Socket.IO, user management, and poll creation.

## 🚀 Features

- **Real-time Polling** - Live vote updates using Socket.IO with room-based broadcasting
- **User Management** - Secure user registration with bcrypt password hashing
- **Poll Creation** - Create polls with multiple options and publish/unpublish functionality
- **RESTful API** - Well-structured Express.js API with comprehensive error handling
- **Database Integration** - PostgreSQL with Prisma ORM for robust data management
- **Input Validation** - Runtime validation using Zod schemas
- **Type Safety** - Full TypeScript implementation

## 🛠 Technology Stack

- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database toolkit and query builder
- **Socket.IO** - Real-time bidirectional communication
- **Zod** - Schema validation library
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before running the server, ensure you have:

- **Node.js** 18+ installed
- **PostgreSQL** database (local or cloud)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd voting/server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your database configuration
nano .env
```

**Required Environment Variables:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/polling_db?schema=public"
PORT=3001
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view your database
npm run prisma:studio
```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```
Server will start on `http://localhost:3001` with hot reloading.

### Production Mode
```bash
# Build the TypeScript code
npm run build

# Start the production server
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Server health status

### Users
- `POST /users` - Create a new user account
- `GET /users/:id` - Retrieve user information by ID

### Polls
- `POST /polls` - Create a new poll with options
- `GET /polls` - List all polls with vote counts
- `GET /polls/:id` - Get specific poll details with vote counts

### Votes
- `POST /votes` - Submit a vote (triggers real-time update)

## 🔌 WebSocket Events

### Client → Server
- `joinPoll(pollId)` - Join a poll room for real-time updates
- `leavePoll(pollId)` - Leave a poll room

### Server → Client
- `pollUpdated(payload)` - Broadcast when votes are updated
  ```javascript
  // payload structure
  {
    pollId: "string",
    options: [
      { id: "string", text: "string", count: number }
    ]
  }
  ```

## 📝 Usage Examples

### Create a User
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create a Poll
```bash
curl -X POST http://localhost:3001/polls \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is your favorite programming language?",
    "creatorId": "user_123",
    "isPublished": true,
    "options": ["JavaScript", "TypeScript", "Python", "Go"]
  }'
```

### Submit a Vote
```bash
curl -X POST http://localhost:3001/votes \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_456",
    "optionId": "option_789"
  }'
```

### WebSocket Connection
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

// Join a poll room
socket.emit('joinPoll', 'poll_123');

// Listen for real-time updates
socket.on('pollUpdated', (payload) => {
  console.log('Poll updated:', payload);
  // Update your UI with new vote counts
});

// Leave the poll room
socket.emit('leavePoll', 'poll_123');
```

## 🗂 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── prisma.ts          # Prisma client configuration
│   │   └── ws.ts              # Socket.IO setup
│   ├── controllers/
│   │   ├── polls.controller.ts # Poll management logic
│   │   ├── user.controller.ts  # User management logic
│   │   └── votes.controller.ts # Voting logic with real-time updates
│   ├── routes/
│   │   ├── polls.routes.ts     # Poll API routes
│   │   ├── users.routes.ts     # User API routes
│   │   └── votes.routes.ts     # Voting API routes
│   ├── validators/
│   │   ├── polls.ts           # Poll validation schemas
│   │   ├── user.ts            # User validation schemas
│   │   └── votes.ts           # Vote validation schemas
│   ├── app.ts                 # Express app configuration
│   └── index.ts               # Server entry point
├── prisma/
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database schema
├── .env                       # Environment variables
├── .env.example              # Environment template
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🔍 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## 🛡 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Zod schema validation on all endpoints
- **Error Handling** - Comprehensive error responses
- **Database Constraints** - Unique constraints and foreign keys
- **Type Safety** - Full TypeScript coverage

## 🔧 Database Schema

### User
- `id` - Unique identifier (CUID)
- `name` - User's full name
- `email` - Unique email address
- `passwordHash` - Hashed password

### Poll
- `id` - Unique identifier (CUID)
- `question` - Poll question text
- `isPublished` - Publication status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `creatorId` - Foreign key to User

### PollOption
- `id` - Unique identifier (CUID)
- `text` - Option text
- `pollId` - Foreign key to Poll

### Vote
- `id` - Unique identifier (CUID)
- `userId` - Foreign key to User
- `optionId` - Foreign key to PollOption
- Unique constraint on `(userId, optionId)` - One vote per user per poll

## 🚨 Troubleshooting

### Common Issues

**Database Connection Error**
```
Error: P1001: Can't reach database server
```
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3001
```
- Change PORT in .env file
- Kill existing process: `lsof -ti:3001 | xargs kill -9`

**Migration Errors**
```
Error: P3009: migrate found failed migration
```
- Reset database: `npx prisma migrate reset`
- Run migrations: `npm run prisma:migrate`

## 📚 API Documentation

For complete API documentation with interactive examples, visit the frontend showcase at:
`http://localhost:3000/api-docs` (when running the client)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
