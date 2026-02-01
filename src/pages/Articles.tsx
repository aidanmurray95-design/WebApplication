import { useState, useMemo } from 'react';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchArticles, fetchArticleById } from '../services/api';
import type { ArticleCategory, ArticleFilters, Article } from '../types';
import ArticleCard from '../components/articles/ArticleCard';
import SearchInput from '../components/common/SearchInput';
import Tabs from '../components/common/Tabs';
import Modal from '../components/common/Modal';
import SkeletonCard from '../components/common/SkeletonCard';
import Badge from '../components/common/Badge';
import { useStore } from '../store/useStore';
import { formatDate, getCategoryLabel, getCategoryColor } from '../utils/format';

export default function Articles() {
  const { recentSearches, addRecentSearch, bookmarkedArticles } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ArticleCategory | ''>('');
  const [sortBy, setSortBy] = useState<ArticleFilters['sortBy']>('date');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const filters = useMemo<ArticleFilters>(() => ({
    search: search || undefined,
    category: category || undefined,
    sortBy,
  }), [search, category, sortBy]);

  const { data: articles, loading } = useDataFetching(
    () => fetchArticles(filters),
    [JSON.stringify(filters)]
  );

  const displayArticles = showBookmarked
    ? articles?.filter((a) => bookmarkedArticles.includes(a.id)) || []
    : articles || [];

  const categoryTabs = [
    { id: '', label: 'All' },
    { id: 'match-report', label: 'Match Reports' },
    { id: 'tactical-analysis', label: 'Tactical Analysis' },
    { id: 'interview', label: 'Interviews' },
    { id: 'opinion', label: 'Opinion' },
    { id: 'transfer-news', label: 'Transfer News' },
  ];

  const handleArticleClick = async (articleId: string) => {
    const article = await fetchArticleById(articleId);
    if (article) setSelectedArticle(article);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Articles & News</h1>
        <p className="text-sm text-surface-500 mt-1">Curated soccer news, analysis, and opinion pieces</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v);
              if (v.length > 2) addRecentSearch(v);
            }}
            placeholder="Search articles..."
            className="flex-1"
            recentSearches={recentSearches}
            onSelectRecent={setSearch}
          />
          <button
            onClick={() => setShowBookmarked(!showBookmarked)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border transition-colors ${
              showBookmarked
                ? 'bg-primary-50 dark:bg-primary-950 border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800'
            }`}
          >
            <svg
              className={`w-4 h-4 ${showBookmarked ? 'fill-primary-500' : ''}`}
              fill={showBookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Saved
            {bookmarkedArticles.length > 0 && (
              <span className="bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {bookmarkedArticles.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Tabs
            tabs={categoryTabs}
            activeTab={category}
            onChange={(id) => setCategory(id as ArticleCategory | '')}
            className="flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ArticleFilters['sortBy'])}
            className="px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            aria-label="Sort articles"
          >
            <option value="date">Latest</option>
            <option value="readTime">Quick Reads</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} showImage lines={3} />)}
        </div>
      ) : displayArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-surface-400 text-lg">
            {showBookmarked ? 'No saved articles' : 'No articles found'}
          </p>
          <p className="text-surface-400 text-sm mt-1">
            {showBookmarked ? 'Bookmark articles to see them here' : 'Try adjusting your filters'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => handleArticleClick(article.id)}
            />
          ))}
        </div>
      )}

      {/* Article Detail Modal */}
      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.title || ''}
        size="lg"
      >
        {selectedArticle && (
          <div className="space-y-4">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <Badge color={`${getCategoryColor(selectedArticle.category)} text-white`}>
                {getCategoryLabel(selectedArticle.category)}
              </Badge>
              <span className="text-xs text-surface-400">{selectedArticle.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <span>By {selectedArticle.author}</span>
              <span>&middot;</span>
              <span>{formatDate(selectedArticle.date)}</span>
              <span>&middot;</span>
              <span>{selectedArticle.source}</span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-surface-200 dark:border-surface-800">
              {selectedArticle.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-500 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
