import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { createPollSchema } from "../validators/polls.js";

export const createPoll=async(req: Request, res: Response)=> {
  const parsed = createPollSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { question, isPublished, creatorId, options } = parsed.data;
  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        isPublished: Boolean(isPublished),
        creator: { connect: { id: creatorId } },
        options: { create: options.map((text) => ({ text })) },
      },
      include: { options: true, creator: { select: { id: true, name: true, email: true } } },
    });
    return res.status(201).json(poll);
  } catch (e: any) {
    console.error(e);
    if (e.code === 'P2025') return res.status(400).json({ error: 'Creator not found' });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getPolls=async (req: Request, res: Response) => {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: {
          include: { _count: { select: { votes: true } } },
        },
        creator: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(
      polls.map((p) => ({
        id: p.id,
        question: p.question,
        isPublished: p.isPublished,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        creator: p.creator,
        options: p.options.map((o) => ({ id: o.id, text: o.text, count: (o as any)._count.votes })),
      }))
    );
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getPollById=async (req: Request, res: Response) => {
    try {
      const poll = await prisma.poll.findUnique({
        where: { id: req.params.id },
        include: {
          options: { include: { _count: { select: { votes: true } } } },
          creator: { select: { id: true, name: true } },
        },
      });
      if (!poll) return res.status(404).json({ error: 'Poll not found' });
  
      return res.json({
        id: poll.id,
        question: poll.question,
        isPublished: poll.isPublished,
        createdAt: poll.createdAt,
        updatedAt: poll.updatedAt,
        creator: poll.creator,
        options: poll.options.map((o) => ({ id: o.id, text: o.text, count: (o as any)._count.votes })),
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal server error' });
    }
}