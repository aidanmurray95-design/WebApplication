import type { Article } from '../../types';
import { formatRelativeDate, getCategoryLabel, getCategoryColor } from '../../utils/format';
import { useStore } from '../../store/useStore';
import Card from '../common/Card';
import Badge from '../common/Badge';

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
  onClick?: () => void;
}

export default function ArticleCard({ article, compact = false, onClick }: ArticleCardProps) {
  const { toggleBookmark, bookmarkedArticles } = useStore();
  const isBookmarked = bookmarkedArticles.includes(article.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${article.title}\n${window.location.origin}/articles/${article.id}`);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  if (compact) {
    return (
      <Card hover onClick={onClick} className="p-3">
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <Badge color={`${getCategoryColor(article.category)} text-white`} className="mb-1.5">
              {getCategoryLabel(article.category)}
            </Badge>
            <h3 className="font-bold text-sm text-surface-900 dark:text-white line-clamp-2">{article.title}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-surface-400">
              <span>{article.author}</span>
              <span>&middot;</span>
              <span>{formatRelativeDate(article.date)}</span>
              <span>&middot;</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover onClick={onClick} className="overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge color={`${getCategoryColor(article.category)} text-white`}>
            {getCategoryLabel(article.category)}
          </Badge>
          <span className="text-xs text-surface-400">{article.readTime} min read</span>
        </div>
        <h3 className="font-bold text-surface-900 dark:text-white line-clamp-2 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-surface-400">
            <span>{article.author}</span>
            <span>&middot;</span>
            <span>{formatRelativeDate(article.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleBookmark}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <svg
                className={`w-4 h-4 ${isBookmarked ? 'text-primary-500 fill-primary-500' : 'text-surface-400'}`}
                fill={isBookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Share article"
            >
              <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
