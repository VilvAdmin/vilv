import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import { z } from "zod";

// Define a schema for request validation
const userSchema = z.object({
  firstName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  lastName: z.string().min(2, "Voornaam moet minstens 2 karakters bevatten"),
  emailAddress: z.string().email("Ongeldig emailadres"),
  username: z.string().min(3, "Gebruikersnaam moet minstens 3 karakters bevatten"),
  password: z.string().min(8, "Wachtwoord moet minstens 8 karakters bevatten"),
  publicMetadata: z.object({
    roles: z.array(z.string()).optional(),
    active: z.boolean().optional().default(true),
  }),
});

export type User = z.infer<typeof userSchema>;

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
        const result = userSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.errors },
                { status: 400 }
            );
        }

        const user = clerk.users.createUser({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            username: result.data.username,
            password: result.data.password,
            emailAddress: [result.data.emailAddress],
            publicMetadata: result.data.publicMetadata,
        })

        return Response.json({ message: 'User created', user })
    } catch (error) {
        console.error('Error adding user:', error);
        return Response.json({ error: 'Error creating user' }, { status: 500 });
    }
  }


const userUpdateActiveSchema = z.object({
    userId: z.string(),
    active: z.boolean(),
  });

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
        const result = userUpdateActiveSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.errors },
                { status: 400 }
            );
        }

        const user = clerk.users.updateUserMetadata(result.data.userId, {
            publicMetadata: {
                active: result.data.active,
            }
        })

        return Response.json({ message: 'User created', user })
    } catch (error) {
        console.error('Error adding user:', error);
        return Response.json({ error: 'Error creating user' }, { status: 500 });
    }
  }