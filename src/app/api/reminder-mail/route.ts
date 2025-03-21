import { ReminderMail } from '~/app/_components/emails/ReminderMail';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { z } from 'zod';

const emailSchema = z.array(z.string().email());

export async function POST(req: Request) {
    const { userId } = await auth();
    const resend = new Resend(process.env.RESEND_API_KEY);

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
        const result = emailSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.errors },
                { status: 400 }
            );
        }

        const { data, error } = await resend.batch.send(result.data.map(emailAddress => (
            {
                from: 'Hi there <onboarding@resend.dev>',
                to: emailAddress,
                subject: 'Hello world',
                react: ReminderMail({ firstName: 'Milo' }),
            }
        )))

        if (error) {
            return Response.json({ error }, { status: 500 });
        }
        return Response.json(data);
    } catch (error) {
        console.error('Error adding game:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}