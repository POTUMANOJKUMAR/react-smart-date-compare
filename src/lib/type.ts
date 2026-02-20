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
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (data: {
        startDate: Date;
        endDate: Date;
        compareStartDate?: Date;
        compareEndDate?: Date;
    }) => void;

    // Customization
    presets?: Preset[];
    enableCompare?: boolean;
    compareMode?: CompareMode;

    // Constraints & Logic
    minDate?: Date;
    maxDate?: Date;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[]; // Specific dates to disable
    disableFuture?: boolean;
    disablePast?: boolean;

    // Localization & Text
    locale?: any; // date-fns locale object
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
    primaryColor?: string; // Hex or CSS var
    compareColor?: string;
    borderRadius?: string;

    // ClassName Overrides for deep customization
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

    variant?: "default" | "minimal" | "dashboard" | "enterprise";
    size?: "sm" | "md" | "lg";
    placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";

    // Callbacks
    onApply?: (range: DateRange, compareRange?: DateRange) => void;
    onCancel?: () => void;

    className?: string; // Prop for the trigger button/container
    style?: React.CSSProperties;
}
