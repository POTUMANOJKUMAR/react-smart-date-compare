import React, { useState } from 'react';
import { SmartDateCompare } from '../lib/components/SmartDateCompare';
import { CodeBlock } from './CodeBlock';
import type { ExampleConfig } from '../data/exampleConfigs';
import type { DateRange } from '../lib/type';

interface ExampleCardProps {
    config: ExampleConfig;
    index: number;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({ config, index }) => {
    const [showCode, setShowCode] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>(
        config.props.defaultValue
    );

    return (
        <div
            className="animate-fade-up"
            style={{
                animationDelay: `${index * 0.08}s`,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'var(--color-surface)',
                overflow: 'hidden',
            }}
        >
            {/* Card Header */}
            <div style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{
                            display: 'inline-flex', padding: '2px 10px',
                            borderRadius: 100, fontSize: 10, fontWeight: 700,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                            color: config.tagColor,
                            background: `${config.tagColor}1a`,
                            border: `1px solid ${config.tagColor}30`,
                        }}>
                            {config.tag}
                        </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#f1f1f3' }}>
                        {config.title}
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: 13.5, color: '#8a8a9a', lineHeight: 1.5 }}>
                        {config.description}
                    </p>
                </div>
            </div>

            {/* Live Preview */}
            <div style={{
                padding: '28px 24px',
                background: 'rgba(255,255,255,0.01)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 100,
            }}>
                <SmartDateCompare
                    {...config.props}
                    value={range}
                    defaultValue={config.props.defaultValue}
                    onApply={(r) => setRange(r)}
                />
            </div>

            {/* Code Toggle Footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                    onClick={() => setShowCode(v => !v)}
                    style={{
                        width: '100%', padding: '12px 24px',
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        fontFamily: 'inherit', fontSize: 13, color: '#8a8a9a',
                        fontWeight: 500,
                        transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                        {showCode ? 'Hide code' : 'Show code'}
                    </span>
                    <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transform: showCode ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>

                {showCode && (
                    <div style={{ padding: '0 16px 16px' }}>
                        <CodeBlock code={config.code} language="tsx" />
                    </div>
                )}
            </div>
        </div>
    );
};
