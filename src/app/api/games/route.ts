import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { games } from '~/server/db/schema';
import { z } from 'zod';

// Define a schema for request validation
const gameSchema = z.object({
  date: z.string(),
  time: z.string(),
  home_team: z.string().min(1),
  away_team: z.string().min(1),
  type: z.enum(['Competitie', 'Beker', 'Vriendschappelijk'])
});

type GameInput = z.infer<typeof gameSchema>;

export async function GET() {
  const allGames = await db.select().from(games);
  return NextResponse.json(allGames);
}


export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const result = gameSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            { error: 'Invalid input', details: result.error.errors },
            { status: 400 }
        );
    }

    const { date, time, home_team, away_team, type } = result.data;

    const newGame = await db.insert(games).values({ date, time, home_team, away_team, type }).returning();

    return NextResponse.json(newGame[0], { status: 201 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
