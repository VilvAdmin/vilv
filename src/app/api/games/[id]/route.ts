import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { eq } from 'drizzle-orm';
import { games, availabilities } from '~/server/db/schema';


export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const body = await request.json();
    console.log('Received body:', body); 
    const { userId } = body;

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const myGames = await db
        .select()
        .from(games)
        .leftJoin(availabilities, eq(games.id, availabilities.game_id))
        .where(eq(availabilities.user_id, userId));

        return NextResponse.json(myGames);
    }
    catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}