import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { games } from '@/server/db/schema';

export async function GET() {
  const allGames = await db.select().from(games);
  return NextResponse.json(allGames);
}
