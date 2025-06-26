import { z } from 'zod';

export const trainingSchema = z.object({
  date: z.string(),
  time: z.string(),
  pitch: z.string().min(1),
  season: z.string().length(9),
});

export const trainingsSchema = z.array(trainingSchema);
