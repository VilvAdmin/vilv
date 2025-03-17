import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { games } from '~/server/db/schema';
import { z } from 'zod';
import { auth, clerkClient } from '@clerk/nextjs/server';

// Define a schema for request validation
export const gameSchema = z.object({
  date: z.string(),
  time: z.string(),
  home_team: z.string().min(1),
  away_team: z.string().min(1),
  type: z.enum(['Competitie', 'Beker', 'Vriendschappelijk'])
});

const gamesSchema = z.array(gameSchema);

export async function GET() {
  const allGames = await db.select().from(games);
  return NextResponse.json(allGames);
}


export async function POST(req: Request) {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized', details: 'You must be logged in' },
      { status: 401 }
    );
  }

  // Get user's roles from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const isAdmin = (user.publicMetadata as { roles: string[] }).roles.includes('admin');

  // Check if user is admin
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Forbidden', details: 'Admin access required' },
      { status: 403 }
    );
  }
  try {
    const body: unknown = await req.json();
    const result = gamesSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const newGame = await db.insert(games).values(result.data).returning();

    return NextResponse.json(newGame[0], { status: 201 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}