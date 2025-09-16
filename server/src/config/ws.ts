import { Server as IOServer } from 'socket.io';
import type { Server } from 'http';

export interface PollUpdatePayload {
  pollId: string;
  options: Array<{ id: string; text: string; count: number }>;
}

export function setupWebsocket(server: Server) {
  const io = new IOServer(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    socket.on('joinPoll', (pollId: string) => {
      socket.join(`poll:${pollId}`);
    });

    socket.on('leavePoll', (pollId: string) => {
      socket.leave(`poll:${pollId}`);
    });
  });

  function broadcastPollUpdate(payload: PollUpdatePayload) {
    io.to(`poll:${payload.pollId}`).emit('pollUpdated', payload);
  }

  return { io, broadcastPollUpdate };
}
