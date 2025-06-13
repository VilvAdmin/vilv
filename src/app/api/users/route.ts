import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// const userSchema = z.object({
//     firstName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
//     lastName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
//     emailAddress: z.string().email("Ongeldig emailadres"),
//     username: z.string().min(4, "Gebruikersnaam moet minstens 4 karakters bevatten").max(64, "Gebruikersnaam moet maximum 64 karakters bevatten"),
//     publicMetadata: z.object({
//         roles: z.array(z.string()).optional(),
//         active: z.boolean().optional().default(true),
//     }),
// });

const userCreateSchema = z.object({
  firstName: z.string().min(2, 'Voornaam moet minstens 2 karakters bevatten'),
  lastName: z.string().min(2, 'Voornaam moet minstens 2 karakters bevatten'),
  emailAddress: z.string().email('Ongeldig emailadres'),
  username: z
    .string()
    .min(4, 'Gebruikersnaam moet minstens 4 karakters bevatten')
    .max(64, 'Gebruikersnaam moet maximum 64 karakters bevatten'),
  password: z.string().min(8, 'Wachtwoord moet minstens 8 karakters bevatten'),
  publicMetadata: z.object({
    roles: z.array(z.string()).optional(),
    active: z.boolean().optional().default(true),
  }),
});

const userUpdateSchema = z.object({
  firstName: z.string().min(2, 'Voornaam moet minstens 2 karakters bevatten').optional(),
  lastName: z.string().min(2, 'Voornaam moet minstens 2 karakters bevatten').optional(),
  emailAddress: z.string().email('Ongeldig emailadres').optional(),
  username: z
    .string()
    .min(4, 'Gebruikersnaam moet minstens 4 karakters bevatten')
    .max(64, 'Gebruikersnaam moet maximum 64 karakters bevatten')
    .optional(),
  publicMetadata: z.object({
    roles: z.array(z.string()).optional(),
    active: z.boolean().optional(),
  }),
  userId: z.string(),
});

// export type User = z.infer<typeof userSchema>;

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
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
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
    const result = userCreateSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      return NextResponse.json({ error: errorMessages, messages: errorMessages }, { status: 400 });
    }

    // Check for existing username
    const existingUsername = await clerk.users.getUserList({
      username: [result.data.username],
    });

    if (existingUsername.data.length > 0) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Check for existing email
    const existingEmail = await clerk.users.getUserList({
      emailAddress: [result.data.emailAddress],
    });

    if (existingEmail.data.length > 0) {
      return NextResponse.json({ error: 'Email address already exists' }, { status: 400 });
    }

    const user = await clerk.users.createUser({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      username: result.data.username,
      password: result.data.password,
      emailAddress: [result.data.emailAddress],
      publicMetadata: result.data.publicMetadata,
    });

    return Response.json({ message: 'User created', user });
  } catch (error) {
    return Response.json({ error: 'Error creating user' }, { status: 500 });
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
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
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
    const result = userUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const updatedUser = {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      username: result.data.username,
      emailAddress: result.data.emailAddress,
      publicMetadata: result.data.publicMetadata,
    };

    const user = clerk.users.updateUser(result.data.userId, updatedUser);

    return Response.json({ message: 'User created', user });
  } catch (error) {
    console.error('Error adding user:', error);
    return Response.json({ error: 'Error creating user' }, { status: 500 });
  }
}
