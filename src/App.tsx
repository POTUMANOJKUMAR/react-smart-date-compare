import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroPage } from './pages/HeroPage';
import { DocsPage } from './pages/DocsPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

const PAGES = ['home', 'docs', 'examples', 'playground'] as const;
type Page = typeof PAGES[number];

const Container: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({ children, wide }) => (
  <div style={{
    maxWidth: wide ? 1280 : 1100,
    margin: '0 auto',
    padding: '0 32px',
  }}>
    {children}
  </div>
);

// Footer component
const Footer = () => (
  <footer style={{
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '40px 0',
    marginTop: 40,
  }}>
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="11" rx="2" stroke="white" strokeWidth="1.5" />
              <path d="M1 6h14" stroke="white" strokeWidth="1.5" />
              <rect x="4" y="1" width="1.5" height="4" rx="0.75" fill="white" />
              <rect x="10.5" y="1" width="1.5" height="4" rx="0.75" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#5a5a7a' }}>SmartDateCompare</span>
        </div>
        <div style={{ fontSize: 12, color: '#3a3a5a' }}>
          MIT License · Built with React + TypeScript + date-fns
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'npm', href: 'https://www.npmjs.com/package/react-smart-date-compare' },
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'Changelog', href: '#' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: '#5a5a7a', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#8a8a9a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5a5a7a')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Container>
  </footer>
);

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar page={page} setPage={(p) => setPage(p as Page)} />

      {/* Main content offset for fixed navbar */}
      <main style={{ flex: 1, paddingTop: 60 }}>
        {page === 'home' && (
          <Container wide>
            <HeroPage setPage={(p) => setPage(p as Page)} />
          </Container>
        )}

        {page === 'docs' && (
          <Container>
            <DocsPage />
          </Container>
        )}

        {page === 'examples' && (
          <Container wide>
            <ExamplesPage />
          </Container>
        )}

        {page === 'playground' && (
          <Container wide>
            <PlaygroundPage />
          </Container>
        )}
      </main>

      <Footer />
    </div>
  );
}
