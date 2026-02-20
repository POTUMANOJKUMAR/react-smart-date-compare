import React, { useState } from 'react';
import { SmartDateCompare } from '../lib/components/SmartDateCompare';
import { CodeBlock } from '../components/CodeBlock';
import { subDays } from 'date-fns';
import type { DateRange } from '../lib/type';

const INSTALL_CODE = `npm install react-smart-date-compare date-fns`;
const IMPORT_CODE = `import { SmartDateCompare } from "react-smart-date-compare";
import "react-smart-date-compare/style.css";`;

const Features = [
    {
        icon: '📅',
        title: 'Smart Presets',
        desc: 'Built-in grouped presets (This week, Last week, YTD…) — or inject your own custom ranges.',
        color: '#6366f1',
    },
    {
        icon: '📊',
        title: 'Compare Mode',
        desc: 'Auto-calculate compare ranges: Previous period, Match day of week, or Same period last year.',
        color: '#f97316',
    },
    {
        icon: '🎨',
        title: 'Fully Themeable',
        desc: 'Override colors via props, CSS variables, or fine-grained Tailwind classNames overrides.',
        color: '#22c55e',
    },
    {
        icon: '🌍',
        title: 'i18n Ready',
        desc: 'Pass any date-fns locale object and override all UI text labels for your language.',
        color: '#eab308',
    },
    {
        icon: '♿',
        title: 'Accessible',
        desc: 'Full keyboard navigation, ARIA attributes, and touch-friendly targets out of the box.',
        color: '#ec4899',
    },
    {
        icon: '📦',
        title: 'Zero Heavy Deps',
        desc: 'Only peer dep is date-fns. No moment.js, no dayjs, no bloat. Tree-shakeable ES modules.',
        color: '#3b82f6',
    },
];

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>{value}</div>
        <div style={{ fontSize: 12, color: '#5a5a7a', fontWeight: 500, marginTop: 2 }}>{label}</div>
    </div>
);

export const HeroPage: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => {
    const [range, setRange] = useState<DateRange>({
        startDate: subDays(new Date(), 30),
        endDate: new Date(),
    });

    return (
        <div>
            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="dot-grid" style={{
                padding: '100px 0 80px',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Glow orbs */}
                <div style={{
                    position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
                    width: 600, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', textAlign: 'center' }}>
                    {/* Badge */}
                    <div className="animate-fade-up" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        marginBottom: 24, padding: '5px 14px', borderRadius: 100,
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.25)',
                        fontSize: 12, color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.04em',
                    }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                        v1.0.0 — Now on NPM
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-up" style={{
                        margin: '0 0 18px',
                        fontSize: 'clamp(32px, 6vw, 60px)',
                        fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1,
                        color: '#f1f1f3',
                    }}>
                        Enterprise{' '}
                        <span className="gradient-text">Google Analytics</span>
                        <br />
                        Style Date Picker for React
                    </h1>

                    <p className="animate-fade-up-delay" style={{
                        margin: '0 auto 40px',
                        maxWidth: 520, fontSize: 18, color: '#8a8a9a', lineHeight: 1.65,
                    }}>
                        A production-ready date range picker with compare mode, grouped presets,
                        full theming, and zero heavy dependencies.
                    </p>

                    {/* CTA Row */}
                    <div className="animate-fade-up-delay" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
                        <button
                            onClick={() => setPage('docs')}
                            style={{
                                padding: '12px 28px', borderRadius: 8, border: 'none',
                                background: '#6366f1', color: '#fff',
                                fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                boxShadow: '0 0 32px rgba(99,102,241,0.4)',
                                transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(99,102,241,0.6)')}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(99,102,241,0.4)')}
                        >
                            Get Started
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setPage('playground')}
                            style={{
                                padding: '12px 28px', borderRadius: 8, cursor: 'pointer',
                                background: 'rgba(255,255,255,0.05)', fontFamily: 'inherit',
                                border: '1px solid rgba(255,255,255,0.1)', color: '#c8c8d8',
                                fontSize: 15, fontWeight: 600, transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget.style.background = 'rgba(255,255,255,0.08)');
                                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)');
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget.style.background = 'rgba(255,255,255,0.05)');
                                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)');
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Live Playground
                        </button>
                    </div>

                    {/* Install command */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 12,
                        padding: '10px 16px 10px 20px', borderRadius: 10,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}>
                        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, color: '#c8c8d8' }}>
                            <span style={{ color: '#5a5a7a' }}>$ </span>
                            npm install{' '}
                            <span style={{ color: '#a5b4fc' }}>react-smart-date-compare</span>
                        </code>
                        <button
                            onClick={() => navigator.clipboard.writeText('npm install react-smart-date-compare')}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
                                borderRadius: 4, color: '#5a5a7a', display: 'flex', alignItems: 'center',
                                transition: 'color 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#a5b4fc')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#5a5a7a')}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ────────────────────────────────────────── */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                padding: '28px 40px', margin: '0 0',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
                gap: 24,
            }}>
                <Stat value="0" label="Breaking Dependencies" />
                <Stat value="4" label="Compare Modes" />
                <Stat value="13+" label="Built-in Presets" />
                <Stat value="100%" label="TypeScript" />
            </div>

            {/* ── Live Demo ────────────────────────────────────────── */}
            <section style={{ padding: '80px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                        Try it live
                    </div>
                    <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>
                        Interactive Demo
                    </h2>
                    <p style={{ margin: '8px 0 0', fontSize: 15, color: '#8a8a9a' }}>
                        This is the actual component — click it and explore.
                    </p>
                </div>

                <div style={{
                    padding: '60px 40px',
                    borderRadius: 16,
                    border: '1px solid rgba(99,102,241,0.15)',
                    background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.07), transparent 70%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
                }}>
                    <SmartDateCompare
                        value={range}
                        enableCompare
                        compareMode="previousPeriod"
                        primaryColor="#6366f1"
                        compareColor="#f97316"
                        onApply={(r) => setRange(r)}
                    />
                    {range && (
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{
                                padding: '8px 18px', borderRadius: 8,
                                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                                fontSize: 13, color: '#a5b4fc', fontFamily: 'var(--font-mono)',
                            }}>
                                {range.startDate.toLocaleDateString()} → {range.endDate.toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────── */}
            <section style={{ padding: '40px 0 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>
                        Everything you need
                    </h2>
                    <p style={{ margin: '8px 0 0', fontSize: 15, color: '#8a8a9a' }}>
                        Purpose-built for analytics and reporting dashboards.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {Features.map(feat => (
                        <div
                            key={feat.title}
                            style={{
                                padding: '24px', borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.06)',
                                background: 'rgba(255,255,255,0.02)',
                                transition: 'all 0.2s', cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget.style.border = `1px solid ${feat.color}25`);
                                (e.currentTarget.style.background = `${feat.color}06`);
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)');
                                (e.currentTarget.style.background = 'rgba(255,255,255,0.02)');
                            }}
                        >
                            <div style={{ fontSize: 28, marginBottom: 12 }}>{feat.icon}</div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f1f3', marginBottom: 6 }}>{feat.title}</div>
                            <div style={{ fontSize: 13.5, color: '#8a8a9a', lineHeight: 1.6 }}>{feat.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Quick Start Code ─────────────────────────────────── */}
            <section style={{ padding: '0 0 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>
                        Up and running in minutes
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#5a5a7a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>1. Install</div>
                        <CodeBlock code={INSTALL_CODE} language="bash" />
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#5a5a7a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>2. Import</div>
                        <CodeBlock code={IMPORT_CODE} language="tsx" />
                    </div>
                </div>
                <div style={{ marginTop: 12, textAlign: 'center' }}>
                    <button
                        onClick={() => setPage('docs')}
                        style={{
                            marginTop: 12, padding: '10px 24px', borderRadius: 8,
                            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
                            color: '#a5b4fc', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                        }}
                    >
                        Full documentation →
                    </button>
                </div>
            </section>
        </div>
    );
};
