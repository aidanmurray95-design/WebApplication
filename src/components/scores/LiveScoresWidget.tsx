import { usePolling } from '../../hooks/useDataFetching';
import { fetchLiveScores } from '../../services/api';
import MatchCard from './MatchCard';
import LoadingSpinner from '../common/LoadingSpinner';

export default function LiveScoresWidget() {
  const { data: liveMatches, loading } = usePolling(fetchLiveScores, 30000);

  if (loading && !liveMatches) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Live Scores</h2>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!liveMatches || liveMatches.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-surface-400" />
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Live Scores</h2>
        </div>
        <p className="text-sm text-surface-400 text-center py-6">No live matches at the moment</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-live animate-pulse-live" />
        <h2 className="text-lg font-bold text-surface-900 dark:text-white">Live Scores</h2>
        <span className="text-xs text-surface-400 ml-auto">Auto-updating</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {liveMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
