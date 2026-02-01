import type { Transfer } from '../../types';
import { formatDate, getTransferStatusBadge } from '../../utils/format';
import Card from '../common/Card';
import Badge from '../common/Badge';

interface TransferCardProps {
  transfer: Transfer;
  compact?: boolean;
}

export default function TransferCard({ transfer, compact = false }: TransferCardProps) {
  const statusBadge = getTransferStatusBadge(transfer.status);

  return (
    <Card className={compact ? 'p-3' : 'p-4'}>
      <div className="flex items-start gap-3">
        {/* Player Image */}
        <div className="text-3xl shrink-0">{transfer.player.image}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-surface-900 dark:text-white text-sm">
                {transfer.player.name}
              </h3>
              <p className="text-xs text-surface-400">
                {transfer.player.position} &middot; {transfer.player.age} years &middot; {transfer.player.nationality}
              </p>
            </div>
            <Badge color={statusBadge.color}>{statusBadge.label}</Badge>
          </div>

          {/* Transfer Details */}
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <span className="text-lg">{transfer.fromClub.logo}</span>
              <span className="text-surface-600 dark:text-surface-400 truncate">{compact ? transfer.fromClub.shortName : transfer.fromClub.name}</span>
            </span>
            <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="flex items-center gap-1">
              <span className="text-lg">{transfer.toClub.logo}</span>
              <span className="text-surface-600 dark:text-surface-400 truncate">{compact ? transfer.toClub.shortName : transfer.toClub.name}</span>
            </span>
          </div>

          {/* Fee & Date */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-accent-500">{transfer.fee}</span>
            <span className="text-xs text-surface-400">{formatDate(transfer.date)}</span>
          </div>

          {/* Details */}
          {!compact && transfer.details && (
            <p className="mt-2 text-xs text-surface-500 dark:text-surface-400 line-clamp-2">
              {transfer.details}
            </p>
          )}

          {/* Contract Length */}
          {!compact && transfer.contractLength && (
            <p className="mt-1 text-xs text-surface-400">
              Contract: {transfer.contractLength}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
