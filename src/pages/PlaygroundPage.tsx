import React, { useState } from 'react';
import { SmartDateCompare } from '../lib/components/SmartDateCompare';
import { CodeBlock } from '../components/CodeBlock';
import { EXAMPLE_CONFIGS } from '../data/exampleConfigs';
import type { SmartDateCompareProps, CompareMode } from '../lib/type';
import { subDays } from 'date-fns';

// ── Minimal UI Controls ────────────────────────────────────────────

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#c8c8d8', fontWeight: 500 }}>{label}</span>
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: 40, height: 22, borderRadius: 100, position: 'relative', cursor: 'pointer',
                background: checked ? '#6366f1' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.2s', flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute', top: 3, left: checked ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.4)', transition: 'left 0.2s',
            }} />
        </div>
    </label>
);

const Select: React.FC<{ label: string; value: string; options: { label: string; value: string }[]; onChange: (v: string) => void }> = ({ label, value, options, onChange }) => (
    <div>
        <div style={{ fontSize: 11, color: '#5a5a7a', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
                width: '100%', padding: '7px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#c8c8d8', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
                outline: 'none', appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8a9a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 28,
            }}
        >
            {options.map(o => <option key={o.value} value={o.value} style={{ background: '#111118' }}>{o.label}</option>)}
        </select>
    </div>
);

const ColorPicker: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
    <div>
        <div style={{ fontSize: 11, color: '#5a5a7a', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="color" value={value} onChange={e => onChange(e.target.value)}
                style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', padding: 3, cursor: 'pointer', background: 'none', flexShrink: 0 }}
            />
            <code style={{ fontSize: 12, color: '#8a8a9a', fontFamily: 'var(--font-mono)' }}>{value}</code>
        </div>
    </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ fontSize: 10, fontWeight: 700, color: '#5a5a7a', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 8, marginBottom: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {children}
    </div>
);

// ── Single unified config type ─────────────────────────────────────

interface PlaygroundConfig {
    primaryColor: string;
    compareColor: string;
    enableCompare: boolean;
    showCompareToggle: boolean;
    compareMode: CompareMode;
    disableFuture: boolean;
    disablePast: boolean;
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    labels?: Partial<SmartDateCompareProps['labels']>;
    classNames?: SmartDateCompareProps['classNames'];
}

const DEFAULT_CONFIG: PlaygroundConfig = {
    primaryColor: '#6366f1',
    compareColor: '#f97316',
    enableCompare: false,
    showCompareToggle: true,
    compareMode: 'previousPeriod',
    disableFuture: false,
    disablePast: false,
    weekStartsOn: 0,
};

function exampleToConfig(props: Partial<SmartDateCompareProps>): PlaygroundConfig {
    return {
        primaryColor: (props as any).primaryColor || '#6366f1',
        compareColor: (props as any).compareColor || '#f97316',
        enableCompare: !!(props as any).enableCompare,
        showCompareToggle: (props as any).showCompareToggle !== false,
        compareMode: ((props as any).compareMode as CompareMode) || 'previousPeriod',
        disableFuture: !!(props as any).disableFuture,
        disablePast: !!(props as any).disablePast,
        weekStartsOn: ((props as any).weekStartsOn ?? 0) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
        labels: (props as any).labels,
        classNames: (props as any).classNames,
    };
}

// ── Main Playground Page ───────────────────────────────────────────

export const PlaygroundPage: React.FC = () => {
    const [activeExample, setActiveExample] = useState('standard');
    // Single source of truth for all props
    const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
    // Key changes on example switch to force full re-mount of SmartDateCompare
    const [previewKey, setPreviewKey] = useState(0);
    const [showCode, setShowCode] = useState(false);

    const update = (patch: Partial<PlaygroundConfig>) =>
        setConfig(prev => ({ ...prev, ...patch }));

    const loadExample = (id: string) => {
        const ex = EXAMPLE_CONFIGS.find(e => e.id === id);
        if (!ex) return;
        setActiveExample(id);
        setConfig(exampleToConfig(ex.props));  // Replace full config
        setPreviewKey(k => k + 1);             // Force re-mount
    };

    const generatedCode = [
        `import { SmartDateCompare } from "react-smart-date-compare";`,
        ``,
        `<SmartDateCompare`,
        `  defaultValue={{ startDate: subDays(new Date(), 30), endDate: new Date() }}`,
        `  primaryColor="${config.primaryColor}"`,
        `  compareColor="${config.compareColor}"`,
        config.enableCompare ? `  enableCompare={true}` : null,
        config.showCompareToggle ? `  showCompareToggle={true}` : null,
        config.enableCompare ? `  compareMode="${config.compareMode}"` : null,
        config.disableFuture ? `  disableFuture={true}` : null,
        config.disablePast ? `  disablePast={true}` : null,
        config.weekStartsOn !== 0 ? `  weekStartsOn={${config.weekStartsOn}}` : null,
        `  onApply={(range, compareRange) => console.log(range, compareRange)}`,
        `/>`,
    ].filter(Boolean).join('\n');

    return (
        <div style={{ padding: '40px 0 80px' }}>
            {/* Page Header */}
            <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'inline-flex', padding: '3px 12px', borderRadius: 100, marginBottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a5b4fc', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
                    Interactive
                </div>
                <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>Playground</h1>
                <p style={{ margin: '8px 0 0', fontSize: 16, color: '#8a8a9a', maxWidth: 500 }}>
                    Tweak props in real time and see the component respond instantly.
                </p>
            </div>

            {/* Example switcher tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                {EXAMPLE_CONFIGS.map(ex => (
                    <button
                        key={ex.id}
                        onClick={() => loadExample(ex.id)}
                        style={{
                            padding: '6px 16px', borderRadius: 100, border: 'none',
                            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                            background: activeExample === ex.id ? ex.tagColor : 'rgba(255,255,255,0.05)',
                            color: activeExample === ex.id ? '#fff' : '#9a9aaa',
                            boxShadow: activeExample === ex.id ? `0 0 16px ${ex.tagColor}40` : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        {ex.title}
                    </button>
                ))}
            </div>

            {/* 2-col layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, alignItems: 'start' }}>

                {/* ── Left: Props Editor ── */}
                <div style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', background: 'var(--color-surface)', overflow: 'hidden', position: 'sticky', top: 80 }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#c8c8d8' }}>Props Editor</span>
                    </div>

                    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>

                        {/* Colors */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <SectionTitle>Colors</SectionTitle>
                            <ColorPicker
                                label="Primary Color"
                                value={config.primaryColor}
                                onChange={v => update({ primaryColor: v })}
                            />
                            <ColorPicker
                                label="Compare Color"
                                value={config.compareColor}
                                onChange={v => update({ compareColor: v })}
                            />
                        </div>

                        {/* Compare */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <SectionTitle>Compare</SectionTitle>
                            <Toggle
                                label="Enable Compare"
                                checked={config.enableCompare}
                                onChange={v => update({ enableCompare: v })}
                            />
                            <Toggle
                                label="Show Comparison Toggle"
                                checked={config.showCompareToggle}
                                onChange={v => update({ showCompareToggle: v })}
                            />
                            {config.enableCompare && (
                                <Select
                                    label="Mode"
                                    value={config.compareMode}
                                    onChange={v => update({ compareMode: v as CompareMode })}
                                    options={[
                                        { label: 'Prev period (match day)', value: 'previousPeriodMatchDay' },
                                        { label: 'Previous period', value: 'previousPeriod' },
                                        { label: 'Same period last year', value: 'samePeriodLastYear' },
                                        { label: 'Custom range', value: 'custom' },
                                    ]}
                                />
                            )}
                        </div>

                        {/* Constraints */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <SectionTitle>Constraints</SectionTitle>
                            <Toggle label="Disable Future" checked={config.disableFuture} onChange={v => update({ disableFuture: v })} />
                            <Toggle label="Disable Past" checked={config.disablePast} onChange={v => update({ disablePast: v })} />
                            <Select
                                label="Week Starts On"
                                value={String(config.weekStartsOn)}
                                onChange={v => update({ weekStartsOn: Number(v) as PlaygroundConfig['weekStartsOn'] })}
                                options={[
                                    { label: 'Sunday (0)', value: '0' },
                                    { label: 'Monday (1)', value: '1' },
                                    { label: 'Saturday (6)', value: '6' },
                                ]}
                            />
                        </div>

                        {/* View code */}
                        <button
                            onClick={() => setShowCode(v => !v)}
                            style={{
                                padding: '8px 14px', borderRadius: 6, border: '1px solid rgba(99,102,241,0.3)',
                                background: 'rgba(99,102,241,0.08)', color: '#a5b4fc',
                                fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                                display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                            </svg>
                            {showCode ? 'Hide' : 'View'} Generated Code
                        </button>
                    </div>
                </div>

                {/* ── Right: Live Preview ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* Preview window */}
                    <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'var(--color-surface)' }}>
                        {/* Window chrome */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                                <span style={{ fontSize: 11, color: '#5a5a7a', letterSpacing: '0.04em' }}>LIVE PREVIEW</span>
                            </div>
                            <div style={{ width: 50 }} />
                        </div>

                        {/* The component — key forces full re-mount on example switch */}
                        <div style={{
                            padding: '60px 40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)',
                            minHeight: 200,
                        }}>
                            <SmartDateCompare
                                key={previewKey}
                                defaultValue={{ startDate: subDays(new Date(), 30), endDate: new Date() }}
                                primaryColor={config.primaryColor}
                                compareColor={config.compareColor}
                                enableCompare={config.enableCompare}
                                showCompareToggle={config.showCompareToggle}
                                compareMode={config.compareMode}
                                disableFuture={config.disableFuture}
                                disablePast={config.disablePast}
                                weekStartsOn={config.weekStartsOn}
                                labels={config.labels}
                                classNames={config.classNames}
                            />
                        </div>
                    </div>

                    {/* Generated code */}
                    {showCode && (
                        <div>
                            <div style={{ marginBottom: 10, fontSize: 13, color: '#8a8a9a', fontWeight: 500 }}>Generated code:</div>
                            <CodeBlock code={generatedCode} language="tsx" />
                        </div>
                    )}

                    {/* Example description */}
                    {(() => {
                        const ex = EXAMPLE_CONFIGS.find(e => e.id === activeExample);
                        return ex ? (
                            <div style={{ padding: '14px 18px', borderRadius: 8, background: `${ex.tagColor}0d`, border: `1px solid ${ex.tagColor}25`, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ex.tagColor} strokeWidth="2" style={{ marginTop: 2, flexShrink: 0 }}>
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f1f3', marginBottom: 3 }}>{ex.title}</div>
                                    <div style={{ fontSize: 13, color: '#8a8a9a' }}>{ex.description}</div>
                                </div>
                            </div>
                        ) : null;
                    })()}
                </div>
            </div>
        </div>
    );
};
