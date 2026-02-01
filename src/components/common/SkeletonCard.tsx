interface SkeletonCardProps {
  lines?: number;
  showImage?: boolean;
}

export default function SkeletonCard({ lines = 3, showImage = false }: SkeletonCardProps) {
  return (
    <div className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 p-4 animate-pulse">
      {showImage && (
        <div className="w-full h-40 bg-surface-200 dark:bg-surface-800 rounded-lg mb-4" />
      )}
      <div className="space-y-3">
        <div className="h-4 bg-surface-200 dark:bg-surface-800 rounded w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-surface-200 dark:bg-surface-800 rounded"
            style={{ width: `${60 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}
