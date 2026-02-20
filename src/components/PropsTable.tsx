import React, { useState } from 'react';
import { PROPS_DOCS, CATEGORY_ORDER, type PropDoc } from '../data/propsDoc';

const CATEGORY_COLORS: Record<PropDoc['category'], string> = {
    Core: '#6366f1',
    Comparison: '#f97316',
    Constraints: '#eab308',
    Styling: '#ec4899',
    Localization: '#22c55e',
    Callbacks: '#3b82f6',
};

export const PropsTable: React.FC = () => {
    const [filter, setFilter] = useState<PropDoc['category'] | 'All'>('All');

    const filtered = PROPS_DOCS.filter(p => filter === 'All' || p.category === filter);

    return (
        <div>
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                {(['All', ...CATEGORY_ORDER] as const).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '5px 14px', borderRadius: 100, border: 'none',
                            fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                            cursor: 'pointer',
                            background: filter === cat
                                ? (cat === 'All' ? '#6366f1' : CATEGORY_COLORS[cat as PropDoc['category']])
                                : 'rgba(255,255,255,0.05)',
                            color: filter === cat ? '#fff' : '#8a8a9a',
                            transition: 'all 0.15s',
                        }}
                    >
                        {cat}
                        {cat !== 'All' && (
                            <span style={{ marginLeft: 5, opacity: 0.7 }}>
                                ({PROPS_DOCS.filter(p => p.category === cat).length})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr 140px 1fr',
                    gap: 0,
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                    {['Prop', 'Type', 'Default', 'Description'].map(h => (
                        <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#5a5a7a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {h}
                        </div>
                    ))}
                </div>

                {/* Rows */}
                {filtered.map((prop, i) => (
                    <div
                        key={prop.name}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr 140px 1fr',
                            gap: 0,
                            padding: '14px 20px',
                            borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                            alignItems: 'start',
                        }}
                    >
                        {/* Name */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <code style={{
                                fontSize: 13, fontFamily: 'var(--font-mono)',
                                color: '#a5b4fc', fontWeight: 600,
                            }}>
                                {prop.name}
                            </code>
                            {prop.required && (
                                <span style={{ fontSize: 10, color: '#f87171', fontWeight: 700, letterSpacing: '0.04em' }}>REQUIRED</span>
                            )}
                            <span style={{
                                fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                                color: CATEGORY_COLORS[prop.category],
                                opacity: 0.8,
                            }}>
                                {prop.category}
                            </span>
                        </div>

                        {/* Type */}
                        <div style={{ paddingRight: 12 }}>
                            <code style={{
                                fontSize: 11.5, fontFamily: 'var(--font-mono)',
                                color: '#86efac',
                                wordBreak: 'break-word',
                            }}>
                                {prop.type}
                            </code>
                        </div>

                        {/* Default */}
                        <div>
                            <code style={{
                                fontSize: 12, fontFamily: 'var(--font-mono)',
                                color: '#fde68a',
                                background: 'rgba(253,230,138,0.08)',
                                padding: '2px 7px', borderRadius: 4,
                            }}>
                                {prop.default}
                            </code>
                        </div>

                        {/* Description */}
                        <div style={{ fontSize: 13.5, color: '#9a9aaa', lineHeight: 1.6 }}>
                            {prop.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
