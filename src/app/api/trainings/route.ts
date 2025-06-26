import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { trainings } from '~/server/db/schema';
import { z } from 'zod';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { trainingsSchema } from '~/lib/schemas/trainingSchema';

export async function GET() {
  const allTrainings = await db.select().from(trainings);
  return new NextResponse(JSON.stringify(allTrainings), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=120',
    },
  });
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
    const result = trainingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const newTraining = await db.insert(trainings).values(result.data).returning();

    return NextResponse.json(newTraining[0], { status: 201 });
  } catch (error) {
    console.error('Error adding training:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
