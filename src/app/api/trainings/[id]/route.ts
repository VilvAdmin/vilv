import { auth, clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { availabilities, trainings } from '~/server/db/schema';
import { trainingSchema } from '../route';

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

    const deleteAvailabilities = await db
      .delete(availabilities)
      .where(eq(availabilities.game_id, id));
    const deleteTraining = await db.delete(trainings).where(eq(trainings.id, id));

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error('Error adding training:', error);
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
    const body: unknown = await req.json();
    if (!Array.isArray(body) || body.length === 0 || typeof body[0] !== 'object') {
      return NextResponse.json(
        { error: 'Invalid input', details: 'Request body must be a non-empty array of objects' },
        { status: 400 }
      );
    }
    const result = trainingSchema.safeParse(body[0]);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }
    const updatedTraining = await db.update(trainings).set(result.data).where(eq(trainings.id, id));

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error('Error adding training:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
