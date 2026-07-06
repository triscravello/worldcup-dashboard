const API_BASE = "https://worldcup26.ir";

export interface Team {
    id: string;
    name_en: string;
    name_fa: string;
    fifa_code: string;
    groups: string;
    flag: string;
}

export interface Match {
    id: string;
    home_team_id: string;
    away_team_id: string;
    home_score: string;
    away_score: string;
    home_scorers: string;
    away_scorers: string;
    group: string;
    matchday: string;
    local_date: string;
    stadium_id: string;
    finished: string;
    time_elapsed: string;
    type: string;
    home_team_name_en?: string;
    away_team_name_en?: string;
    home_team_label?: string;
    away_team_label?: string;
}

export interface GroupStanding {
    team_id: string;
    pts: string;
    gf: string;
    ga: string;
}

export interface Group {
    group: string;
    teams: GroupStanding[];
}

export interface Stadium {
    id: string;
    name_en: string;
    name_fa: string;
    fifa_name: string;
    city_en: string;
    country_en: string;
    capacity: number;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            signal: controller.signal,
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("Request timed out after 10 seconds");
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

export async function getMatches(): Promise<Match []> {
    const data = await fetchAPI<{ games: Match[] }>("/get/games");
    return data.games;
}

export async function getMatch(id: string): Promise<Match> {
    const data = await fetchAPI<{ game: Match }>(`/get/game/${id}`);
    return data.game;
}

export async function getGroups(): Promise<Group[]> {
    const data = await fetchAPI<{ groups: Group[] }>("/get/groups");
    return data.groups;
}

export async function getTeams(): Promise<Team[]> {
    const data = await fetchAPI<{ teams: Team[] }>("/get/teams");
    return data.teams;
}

export async function getStadiums(): Promise<Stadium[]> {
    const data = await fetchAPI<{ stadiums: Stadium[] }>("/get/stadiums");
    return data.stadiums;
}