import * as React from 'react';

interface ReminderMailProps {
    firstName: string;
}

export const ReminderMail: React.FC<Readonly<ReminderMailProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);