import Card from '../components/common/Card';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Terms of Service</h1>
      <Card className="p-6 space-y-4 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
        <p className="text-xs text-surface-400">Last updated: February 1, 2026</p>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
          <p>By accessing and using Soccer Hub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">2. Description of Service</h2>
          <p>Soccer Hub provides soccer-related information including live scores, transfer news, articles, and betting odds for informational purposes. We do not facilitate or encourage gambling.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">3. Betting Odds Disclaimer</h2>
          <p>All betting odds displayed on this platform are for <strong>informational purposes only</strong>. Soccer Hub is NOT a betting platform and does not accept bets, facilitate gambling, or encourage users to gamble. If you choose to gamble based on information found on this site, you do so entirely at your own risk.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">4. Data Accuracy</h2>
          <p>While we strive to provide accurate and up-to-date information, we make no warranties regarding the accuracy, completeness, or timeliness of any data displayed on the platform, including scores, standings, and odds.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">5. User Conduct</h2>
          <p>Users agree not to misuse the service, attempt to access unauthorized areas, or use the platform for any unlawful purpose.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">6. Intellectual Property</h2>
          <p>All content, design, and functionality on Soccer Hub are protected by copyright and other intellectual property laws. Data is sourced from third-party APIs and attributed accordingly.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">7. Limitation of Liability</h2>
          <p>Soccer Hub shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our service or reliance on any information provided.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-2">8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
        </section>
      </Card>
    </div>
  );
}
