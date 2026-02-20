import React, { useState, useEffect } from 'react';
import {
    addMonths,
    subMonths,
    isBefore,
    startOfMonth,
    format
} from 'date-fns';
import type { DateRange, Preset, CompareMode } from '../type';
import { CalendarMonth } from './CalendarMonth';
import { PresetSidebar } from './PresetSidebar';
import { CompareSection } from './CompareSection';
import { getPresetRange, defaultPresets } from '../utils/presetHelpers';
import { getPreviousPeriod, getSamePeriodLastYear, getPreviousPeriodMatchDay } from '../utils/dateHelpers';

interface Props {
    initialRange?: DateRange;
    initialCompareRange?: DateRange;
    presets?: Preset[];
    onApply: (range: DateRange, compareRange?: DateRange, activeCompareMode?: CompareMode) => void;
    onCancel: () => void;
    enableCompare?: boolean;
    activeCompareMode?: CompareMode;

    // Color props
    primaryColor?: string;
    compareColor?: string;

    // Constraint / locale props
    minDate?: Date;
    maxDate?: Date;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[];
    disableFuture?: boolean;
    disablePast?: boolean;
    locale?: any;
    labels?: {
        apply?: string;
        cancel?: string;
        compare?: string;
        to?: string;
        custom?: string;
        selectDateRange?: string;
        vs?: string;
        precedingPeriod?: string;
        samePeriodLastYear?: string;
        clear?: string;
    };
    classNames?: {
        root?: string;
        container?: string;
        sidebar?: string;
        calendar?: string;
        day?: string;
        daySelected?: string;
        dayInRange?: string;
        dayCompare?: string;
        footer?: string;
        buttonApply?: string;
        buttonCancel?: string;
        presetActive?: string;
    };
}

export const DateRangePicker: React.FC<Props> = ({
    initialRange,
    initialCompareRange,
    presets = defaultPresets,
    onApply,
    onCancel,
    enableCompare = false,
    activeCompareMode = 'previousPeriod',
    primaryColor = '#3b82f6',
    compareColor = '#f97316',
    minDate,
    maxDate,
    weekStartsOn,
    disabledDates,
    disableFuture,
    disablePast,
    locale,
    labels,
    classNames,
}) => {
    // Range State
    const [startDate, setStartDate] = useState<Date | undefined>(initialRange?.startDate);
    const [endDate, setEndDate] = useState<Date | undefined>(initialRange?.endDate);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [selecting, setSelecting] = useState(false);

    // Compare State
    const [compareEnabled, setCompareEnabled] = useState(enableCompare);
    const [compareMode, setCompareMode] = useState<CompareMode>(activeCompareMode);

    // Sync enableCompare prop → state (playground live updates without re-mount)
    useEffect(() => {
        setCompareEnabled(enableCompare);
    }, [enableCompare]);

    // Sync activeCompareMode prop → state
    useEffect(() => {
        setCompareMode(activeCompareMode);
    }, [activeCompareMode]);

    // Selection State
    const [selectionTarget, setSelectionTarget] = useState<'primary' | 'compare'>('primary');

    // Effect: Switch selection target when compare mode changes
    useEffect(() => {
        if (compareEnabled) {
            if (compareMode === 'custom') {
                setSelectionTarget('compare');
            } else {
                setSelectionTarget('primary');
            }
        } else {
            setSelectionTarget('primary');
        }
    }, [compareEnabled, compareMode]);

    // Derived compare range (only for 'previousPeriod' / 'samePeriodLastYear')
    const [compareStart, setCompareStart] = useState<Date | undefined>(initialCompareRange?.startDate);
    const [compareEnd, setCompareEnd] = useState<Date | undefined>(initialCompareRange?.endDate);

    // Preset State
    const [activePreset, setActivePreset] = useState<string>('');

    // View State (Left Calendar Month)
    // Default to showing endDate's month on the right, so viewDate is endDate - 1 month
    const [viewDate, setViewDate] = useState<Date>(() => {
        const end = initialRange?.endDate || new Date();
        return subMonths(startOfMonth(end), 1);
    });

    // Effect: Update compare range when main range changes (if not custom compare)
    useEffect(() => {
        if (compareEnabled && !selecting && startDate && endDate && compareMode !== 'custom') {
            let result;
            if (compareMode === 'previousPeriod') {
                result = getPreviousPeriod(startDate, endDate);
            } else if (compareMode === 'previousPeriodMatchDay') {
                result = getPreviousPeriodMatchDay(startDate, endDate);
            } else if (compareMode === 'samePeriodLastYear') {
                result = getSamePeriodLastYear(startDate, endDate);
            }

            if (result) {
                setCompareStart(result.compareStart);
                setCompareEnd(result.compareEnd);
            }
        }
    }, [startDate, endDate, compareEnabled, compareMode, selecting]);

    // Handlers
    const handleDateClick = (date: Date) => {
        // Basic validation against min/max/disabled
        if (minDate && isBefore(date, minDate)) return;
        if (maxDate && isBefore(maxDate, date)) return;
        // Check disabledDates array if needed (simplified check here, can rely on CalendarMonth visual disable)

        if (!selecting) {
            // Start selection - effectively custom
            setActivePreset('custom');
            if (selectionTarget === 'compare') {
                setCompareStart(date);
                setCompareEnd(undefined);
            } else {
                setStartDate(date);
                setEndDate(undefined);
            }
            setSelecting(true);
        } else {
            // End selection
            if (selectionTarget === 'compare') {
                if (compareStart && isBefore(date, compareStart)) {
                    setCompareStart(date);
                    setCompareEnd(compareStart);
                } else {
                    setCompareEnd(date);
                }
            } else {
                if (startDate && isBefore(date, startDate)) {
                    setStartDate(date);
                    setEndDate(startDate);
                } else {
                    setEndDate(date);
                }
            }
            setSelecting(false);
        }
    };

    const handleDateHover = (date: Date) => {
        if (selecting) {
            setHoverDate(date);
        }
    };

    const handlePresetSelect = (value: string) => {
        // Group headers just toggle expansion in the sidebar — ignore here
        if (value.startsWith('__group_')) return;

        // Recursively find a preset by value (including nested children)
        const findPreset = (items: Preset[], val: string): Preset | undefined => {
            for (const item of items) {
                if (item.value === val) return item;
                if (item.children) {
                    const found = findPreset(item.children, val);
                    if (found) return found;
                }
            }
            return undefined;
        };

        const preset = findPreset(presets, value);

        setActivePreset(value); // Highlight selected preset

        let range: DateRange;
        if (preset?.range) {
            range = preset.range();
        } else {
            // Fallback to helper for standard strings
            range = getPresetRange(value);
        }

        setStartDate(range.startDate);
        setEndDate(range.endDate);
        setSelecting(false);
        setSelectionTarget('primary'); // Reset to primary since preset implies primary change

        // Move view to show the selected range
        setViewDate(subMonths(startOfMonth(range.endDate), 1));
    };

    const handleNavPrev = () => setViewDate(subMonths(viewDate, 1));
    const handleNavNext = () => setViewDate(addMonths(viewDate, 1));

    const handleApply = () => {
        if (startDate && endDate) {
            const compRange = (compareEnabled && compareStart && compareEnd)
                ? { startDate: compareStart, endDate: compareEnd }
                : undefined;
            onApply({ startDate, endDate }, compRange, compareEnabled ? compareMode : undefined);
        }
    };

    // Helper for rendering calendar to avoid duplication
    const renderCalendar = (month: Date) => (
        <CalendarMonth
            month={month}
            startDate={startDate}
            endDate={endDate}
            compareStartDate={compareEnabled ? compareStart : undefined}
            compareEndDate={compareEnabled ? compareEnd : undefined}
            hoverDate={hoverDate}
            onDateClick={handleDateClick}
            onDateHover={handleDateHover}
            selecting={selecting}
            anchorDate={selecting ? (selectionTarget === 'primary' ? startDate : compareStart) : undefined}
            selectionVariant={selectionTarget}

            minDate={minDate}
            maxDate={maxDate}
            weekStartsOn={weekStartsOn}
            disabledDates={disabledDates}
            disableFuture={disableFuture}
            disablePast={disablePast}
            locale={locale}
            classNames={classNames}
            primaryColor={primaryColor}
            compareColor={compareColor}
        />
    );

    return (
        <div className={`flex bg-white h-[450px] ${classNames?.root || ''}`}>
            {/* Left Sidebar Pane - Fixed Height, Scrollable Presets + Fixed Compare Bottom */}
            <div className={`w-48 bg-gray-50/50 border-r border-gray-100 flex flex-col h-full shrink-0 ${classNames?.sidebar || ''}`}>
                <div className="flex-1 overflow-y-auto preset-scrollbar">
                    <PresetSidebar
                        presets={presets}
                        onSelect={handlePresetSelect}
                        activePreset={activePreset}
                        primaryColor={primaryColor}
                        classNames={classNames}
                    />
                </div>

                <div className="p-3 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
                    <CompareSection
                        enabled={compareEnabled}
                        mode={compareMode}
                        onToggle={setCompareEnabled}
                        onModeChange={setCompareMode}
                        primaryColor={primaryColor}
                        compareColor={compareColor}
                    />
                </div>
            </div>

            {/* Main Calendar Area - Scrollable Vertically if needed, or just fits */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">
                {/* Navigation Header */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 shrink-0">
                    <button
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        onClick={handleNavPrev}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>

                    <div className="text-xs font-medium text-gray-500 flex flex-col items-center">
                        {startDate && endDate ? (
                            <span>
                                {format(startDate, 'MMM d, yyyy', { locale })} - {format(endDate, 'MMM d, yyyy', { locale })}
                            </span>
                        ) : (
                            <span>{labels?.selectDateRange || 'Select date range'}</span>
                        )}
                        {compareEnabled && compareStart && compareEnd && (
                            <span className="text-[10px] font-medium" style={{ color: compareColor }}>
                                {labels?.vs || 'vs'} {format(compareStart, 'MMM d, yyyy', { locale })} - {format(compareEnd, 'MMM d, yyyy', { locale })}
                            </span>
                        )}
                    </div>

                    <button
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                        onClick={handleNavNext}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>

                {/* Calendar Grid - Vertical Stack */}
                <div className={`flex flex-col gap-4 p-4 overflow-y-auto flex-1 items-center ${classNames?.container || ''}`}>
                    {renderCalendar(viewDate)}
                    {renderCalendar(addMonths(viewDate, 1))}
                </div>

                {/* Footer Actions - Stick to bottom */}
                <div className={`px-4 py-3 border-t border-gray-100 flex items-center justify-between shrink-0 bg-white ${classNames?.footer || ''}`}>
                    <button
                        className="text-xs font-medium text-gray-500 hover:text-gray-700 underline decoration-gray-300 hover:decoration-gray-500 underline-offset-2 transition-colors cursor-pointer"
                        onClick={() => {
                            setStartDate(undefined);
                            setEndDate(undefined);
                            setSelecting(false);
                            setActivePreset('');
                            setCompareEnabled(false);
                        }}
                    >
                        {labels?.clear || 'Reset'}
                    </button>

                    <div className="flex gap-3">
                        <button
                            className={`px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer ${classNames?.buttonCancel || ''}`}
                            onClick={onCancel}
                        >
                            {labels?.cancel || 'Cancel'}
                        </button>
                        <button
                            className={`px-3 py-1.5 rounded-md border border-transparent text-xs font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer ${classNames?.buttonApply || ''}`}
                            style={{ backgroundColor: primaryColor }}
                            onClick={handleApply}
                            disabled={!startDate || !endDate}
                        >
                            {labels?.apply || 'Apply'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
