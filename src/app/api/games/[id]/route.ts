import { auth, clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { availabilities, games } from '~/server/db/schema';
import { gameSchema } from '../route';

export async function DELETE(req: Request) {
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


export async function PATCH(req: Request) {
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

    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    try {
        if (!id) {
            return NextResponse.json(
                { error: 'Invalid input', details: 'No id provided' },
                { status: 400 }
            );
        }
    const body = await req.json();
    const result = gameSchema.safeParse(body[0]);

    if (!result.success) {
        return NextResponse.json(
            { error: 'Invalid input', details: result.error.errors },
            { status: 400 }
        );
    }
    const updatedGame = await db
            .update(games)
            .set(result.data)
            .where(eq(games.id, id));

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}