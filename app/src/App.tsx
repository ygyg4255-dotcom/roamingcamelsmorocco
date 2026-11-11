import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { FAQPage } from './pages/FAQPage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { AdminPage } from './pages/AdminPage';

interface AppProps {
  initialPath?: string;
}

export const App: React.FC<AppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) return initialPath;
    if (typeof window !== 'undefined') {
      const dataRoute = document.body.getAttribute('data-route');
      if (dataRoute) return dataRoute;
      const p = window.location.pathname;
      return p.endsWith('/') && p.length > 1 ? p : `${p}/`;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p.endsWith('/') && p.length > 1 ? p : `${p}/`);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept local link clicks for SPA navigation when in client
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external or protocol links
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('tel:') || href.startsWith('mailto:')) {
        return;
      }

      // Handle anchor links on same page
      if (href.startsWith('#')) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Handle cross-page anchors like /#quote-form or /#extended_tours
      if (href.startsWith('/#')) {
        const anchor = href.slice(2);
        if (currentPath === '/' || currentPath === '/morocco-tour-finder/') {
          e.preventDefault();
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          e.preventDefault();
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
          setTimeout(() => {
            const el = document.getElementById(anchor);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        return;
      }

      // Internal routing for our routes
      const routes = [
        '/',
        '/morocco-tour-finder/',
        '/about/',
        '/how-we-work/',
        '/faq/',
        '/morocco-travel-guide/',
        '/admin/'
      ];
      const normalized = href.endsWith('/') ? href : `${href}/`;
      if (routes.includes(normalized)) {
        e.preventDefault();
        window.history.pushState({}, '', normalized);
        setCurrentPath(normalized);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [currentPath]);

  const isAdmin = currentPath.toLowerCase().includes('admin');

  if (isAdmin) {
    return <AdminPage />;
  }

  // Select page component
  const renderPage = () => {
    const norm = currentPath.toLowerCase();
    if (norm.includes('about')) {
      return <AboutPage />;
    }
    if (norm.includes('how-we-work')) {
      return <HowWeWorkPage />;
    }
    if (norm.includes('faq')) {
      return <FAQPage />;
    }
    if (norm.includes('travel-guide') || norm.includes('morocco-travel-guide')) {
      return <TravelGuidePage />;
    }
    return <HomePage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar currentPath={currentPath} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};
