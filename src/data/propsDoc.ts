export interface PropDoc {
    name: string;
    type: string;
    default: string;
    required: boolean;
    description: string;
    category: 'Core' | 'Comparison' | 'Constraints' | 'Styling' | 'Localization' | 'Callbacks';
}

export const PROPS_DOCS: PropDoc[] = [
    // Core
    {
        name: 'value',
        type: 'DateRange',
        default: 'undefined',
        required: false,
        description: 'Controlled value. Syncs external state to the picker.',
        category: 'Core',
    },
    {
        name: 'defaultValue',
        type: 'DateRange',
        default: 'today',
        required: false,
        description: 'Uncontrolled initial value. Used when you do not need to track state externally.',
        category: 'Core',
    },
    {
        name: 'presets',
        type: 'Preset[]',
        default: 'defaultPresets',
        required: false,
        description: 'Array of preset ranges shown in the sidebar. Supports nested children for grouped presets.',
        category: 'Core',
    },
    // Comparison
    {
        name: 'enableCompare',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Show the compare toggle in the sidebar. When toggled on, the compare range is calculated.',
        category: 'Comparison',
    },
    {
        name: 'compareMode',
        type: '"previousPeriod" | "previousPeriodMatchDay" | "samePeriodLastYear" | "custom"',
        default: '"previousPeriod"',
        required: false,
        description: 'Algorithm used to auto-calculate the comparison range. Use "custom" to let users drag a separate range.',
        category: 'Comparison',
    },
    // Constraints
    {
        name: 'minDate',
        type: 'Date',
        default: 'undefined',
        required: false,
        description: 'Earliest selectable date. Days before this are disabled and visually greyed out.',
        category: 'Constraints',
    },
    {
        name: 'maxDate',
        type: 'Date',
        default: 'undefined',
        required: false,
        description: 'Latest selectable date. Days after this are disabled.',
        category: 'Constraints',
    },
    {
        name: 'disableFuture',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Shorthand to disable all dates after today. Equivalent to maxDate={new Date()}.',
        category: 'Constraints',
    },
    {
        name: 'disablePast',
        type: 'boolean',
        default: 'false',
        required: false,
        description: 'Shorthand to disable all dates before today.',
        category: 'Constraints',
    },
    {
        name: 'disabledDates',
        type: 'Date[]',
        default: 'undefined',
        required: false,
        description: 'Specific dates to disable (e.g. holidays). The date is compared by calendar day.',
        category: 'Constraints',
    },
    {
        name: 'weekStartsOn',
        type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
        default: '0',
        required: false,
        description: 'Day the week starts on. 0 = Sunday, 1 = Monday, etc.',
        category: 'Constraints',
    },
    // Styling
    {
        name: 'primaryColor',
        type: 'string',
        default: '"#3b82f6"',
        required: false,
        description: 'CSS hex or variable for the primary selection color. Injected as --sdc-primary-color.',
        category: 'Styling',
    },
    {
        name: 'compareColor',
        type: 'string',
        default: '"#f97316"',
        required: false,
        description: 'CSS hex or variable for the comparison range highlight color.',
        category: 'Styling',
    },
    {
        name: 'className',
        type: 'string',
        default: 'undefined',
        required: false,
        description: 'Additional class applied to the root trigger element.',
        category: 'Styling',
    },
    {
        name: 'classNames',
        type: 'ClassNamesConfig',
        default: 'undefined',
        required: false,
        description: 'Fine-grained class overrides for internal elements: root, sidebar, calendar, day, buttonApply, buttonCancel, presetActive, etc.',
        category: 'Styling',
    },
    {
        name: 'style',
        type: 'React.CSSProperties',
        default: 'undefined',
        required: false,
        description: 'Inline styles applied to the root container element.',
        category: 'Styling',
    },
    // Localization
    {
        name: 'locale',
        type: 'Locale',
        default: 'undefined',
        required: false,
        description: 'A date-fns locale object (e.g. import { fr } from "date-fns/locale").',
        category: 'Localization',
    },
    {
        name: 'labels',
        type: 'LabelsConfig',
        default: 'en defaults',
        required: false,
        description: 'Override any UI text string: apply, cancel, clear, selectDateRange, vs, and more.',
        category: 'Localization',
    },
    // Callbacks
    {
        name: 'onChange',
        type: '(data: ChangePayload) => void',
        default: 'undefined',
        required: false,
        description: 'Fired on every selection change (including mid-selection). Returns startDate, endDate, compareStartDate?, compareEndDate?.',
        category: 'Callbacks',
    },
    {
        name: 'onApply',
        type: '(range: DateRange, compareRange?: DateRange) => void',
        default: 'undefined',
        required: false,
        description: 'Fired when the user clicks Apply. Receives the confirmed primary and optional compare ranges.',
        category: 'Callbacks',
    },
    {
        name: 'onCancel',
        type: '() => void',
        default: 'undefined',
        required: false,
        description: 'Fired when the user clicks Cancel or clicks outside the picker.',
        category: 'Callbacks',
    },
];

export const CATEGORY_ORDER: PropDoc['category'][] = [
    'Core',
    'Comparison',
    'Constraints',
    'Styling',
    'Localization',
    'Callbacks',
];
