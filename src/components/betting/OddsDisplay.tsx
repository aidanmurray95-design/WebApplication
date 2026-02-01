import type { OddsMarket, MarketType } from '../../types';
import { formatTime } from '../../utils/format';
import Card from '../common/Card';

interface OddsDisplayProps {
  odds: OddsMarket;
  compact?: boolean;
}

function getMarketLabel(type: MarketType): string {
  switch (type) {
    case 'match_winner': return 'Match Winner';
    case 'over_under': return 'Over/Under 2.5';
    case 'both_teams_score': return 'Both Teams to Score';
  }
}

function getMovementIcon(movement?: 'up' | 'down' | 'stable'): string {
  switch (movement) {
    case 'up': return '↑';
    case 'down': return '↓';
    default: return '';
  }
}

function getMovementColor(movement?: 'up' | 'down' | 'stable'): string {
  switch (movement) {
    case 'up': return 'text-green-500';
    case 'down': return 'text-red-500';
    default: return '';
  }
}

export default function OddsDisplay({ odds, compact = false }: OddsDisplayProps) {
  const match = odds.match;

  return (
    <Card className={compact ? 'p-3' : 'p-4'}>
      {/* Match Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span>{match.homeTeam.logo}</span>
          <span className="font-medium text-surface-900 dark:text-white">{match.homeTeam.shortName}</span>
          <span className="text-surface-400">vs</span>
          <span className="font-medium text-surface-900 dark:text-white">{match.awayTeam.shortName}</span>
          <span>{match.awayTeam.logo}</span>
        </div>
        <span className="text-xs text-surface-400">{formatTime(match.date)}</span>
      </div>

      {/* Markets */}
      <div className="space-y-3">
        {odds.markets.map((market) => (
          <div key={market.type}>
            <p className="text-xs text-surface-400 font-medium mb-1.5">{getMarketLabel(market.type)}</p>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${market.outcomes.length}, 1fr)` }}>
              {market.outcomes.map((outcome) => (
                <div
                  key={outcome.name}
                  className="flex flex-col items-center p-2 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700"
                >
                  <span className="text-xs text-surface-500 mb-0.5 truncate w-full text-center">{outcome.name}</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-sm font-bold text-surface-900 dark:text-white">
                      {outcome.odds.toFixed(2)}
                    </span>
                    {outcome.movement && outcome.movement !== 'stable' && (
                      <span className={`text-xs ${getMovementColor(outcome.movement)}`}>
                        {getMovementIcon(outcome.movement)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      {!compact && (
        <p className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-800 text-[10px] text-surface-400 text-center">
          Odds for informational purposes only. 18+ | Please gamble responsibly.
        </p>
      )}
    </Card>
  );
}
