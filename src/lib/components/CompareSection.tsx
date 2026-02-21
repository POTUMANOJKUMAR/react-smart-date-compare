import React from 'react';
import type { CompareMode } from '../type';

interface Props {
    enabled: boolean;
    mode: CompareMode;
    onToggle: (enabled: boolean) => void;
    onModeChange: (mode: CompareMode) => void;
    primaryColor?: string;
    compareColor?: string;
}

export const CompareSection: React.FC<Props> = ({
    enabled,
    mode,
    onToggle,
    onModeChange,
    primaryColor = '#3b82f6',
    compareColor = '#f97316',
}) => {
    return (
        <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                    className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
                    style={{ backgroundColor: enabled ? primaryColor : '#d1d5db' }}
                >
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={enabled}
                        onChange={(e) => onToggle(e.target.checked)}
                    />
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                </div>
                <span className="font-medium">Compare</span>
            </label>

            {enabled && (
                <div className="flex flex-col gap-1 mt-2 pl-2" style={{ borderLeft: `2px solid ${primaryColor}40` }}>
                    {[
                        { value: 'previousPeriodMatchDay', label: 'Previous period (match day of week)' },
                        { value: 'previousPeriod', label: 'Previous period' },
                        { value: 'samePeriodLastYear', label: 'Previous year' },
                        { value: 'custom', label: 'Custom' }
                    ].map((option) => {
                        const isActive = mode === option.value;
                        return (
                            <button
                                key={option.value}
                                className="text-left px-3 py-2 rounded-md text-xs transition-colors cursor-pointer"
                                style={isActive
                                    ? { backgroundColor: `${compareColor}15`, color: compareColor, fontWeight: 600 }
                                    : { color: '#6b7280' }
                                }
                                onClick={() => onModeChange(option.value as CompareMode)}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
