import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚽</span>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                Soccer Hub
              </span>
            </div>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Your comprehensive platform for soccer news, scores, transfers, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-surface-500 hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/transfers" className="text-surface-500 hover:text-primary-500 transition-colors">Transfers</Link></li>
              <li><Link to="/articles" className="text-surface-500 hover:text-primary-500 transition-colors">Articles</Link></li>
              <li><Link to="/matches" className="text-surface-500 hover:text-primary-500 transition-colors">Matches</Link></li>
              <li><Link to="/odds" className="text-surface-500 hover:text-primary-500 transition-colors">Odds</Link></li>
            </ul>
          </div>

          {/* Leagues */}
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Leagues</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-surface-500">Premier League</span></li>
              <li><span className="text-surface-500">La Liga</span></li>
              <li><span className="text-surface-500">Serie A</span></li>
              <li><span className="text-surface-500">Bundesliga</span></li>
              <li><span className="text-surface-500">Ligue 1</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-surface-500 hover:text-primary-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-surface-500 hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Gambling Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
            <strong>Responsible Gambling Notice:</strong> Odds displayed on this site are for informational purposes only.
            This is NOT a betting platform. Gambling can be addictive. If you or someone you know has a gambling problem,
            please call 1-800-GAMBLER or visit{' '}
            <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="underline">
              ncpgambling.org
            </a>
            . You must be 18+ (21+ in some jurisdictions) to gamble.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400">
            &copy; {new Date().getFullYear()} Soccer Hub. All rights reserved. Data provided by football-data.org and the-odds-api.com.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-surface-400">Built with React + TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
