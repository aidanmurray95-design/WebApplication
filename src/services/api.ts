import type {
  Match,
  Transfer,
  Article,
  OddsMarket,
  StandingEntry,
  League,
  TransferFilters,
  ArticleFilters,
} from '../types';
import {
  mockMatches,
  mockTransfers,
  mockArticles,
  mockOdds,
  mockStandings,
} from './mockData';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60_000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchLiveScores(): Promise<Match[]> {
  const cached = getCached<Match[]>('live-scores');
  if (cached) return cached;
  await delay(300);
  const result = mockMatches.filter((m) => m.status === 'live' || m.status === 'halftime');
  setCache('live-scores', result);
  return result;
}

export async function fetchMatches(status?: string): Promise<Match[]> {
  const key = `matches-${status || 'all'}`;
  const cached = getCached<Match[]>(key);
  if (cached) return cached;
  await delay(400);
  const result = status ? mockMatches.filter((m) => m.status === status) : mockMatches;
  setCache(key, result);
  return result;
}

export async function fetchMatchById(id: string): Promise<Match | undefined> {
  await delay(200);
  return mockMatches.find((m) => m.id === id);
}

export async function fetchTransfers(filters?: TransferFilters): Promise<Transfer[]> {
  const key = `transfers-${JSON.stringify(filters || {})}`;
  const cached = getCached<Transfer[]>(key);
  if (cached) return cached;
  await delay(400);
  let result = [...mockTransfers];

  if (filters) {
    if (filters.league) {
      result = result.filter((t) => t.league === filters.league);
    }
    if (filters.position) {
      result = result.filter((t) => t.position === filters.position);
    }
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.player.name.toLowerCase().includes(s) ||
          t.fromClub.name.toLowerCase().includes(s) ||
          t.toClub.name.toLowerCase().includes(s)
      );
    }
    if (filters.sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filters.sortBy === 'fee') {
      result.sort((a, b) => {
        const feeA = parseInt(a.fee.replace(/[^0-9]/g, '')) || 0;
        const feeB = parseInt(b.fee.replace(/[^0-9]/g, '')) || 0;
        return feeB - feeA;
      });
    }
  }

  setCache(key, result);
  return result;
}

export async function fetchArticles(filters?: ArticleFilters): Promise<Article[]> {
  const key = `articles-${JSON.stringify(filters || {})}`;
  const cached = getCached<Article[]>(key);
  if (cached) return cached;
  await delay(400);
  let result = [...mockArticles];

  if (filters) {
    if (filters.category) {
      result = result.filter((a) => a.category === filters.category);
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(s) ||
          a.excerpt.toLowerCase().includes(s) ||
          a.tags.some((tag) => tag.toLowerCase().includes(s))
      );
    }
    if (filters.sortBy === 'date') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filters.sortBy === 'readTime') {
      result.sort((a, b) => a.readTime - b.readTime);
    }
  }

  setCache(key, result);
  return result;
}

export async function fetchArticleById(id: string): Promise<Article | undefined> {
  await delay(200);
  return mockArticles.find((a) => a.id === id);
}

export async function fetchOdds(): Promise<OddsMarket[]> {
  const cached = getCached<OddsMarket[]>('odds');
  if (cached) return cached;
  await delay(400);
  setCache('odds', mockOdds);
  return mockOdds;
}

export async function fetchStandings(league: League): Promise<StandingEntry[]> {
  const key = `standings-${league}`;
  const cached = getCached<StandingEntry[]>(key);
  if (cached) return cached;
  await delay(300);
  const result = mockStandings[league] || [];
  setCache(key, result);
  return result;
}

export async function searchAll(query: string): Promise<{
  matches: Match[];
  transfers: Transfer[];
  articles: Article[];
}> {
  await delay(300);
  const q = query.toLowerCase();
  return {
    matches: mockMatches.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes(q) ||
        m.awayTeam.name.toLowerCase().includes(q) ||
        m.competition.toLowerCase().includes(q)
    ),
    transfers: mockTransfers.filter(
      (t) =>
        t.player.name.toLowerCase().includes(q) ||
        t.fromClub.name.toLowerCase().includes(q) ||
        t.toClub.name.toLowerCase().includes(q)
    ),
    articles: mockArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q))
    ),
  };
}
