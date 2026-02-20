import React, { useMemo } from 'react';
import {
    format,
    isSameMonth,
    isSameDay,
    startOfDay,
    isBefore,
    isAfter,
} from 'date-fns';
import { getMonthGrid } from '../utils/dateHelpers';

// Helper: convert hex to rgba for range backgrounds
function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

interface Props {
    month: Date;
    startDate?: Date;
    endDate?: Date;
    compareStartDate?: Date;
    compareEndDate?: Date;
    hoverDate?: Date | null;
    onDateClick: (date: Date) => void;
    onDateHover: (date: Date) => void;
    selecting: boolean;
    anchorDate?: Date;
    selectionVariant?: 'primary' | 'compare';

    // Color props — passed through from SmartDateCompare
    primaryColor?: string;
    compareColor?: string;

    // Constraint props
    minDate?: Date;
    maxDate?: Date;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[];
    disableFuture?: boolean;
    disablePast?: boolean;
    locale?: any;
    classNames?: {
        calendar?: string;
        day?: string;
        daySelected?: string;
        dayInRange?: string;
        dayCompare?: string;
    };
}

interface DayStyle {
    className: string;
    style?: React.CSSProperties;
}

export const CalendarMonth: React.FC<Props> = ({
    month,
    startDate,
    endDate,
    compareStartDate,
    compareEndDate,
    hoverDate,
    onDateClick,
    onDateHover,
    selecting,
    anchorDate,
    selectionVariant = 'primary',
    primaryColor = '#3b82f6',
    compareColor = '#f97316',
    minDate,
    maxDate,
    weekStartsOn = 0,
    disabledDates,
    disableFuture,
    disablePast,
    locale,
    classNames,
}) => {
    const days = useMemo(() => getMonthGrid(month, { weekStartsOn }), [month, weekStartsOn]);
    const weekDays = days.slice(0, 7);

    const getDayStyle = (day: Date): DayStyle => {
        // Disabled
        let isDisabled = false;
        if (minDate && isBefore(day, startOfDay(minDate))) isDisabled = true;
        if (maxDate && isAfter(day, startOfDay(maxDate))) isDisabled = true;
        if (disableFuture && isAfter(day, startOfDay(new Date()))) isDisabled = true;
        if (disablePast && isBefore(day, startOfDay(new Date()))) isDisabled = true;
        if (disabledDates?.some(d => isSameDay(day, d))) isDisabled = true;

        if (isDisabled) {
            return { className: 'h-8 w-8 flex items-center justify-center text-sm text-gray-300 cursor-not-allowed pointer-events-none' };
        }

        if (!isSameMonth(day, month)) {
            return { className: 'invisible pointer-events-none h-8 w-8' };
        }

        const time = day.getTime();
        const baseClasses = 'h-8 w-8 flex items-center justify-center text-sm cursor-pointer relative z-10 transition-colors duration-75';
        const classes: string[] = [baseClasses];
        let inlineStyle: React.CSSProperties = {};

        if (classNames?.day) classes.push(classNames.day);

        // Compare date analysis
        let isCompareStart = false;
        let isCompareEnd = false;
        let isCompareInRange = false;

        if (compareStartDate && compareEndDate) {
            const cStart = startOfDay(compareStartDate).getTime();
            const cEnd = startOfDay(compareEndDate).getTime();
            const safeStart = Math.min(cStart, cEnd);
            const safeEnd = Math.max(cStart, cEnd);

            isCompareStart = isSameDay(day, compareStartDate);
            isCompareEnd = isSameDay(day, compareEndDate);
            if (time >= safeStart && time <= safeEnd) isCompareInRange = true;
        }

        // Primary date analysis
        let isStart = false;
        let isEnd = false;
        let isInRange = false;

        if (startDate) isStart = isSameDay(day, startDate);
        if (endDate) isEnd = isSameDay(day, endDate);

        if (startDate && endDate) {
            const s = startOfDay(startDate).getTime();
            const e = startOfDay(endDate).getTime();
            if (time >= Math.min(s, e) && time <= Math.max(s, e)) isInRange = true;
        }

        // Hover preview analysis
        const effectiveAnchor = anchorDate ?? (selectionVariant === 'primary' ? startDate : compareStartDate);
        let isPreviewInRange = false;

        if (selecting && effectiveAnchor && hoverDate) {
            const s = startOfDay(effectiveAnchor).getTime();
            const h = startOfDay(hoverDate).getTime();
            if (time >= Math.min(s, h) && time <= Math.max(s, h)) isPreviewInRange = true;
        }

        // ─── Apply range background (in-range days) ────────────────
        if (classNames?.dayInRange && isInRange && !isStart && !isEnd) {
            classes.push(classNames.dayInRange);
        } else if (classNames?.dayCompare && isCompareInRange && !isCompareStart && !isCompareEnd) {
            classes.push(classNames.dayCompare);
        } else if (isPreviewInRange) {
            if (selectionVariant === 'compare') {
                inlineStyle = { backgroundColor: hexToRgba(compareColor, 0.12), color: compareColor };
            } else {
                inlineStyle = { backgroundColor: hexToRgba(primaryColor, 0.12), color: primaryColor };
            }
        } else if (isCompareInRange && !isCompareStart && !isCompareEnd) {
            if (classNames?.dayCompare) {
                classes.push(classNames.dayCompare);
            } else {
                inlineStyle = { backgroundColor: hexToRgba(compareColor, 0.12), color: compareColor, fontWeight: 500 };
            }
        } else if (isInRange && !isStart && !isEnd) {
            if (classNames?.dayInRange) {
                classes.push(classNames.dayInRange);
            } else {
                inlineStyle = { backgroundColor: hexToRgba(primaryColor, 0.12), color: primaryColor };
            }
        } else if (!isCompareStart && !isCompareEnd && !isStart && !isEnd) {
            classes.push('hover:bg-gray-100 text-gray-700 rounded-full');
        }

        // ─── Apply endpoint circles ────────────────────────────────
        const isPreviewEndpoint =
            selecting && effectiveAnchor && hoverDate &&
            (isSameDay(day, effectiveAnchor) || isSameDay(day, hoverDate));

        // Compare endpoints
        if (isCompareStart || isCompareEnd || (isPreviewEndpoint && selectionVariant === 'compare')) {
            if (classNames?.dayCompare) {
                classes.push(classNames.dayCompare);
            } else {
                inlineStyle = { backgroundColor: compareColor, color: '#fff', fontWeight: 600, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' };
            }
            if (isCompareStart) classes.push('rounded-l-full');
            if (isCompareEnd) classes.push('rounded-r-full');
            if (isCompareStart && isCompareEnd) classes.push('rounded-full');
            if (isPreviewEndpoint) classes.push('rounded-full');
        }

        // Primary endpoints — override compare if both overlap
        if (isStart || isEnd || (isPreviewEndpoint && selectionVariant === 'primary')) {
            if (classNames?.daySelected) {
                classes.push(classNames.daySelected);
                classes.push('z-20');
            } else {
                inlineStyle = { backgroundColor: primaryColor, color: '#fff', fontWeight: 600, boxShadow: '0 1px 4px rgba(0,0,0,0.15)', zIndex: 20 };
            }
            if (isStart) classes.push('rounded-l-full');
            if (isEnd) classes.push('rounded-r-full');
            if (isStart && isEnd) classes.push('rounded-full');
            if (isPreviewEndpoint) classes.push('rounded-full');
        }

        return { className: classes.join(' '), style: Object.keys(inlineStyle).length ? inlineStyle : undefined };
    };

    return (
        <div className={`w-64 select-none mr-2 ${classNames?.calendar || ''}`}>
            <div className="text-center text-sm font-semibold text-gray-800 mb-2 h-5 first-letter:uppercase">
                {format(month, 'MMMM yyyy', { locale })}
            </div>
            <div className="grid grid-cols-7 mb-1">
                {weekDays.map(d => (
                    <div key={d.toString()} className="text-center text-[10px] text-gray-400 font-medium h-6 flex items-center justify-center uppercase tracking-wide">
                        {format(d, 'cccccc', { locale })}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
                {days.map((day) => {
                    const { className, style } = getDayStyle(day);
                    return (
                        <div
                            key={day.toISOString()}
                            className={className + ' text-xs'}
                            style={style}
                            onClick={() => {
                                if (className.includes('pointer-events-none')) return;
                                onDateClick(day);
                            }}
                            onMouseEnter={() => onDateHover(day)}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
