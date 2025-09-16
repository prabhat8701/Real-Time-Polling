import http from 'http';
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { setupWebsocket } from './config/ws.js';

dotenv.config();

const app = createApp();
const server = http.createServer(app);
const { io, broadcastPollUpdate } = setupWebsocket(server);

// Expose broadcaster to routes via globalThis (simple injection for this challenge)
// In a larger app, use a DI container. Here we attach to global for brevity.
(globalThis as any).broadcastPollUpdate = broadcastPollUpdate;

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  
});
