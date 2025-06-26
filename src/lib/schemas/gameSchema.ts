import { z } from 'zod';

export const gameSchema = z.object({
  date: z.string(),
  time: z.string(),
  home_team: z.string().min(1),
  away_team: z.string().min(1),
  type: z.enum(['Competitie', 'Beker', 'Vriendschappelijk']),
  season: z.string().length(9),
});

export const gamesSchema = z.array(gameSchema);
