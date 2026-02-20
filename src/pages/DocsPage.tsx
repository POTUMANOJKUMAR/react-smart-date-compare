import React from 'react';
import { SmartDateCompare } from '../lib/components/SmartDateCompare';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';
import { subDays } from 'date-fns';

const SectionHeader: React.FC<{
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
}> = ({ id, eyebrow, title, description }) => (
    <div id={id} style={{ marginBottom: 28, paddingTop: 60 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            {eyebrow}
        </div>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.02em' }}>{title}</h2>
        {description && <p style={{ margin: '8px 0 0', fontSize: 15, color: '#8a8a9a', maxWidth: 600, lineHeight: 1.6 }}>{description}</p>}
    </div>
);

const Divider = () => <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 0' }} />;

const Callout: React.FC<{ type?: 'info' | 'tip' | 'warning'; children: React.ReactNode }> = ({ type = 'info', children }) => {
    const colors = { info: '#6366f1', tip: '#22c55e', warning: '#f97316' };
    const icons = {
        info: <circle cx="12" cy="12" r="10" />,
        tip: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
        warning: <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />,
    };
    const c = colors[type];
    return (
        <div style={{
            padding: '14px 18px', borderRadius: 8,
            background: `${c}0d`, border: `1px solid ${c}25`,
            display: 'flex', gap: 12, alignItems: 'flex-start',
            marginBottom: 16,
        }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                {icons[type]}
                {type === 'info' && <><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>}
            </svg>
            <div style={{ fontSize: 13.5, color: '#c8c8d8', lineHeight: 1.6 }}>{children}</div>
        </div>
    );
};

const INSTALL_CODE = `npm install react-smart-date-compare date-fns`;
const BASIC_USAGE = `import { SmartDateCompare } from "react-smart-date-compare";
import "react-smart-date-compare/style.css";

function App() {
  return (
    <SmartDateCompare
      defaultValue={{
        startDate: new Date(Date.now() - 30 * 86400000),
        endDate: new Date()
      }}
      enableCompare
      compareMode="previousPeriod"
      primaryColor="#2563EB"
      onApply={(range, compareRange) => {
        console.log("Range:", range);
        console.log("Compare:", compareRange);
      }}
    />
  );
}`;
const CONTROLLED_CODE = `import { useState } from "react";
import { SmartDateCompare, DateRange } from "react-smart-date-compare";

function ControlledExample() {
  const [range, setRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 86400000),
    endDate: new Date()
  });

  return (
    <SmartDateCompare
      value={range}           // ← Controlled value
      onApply={(r) => setRange(r)}
    />
  );
}`;
const CUSTOM_PRESET_CODE = `import { SmartDateCompare } from "react-smart-date-compare";
import { startOfMonth, endOfMonth, startOfYear, subMonths } from "date-fns";

const myPresets = [
  {
    label: "This Month",
    value: "thisMonth",
    range: () => ({ startDate: startOfMonth(new Date()), endDate: new Date() })
  },
  {
    label: "Last Month",
    value: "lastMonth",
    range: () => {
      const lm = subMonths(new Date(), 1);
      return { startDate: startOfMonth(lm), endDate: endOfMonth(lm) };
    }
  },
  {
    label: "YTD",
    value: "ytd",
    range: () => ({ startDate: startOfYear(new Date()), endDate: new Date() })
  },
  {
    // Grouped preset with sub-options (nested children)
    label: "This Week",
    value: "__group_week",
    children: [
      { label: "Sun – Today", value: "thisWeekSun" },
      { label: "Mon – Today", value: "thisWeekMon" },
    ]
  },
  { label: "Custom", value: "custom" }
];

<SmartDateCompare presets={myPresets} />`;
const THEMING_CODE = `// Method 1: via props
<SmartDateCompare
  primaryColor="#7c3aed"
  compareColor="#059669"
/>

// Method 2: via classNames (Tailwind)
<SmartDateCompare
  classNames={{
    daySelected: "bg-violet-600 text-white",
    dayInRange: "bg-violet-50 text-violet-700",
    dayCompare: "bg-emerald-50 text-emerald-700",
    buttonApply: "bg-violet-600 hover:bg-violet-700",
    presetActive: "bg-violet-50 text-violet-600 font-semibold",
  }}
/>

// Method 3: CSS custom properties
.my-picker {
  --sdc-primary-color: #7c3aed;
  --sdc-compare-color: #059669;
}`;
const FOLDER_STRUCTURE = `src/
├── components/
│   └── MyComponent.tsx
├── pages/
│   └── Dashboard.tsx
├── examples/          # Your SmartDateCompare integrations
│   ├── BasicPicker.tsx
│   ├── AnalyticsPicker.tsx
│   └── ReportRangePicker.tsx
└── App.tsx`;

export const DocsPage: React.FC = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40, padding: '40px 0 80px', alignItems: 'start' }}>
        {/* Sidebar TOC */}
        <nav style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
                { id: 'install', label: 'Installation' },
                { id: 'usage', label: 'Basic Usage' },
                { id: 'controlled', label: 'Controlled Mode' },
                { id: 'presets', label: 'Custom Presets' },
                { id: 'theming', label: 'Theming' },
                { id: 'props', label: 'Props Reference' },
                { id: 'structure', label: 'Folder Structure' },
                { id: 'accessibility', label: 'Accessibility' },
                { id: 'performance', label: 'Performance' },
            ].map(item => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                        padding: '6px 12px', borderRadius: 6,
                        fontSize: 13, color: '#8a8a9a', fontWeight: 500,
                        textDecoration: 'none', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                        (e.target as HTMLElement).style.color = '#f1f1f3';
                        (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    }}
                    onMouseLeave={e => {
                        (e.target as HTMLElement).style.color = '#8a8a9a';
                        (e.target as HTMLElement).style.background = 'transparent';
                    }}
                >
                    {item.label}
                </a>
            ))}
        </nav>

        {/* Main content */}
        <div style={{ maxWidth: 860 }}>
            {/* Page heading */}
            <div style={{ paddingTop: 20, marginBottom: 40 }}>
                <h1 style={{ margin: 0, fontSize: 38, fontWeight: 800, color: '#f1f1f3', letterSpacing: '-0.03em' }}>
                    Documentation
                </h1>
                <p style={{ margin: '10px 0 0', fontSize: 16, color: '#8a8a9a', maxWidth: 540 }}>
                    Everything you need to integrate and customize <strong style={{ color: '#c8c8d8' }}>SmartDateCompare</strong> in your React project.
                </p>
            </div>

            <Divider />

            {/* Installation */}
            <SectionHeader id="install" eyebrow="Getting started" title="Installation"
                description="Install the package and its date-fns peer dependency." />
            <CodeBlock code={INSTALL_CODE} language="bash" />
            <div style={{ marginTop: 14 }}>
                <Callout type="info">
                    <strong>CSS Required:</strong> Import the stylesheet in your entry file: <code style={{ fontFamily: 'var(--font-mono)', color: '#86efac' }}>import "react-smart-date-compare/style.css"</code>
                </Callout>
            </div>

            <Divider />

            {/* Basic Usage */}
            <SectionHeader id="usage" eyebrow="Setup" title="Basic Usage" />
            <CodeBlock code={BASIC_USAGE} language="tsx" showLineNumbers />

            <Divider />

            {/* Controlled */}
            <SectionHeader id="controlled" eyebrow="Patterns" title="Controlled vs Uncontrolled"
                description="Use defaultValue for uncontrolled usage. Use value + onApply for controlled integration." />
            <Callout type="tip">
                For analytics dashboards, <strong>controlled mode</strong> is recommended — store the range in your component state, sync it with API calls in <code style={{ fontFamily: 'var(--font-mono)', color: '#86efac' }}>onApply</code>.
            </Callout>
            <CodeBlock code={CONTROLLED_CODE} language="tsx" />

            <Divider />

            {/* Custom Presets */}
            <SectionHeader id="presets" eyebrow="Customization" title="Custom Preset Injection"
                description="Pass an array of Preset objects to override or extend the built-in sidebar presets. Supports nested children for grouped presets." />
            <CodeBlock code={CUSTOM_PRESET_CODE} language="tsx" />

            <Divider />

            {/* Theming */}
            <SectionHeader id="theming" eyebrow="Theming" title="Theming &amp; Styling"
                description="Three ways to customize the visual appearance." />
            <CodeBlock code={THEMING_CODE} language="tsx" />

            <Divider />

            {/* Props Reference */}
            <SectionHeader id="props" eyebrow="API Reference" title="Props Reference"
                description="All available configuration props with types, defaults, and descriptions." />
            <PropsTable />

            <Divider />

            {/* Folder Structure */}
            <SectionHeader id="structure" eyebrow="Project Setup" title="Recommended Folder Structure" />
            <CodeBlock code={FOLDER_STRUCTURE} language="bash" />

            <Divider />

            {/* Accessibility */}
            <SectionHeader id="accessibility" eyebrow="Best Practices" title="Accessibility"
                description="SmartDateCompare is built with accessibility in mind." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                    { icon: '↹', text: 'Full keyboard navigation — Tab between dates, Enter to select, Escape to close.' },
                    { icon: '🔊', text: 'ARIA attributes: aria-haspopup, aria-expanded, aria-modal, and role="dialog" on the picker panel.' },
                    { icon: '🎨', text: 'Respects user color preferences. Use classNames overrides to ensure contrast in your design system.' },
                    { icon: '📱', text: 'Touch-friendly — minimum tap target sizes of 40×40px on all interactive day cells.' },
                ].map(item => (
                    <div key={item.icon} style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.01)',
                    }}>
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 13.5, color: '#9a9aaa', lineHeight: 1.6 }}>{item.text}</span>
                    </div>
                ))}
            </div>

            <Divider />

            {/* Performance */}
            <SectionHeader id="performance" eyebrow="Best Practices" title="Performance"
                description="Tips for keeping your date picker fast at scale." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                    { label: 'Wrap in React.memo', desc: 'If the picker is rendered inside a heavy parent, memoize it to avoid unnecessary re-renders.' },
                    { label: 'Stable preset arrays', desc: 'Define preset arrays outside of render functions or use useMemo to avoid object recreation on each render.' },
                    { label: 'Debounce onChange', desc: 'If you trigger API calls on every onChange, wrap the handler in useCallback + debounce.' },
                    { label: 'Lazy load', desc: 'In large apps, you can use React.lazy to defer loading the picker until it is first required.' },
                ].map(item => (
                    <div key={item.label} style={{
                        padding: '14px 18px', borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.01)',
                    }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#c8c8d8', marginBottom: 3 }}>{item.label}</div>
                        <div style={{ fontSize: 13, color: '#8a8a9a', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
