import { useDataFetching } from '../hooks/useDataFetching';
import { fetchOdds } from '../services/api';
import OddsDisplay from '../components/betting/OddsDisplay';
import ResponsibleGamblingBanner from '../components/betting/ResponsibleGamblingBanner';
import SkeletonCard from '../components/common/SkeletonCard';
import Card from '../components/common/Card';

export default function Odds() {
  const { data: odds, loading } = useDataFetching(() => fetchOdds(), []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Betting Odds</h1>
        <p className="text-sm text-surface-500 mt-1">Current odds for upcoming matches - informational purposes only</p>
      </div>

      {/* Responsible Gambling Banner */}
      <ResponsibleGamblingBanner />

      {/* Age Verification Notice */}
      <Card className="p-4 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔞</span>
          <div>
            <h3 className="font-bold text-red-800 dark:text-red-200 text-sm">Age Verification</h3>
            <p className="text-xs text-red-700 dark:text-red-300">
              You must be 18 years or older (21+ in some jurisdictions) to view betting odds information.
              By viewing this page, you confirm that you meet the minimum age requirement in your jurisdiction.
            </p>
          </div>
        </div>
      </Card>

      {/* Odds Info */}
      <Card className="p-4">
        <h3 className="font-bold text-surface-900 dark:text-white text-sm mb-2">Understanding Odds</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-surface-500 dark:text-surface-400">
          <div>
            <p className="font-medium text-surface-700 dark:text-surface-300 mb-1">Match Winner</p>
            <p>Predict which team will win the match, or if it will end in a draw.</p>
          </div>
          <div>
            <p className="font-medium text-surface-700 dark:text-surface-300 mb-1">Over/Under 2.5</p>
            <p>Predict whether the total goals scored will be over or under 2.5.</p>
          </div>
          <div>
            <p className="font-medium text-surface-700 dark:text-surface-300 mb-1">Both Teams to Score</p>
            <p>Predict whether both teams will score at least one goal each.</p>
          </div>
        </div>
      </Card>

      {/* Odds Movement Legend */}
      <div className="flex items-center gap-4 text-xs text-surface-500">
        <span className="font-medium">Odds Movement:</span>
        <span className="flex items-center gap-1">
          <span className="text-green-500">↑</span> Odds increased (drifting)
        </span>
        <span className="flex items-center gap-1">
          <span className="text-red-500">↓</span> Odds decreased (shortening)
        </span>
      </div>

      {/* Odds Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} lines={6} />)}
        </div>
      ) : !odds || odds.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-surface-400 text-lg">No odds available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {odds.map((o) => (
            <OddsDisplay key={o.id} odds={o} />
          ))}
        </div>
      )}

      {/* Bottom Disclaimer */}
      <Card className="p-4 bg-surface-50 dark:bg-surface-900">
        <h3 className="font-bold text-surface-900 dark:text-white text-sm mb-2">Important Disclaimers</h3>
        <ul className="space-y-2 text-xs text-surface-500 dark:text-surface-400">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0">•</span>
            Soccer Hub is NOT a betting platform. We do not accept bets or facilitate gambling in any way.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0">•</span>
            Odds are sourced from third-party providers and displayed for informational purposes only.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0">•</span>
            Odds may change at any time and may not reflect the most current values.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0">•</span>
            If you choose to gamble, please do so responsibly. Set limits and never bet more than you can afford to lose.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 shrink-0">•</span>
            Help resources: <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">ncpgambling.org</a> | <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Gamblers Anonymous</a> | 1-800-GAMBLER
          </li>
        </ul>
      </Card>
    </div>
  );
}
