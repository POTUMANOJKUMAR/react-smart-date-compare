export type CompareMode =
    | "previousPeriod"
    | "previousPeriodMatchDay"
    | "samePeriodLastYear"
    | "custom";

export interface DateRange {
    startDate: Date;
    endDate: Date;
    key?: string;
}

export interface Preset {
    label: string;
    value: string; // 'today', 'last7days', etc. or 'custom'
    range?: () => DateRange;
    /** Sub-options — if provided, this preset acts as a group header with an expand arrow */
    children?: Preset[];
}

export interface SmartDateCompareProps {
    /** Controlled value for the date range */
    value?: DateRange;
    /** Initial value for the date range when uncontrolled */
    defaultValue?: DateRange;
    /** Callback triggered whenever the selection changes (before applying) */
    onChange?: (data: {
        startDate: Date;
        endDate: Date;
        compareStartDate?: Date;
        compareEndDate?: Date;
    }) => void;

    // Customization
    /** List of shortcut presets for the sidebar */
    presets?: Preset[];
    /** Whether comparison mode is enabled by default */
    enableCompare?: boolean;
    /** Whether to show a quick-toggle for comparison in the trigger button */
    showCompareToggle?: boolean;
    /** The active comparison mode (e.g., previous period, same period last year) */
    compareMode?: CompareMode;

    // Constraints & Logic
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Day the week starts on (0 for Sunday, 1 for Monday, etc.) */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** Specific dates that should be disabled */
    disabledDates?: Date[];
    /** Disable all future dates relative to today */
    disableFuture?: boolean;
    /** Disable all past dates relative to today */
    disablePast?: boolean;

    // Localization & Text
    /** date-fns locale object for formatting and translations */
    locale?: any;
    /** Custom labels for buttons and UI text */
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
    };

    // Styling & Theme
    /** Primary theme color (hex or CSS variable) */
    primaryColor?: string;
    /** Comparison theme color (hex or CSS variable) */
    compareColor?: string;
    /** Border radius for UI elements */
    borderRadius?: string;

    // ClassName Overrides for deep customization
    /** Custom CSS classes for internal components */
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

    /** Visual variant of the component */
    variant?: "default" | "minimal" | "dashboard" | "enterprise";
    /** Size of the trigger button */
    size?: "sm" | "md" | "lg";
    /** Preferred placement of the dropdown */
    placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";

    // Callbacks
    /** Callback triggered when the 'Apply' button is clicked */
    onApply?: (range: DateRange, compareRange?: DateRange) => void;
    /** Callback triggered when the 'Cancel' button is clicked or user clicks outside */
    onCancel?: () => void;

    /** When true, enables range selection and comparison. When false, enables single date selection. */
    isCompare?: boolean;

    /** Additional CSS class for the trigger button container */
    className?: string;
    /** Additional inline styles for the trigger button container */
    style?: React.CSSProperties;
}
