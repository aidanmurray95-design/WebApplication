// Match & Score Types
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  league: League;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: MatchStatus;
  minute?: number;
  competition: string;
  date: string;
  venue: string;
  events: MatchEvent[];
}

export type MatchStatus = 'scheduled' | 'live' | 'halftime' | 'finished' | 'postponed';

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  minute: number;
  player: string;
  team: 'home' | 'away';
  detail?: string;
}

// Transfer Types
export interface Transfer {
  id: string;
  player: PlayerInfo;
  fromClub: Team;
  toClub: Team;
  fee: string;
  date: string;
  status: TransferStatus;
  contractLength?: string;
  league: League;
  position: PlayerPosition;
  details?: string;
}

export type TransferStatus = 'rumor' | 'negotiation' | 'confirmed' | 'official';
export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface PlayerInfo {
  name: string;
  age: number;
  nationality: string;
  image: string;
  position: PlayerPosition;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: ArticleCategory;
  image: string;
  readTime: number;
  tags: string[];
  source: string;
}

export type ArticleCategory = 'match-report' | 'tactical-analysis' | 'interview' | 'opinion' | 'transfer-news';

// Betting / Odds Types
export interface OddsMarket {
  id: string;
  match: Match;
  bookmaker: string;
  markets: BettingMarket[];
  lastUpdated: string;
}

export interface BettingMarket {
  type: MarketType;
  outcomes: Outcome[];
}

export type MarketType = 'match_winner' | 'over_under' | 'both_teams_score';

export interface Outcome {
  name: string;
  odds: number;
  movement?: 'up' | 'down' | 'stable';
}

// League & Standing Types
export type League = 'premier-league' | 'la-liga' | 'serie-a' | 'bundesliga' | 'ligue-1';

export interface StandingEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

// Head-to-Head Types
export interface HeadToHead {
  teamA: Team;
  teamB: Team;
  totalMatches: number;
  teamAWins: number;
  teamBWins: number;
  draws: number;
  recentMatches: Match[];
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark';
  favoriteTeams: string[];
  preferredLeagues: League[];
  bookmarkedArticles: string[];
  recentSearches: string[];
}

// Search
export interface SearchResult {
  type: 'player' | 'team' | 'article';
  id: string;
  title: string;
  subtitle: string;
  image?: string;
}

// Filters
export interface TransferFilters {
  league?: League;
  position?: PlayerPosition;
  status?: TransferStatus;
  search?: string;
  minFee?: number;
  maxFee?: number;
  sortBy?: 'date' | 'fee' | 'relevance';
}

export interface ArticleFilters {
  category?: ArticleCategory;
  search?: string;
  sortBy?: 'date' | 'readTime' | 'relevance';
}

export const LEAGUE_NAMES: Record<League, string> = {
  'premier-league': 'Premier League',
  'la-liga': 'La Liga',
  'serie-a': 'Serie A',
  'bundesliga': 'Bundesliga',
  'ligue-1': 'Ligue 1',
};
