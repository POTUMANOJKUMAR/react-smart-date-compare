import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import type { SmartDateCompareProps, DateRange, CompareMode } from '../type';
import { DateRangePicker } from './DateRangePicker';

export const SmartDateCompare: React.FC<SmartDateCompareProps> = ({
    value,
    defaultValue,
    onChange,
    onApply,
    onCancel,
    presets,
    primaryColor,
    compareColor,
    enableCompare = false,
    showCompareToggle = false,
    compareMode = 'previousPeriod',
    className,
    style,
    minDate,
    maxDate,
    weekStartsOn,
    disabledDates,
    disableFuture,
    disablePast,
    locale,
    labels,
    classNames,
    isCompare = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalRange, setInternalRange] = useState<DateRange>(
        value || defaultValue || { startDate: new Date(), endDate: new Date() }
    );
    const [internalCompareRange, setInternalCompareRange] = useState<DateRange | undefined>();
    const [internalEnableCompare, setInternalEnableCompare] = useState(enableCompare);
    const [internalCompareMode, setInternalCompareMode] = useState<CompareMode>(compareMode);

    // Positioning state for portal
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sync controlled value
    useEffect(() => {
        if (value) setInternalRange(value);
    }, [value]);

    // Sync enableCompare prop → internal state (for live playground updates)
    useEffect(() => {
        setInternalEnableCompare(enableCompare);
    }, [enableCompare]);

    // Sync compareMode prop → internal state
    useEffect(() => {
        setInternalCompareMode(compareMode);
    }, [compareMode]);

    // Calculate dropdown position from trigger button
    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownPos({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
        });
    };

    // Open / close
    const handleToggle = () => {
        if (!isOpen) updatePosition();
        setIsOpen(prev => !prev);
    };

    // Reposition on scroll/resize while open
    useEffect(() => {
        if (!isOpen) return;
        const handle = () => updatePosition();
        window.addEventListener('scroll', handle, true);
        window.addEventListener('resize', handle);
        return () => {
            window.removeEventListener('scroll', handle, true);
            window.removeEventListener('resize', handle);
        };
    }, [isOpen]);

    // Click-outside (covers both trigger and portal dropdown)
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) return;
            setIsOpen(false);
            onCancel?.();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onCancel]);

    // Apply handler
    const handleApply = (range: DateRange, compareRange?: DateRange, activeCompareMode?: CompareMode) => {
        setInternalRange(range);
        setInternalCompareRange(compareRange);
        setInternalEnableCompare(!!compareRange);
        if (activeCompareMode) setInternalCompareMode(activeCompareMode);
        setIsOpen(false);
        onChange?.({
            startDate: range.startDate,
            endDate: range.endDate,
            compareStartDate: compareRange?.startDate,
            compareEndDate: compareRange?.endDate,
        });
        onApply?.(range, compareRange);
    };

    const handleCancel = () => {
        setIsOpen(false);
        onCancel?.();
    };

    // Quick toggle handler for comparison (without opening picker)
    const handleQuickCompareToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Avoid opening the picker
        const next = !internalEnableCompare;
        setInternalEnableCompare(next);

        // If enabling, we need an actual compare range calculated
        if (next && !internalCompareRange) {
            // Placeholder: picker will re-calculate on internal mount,
            // but for immediate UI feedback we can trigger onApply logic
        }

        onApply?.(internalRange, next ? internalCompareRange : undefined);
    };

    const formatDate = (d: Date) => format(d, 'MMM d, yyyy', { locale });
    const label = isCompare
        ? `${formatDate(internalRange.startDate)} - ${formatDate(internalRange.endDate)}`
        : formatDate(internalRange.startDate);

    return (
        <div
            ref={triggerRef}
            className={`relative inline-block text-left sdc-root ${className || ''} ${classNames?.root || ''}`}
            style={{
                '--sdc-primary-color': primaryColor,
                '--sdc-compare-color': compareColor,
                ...style,
            } as React.CSSProperties}
        >
            {/* Trigger Button */}
            <button
                className={`flex items-center justify-between w-full md:min-w-[240px] md:w-auto px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm ${classNames?.container || ''}`}
                onClick={handleToggle}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3 text-gray-700">
                    {isCompare && showCompareToggle && (
                        <div
                            className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out`}
                            style={{ backgroundColor: internalEnableCompare ? primaryColor : '#d1d5db' }}
                            onClick={handleQuickCompareToggle}
                            title="Toggle comparison"
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${internalEnableCompare ? 'translate-x-3' : 'translate-x-0'}`}
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span className="text-sm font-medium">{label}</span>
                    </div>
                </div>
                {internalCompareRange && (
                    <span
                        className={`text-xs px-1.5 py-0.5 rounded ml-2 font-medium ${classNames?.dayCompare || ''}`}
                        style={{ color: compareColor, backgroundColor: `${compareColor}18` }}
                    >
                        vs {formatDate(internalCompareRange.startDate)}
                    </span>
                )}
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown — rendered in a portal at document.body to escape any overflow:hidden parent */}
            {isOpen && createPortal(
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        zIndex: 99999,
                    }}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={`bg-white ring-1 ring-black ring-opacity-5 rounded-lg shadow-2xl overflow-hidden sdc-root sdc-animate-fade-up ${classNames?.calendar || ''}`}
                        style={{ '--sdc-primary-color': primaryColor, '--sdc-compare-color': compareColor } as React.CSSProperties}
                    >
                        <DateRangePicker
                            initialRange={internalRange}
                            initialCompareRange={internalCompareRange}
                            presets={presets}
                            onApply={handleApply}
                            onCancel={handleCancel}
                            enableCompare={internalEnableCompare}
                            activeCompareMode={internalCompareMode}
                            primaryColor={primaryColor}
                            compareColor={compareColor}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekStartsOn={weekStartsOn}
                            disabledDates={disabledDates}
                            disableFuture={disableFuture}
                            disablePast={disablePast}
                            locale={locale}
                            labels={labels}
                            classNames={classNames}
                            isCompare={isCompare}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
