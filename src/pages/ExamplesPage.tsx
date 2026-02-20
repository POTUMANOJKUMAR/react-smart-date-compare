import React from 'react';
import { EXAMPLE_CONFIGS } from '../data/exampleConfigs';
import { ExampleCard } from '../components/ExampleCard';

export const ExamplesPage: React.FC = () => (
    <div style={{ padding: '40px 0 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
            <div style={{
                display: 'inline-flex', padding: '3px 12px', borderRadius: 100, marginBottom: 12,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: '#a5b4fc', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
            }}>
                Examples
            </div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>
                Real-world patterns
            </h1>
            <p style={{ margin: '10px 0 0', fontSize: 16, color: '#8a8a9a', maxWidth: 520, lineHeight: 1.6 }}>
                Copy-paste ready examples covering the most common integration scenarios. Each example includes the live component and source code.
            </p>
        </div>

        {/* Filter hint */}
        <div style={{
            display: 'flex', gap: 16, marginBottom: 36,
            padding: '12px 18px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            alignItems: 'center',
        }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: 13, color: '#8a8a9a' }}>
                Click <strong style={{ color: '#c8c8d8' }}>Show code</strong> on any example to see the full implementation. Use the{' '}
                <strong style={{ color: '#c8c8d8' }}>Copy</strong> button to grab the snippet.
            </span>
        </div>

        {/* Examples grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 20 }}>
            {EXAMPLE_CONFIGS.map((config, i) => (
                <ExampleCard key={config.id} config={config} index={i} />
            ))}
        </div>

        {/* Community section */}
        <div style={{
            marginTop: 64, padding: '40px 40px', borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(129,140,248,0.04))',
            border: '1px solid rgba(99,102,241,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32,
            flexWrap: 'wrap',
        }}>
            <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#f1f1f3' }}>Have a pattern to share?</h3>
                <p style={{ margin: '6px 0 0', fontSize: 14, color: '#8a8a9a' }}>
                    Open a PR on GitHub with your example and we'll add it to the library.
                </p>
            </div>
            <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 24px', borderRadius: 8,
                    background: '#6366f1', color: '#fff',
                    textDecoration: 'none', fontFamily: 'inherit',
                    fontSize: 14, fontWeight: 600,
                    boxShadow: '0 0 24px rgba(99,102,241,0.3)',
                    whiteSpace: 'nowrap',
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Contribute on GitHub
            </a>
        </div>
    </div>
);
