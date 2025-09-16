import { z } from "zod";

export const voteSchema = z.object({
    userId: z.string().min(1),
    optionId: z.string().min(1),
  });