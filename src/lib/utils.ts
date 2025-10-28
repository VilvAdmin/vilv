import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MyGame } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateICS(games: MyGame[]) {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VILV//Calendar//EN',
    ...games.map(game => [
      'BEGIN:VEVENT',
      `UID:${game.games.id}@vilv.be`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${game.games.date.replace(/-/g, '')}T${game.games.time.replace(/:/g, '')}`,
      `DTEND:${game.games.date.replace(/-/g, '')}T${(('0' + ((parseInt(game.games.time.slice(0, 2), 10) + 2) % 24)).slice(-2) + game.games.time.slice(2)).replace(/:/g, '')}`,
      `SUMMARY:${game.games.home_team} vs ${game.games.away_team}`,
      `DESCRIPTION:${game.games.type}`,
      'END:VEVENT'
    ].join('\r\n')),
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}