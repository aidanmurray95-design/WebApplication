import { Link } from 'react-router-dom';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchMatches, fetchTransfers, fetchArticles, fetchOdds } from '../services/api';
import LiveScoresWidget from '../components/scores/LiveScoresWidget';
import MatchCard from '../components/scores/MatchCard';
import TransferCard from '../components/transfers/TransferCard';
import ArticleCard from '../components/articles/ArticleCard';
import OddsDisplay from '../components/betting/OddsDisplay';
import SkeletonCard from '../components/common/SkeletonCard';

export default function Home() {
  const { data: matches, loading: matchesLoading } = useDataFetching(() => fetchMatches(), []);
  const { data: transfers, loading: transfersLoading } = useDataFetching(() => fetchTransfers(), []);
  const { data: articles, loading: articlesLoading } = useDataFetching(() => fetchArticles(), []);
  const { data: odds, loading: oddsLoading } = useDataFetching(() => fetchOdds(), []);

  const upcomingMatches = matches?.filter((m) => m.status === 'scheduled').slice(0, 3) || [];
  const recentResults = matches?.filter((m) => m.status === 'finished').slice(0, 3) || [];
  const featuredTransfers = transfers?.slice(0, 4) || [];
  const latestArticles = articles?.slice(0, 3) || [];
  const trendingOdds = odds?.slice(0, 2) || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-900 rounded-2xl p-6 md:p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Soccer Hub</h1>
          <p className="text-primary-100 text-sm md:text-base max-w-xl">
            Your all-in-one platform for live scores, transfer news, articles, and match insights from the world&apos;s top leagues.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 text-[120px] opacity-10 select-none">
          ⚽
        </div>
      </section>

      {/* Live Scores */}
      <section>
        <LiveScoresWidget />
      </section>

      {/* Upcoming Matches */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Upcoming Matches</h2>
          <Link to="/matches" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all &rarr;
          </Link>
        </div>
        {matchesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Results */}
      {recentResults.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Recent Results</h2>
            <Link to="/matches" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentResults.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Transfers */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Transfer News</h2>
          <Link to="/transfers" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all &rarr;
          </Link>
        </div>
        {transfersLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} lines={4} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {featuredTransfers.map((transfer) => (
              <TransferCard key={transfer.id} transfer={transfer} compact />
            ))}
          </div>
        )}
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Latest Articles</h2>
          <Link to="/articles" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all &rarr;
          </Link>
        </div>
        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} showImage lines={3} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Odds */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">Trending Markets</h2>
          <Link to="/odds" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all &rarr;
          </Link>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            ⚠️ Odds are for informational purposes only. This is not a betting platform. 18+ | Gamble responsibly.
          </p>
        </div>
        {oddsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2].map((i) => <SkeletonCard key={i} lines={5} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trendingOdds.map((o) => (
              <OddsDisplay key={o.id} odds={o} compact />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
