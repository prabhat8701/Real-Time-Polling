import { z } from "zod";

export  const createPollSchema = z.object({
    question: z.string().min(1),
    isPublished: z.boolean().optional().default(false),
    creatorId: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
  });