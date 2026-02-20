import { subDays, subMonths, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import type { SmartDateCompareProps } from '../lib/type';

export interface ExampleConfig {
    id: string;
    title: string;
    description: string;
    tag: string;
    tagColor: string;
    props: Partial<SmartDateCompareProps>;
    code: string;
}

const today = new Date();

export const EXAMPLE_CONFIGS: ExampleConfig[] = [
    {
        id: 'standard',
        title: 'Standard',
        description: 'Default configuration — out of the box with built-in presets and compare toggle.',
        tag: 'Default',
        tagColor: '#6366f1',
        props: {
            defaultValue: { startDate: subDays(today, 30), endDate: today },
            enableCompare: false,
        },
        code: `import { SmartDateCompare } from "react-smart-date-compare";

<SmartDateCompare
  defaultValue={{
    startDate: subDays(new Date(), 30),
    endDate: new Date()
  }}
  onApply={(range, compareRange) => {
    console.log("Range:", range);
    console.log("Compare:", compareRange);
  }}
/>`,
    },
    {
        id: 'custom-labels',
        title: 'Custom Labels',
        description: 'Rename all button text and placeholders for your own language or branding.',
        tag: 'i18n',
        tagColor: '#22c55e',
        props: {
            defaultValue: { startDate: subDays(today, 7), endDate: today },
            enableCompare: true,
            compareMode: 'previousPeriod',
            labels: {
                apply: '✓ Confirm Range',
                cancel: 'Discard',
                selectDateRange: 'Pick your dates...',
                vs: 'compared to',
            },
        },
        code: `<SmartDateCompare
  defaultValue={{ startDate: subDays(new Date(), 7), endDate: new Date() }}
  enableCompare
  compareMode="previousPeriod"
  labels={{
    apply: "✓ Confirm Range",
    cancel: "Discard",
    selectDateRange: "Pick your dates...",
    vs: "compared to",
    clear: "Clear all"
  }}
/>`,
    },
    {
        id: 'custom-colors',
        title: 'Custom Colors',
        description: 'Full theme override with custom primary and compare highlight colors.',
        tag: 'Theming',
        tagColor: '#f97316',
        props: {
            defaultValue: { startDate: subDays(today, 14), endDate: today },
            enableCompare: true,
            compareMode: 'previousPeriod',
            primaryColor: '#7c3aed',
            compareColor: '#059669',
            classNames: {
                buttonApply: 'bg-violet-600 hover:bg-violet-700 border-transparent text-white',
                daySelected: 'bg-violet-600 text-white',
                dayInRange: 'bg-violet-50 text-violet-700',
                dayCompare: 'bg-emerald-50 text-emerald-700',
                presetActive: 'bg-violet-50 text-violet-600 font-semibold',
            },
        },
        code: `<SmartDateCompare
  defaultValue={{ startDate: subDays(new Date(), 14), endDate: new Date() }}
  enableCompare
  compareMode="previousPeriod"
  primaryColor="#7c3aed"
  compareColor="#059669"
  classNames={{
    buttonApply: "bg-violet-600 hover:bg-violet-700",
    daySelected: "bg-violet-600 text-white",
    dayInRange: "bg-violet-50 text-violet-700",
    dayCompare: "bg-emerald-50 text-emerald-700",
    presetActive: "bg-violet-50 text-violet-600 font-semibold"
  }}
/>`,
    },
    {
        id: 'date-constraints',
        title: 'Date Constraints',
        description: 'Restrict selection with minDate, maxDate, disableFuture, and disablePast.',
        tag: 'Constraints',
        tagColor: '#eab308',
        props: {
            defaultValue: { startDate: subDays(today, 7), endDate: today },
            disableFuture: true,
            minDate: new Date(2024, 0, 1),
            maxDate: today,
            weekStartsOn: 1,
        },
        code: `<SmartDateCompare
  defaultValue={{ startDate: subDays(new Date(), 7), endDate: new Date() }}
  disableFuture={true}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date()}
  weekStartsOn={1} // Monday start
/>`,
    },
    {
        id: 'custom-presets',
        title: 'Custom Presets',
        description: 'Inject your own preset ranges with custom labels and date logic.',
        tag: 'Advanced',
        tagColor: '#ec4899',
        props: {
            defaultValue: { startDate: startOfMonth(today), endDate: today },
            enableCompare: true,
            presets: [
                {
                    label: 'This Month',
                    value: 'thisMonth',
                    range: () => ({ startDate: startOfMonth(today), endDate: today }),
                },
                {
                    label: 'Last Month',
                    value: 'lastMonth',
                    range: () => {
                        const lm = subMonths(today, 1);
                        return { startDate: startOfMonth(lm), endDate: endOfMonth(lm) };
                    },
                },
                {
                    label: 'This Quarter',
                    value: 'thisQuarter',
                    range: () => {
                        const q = Math.floor(today.getMonth() / 3);
                        return {
                            startDate: new Date(today.getFullYear(), q * 3, 1),
                            endDate: today
                        };
                    },
                },
                {
                    label: 'YTD',
                    value: 'ytd',
                    range: () => ({ startDate: startOfYear(today), endDate: today }),
                },
                { label: 'Custom', value: 'custom' },
            ],
        },
        code: `<SmartDateCompare
  enableCompare
  presets={[
    {
      label: "This Month",
      value: "thisMonth",
      range: () => ({ startDate: startOfMonth(new Date()), endDate: new Date() })
    },
    {
      label: "This Quarter",
      value: "thisQuarter",
      range: () => {
        const q = Math.floor(new Date().getMonth() / 3);
        return { startDate: new Date(new Date().getFullYear(), q * 3, 1), endDate: new Date() };
      }
    },
    { label: "YTD", value: "ytd", range: () => ({ startDate: startOfYear(new Date()), endDate: new Date() }) },
    { label: "Custom", value: "custom" }
  ]}
/>`,
    },
    {
        id: 'enterprise',
        title: 'Enterprise Advanced',
        description: 'Full set: compare enabled, all constraints, custom colors, and custom class overrides.',
        tag: 'Enterprise',
        tagColor: '#6366f1',
        props: {
            defaultValue: { startDate: subDays(today, 30), endDate: today },
            enableCompare: true,
            compareMode: 'previousPeriodMatchDay' as any,
            primaryColor: '#2563eb',
            compareColor: '#f97316',
            disableFuture: true,
            weekStartsOn: 1,
            labels: {
                apply: 'Apply Range',
                cancel: 'Cancel',
                selectDateRange: 'Select analysis period',
                vs: 'vs',
            },
            classNames: {
                buttonApply: 'bg-blue-600 hover:bg-blue-700 border-transparent text-white',
            },
        },
        code: `<SmartDateCompare
  defaultValue={{ startDate: subDays(new Date(), 30), endDate: new Date() }}
  enableCompare
  compareMode="previousPeriodMatchDay"
  primaryColor="#2563eb"
  compareColor="#f97316"
  disableFuture
  weekStartsOn={1}
  labels={{
    apply: "Apply Range",
    selectDateRange: "Select analysis period",
    vs: "vs",
    clear: "Reset"
  }}
  classNames={{
    buttonApply: "bg-blue-600 hover:bg-blue-700"
  }}
  onApply={(range, compareRange) => {
    console.log("Primary:", range);
    console.log("Compare:", compareRange);
  }}
/>`,
    },
];
