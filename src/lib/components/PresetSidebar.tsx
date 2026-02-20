import React, { useState } from 'react';
import type { Preset } from '../type';

interface Props {
    presets: Preset[];
    onSelect: (value: string) => void;
    activePreset?: string;
    primaryColor?: string;
    classNames?: {
        presetActive?: string;
    };
}

/** Renders a single preset item, or a collapsible group if it has children */
const PresetItem: React.FC<{
    preset: Preset;
    onSelect: (value: string) => void;
    activePreset?: string;
    primaryColor?: string;
    classNames?: { presetActive?: string };
    depth?: number;
}> = ({ preset, onSelect, activePreset, primaryColor = '#3b82f6', classNames, depth = 0 }) => {
    const hasChildren = preset.children && preset.children.length > 0;

    // Auto-expand group if one of its children is currently active
    const isChildActive = hasChildren
        ? preset.children!.some((c) => c.value === activePreset)
        : false;

    const [expanded, setExpanded] = useState(isChildActive);

    const isActive = activePreset === preset.value;

    // Active style: use primaryColor if no classNames override provided
    const activeInlineStyle = classNames?.presetActive
        ? undefined
        : { backgroundColor: `${primaryColor}15`, color: primaryColor, fontWeight: 600 };
    const activeClass = classNames?.presetActive || '';

    if (hasChildren) {
        return (
            <div>
                {/* Group Header — clicking toggles expand, does NOT select */}
                <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors cursor-pointer
                        ${isChildActive ? activeClass : 'text-gray-600 hover:bg-gray-100'}`}
                    style={{
                        paddingLeft: `${(depth + 1) * 12}px`,
                        ...(isChildActive ? activeInlineStyle : {}),
                    }}
                    onClick={() => setExpanded((prev) => !prev)}
                    type="button"
                    aria-expanded={expanded}
                >
                    <span>{preset.label}</span>
                    {/* Arrow rotates when expanded */}
                    <svg
                        className={`w-3 h-3 shrink-0 ml-1 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Children — slide-down */}
                {expanded && (
                    <div className="flex flex-col gap-0.5 mt-0.5 ml-2 pl-2 border-l border-gray-200">
                        {preset.children!.map((child) => (
                            <PresetItem
                                key={child.value}
                                preset={child}
                                onSelect={onSelect}
                                activePreset={activePreset}
                                primaryColor={primaryColor}
                                classNames={classNames}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ── Plain item ──────────────────────────────────────────────────────
    return (
        <button
            className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors cursor-pointer
                ${isActive ? activeClass : 'text-gray-600 hover:bg-gray-100'}`}
            style={{
                paddingLeft: depth > 0 ? `${(depth + 1) * 12}px` : undefined,
                ...(isActive ? activeInlineStyle : {}),
            }}
            onClick={() => onSelect(preset.value)}
            type="button"
        >
            {preset.label}
        </button>
    );
};

export const PresetSidebar: React.FC<Props> = ({
    presets,
    onSelect,
    activePreset,
    primaryColor,
    classNames,
}) => {
    return (
        <aside className="flex flex-col gap-0.5 p-2">
            {presets.map((preset) => (
                <PresetItem
                    key={preset.value}
                    preset={preset}
                    onSelect={onSelect}
                    activePreset={activePreset}
                    primaryColor={primaryColor}
                    classNames={classNames}
                />
            ))}
        </aside>
    );
};
