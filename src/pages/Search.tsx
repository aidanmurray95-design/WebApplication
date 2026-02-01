import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchAll } from '../services/api';
import type { Match, Transfer, Article } from '../types';
import MatchCard from '../components/scores/MatchCard';
import TransferCard from '../components/transfers/TransferCard';
import ArticleCard from '../components/articles/ArticleCard';
import Tabs from '../components/common/Tabs';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<{
    matches: Match[];
    transfers: Transfer[];
    articles: Article[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchAll(query).then((data) => {
        setResults(data);
        setLoading(false);
      });
    }
  }, [query]);

  const totalResults = results
    ? results.matches.length + results.transfers.length + results.articles.length
    : 0;

  const tabs = [
    { id: 'all', label: 'All', count: totalResults },
    { id: 'matches', label: 'Matches', count: results?.matches.length || 0 },
    { id: 'transfers', label: 'Transfers', count: results?.transfers.length || 0 },
    { id: 'articles', label: 'Articles', count: results?.articles.length || 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Search Results
        </h1>
        <p className="text-sm text-surface-500 mt-1">
          {query ? `Showing results for "${query}"` : 'Enter a search query'}
        </p>
      </div>

      {loading ? (
        <LoadingSpinner className="py-12" />
      ) : results && totalResults > 0 ? (
        <>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          {(activeTab === 'all' || activeTab === 'matches') && results.matches.length > 0 && (
            <section>
              {activeTab === 'all' && (
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-3">Matches</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'transfers') && results.transfers.length > 0 && (
            <section>
              {activeTab === 'all' && (
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-3">Transfers</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.transfers.map((transfer) => (
                  <TransferCard key={transfer.id} transfer={transfer} />
                ))}
              </div>
            </section>
          )}

          {(activeTab === 'all' || activeTab === 'articles') && results.articles.length > 0 && (
            <section>
              {activeTab === 'all' && (
                <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-3">Articles</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-surface-400 text-lg">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-surface-400 text-sm mt-1">Try different keywords or check your spelling</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-surface-400 text-lg">Enter a search query to get started</p>
        </div>
      )}
    </div>
  );
}
