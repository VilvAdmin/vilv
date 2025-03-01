import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { availabilities, games } from '~/server/db/schema';

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
  try {
    if (!id) {
        return NextResponse.json(
            { error: 'Invalid input', details: 'No id provided' },
            { status: 400 }
        );
    }

    const deleteAvailabilities = await db.delete(availabilities).where(eq(availabilities.game_id, id));
    const deleteGame = await db.delete(games).where(eq(games.id, id));

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}