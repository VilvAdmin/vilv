  export interface Game {
    id: string;
    date: string;
    time: string;
    home_team: string;
    away_team: string;
    type: "Competitie" | "Beker" | "Vriendschappelijk";
  }

  export interface MyGame {
    games: Game;
    status: "Beschikbaar" | "Niet beschikbaar" | "Geblesseerd" | null;
  }
  
  export interface Availability {
    id: string;
    game_id: string;
    user_id: string;
    status: "Beschikbaar" | "Niet beschikbaar" | "Geblesseerd" | null;
  }
  
  export type PageProps<T = Record<string, string>> = {
    params: T;
    searchParams: Record<string, string | string[] | undefined>;
  }

  export interface Player {
    id: string;
    fullName: string;
    primaryEmailAddress: string;
    roles: string;
  }