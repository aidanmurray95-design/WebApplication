import { useState, useMemo } from 'react';
import { useDataFetching } from '../hooks/useDataFetching';
import { fetchTransfers } from '../services/api';
import type { League, PlayerPosition, TransferStatus, TransferFilters } from '../types';
import { LEAGUE_NAMES } from '../types';
import TransferCard from '../components/transfers/TransferCard';
import TransferTimeline from '../components/transfers/TransferTimeline';
import SearchInput from '../components/common/SearchInput';
import Tabs from '../components/common/Tabs';
import SkeletonCard from '../components/common/SkeletonCard';
import { useStore } from '../store/useStore';

type ViewMode = 'cards' | 'timeline';

export default function Transfers() {
  const { recentSearches, addRecentSearch } = useStore();
  const [search, setSearch] = useState('');
  const [leagueFilter, setLeagueFilter] = useState<League | ''>('');
  const [positionFilter, setPositionFilter] = useState<PlayerPosition | ''>('');
  const [statusFilter, setStatusFilter] = useState<TransferStatus | ''>('');
  const [sortBy, setSortBy] = useState<TransferFilters['sortBy']>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const filters = useMemo<TransferFilters>(() => ({
    search: search || undefined,
    league: leagueFilter || undefined,
    position: positionFilter || undefined,
    status: statusFilter || undefined,
    sortBy,
  }), [search, leagueFilter, positionFilter, statusFilter, sortBy]);

  const { data: transfers, loading } = useDataFetching(
    () => fetchTransfers(filters),
    [JSON.stringify(filters)]
  );

  const statusTabs = [
    { id: '', label: 'All' },
    { id: 'official', label: 'Official' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'negotiation', label: 'In Talks' },
    { id: 'rumor', label: 'Rumors' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Transfer Center</h1>
        <p className="text-sm text-surface-500 mt-1">Latest transfer news, rumors, and confirmed deals</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <SearchInput
          value={search}
          onChange={(v) => {
            setSearch(v);
            if (v.length > 2) addRecentSearch(v);
          }}
          placeholder="Search players, clubs..."
          recentSearches={recentSearches}
          onSelectRecent={setSearch}
        />

        <div className="flex flex-wrap gap-2">
          {/* League Filter */}
          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value as League | '')}
            className="px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            aria-label="Filter by league"
          >
            <option value="">All Leagues</option>
            {Object.entries(LEAGUE_NAMES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Position Filter */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value as PlayerPosition | '')}
            className="px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            aria-label="Filter by position"
          >
            <option value="">All Positions</option>
            <option value="GK">Goalkeeper</option>
            <option value="DEF">Defender</option>
            <option value="MID">Midfielder</option>
            <option value="FWD">Forward</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as TransferFilters['sortBy'])}
            className="px-3 py-2 text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            aria-label="Sort by"
          >
            <option value="date">Latest</option>
            <option value="fee">Highest Fee</option>
            <option value="relevance">Relevance</option>
          </select>

          {/* View Mode */}
          <div className="flex items-center ml-auto border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 text-sm ${viewMode === 'cards' ? 'bg-primary-500 text-white' : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'}`}
              aria-label="Card view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-2 text-sm ${viewMode === 'timeline' ? 'bg-primary-500 text-white' : 'text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800'}`}
              aria-label="Timeline view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs
          tabs={statusTabs}
          activeTab={statusFilter}
          onChange={(id) => setStatusFilter(id as TransferStatus | '')}
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} lines={4} />)}
        </div>
      ) : !transfers || transfers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-surface-400 text-lg">No transfers found</p>
          <p className="text-surface-400 text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {transfers.map((transfer) => (
            <TransferCard key={transfer.id} transfer={transfer} />
          ))}
        </div>
      ) : (
        <TransferTimeline transfers={transfers} />
      )}
    </div>
  );
}
