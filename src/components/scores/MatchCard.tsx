import type { Match } from '../../types';
import { getMatchStatusLabel, formatTime } from '../../utils/format';
import Card from '../common/Card';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
  onClick?: () => void;
}

export default function MatchCard({ match, compact = false, onClick }: MatchCardProps) {
  const isLive = match.status === 'live' || match.status === 'halftime';
  const isFinished = match.status === 'finished';
  const isScheduled = match.status === 'scheduled';

  return (
    <Card hover={!!onClick} onClick={onClick} className={compact ? 'p-3' : 'p-4'}>
      {/* Competition & Status */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-surface-400 font-medium">{match.competition}</span>
        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
          )}
          <span className={`text-xs font-bold ${
            isLive ? 'text-live' : isFinished ? 'text-surface-400' : 'text-primary-500'
          }`}>
            {getMatchStatusLabel(match.status, match.minute)}
          </span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-3">
        {/* Home Team */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{match.homeTeam.logo}</span>
          <span className={`text-sm font-medium truncate ${
            isFinished && match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore
              ? 'font-bold text-surface-900 dark:text-white'
              : 'text-surface-700 dark:text-surface-300'
          }`}>
            {compact ? match.homeTeam.shortName : match.homeTeam.name}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2 shrink-0">
          {isScheduled ? (
            <span className="text-xs text-surface-400">{formatTime(match.date)}</span>
          ) : (
            <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-lg">
              <span className={`text-lg font-bold ${
                isLive ? 'text-surface-900 dark:text-white' : 'text-surface-600 dark:text-surface-300'
              }`}>
                {match.homeScore}
              </span>
              <span className="text-surface-400 text-sm">-</span>
              <span className={`text-lg font-bold ${
                isLive ? 'text-surface-900 dark:text-white' : 'text-surface-600 dark:text-surface-300'
              }`}>
                {match.awayScore}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span className={`text-sm font-medium truncate ${
            isFinished && match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore
              ? 'font-bold text-surface-900 dark:text-white'
              : 'text-surface-700 dark:text-surface-300'
          }`}>
            {compact ? match.awayTeam.shortName : match.awayTeam.name}
          </span>
          <span className="text-xl shrink-0">{match.awayTeam.logo}</span>
        </div>
      </div>

      {/* Events */}
      {!compact && match.events.length > 0 && (
        <div className="mt-3 pt-3 border-t border-surface-100 dark:border-surface-800 space-y-1">
          {match.events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-center gap-2 text-xs text-surface-500">
              <span className="w-6 text-right font-mono">{event.minute}&apos;</span>
              <span>
                {event.type === 'goal' && '⚽'}
                {event.type === 'yellow_card' && '🟨'}
                {event.type === 'red_card' && '🟥'}
                {event.type === 'substitution' && '🔄'}
              </span>
              <span className={event.team === 'home' ? '' : 'ml-auto'}>
                {event.player}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
