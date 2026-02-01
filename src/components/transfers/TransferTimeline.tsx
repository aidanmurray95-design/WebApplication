import type { Transfer } from '../../types';
import { formatDate, getTransferStatusBadge } from '../../utils/format';
import Badge from '../common/Badge';

interface TransferTimelineProps {
  transfers: Transfer[];
}

export default function TransferTimeline({ transfers }: TransferTimelineProps) {
  const sorted = [...transfers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-200 dark:bg-surface-800" />
      <div className="space-y-6">
        {sorted.map((transfer) => {
          const statusBadge = getTransferStatusBadge(transfer.status);
          return (
            <div key={transfer.id} className="relative pl-10">
              <div className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-surface-950 ${
                transfer.status === 'official' ? 'bg-green-500' :
                transfer.status === 'confirmed' ? 'bg-blue-500' :
                transfer.status === 'negotiation' ? 'bg-yellow-500' :
                'bg-orange-500'
              }`} />
              <div className="bg-white dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-800 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-surface-400">{formatDate(transfer.date)}</span>
                  <Badge color={statusBadge.color}>{statusBadge.label}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{transfer.player.image}</span>
                  <div>
                    <h4 className="font-bold text-sm text-surface-900 dark:text-white">{transfer.player.name}</h4>
                    <p className="text-xs text-surface-500">
                      {transfer.fromClub.name} → {transfer.toClub.name} &middot; {transfer.fee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
