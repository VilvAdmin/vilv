import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { availabilities } from '~/server/db/schema';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

// Define a schema for request validation
const availabilitiesSchema = z.object({
  game_id: z.string(),
  user_id: z.string(),
  status: z.enum(['Beschikbaar', 'Niet beschikbaar', 'Geblesseerd']),
  player_name: z.string().min(1)
});

type AvailabilitiesInput = z.infer<typeof availabilitiesSchema>;



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

    const { game_id, status, player_name } = result.data;

    const newAvailability = await db.insert(availabilities).values({ game_id, user_id: userId, status, player_name }).returning();

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
            .where(
                and(
                    eq(availabilities.game_id, game_id),
                    eq(availabilities.user_id, userId)
                )
            )
            .returning();
  
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.error('Error adding game:', error);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }
  