import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

// Very simple syntax coloring — no external dep needed
function highlight(code: string, lang: string): string {
    if (lang === 'bash') {
        return code
            .replace(/^(\$\s)/gm, '<span style="color:#8a8a9a">$1</span>')
            .replace(/(npm|npx|yarn)/g, '<span style="color:#f97316;font-weight:600">$1</span>')
            .replace(/(install|add)/g, '<span style="color:#22c55e">$1</span>')
            .replace(/(react-smart-date-compare)/g, '<span style="color:#a5b4fc">$1</span>');
    }

    return code
        // strings
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
            '<span style="color:#86efac">$1</span>')
        // comments
        .replace(/(\/\/[^\n]*)/g, '<span style="color:#5a5a7a;font-style:italic">$1</span>')
        // keywords
        .replace(/\b(import|export|from|const|let|var|function|return|new|as|type|interface|extends|default|if|else|async|await|true|false|undefined|null)\b/g,
            '<span style="color:#c084fc">$1</span>')
        // JSX tags
        .replace(/(&lt;\/?)([\w.]+)(\s|&gt;|\/)/g,
            '$1<span style="color:#7dd3fc">$2</span>$3')
        // JSX self-close
        .replace(/(\s)([\w]+)(=\{|=")/g,
            '$1<span style="color:#fde68a">$2</span>$3')
        // numbers
        .replace(/\b(\d+)\b/g, '<span style="color:#f9a8d4">$1</span>');
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'tsx', showLineNumbers = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const highlighted = highlight(escaped, language);

    const lines = highlighted.split('\n');

    return (
        <div style={{
            position: 'relative',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.07)',
            background: '#0d0d14',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
            }}>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, color: '#5a5a7a', fontFamily: 'var(--font-mono)', textTransform: 'lowercase' }}>
                        {language}
                    </span>
                    <button
                        onClick={handleCopy}
                        style={{
                            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: 5,
                            padding: '3px 10px',
                            fontSize: 11,
                            color: copied ? '#86efac' : '#8a8a9a',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', gap: 5,
                        }}
                    >
                        {copied ? (
                            <>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code */}
            <div style={{ overflowX: 'auto' }}>
                <pre style={{
                    margin: 0, padding: '20px 20px',
                    fontSize: 13,
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-mono)',
                    color: '#c8c8d8',
                    whiteSpace: 'pre',
                }}>
                    {showLineNumbers ? (
                        lines.map((line, i) => (
                            <div key={i} style={{ display: 'flex' }}>
                                <span style={{ minWidth: 32, color: '#3a3a5a', userSelect: 'none', marginRight: 16 }}>
                                    {i + 1}
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: line }} />
                            </div>
                        ))
                    ) : (
                        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                    )}
                </pre>
            </div>
        </div>
    );
};
