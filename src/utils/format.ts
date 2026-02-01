export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateStr);
}

export function getMatchStatusLabel(status: string, minute?: number): string {
  switch (status) {
    case 'live':
      return minute ? `${minute}'` : 'LIVE';
    case 'halftime':
      return 'HT';
    case 'finished':
      return 'FT';
    case 'scheduled':
      return 'VS';
    case 'postponed':
      return 'PP';
    default:
      return status.toUpperCase();
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'live':
    case 'halftime':
      return 'text-live';
    case 'finished':
      return 'text-surface-500';
    case 'scheduled':
      return 'text-primary-500';
    default:
      return 'text-surface-400';
  }
}

export function getTransferStatusBadge(status: string): { label: string; color: string } {
  switch (status) {
    case 'official':
      return { label: 'Official', color: 'bg-green-500 text-white' };
    case 'confirmed':
      return { label: 'Confirmed', color: 'bg-blue-500 text-white' };
    case 'negotiation':
      return { label: 'In Talks', color: 'bg-yellow-500 text-black' };
    case 'rumor':
      return { label: 'Rumor', color: 'bg-orange-500 text-white' };
    default:
      return { label: status, color: 'bg-surface-500 text-white' };
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'match-report': 'Match Report',
    'tactical-analysis': 'Tactical Analysis',
    'interview': 'Interview',
    'opinion': 'Opinion',
    'transfer-news': 'Transfer News',
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'match-report': 'bg-blue-500',
    'tactical-analysis': 'bg-purple-500',
    'interview': 'bg-emerald-500',
    'opinion': 'bg-amber-500',
    'transfer-news': 'bg-rose-500',
  };
  return colors[category] || 'bg-surface-500';
}

export function getFormBadgeColor(result: 'W' | 'D' | 'L'): string {
  switch (result) {
    case 'W':
      return 'bg-win text-white';
    case 'D':
      return 'bg-draw text-black';
    case 'L':
      return 'bg-loss text-white';
  }
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
