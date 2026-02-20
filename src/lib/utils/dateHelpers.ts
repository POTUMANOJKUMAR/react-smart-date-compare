import {
    subDays,
    subYears,
    differenceInCalendarDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isWithinInterval
} from "date-fns";

export const getPreviousPeriod = (
    start: Date,
    end: Date
) => {
    const diff = differenceInCalendarDays(end, start) + 1; // Duration in days
    return {
        compareStart: subDays(start, diff),
        compareEnd: subDays(end, diff),
    };
};

export const getPreviousPeriodMatchDay = (
    start: Date,
    end: Date
) => {
    const duration = differenceInCalendarDays(end, start) + 1;
    // Calculate how many days to subtract to maintain day-of-week alignment
    // We want to subtract a multiple of 7 that is >= duration
    const remainder = duration % 7;
    const daysToSubtract = remainder === 0 ? duration : duration + (7 - remainder);

    return {
        compareStart: subDays(start, daysToSubtract),
        compareEnd: subDays(end, daysToSubtract),
    };
};

export const getSamePeriodLastYear = (
    start: Date,
    end: Date
) => {
    return {
        compareStart: subYears(start, 1),
        compareEnd: subYears(end, 1),
    };
};

/**
 * Generate a grid of days for a given month, including padding from prev/next months
 * to fill the 6-row or 5-row calendar view.
 */
export const getMonthGrid = (month: Date, options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 }) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, options);
    const endDate = endOfWeek(monthEnd, options);

    // Ensure we always show 6 weeks/rows for consistency (42 days)
    // Or just 5 if that fits, but 6 is safer for UI alignment
    // Google uses variable height, but fixed height prevents jumping
    const grid = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    return grid;
};

export const isDateInRange = (date: Date, start: Date, end: Date) => {
    return isWithinInterval(date, { start, end });
}
