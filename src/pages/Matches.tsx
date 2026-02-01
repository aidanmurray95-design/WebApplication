import { useState } from 'react';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchMatches, fetchStandings } from '../services/api';
import type { League, StandingEntry } from '../types';
import { LEAGUE_NAMES } from '../types';
import MatchCard from '../components/scores/MatchCard';
import LiveScoresWidget from '../components/scores/LiveScoresWidget';
import Tabs from '../components/common/Tabs';
import Card from '../components/common/Card';
import SkeletonCard from '../components/common/SkeletonCard';
import { getFormBadgeColor } from '../utils/format';

type MatchTab = 'live' | 'upcoming' | 'results';

export default function Matches() {
  const [matchTab, setMatchTab] = useState<MatchTab>('live');
  const [selectedLeague, setSelectedLeague] = useState<League>('premier-league');

  const { data: allMatches, loading: matchesLoading } = useDataFetching(() => fetchMatches(), []);
  const { data: standings, loading: standingsLoading } = useDataFetching(
    () => fetchStandings(selectedLeague),
    [selectedLeague]
  );

  const matchTabs = [
    { id: 'live', label: 'Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'results', label: 'Results' },
  ];

  const filteredMatches = allMatches?.filter((m) => {
    switch (matchTab) {
      case 'live': return m.status === 'live' || m.status === 'halftime';
      case 'upcoming': return m.status === 'scheduled';
      case 'results': return m.status === 'finished';
    }
  }) || [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Match Center</h1>
        <p className="text-sm text-surface-500 mt-1">Fixtures, results, and league standings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live Scores */}
          <LiveScoresWidget />

          {/* Tabs */}
          <Tabs
            tabs={matchTabs}
            activeTab={matchTab}
            onChange={(id) => setMatchTab(id as MatchTab)}
          />

          {/* Match List */}
          {matchesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-surface-400">No {matchTab} matches</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}
        </div>

        {/* Standings Column */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Standings</h2>

          {/* League Selector */}
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value as League)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            aria-label="Select league"
          >
            {Object.entries(LEAGUE_NAMES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Standings Table */}
          {standingsLoading ? (
            <SkeletonCard lines={10} />
          ) : standings && standings.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <p className="text-center text-surface-400 py-4 text-sm">No standings available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StandingsTable({ standings }: { standings: StandingEntry[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-200 dark:border-surface-800">
              <th className="text-left py-2 px-3 text-xs font-medium text-surface-400">#</th>
              <th className="text-left py-2 px-3 text-xs font-medium text-surface-400">Team</th>
              <th className="text-center py-2 px-1 text-xs font-medium text-surface-400">P</th>
              <th className="text-center py-2 px-1 text-xs font-medium text-surface-400">W</th>
              <th className="text-center py-2 px-1 text-xs font-medium text-surface-400">D</th>
              <th className="text-center py-2 px-1 text-xs font-medium text-surface-400">L</th>
              <th className="text-center py-2 px-1 text-xs font-medium text-surface-400">GD</th>
              <th className="text-center py-2 px-3 text-xs font-medium text-surface-400">Pts</th>
              <th className="text-center py-2 px-2 text-xs font-medium text-surface-400 hidden sm:table-cell">Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((entry) => (
              <tr
                key={entry.team.id}
                className="border-b border-surface-100 dark:border-surface-800/50 last:border-0 hover:bg-surface-50 dark:hover:bg-surface-800/30"
              >
                <td className="py-2 px-3 text-xs font-medium text-surface-500">{entry.position}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{entry.team.logo}</span>
                    <span className="text-xs font-medium text-surface-900 dark:text-white truncate">
                      {entry.team.shortName}
                    </span>
                  </div>
                </td>
                <td className="text-center py-2 px-1 text-xs text-surface-500">{entry.played}</td>
                <td className="text-center py-2 px-1 text-xs text-surface-500">{entry.won}</td>
                <td className="text-center py-2 px-1 text-xs text-surface-500">{entry.drawn}</td>
                <td className="text-center py-2 px-1 text-xs text-surface-500">{entry.lost}</td>
                <td className="text-center py-2 px-1 text-xs text-surface-500">
                  {entry.goalDifference > 0 ? '+' : ''}{entry.goalDifference}
                </td>
                <td className="text-center py-2 px-3 text-xs font-bold text-surface-900 dark:text-white">{entry.points}</td>
                <td className="py-2 px-2 hidden sm:table-cell">
                  <div className="flex justify-center gap-0.5">
                    {entry.form.map((result, i) => (
                      <span key={i} className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${getFormBadgeColor(result)}`}>
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
