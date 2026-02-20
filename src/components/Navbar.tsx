import React, { useState } from 'react';

interface NavbarProps {
    page: string;
    setPage: (page: string) => void;
}

const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(99,102,241,0.4)',
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="11" rx="2" stroke="white" strokeWidth="1.5" />
                <path d="M1 6h14" stroke="white" strokeWidth="1.5" />
                <rect x="4" y="1" width="1.5" height="4" rx="0.75" fill="white" />
                <rect x="10.5" y="1" width="1.5" height="4" rx="0.75" fill="white" />
                <rect x="4" y="8.5" width="3" height="2" rx="0.5" fill="white" opacity="0.7" />
                <rect x="8.5" y="8.5" width="3" height="2" rx="0.5" fill="rgba(249,115,22,0.9)" />
            </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#f1f1f3', letterSpacing: '-0.01em' }}>
            SmartDate<span style={{ color: '#818cf8' }}>Compare</span>
        </span>
    </div>
);

const NavLink: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 6,
            fontSize: 14, fontWeight: 500,
            color: active ? '#f1f1f3' : '#8a8a9a',
            background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
            transition: 'all 0.15s',
            fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = '#d1d1e0'; }}
        onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = '#8a8a9a'; }}
    >
        {label}
    </button>
);

export const Navbar: React.FC<NavbarProps> = ({ page, setPage }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', height: 60,
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
            <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center' }}>
                <Logo />
            </div>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <NavLink label="Docs" active={page === 'docs'} onClick={() => setPage('docs')} />
                <NavLink label="Examples" active={page === 'examples'} onClick={() => setPage('examples')} />
                <NavLink label="Playground" active={page === 'playground'} onClick={() => setPage('playground')} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* NPM Badge */}
                <a
                    href="https://www.npmjs.com/package/react-smart-date-compare"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '4px 10px', borderRadius: 6,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        fontSize: 12, color: '#8a8a9a',
                        textDecoration: 'none', fontFamily: 'inherit',
                        fontWeight: 500,
                    }}
                >
                    <span style={{ color: '#cb3837', fontWeight: 700 }}>npm</span>
                    <span>v1.0.0</span>
                </a>

                {/* GitHub */}
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 6,
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        fontSize: 13, color: '#a5b4fc',
                        textDecoration: 'none', fontFamily: 'inherit',
                        fontWeight: 500,
                        transition: 'all 0.15s',
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                </a>
            </div>
        </nav>
    );
};
