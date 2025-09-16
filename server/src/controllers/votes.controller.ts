import { Request,Response } from "express";
import { prisma } from "../config/prisma.js";
import { voteSchema } from "../validators/votes.js";

async function getPollIdByOption(optionId: string) {
    const opt = await prisma.pollOption.findUnique({ where: { id: optionId }, select: { pollId: true } });
    return opt?.pollId || null;
  }
  
  async function getCountsForPoll(pollId: string) {
    const options = await prisma.pollOption.findMany({
      where: { pollId },
      include: { _count: { select: { votes: true } } },
      orderBy: { text: 'asc' },
    });
    return options.map((o) => ({ id: o.id, text: o.text, count: (o as any)._count.votes }));
  }


  export const createVote=async (req: Request, res: Response) => {
    const parsed = voteSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  
    const { userId, optionId } = parsed.data;
  
    try {
      const pollId = await getPollIdByOption(optionId);
      if (!pollId) return res.status(400).json({ error: 'Invalid optionId' });
  
      // Ensure user hasn't already voted in this poll
      const existing = await prisma.vote.findFirst({
        where: { userId, option: { pollId } },
        select: { id: true },
      });
      if (existing) return res.status(409).json({ error: 'User has already voted in this poll' });
  
      await prisma.vote.create({ data: { userId, optionId } });
  
      const options = await getCountsForPoll(pollId);
  
      // Broadcast update to clients in the poll room
      const broadcast = (globalThis as any).broadcastPollUpdate as undefined | ((payload: any) => void);
      if (broadcast) {
        broadcast({ pollId, options });
      }
  
      return res.status(201).json({ pollId, options });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }