# Soccer Hub ⚽

A modern, responsive web application that serves as a comprehensive platform for soccer enthusiasts, featuring live scores, transfer news, articles, and betting odds integration.

## Features

- **Live Scores** - Real-time match scores with auto-updating (polling)
- **Transfer Center** - Latest transfer rumors, negotiations, and confirmed deals with filtering by league, position, and status
- **Articles & News** - Curated soccer news with categories, bookmarking, and social sharing
- **Match Center** - Fixtures, results, league standings, and team statistics
- **Betting Odds** - Informational odds display with responsible gambling notices (display only, NOT a betting platform)
- **Global Search** - Search across players, teams, and articles
- **Dark Mode** - Full dark/light theme support
- **Responsive Design** - Mobile-first design that works on all devices

## Tech Stack

- **Frontend**: React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with localStorage persistence
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Code Splitting**: Lazy-loaded routes for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### API Key Configuration

1. Copy `.env.example` to `.env`
2. Sign up for free API keys:
   - [football-data.org](https://www.football-data.org/) - Soccer data API
   - [API-Football](https://www.api-football.com/) - Alternative soccer data API
   - [The Odds API](https://the-odds-api.com/) - Betting odds data
   - [NewsAPI](https://newsapi.org/) - Soccer news articles
3. Add your API keys to the `.env` file

> **Note:** The application includes comprehensive mock data and works fully without API keys. Set `VITE_ENABLE_MOCK_DATA=true` in your `.env` to use mock data.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Badge, Card, Modal, Tabs, etc.)
│   ├── layout/          # App layout (Header, Footer, Layout wrapper)
│   ├── scores/          # Match scores components (MatchCard, LiveScoresWidget)
│   ├── transfers/       # Transfer news components (TransferCard, TransferTimeline)
│   ├── articles/        # Article components (ArticleCard)
│   └── betting/         # Betting odds components (OddsDisplay, ResponsibleGamblingBanner)
├── pages/               # Route pages (Home, Transfers, Articles, Matches, Odds, Search)
├── hooks/               # Custom React hooks (useDataFetching, usePolling)
├── services/            # API clients and mock data
├── store/               # Zustand store (theme, preferences, bookmarks)
├── types/               # TypeScript type definitions
└── utils/               # Utility functions (formatting, helpers)
```

## Key Design Decisions

- **Mock Data First**: All features work with built-in mock data, no API keys required for development
- **Code Splitting**: All pages are lazy-loaded for optimal initial load time
- **Persistent State**: User preferences (theme, bookmarks, favorite teams) persist via localStorage
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation support
- **Responsible Gambling**: Prominent disclaimers throughout the odds section; this is strictly an informational platform

## Legal & Ethical Notes

- All betting odds are displayed for **informational purposes only**
- This is **NOT** a betting platform and does not facilitate gambling
- Responsible gambling disclaimers are displayed throughout the application
- Age verification notices (18+/21+) are included
- Links to gambling support resources (NCPG, Gamblers Anonymous, 1-800-GAMBLER)
- Terms of Service and Privacy Policy pages are included

## Data Sources

- Soccer match data: [football-data.org](https://www.football-data.org/)
- Betting odds: [The Odds API](https://the-odds-api.com/)
- Built-in mock data for development and demonstration

## License

This project is for educational and demonstration purposes.
