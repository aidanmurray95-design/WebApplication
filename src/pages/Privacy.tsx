import Card from '../components/common/Card';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Privacy Policy</h1>
      <Card className="p-6 space-y-4 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
        <p className="text-xs text-surface-400">Last updated: February 1, 2026</p>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">1. Information We Collect</h2>
          <p>Soccer Hub stores minimal user data, all of which is kept locally in your browser:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Theme preference (light/dark mode)</li>
            <li>Favorite teams selection</li>
            <li>Preferred leagues</li>
            <li>Bookmarked articles</li>
            <li>Recent search history</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">2. Local Storage</h2>
          <p>All user preferences are stored in your browser&apos;s local storage. This data never leaves your device and is not transmitted to any server.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">3. Third-Party Services</h2>
          <p>We use third-party APIs to provide soccer data and betting odds. These services have their own privacy policies:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>football-data.org - Soccer scores and standings</li>
            <li>the-odds-api.com - Betting odds data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">4. Cookies</h2>
          <p>Soccer Hub does not use tracking cookies. The only browser storage used is localStorage for your preferences.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">5. Data Security</h2>
          <p>Since all data is stored locally on your device, security is dependent on your browser&apos;s built-in security features. We do not collect or store any personal data on our servers.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">6. Children&apos;s Privacy</h2>
          <p>Soccer Hub does not knowingly collect any personal information from children under 13. The betting odds section is intended for users aged 18+ (21+ in some jurisdictions).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">7. Your Rights</h2>
          <p>You can clear all stored data at any time by clearing your browser&apos;s local storage. No account creation or personal information is required to use Soccer Hub.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">8. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date.</p>
        </section>
      </Card>
    </div>
  );
}
