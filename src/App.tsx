import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Transfers = lazy(() => import('./pages/Transfers'));
const Articles = lazy(() => import('./pages/Articles'));
const Matches = lazy(() => import('./pages/Matches'));
const Odds = lazy(() => import('./pages/Odds'));
const Search = lazy(() => import('./pages/Search'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));

function PageLoader() {
  return <LoadingSpinner className="py-20" size="lg" />;
}

export default function App() {
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/odds" element={<Odds />} />
            <Route path="/search" element={<Search />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
