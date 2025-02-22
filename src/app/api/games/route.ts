import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { games } from '~/server/db/schema';

export async function GET() {
  const allGames = await db.select().from(games);
  return NextResponse.json(allGames);
}



export async function POST(req: Request) {
  try {
    const { date, time, home_team, away_team, type } = await req.json();
    if (!date || !time || !home_team || !away_team || !type) {
      return NextResponse.json({ error: 'Missing information' }, { status: 400 });
    }

    const newGame = await db.insert(games).values({ date, time, home_team, away_team, type }).returning();

    return NextResponse.json(newGame[0], { status: 201 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
