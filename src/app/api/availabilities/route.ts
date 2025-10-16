import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { availabilities } from '~/server/db/schema';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { auth, clerkClient } from '@clerk/nextjs/server';

// Define a schema for request validation
const availabilitiesSchema = z.object({
  game_id: z.string(),
  status: z.enum(['Beschikbaar', 'Niet beschikbaar', 'Geblesseerd']),
  player_name: z.string().min(1),
  guest_player: z.boolean().optional().default(false),
});

const idSchema = z.object({
  availability_id: z.string(),
});

export async function POST(req: Request) {
  const { userId } = await auth();

  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized', details: 'You must be logged in' },
      { status: 401 }
    );
  }

  try {
    const body: unknown = await req.json();
    const result = availabilitiesSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { game_id, status, player_name, guest_player } = result.data;
    const user_id = guest_player ? 'GUEST' : userId;

    const newAvailability = await db
      .insert(availabilities)
      .values({ game_id, user_id: user_id, status, player_name })
      .returning();

    return NextResponse.json(newAvailability, { status: 201 });
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
  try {
    const body: unknown = await req.json();
    const result = availabilitiesSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { game_id, status } = result.data;

    const updatedAvailability = await db
      .update(availabilities)
      .set({ status })
      .where(and(eq(availabilities.game_id, game_id), eq(availabilities.user_id, userId)))
      .returning();

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// Define schema for bulk selection updates
const bulkSelectionSchema = z.object({
  selections: z.array(
    z.object({
      availability_id: z.string(),
      selected: z.boolean(),
    })
  ),
});

export async function PUT(req: Request) {
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
  const isAdmin = (user.publicMetadata as { roles: string[] }).roles?.includes('admin');

  // Check if user is admin
  if (!isAdmin) {
    return NextResponse.json(
      { error: 'Forbidden', details: 'Admin access required' },
      { status: 403 }
    );
  }

  try {
    const body: unknown = await req.json();
    const result = bulkSelectionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { selections } = result.data;

    // Update each availability's selected status
    const updatePromises = selections.map(({ availability_id, selected }) =>
      db
        .update(availabilities)
        .set({ selected })
        .where(eq(availabilities.id, availability_id))
        .returning()
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error updating selections:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

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

  try {
    const body: unknown = await req.json();
    const result = idSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { availability_id } = result.data;

    const deleteAvailability = await db
      .delete(availabilities)
      .where(eq(availabilities.id, availability_id));

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error('Error adding game:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
