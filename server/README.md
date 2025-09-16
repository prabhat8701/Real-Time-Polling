# Move37 Ventures Backend Developer Challenge: Real-Time Polling

A TypeScript Node.js backend using Express, PostgreSQL, Prisma ORM, and Socket.IO for live poll updates.

## Features

- REST API for Users, Polls, and Votes
- PostgreSQL schema modeled with Prisma
  - One-to-many: User -> Polls, Poll -> PollOptions
  - Many-to-many: Users <-> PollOptions via Vote join table
- Real-time updates using Socket.IO rooms per poll
- Input validation with Zod

## Project Structure

- `src/index.ts` - Entry point, HTTP server, and Socket.IO setup
- `src/app.ts` - Express app and routes registration
- `src/prisma.ts` - Prisma client singleton
- `src/routes/users.ts` - Create and retrieve users
- `src/routes/polls.ts` - Create and retrieve polls and options
- `src/routes/votes.ts` - Submit a vote and broadcast live results
- `prisma/schema.prisma` - Prisma models and relations

## Getting Started

1. Clone this repo and install dependencies:

```bash
npm install
```

2. Configure environment:

- Copy `.env.example` to `.env` and update values as needed

```bash
cp .env.example .env
```

Ensure your PostgreSQL instance is running and the `DATABASE_URL` is correct.

3. Initialize the database with Prisma Migrate:

```bash
npx prisma migrate dev --name init
```

4. Generate the Prisma Client (usually done automatically by migrate):

```bash
npm run prisma:generate
```

5. Start the dev server:

```bash
npm run dev
```

The server runs on `http://localhost:3000` by default.

## API Endpoints

- `GET /health` - health check

### Users
- `POST /users` body: `{ name, email, password }`
- `GET /users/:id`

### Polls
- `POST /polls` body: `{ question, creatorId, isPublished?, options: string[] }`
- `GET /polls` - list polls with option vote counts
- `GET /polls/:id` - poll detail with option vote counts

### Votes
- `POST /votes` body: `{ userId, optionId }`
  - Enforces one vote per user per poll
  - Broadcasts updated counts to the Socket.IO room for that poll

## WebSocket Usage

Connect to the server with Socket.IO from a client and join a poll room to receive live updates:

```js
const socket = io('http://localhost:3000');
socket.emit('joinPoll', pollId);

socket.on('pollUpdated', (payload) => {
  // payload = { pollId, options: [{ id, text, count }, ...] }
  console.log('Live update:', payload);
});
```

When you no longer want updates:

```js
socket.emit('leavePoll', pollId);
```

## Notes

- Authentication is out of scope for this challenge. Passwords are hashed at creation, but login/session endpoints are not provided.
- Prisma relations:
  - The many-to-many between `User` and `PollOption` is modeled via explicit `Vote` table with a unique constraint on `(userId, optionId)`.
  - Additional rule enforced at the API layer: a user can only vote once per poll.

## Scripts

- `npm run dev` - start dev server with ts-node-dev
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled server
- `npm run prisma:migrate` - run Prisma migrations (dev)
- `npm run prisma:generate` - generate Prisma Client
- `npm run prisma:studio` - open Prisma Studio
