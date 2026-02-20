import {
    startOfToday,
    endOfToday,
    subDays,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfYear,
    startOfWeek,
    endOfWeek
} from "date-fns";
import type { DateRange, Preset } from "../type";

export const getPresetRange = (value: string): DateRange => {
    const today = startOfToday();
    const endToday = endOfToday();

    switch (value) {
        case 'today':
            return {
                startDate: today,
                endDate: endToday
            };
        case 'yesterday':
            const yesterday = subDays(today, 1);
            return {
                startDate: yesterday,
                endDate: subDays(endToday, 1)
            };
        case 'last7days':
            return {
                startDate: subDays(today, 6),
                endDate: endToday
            };
        case 'thisWeekSunToday':
            return {
                startDate: startOfWeek(today, { weekStartsOn: 0 }),
                endDate: endToday
            };
        case 'thisWeekMonToday':
            return {
                startDate: startOfWeek(today, { weekStartsOn: 1 }),
                endDate: endToday
            };
        case 'lastWeekSunSat':
            const lastWeekSun = subDays(startOfWeek(today, { weekStartsOn: 0 }), 7);
            return {
                startDate: lastWeekSun,
                endDate: endOfWeek(lastWeekSun, { weekStartsOn: 0 })
            };
        case 'lastWeekMonSun':
            const lastWeekMon = subDays(startOfWeek(today, { weekStartsOn: 1 }), 7);
            return {
                startDate: lastWeekMon,
                endDate: endOfWeek(lastWeekMon, { weekStartsOn: 1 })
            };
        case 'last28Days':
            return {
                startDate: subDays(today, 27),
                endDate: endToday
            };
        case 'last30days':
            return {
                startDate: subDays(today, 29),
                endDate: endToday
            };
        case 'thisMonth':
            return {
                startDate: startOfMonth(today),
                endDate: endOfMonth(today)
            };
        case 'lastMonth':
            const lastMonth = subMonths(today, 1);
            return {
                startDate: startOfMonth(lastMonth),
                endDate: endOfMonth(lastMonth)
            };
        case 'ytd':
            return {
                startDate: startOfYear(today),
                endDate: endToday
            };
        default:
            return { startDate: today, endDate: endToday };
    }
};

export const defaultPresets: Preset[] = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    {
        // Group header — no range of its own, just expands to show sub-options
        label: 'This week',
        value: '__group_thisWeek',
        children: [
            { label: 'Sun – Today', value: 'thisWeekSunToday' },
            { label: 'Mon – Today', value: 'thisWeekMonToday' },
        ],
    },
    { label: 'Last 7 days', value: 'last7days' },
    {
        label: 'Last week',
        value: '__group_lastWeek',
        children: [
            { label: 'Sun – Sat', value: 'lastWeekSunSat' },
            { label: 'Mon – Sun', value: 'lastWeekMonSun' },
        ],
    },
    { label: 'Last 28 days', value: 'last28Days' },
    { label: 'Last 30 days', value: 'last30days' },
    { label: 'This month', value: 'thisMonth' },
    { label: 'Last month', value: 'lastMonth' },
    { label: 'Year to Date', value: 'ytd' },
    { label: 'Custom', value: 'custom' },
];

