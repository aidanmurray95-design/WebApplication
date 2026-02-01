export default function ResponsibleGamblingBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">⚠️</span>
        <div>
          <h3 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-1">
            Responsible Gambling Notice
          </h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
            The odds displayed on this page are for <strong>informational purposes only</strong>.
            Soccer Hub is <strong>NOT</strong> a betting platform and does not facilitate any gambling activities.
            Gambling can be addictive. If you or someone you know has a gambling problem, please seek help.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full font-medium">
              18+ / 21+
            </span>
            <a
              href="https://www.ncpgambling.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full font-medium hover:underline"
            >
              ncpgambling.org
            </a>
            <a
              href="https://www.gamblersanonymous.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full font-medium hover:underline"
            >
              Gamblers Anonymous
            </a>
            <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full font-medium">
              1-800-GAMBLER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
