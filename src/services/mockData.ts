import type {
  Team,
  Match,
  Transfer,
  Article,
  OddsMarket,
  StandingEntry,
  League,
} from '../types';

const teams: Record<string, Team> = {
  arsenal: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', logo: '🔴', league: 'premier-league' },
  chelsea: { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', logo: '🔵', league: 'premier-league' },
  liverpool: { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', logo: '🔴', league: 'premier-league' },
  mancity: { id: 'mancity', name: 'Manchester City', shortName: 'MCI', logo: '🔵', league: 'premier-league' },
  manutd: { id: 'manutd', name: 'Manchester United', shortName: 'MUN', logo: '🔴', league: 'premier-league' },
  tottenham: { id: 'tottenham', name: 'Tottenham', shortName: 'TOT', logo: '⚪', league: 'premier-league' },
  realmadrid: { id: 'realmadrid', name: 'Real Madrid', shortName: 'RMA', logo: '⚪', league: 'la-liga' },
  barcelona: { id: 'barcelona', name: 'Barcelona', shortName: 'BAR', logo: '🔵🔴', league: 'la-liga' },
  atletico: { id: 'atletico', name: 'Atletico Madrid', shortName: 'ATM', logo: '🔴⚪', league: 'la-liga' },
  bayern: { id: 'bayern', name: 'Bayern Munich', shortName: 'BAY', logo: '🔴', league: 'bundesliga' },
  dortmund: { id: 'dortmund', name: 'Borussia Dortmund', shortName: 'BVB', logo: '🟡', league: 'bundesliga' },
  juventus: { id: 'juventus', name: 'Juventus', shortName: 'JUV', logo: '⚪⚫', league: 'serie-a' },
  acmilan: { id: 'acmilan', name: 'AC Milan', shortName: 'MIL', logo: '🔴⚫', league: 'serie-a' },
  inter: { id: 'inter', name: 'Inter Milan', shortName: 'INT', logo: '🔵⚫', league: 'serie-a' },
  psg: { id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', logo: '🔵🔴', league: 'ligue-1' },
  marseille: { id: 'marseille', name: 'Olympique Marseille', shortName: 'OM', logo: '⚪🔵', league: 'ligue-1' },
  napoli: { id: 'napoli', name: 'Napoli', shortName: 'NAP', logo: '🔵', league: 'serie-a' },
  newcastle: { id: 'newcastle', name: 'Newcastle United', shortName: 'NEW', logo: '⚫⚪', league: 'premier-league' },
  astonvilla: { id: 'astonvilla', name: 'Aston Villa', shortName: 'AVL', logo: '🟣', league: 'premier-league' },
  leverkusen: { id: 'leverkusen', name: 'Bayer Leverkusen', shortName: 'LEV', logo: '🔴', league: 'bundesliga' },
};

export const mockMatches: Match[] = [
  {
    id: 'm1',
    homeTeam: teams.arsenal,
    awayTeam: teams.chelsea,
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    competition: 'Premier League',
    date: '2026-02-01T15:00:00Z',
    venue: 'Emirates Stadium',
    events: [
      { id: 'e1', type: 'goal', minute: 12, player: 'B. Saka', team: 'home' },
      { id: 'e2', type: 'goal', minute: 34, player: 'C. Palmer', team: 'away' },
      { id: 'e3', type: 'goal', minute: 56, player: 'M. Odegaard', team: 'home' },
      { id: 'e4', type: 'yellow_card', minute: 45, player: 'E. Caicedo', team: 'away' },
    ],
  },
  {
    id: 'm2',
    homeTeam: teams.realmadrid,
    awayTeam: teams.barcelona,
    homeScore: 0,
    awayScore: 0,
    status: 'live',
    minute: 23,
    competition: 'La Liga',
    date: '2026-02-01T20:00:00Z',
    venue: 'Santiago Bernabeu',
    events: [],
  },
  {
    id: 'm3',
    homeTeam: teams.liverpool,
    awayTeam: teams.mancity,
    homeScore: 3,
    awayScore: 2,
    status: 'finished',
    competition: 'Premier League',
    date: '2026-01-31T17:30:00Z',
    venue: 'Anfield',
    events: [
      { id: 'e5', type: 'goal', minute: 8, player: 'M. Salah', team: 'home' },
      { id: 'e6', type: 'goal', minute: 22, player: 'E. Haaland', team: 'away' },
      { id: 'e7', type: 'goal', minute: 55, player: 'C. Gakpo', team: 'home' },
      { id: 'e8', type: 'goal', minute: 71, player: 'P. Foden', team: 'away' },
      { id: 'e9', type: 'goal', minute: 89, player: 'D. Nunez', team: 'home' },
    ],
  },
  {
    id: 'm4',
    homeTeam: teams.bayern,
    awayTeam: teams.dortmund,
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    competition: 'Bundesliga',
    date: '2026-02-02T17:30:00Z',
    venue: 'Allianz Arena',
    events: [],
  },
  {
    id: 'm5',
    homeTeam: teams.juventus,
    awayTeam: teams.inter,
    homeScore: 1,
    awayScore: 1,
    status: 'halftime',
    minute: 45,
    competition: 'Serie A',
    date: '2026-02-01T18:00:00Z',
    venue: 'Allianz Stadium',
    events: [
      { id: 'e10', type: 'goal', minute: 15, player: 'D. Vlahovic', team: 'home' },
      { id: 'e11', type: 'goal', minute: 38, player: 'L. Martinez', team: 'away' },
    ],
  },
  {
    id: 'm6',
    homeTeam: teams.psg,
    awayTeam: teams.marseille,
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    competition: 'Ligue 1',
    date: '2026-02-02T20:45:00Z',
    venue: 'Parc des Princes',
    events: [],
  },
  {
    id: 'm7',
    homeTeam: teams.tottenham,
    awayTeam: teams.newcastle,
    homeScore: 2,
    awayScore: 2,
    status: 'finished',
    competition: 'Premier League',
    date: '2026-01-31T15:00:00Z',
    venue: 'Tottenham Hotspur Stadium',
    events: [
      { id: 'e12', type: 'goal', minute: 11, player: 'H. Son', team: 'home' },
      { id: 'e13', type: 'goal', minute: 29, player: 'A. Isak', team: 'away' },
      { id: 'e14', type: 'goal', minute: 60, player: 'J. Maddison', team: 'home' },
      { id: 'e15', type: 'goal', minute: 78, player: 'A. Gordon', team: 'away' },
    ],
  },
  {
    id: 'm8',
    homeTeam: teams.manutd,
    awayTeam: teams.astonvilla,
    homeScore: null,
    awayScore: null,
    status: 'scheduled',
    competition: 'Premier League',
    date: '2026-02-03T20:00:00Z',
    venue: 'Old Trafford',
    events: [],
  },
];

export const mockTransfers: Transfer[] = [
  {
    id: 't1',
    player: { name: 'Florian Wirtz', age: 22, nationality: 'Germany', image: '🇩🇪', position: 'MID' },
    fromClub: teams.leverkusen,
    toClub: teams.realmadrid,
    fee: '€150M',
    date: '2026-01-28',
    status: 'official',
    contractLength: '6 years',
    league: 'la-liga',
    position: 'MID',
    details: 'Record transfer for a Bundesliga player. Wirtz signs a long-term deal at the Bernabeu.',
  },
  {
    id: 't2',
    player: { name: 'Victor Osimhen', age: 27, nationality: 'Nigeria', image: '🇳🇬', position: 'FWD' },
    fromClub: teams.napoli,
    toClub: teams.chelsea,
    fee: '€110M',
    date: '2026-01-25',
    status: 'confirmed',
    contractLength: '5 years',
    league: 'premier-league',
    position: 'FWD',
    details: 'Chelsea secure their primary striker target after months of negotiations.',
  },
  {
    id: 't3',
    player: { name: 'Lamine Yamal', age: 18, nationality: 'Spain', image: '🇪🇸', position: 'FWD' },
    fromClub: teams.barcelona,
    toClub: teams.mancity,
    fee: '€200M',
    date: '2026-01-30',
    status: 'rumor',
    league: 'premier-league',
    position: 'FWD',
    details: 'Rumored mega-deal that would break the world transfer record. Barcelona deny any talks.',
  },
  {
    id: 't4',
    player: { name: 'Khvicha Kvaratskhelia', age: 25, nationality: 'Georgia', image: '🇬🇪', position: 'FWD' },
    fromClub: teams.psg,
    toClub: teams.liverpool,
    fee: '€85M',
    date: '2026-01-29',
    status: 'negotiation',
    league: 'premier-league',
    position: 'FWD',
    details: 'Liverpool in advanced talks with PSG. Personal terms already agreed with the player.',
  },
  {
    id: 't5',
    player: { name: 'Jamal Musiala', age: 23, nationality: 'Germany', image: '🇩🇪', position: 'MID' },
    fromClub: teams.bayern,
    toClub: teams.manutd,
    fee: '€120M',
    date: '2026-01-27',
    status: 'rumor',
    league: 'premier-league',
    position: 'MID',
    details: 'Manchester United reportedly preparing a massive bid. Bayern insist player is not for sale.',
  },
  {
    id: 't6',
    player: { name: 'Alessandro Bastoni', age: 26, nationality: 'Italy', image: '🇮🇹', position: 'DEF' },
    fromClub: teams.inter,
    toClub: teams.realmadrid,
    fee: '€70M',
    date: '2026-01-26',
    status: 'negotiation',
    league: 'la-liga',
    position: 'DEF',
    details: 'Real Madrid looking to strengthen their defense. Inter reluctant to sell their key defender.',
  },
  {
    id: 't7',
    player: { name: 'Mike Maignan', age: 31, nationality: 'France', image: '🇫🇷', position: 'GK' },
    fromClub: teams.acmilan,
    toClub: teams.mancity,
    fee: '€55M',
    date: '2026-01-24',
    status: 'official',
    contractLength: '4 years',
    league: 'premier-league',
    position: 'GK',
    details: 'City secure world-class goalkeeper as Ederson replacement.',
  },
  {
    id: 't8',
    player: { name: 'Joao Neves', age: 21, nationality: 'Portugal', image: '🇵🇹', position: 'MID' },
    fromClub: teams.psg,
    toClub: teams.arsenal,
    fee: '€90M',
    date: '2026-01-31',
    status: 'confirmed',
    contractLength: '5 years',
    league: 'premier-league',
    position: 'MID',
    details: 'Arsenal complete signing of Portuguese midfield maestro. Medical passed.',
  },
];

export const mockArticles: Article[] = [
  {
    id: 'a1',
    title: 'Arsenal Secure Dramatic Victory Over Chelsea in London Derby',
    excerpt: 'A thrilling encounter at the Emirates sees Arsenal come from behind to claim all three points in a pulsating London derby.',
    content: `Arsenal produced a stunning second-half performance to beat Chelsea 2-1 at the Emirates Stadium on Saturday. Cole Palmer had given the visitors the lead midway through the first half, but goals from Bukayo Saka and Martin Odegaard turned the game on its head.

The result keeps Arsenal firmly in the title race and deals a significant blow to Chelsea's top-four ambitions. Manager Mikel Arteta praised his team's resilience and character in adversity.

"We showed real character today. Going behind to a team as good as Chelsea could have broken us, but the players showed incredible determination," Arteta said in his post-match press conference.

The tactical battle between the two sides was fascinating, with Arsenal's high press eventually overwhelming Chelsea's attempts to play out from the back. Declan Rice was instrumental in midfield, winning back possession repeatedly in dangerous areas.`,
    author: 'James Richardson',
    date: '2026-02-01',
    category: 'match-report',
    image: 'https://placehold.co/800x400/1e40af/ffffff?text=Arsenal+2-1+Chelsea',
    readTime: 5,
    tags: ['Arsenal', 'Chelsea', 'Premier League', 'London Derby'],
    source: 'Soccer Hub',
  },
  {
    id: 'a2',
    title: 'Tactical Breakdown: How Liverpool Outplayed Man City',
    excerpt: 'An in-depth analysis of how Arne Slot\'s tactical adjustments led Liverpool to a thrilling 3-2 victory at Anfield.',
    content: `Liverpool's 3-2 victory over Manchester City was a masterclass in tactical flexibility. Arne Slot made key adjustments that exploited City's vulnerabilities in the wide areas.

The key to Liverpool's success was their pressing structure. By using a 4-2-3-1 formation that converted to a 4-4-2 out of possession, they were able to overload City's midfield and force turnovers high up the pitch.

Mohamed Salah's positioning was crucial. Operating in the right half-space rather than hugging the touchline, he found pockets of space between City's full-back and center-back. This was the source of Liverpool's opening goal.

City's response to go 2-2 showed their quality, but ultimately Slot's decision to introduce fresh legs in the 75th minute proved decisive, with substitute Darwin Nunez heading home the winner in the 89th minute.`,
    author: 'Sarah Mitchell',
    date: '2026-01-31',
    category: 'tactical-analysis',
    image: 'https://placehold.co/800x400/dc2626/ffffff?text=Liverpool+3-2+Man+City',
    readTime: 8,
    tags: ['Liverpool', 'Manchester City', 'Tactical Analysis', 'Premier League'],
    source: 'Soccer Hub',
  },
  {
    id: 'a3',
    title: 'Exclusive: Florian Wirtz Speaks About His Real Madrid Move',
    excerpt: 'In his first interview since completing his record-breaking move, Wirtz opens up about his dreams, ambitions, and what fans can expect.',
    content: `Florian Wirtz sat down for an exclusive interview just days after completing his record-breaking €150M move from Bayer Leverkusen to Real Madrid.

"This is a dream come true. When Real Madrid calls, you don't think twice," the 22-year-old said. "I want to win the Champions League and become the best midfielder in the world."

Wirtz spoke about his relationship with former Leverkusen coach Xabi Alonso, crediting him for his development. "Xabi taught me so much about positioning and game intelligence. He's a huge reason I'm ready for this step."

The German international also revealed he had spoken with fellow countryman Toni Kroos before making his decision. "Toni told me that Madrid is special. He said the pressure is immense but so are the rewards."

Fans can expect Wirtz to make his debut in the upcoming Champions League knockout stage, where Madrid face Liverpool in what promises to be a blockbuster tie.`,
    author: 'Carlos Mendez',
    date: '2026-01-29',
    category: 'interview',
    image: 'https://placehold.co/800x400/f59e0b/ffffff?text=Wirtz+Interview',
    readTime: 6,
    tags: ['Florian Wirtz', 'Real Madrid', 'Transfer', 'Bundesliga'],
    source: 'Soccer Hub',
  },
  {
    id: 'a4',
    title: 'Opinion: Why the Transfer Market Has Gone Completely Mad',
    excerpt: 'Record fees, inflated wages, and unsustainable spending - a deep dive into the state of modern football transfers.',
    content: `The January 2026 transfer window has shattered all records, with clubs spending over €2 billion in a single month. But at what cost?

When Lamine Yamal, just 18 years old, is being linked with a €200M move, we have to ask: have we lost all sense of proportion? The answer, unfortunately, is yes.

The influx of sovereign wealth funds and private equity into football has created an arms race where spending has no ceiling. Manchester City, backed by Abu Dhabi's investment group, have spent over €1 billion in the last three windows alone.

But it's not just the mega-clubs. Mid-table teams are now spending what would have been considered elite-level money just five years ago. This creates a bubble that inevitably must burst.

UEFA's financial fair play regulations have proven toothless, with clubs finding creative ways to structure deals that technically comply while violating the spirit of the rules.

The question remains: is this sustainable? History suggests it isn't.`,
    author: 'David Williams',
    date: '2026-01-30',
    category: 'opinion',
    image: 'https://placehold.co/800x400/7c3aed/ffffff?text=Transfer+Market+Analysis',
    readTime: 7,
    tags: ['Transfers', 'Opinion', 'Financial Fair Play', 'Football Economics'],
    source: 'Soccer Hub',
  },
  {
    id: 'a5',
    title: 'El Clasico Preview: Real Madrid vs Barcelona - Everything You Need to Know',
    excerpt: 'The biggest match in world football is upon us. We break down the form, tactics, and key battles ahead of this weekend\'s El Clasico.',
    content: `Real Madrid welcome Barcelona to the Santiago Bernabeu this Saturday in what promises to be one of the most anticipated El Clasicos in recent memory.

Both teams arrive in excellent form. Real Madrid are unbeaten in their last 12 matches, while Barcelona have won 8 of their last 10. The title race is separated by just two points.

Key battles to watch include the midfield duel between new signing Florian Wirtz and Barcelona's Pedri. Both are creative maestros who will look to dictate the tempo of the game.

In defense, the absence of Barcelona's Ronald Araujo through injury could prove crucial, with Real Madrid's Vinicius Jr. expected to target the weakened right side of Barca's defense.

Historical stats favor Real Madrid at the Bernabeu, where they've won 6 of the last 10 meetings. However, Barcelona's away form this season has been formidable, dropping points just twice on the road.`,
    author: 'Ana Garcia',
    date: '2026-02-01',
    category: 'match-report',
    image: 'https://placehold.co/800x400/1e3a8a/ffffff?text=El+Clasico+Preview',
    readTime: 6,
    tags: ['Real Madrid', 'Barcelona', 'La Liga', 'El Clasico'],
    source: 'Soccer Hub',
  },
  {
    id: 'a6',
    title: 'Transfer Round-Up: Every Confirmed Deal This January',
    excerpt: 'A comprehensive list of all confirmed transfers from the January 2026 window, including fees, contract lengths, and analysis.',
    content: `The January 2026 transfer window has been one of the busiest on record. Here's a complete round-up of every major confirmed deal.

PREMIER LEAGUE:
- Victor Osimhen: Napoli → Chelsea (€110M)
- Mike Maignan: AC Milan → Manchester City (€55M)
- Joao Neves: PSG → Arsenal (€90M)

LA LIGA:
- Florian Wirtz: Leverkusen → Real Madrid (€150M)

Total spending by league:
- Premier League: €1.2B
- La Liga: €450M
- Serie A: €320M
- Bundesliga: €280M
- Ligue 1: €200M

The window still has hours to go, and several deals remain in the pipeline. Stay tuned for our deadline day live blog covering every last-minute move.`,
    author: 'Michael Torres',
    date: '2026-01-31',
    category: 'transfer-news',
    image: 'https://placehold.co/800x400/059669/ffffff?text=Transfer+Round-Up',
    readTime: 4,
    tags: ['Transfers', 'January Window', 'Premier League', 'La Liga'],
    source: 'Soccer Hub',
  },
];

export const mockOdds: OddsMarket[] = [
  {
    id: 'o1',
    match: mockMatches[3],
    bookmaker: 'Bet365',
    markets: [
      {
        type: 'match_winner',
        outcomes: [
          { name: 'Bayern Munich', odds: 1.65, movement: 'down' },
          { name: 'Draw', odds: 3.80, movement: 'stable' },
          { name: 'Borussia Dortmund', odds: 5.20, movement: 'up' },
        ],
      },
      {
        type: 'over_under',
        outcomes: [
          { name: 'Over 2.5', odds: 1.55, movement: 'stable' },
          { name: 'Under 2.5', odds: 2.45, movement: 'stable' },
        ],
      },
      {
        type: 'both_teams_score',
        outcomes: [
          { name: 'Yes', odds: 1.60, movement: 'down' },
          { name: 'No', odds: 2.25, movement: 'up' },
        ],
      },
    ],
    lastUpdated: '2026-02-01T12:00:00Z',
  },
  {
    id: 'o2',
    match: mockMatches[5],
    bookmaker: 'Bet365',
    markets: [
      {
        type: 'match_winner',
        outcomes: [
          { name: 'PSG', odds: 1.40, movement: 'stable' },
          { name: 'Draw', odds: 4.50, movement: 'stable' },
          { name: 'Marseille', odds: 7.50, movement: 'up' },
        ],
      },
      {
        type: 'over_under',
        outcomes: [
          { name: 'Over 2.5', odds: 1.70, movement: 'down' },
          { name: 'Under 2.5', odds: 2.10, movement: 'up' },
        ],
      },
      {
        type: 'both_teams_score',
        outcomes: [
          { name: 'Yes', odds: 1.90, movement: 'stable' },
          { name: 'No', odds: 1.85, movement: 'stable' },
        ],
      },
    ],
    lastUpdated: '2026-02-01T12:00:00Z',
  },
  {
    id: 'o3',
    match: mockMatches[7],
    bookmaker: 'Bet365',
    markets: [
      {
        type: 'match_winner',
        outcomes: [
          { name: 'Man United', odds: 2.10, movement: 'up' },
          { name: 'Draw', odds: 3.40, movement: 'stable' },
          { name: 'Aston Villa', odds: 3.50, movement: 'down' },
        ],
      },
      {
        type: 'over_under',
        outcomes: [
          { name: 'Over 2.5', odds: 1.80, movement: 'stable' },
          { name: 'Under 2.5', odds: 2.00, movement: 'stable' },
        ],
      },
      {
        type: 'both_teams_score',
        outcomes: [
          { name: 'Yes', odds: 1.72, movement: 'down' },
          { name: 'No', odds: 2.05, movement: 'up' },
        ],
      },
    ],
    lastUpdated: '2026-02-01T12:00:00Z',
  },
];

function generateStandings(league: League): StandingEntry[] {
  const leagueTeams: Record<League, Team[]> = {
    'premier-league': [teams.arsenal, teams.liverpool, teams.mancity, teams.chelsea, teams.tottenham, teams.manutd, teams.newcastle, teams.astonvilla],
    'la-liga': [teams.realmadrid, teams.barcelona, teams.atletico],
    'serie-a': [teams.inter, teams.juventus, teams.acmilan, teams.napoli],
    'bundesliga': [teams.leverkusen, teams.bayern, teams.dortmund],
    'ligue-1': [teams.psg, teams.marseille],
  };

  const forms: ('W' | 'D' | 'L')[][] = [
    ['W', 'W', 'W', 'D', 'W'],
    ['W', 'W', 'D', 'W', 'L'],
    ['W', 'D', 'W', 'W', 'W'],
    ['W', 'L', 'W', 'W', 'D'],
    ['D', 'W', 'L', 'W', 'W'],
    ['W', 'L', 'D', 'W', 'L'],
    ['L', 'W', 'W', 'D', 'L'],
    ['L', 'D', 'W', 'L', 'W'],
  ];

  return (leagueTeams[league] || []).map((team, index) => {
    const played = 22 - index;
    const won = Math.max(14 - index * 2, 5);
    const drawn = Math.min(3 + index, 7);
    const lost = played - won - drawn;
    const goalsFor = Math.max(48 - index * 5, 20);
    const goalsAgainst = Math.min(15 + index * 4, 35);
    return {
      position: index + 1,
      team,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      goalDifference: goalsFor - goalsAgainst,
      points: won * 3 + drawn,
      form: forms[index % forms.length],
    };
  });
}

export const mockStandings: Record<League, StandingEntry[]> = {
  'premier-league': generateStandings('premier-league'),
  'la-liga': generateStandings('la-liga'),
  'serie-a': generateStandings('serie-a'),
  'bundesliga': generateStandings('bundesliga'),
  'ligue-1': generateStandings('ligue-1'),
};

export { teams };
