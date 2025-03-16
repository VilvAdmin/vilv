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
    active: boolean;
  }

  export type GameImport = {
    id: string,
    startTime: string,
    channel: string,
    homeTeam: {
      id: string,
      name: string,
      clubId: string,
      logo: string,
      __typename: string,
    },
    awayTeam: {
      id: string,
      name: string,
      clubId: string,
      logo: string,
      __typename: string,
    },
    outcome: {
        status: string,
        homeTeamGoals: number,
        homeTeamPenaltiesScored: number | null,
        awayTeamGoals: number,
        awayTeamPenaltiesScored: number | null,
        subscript: null,
        __typename: string
    },
    series: {
        id: string,
        name: string,
        __typename: string
    },
    officials: [
      {
        lastName: string | null,
        firstName: string | null,
        status: string,
        personAssigned: boolean,
        __typename: string,
      }
    ],
    showScore: boolean,
    state: string,
    startDateTimeInThePassed: boolean,
    ageGroup: string,
    __typename: string,
}