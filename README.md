# React Smart Date Compare

A flexible, Tailwind CSS-powered date range picker with advanced comparison features.

<p align="center">
    <img src="https://img.shields.io/npm/v/react-smart-date-compare" alt="npm version" />
    <img src="https://img.shields.io/npm/l/react-smart-date-compare" alt="license" />
</p>

## ✨ Features

- 📅 **Range Selection**: Intuitive start and end date selection.
- 🔁 **Comparison Mode**: Compare with previous period, same period last year, or custom range.
- 🎨 **Themeable**: Full control over colors via props and/or Tailwind classes.
- ⚡ **Lightweight**: Built on `date-fns` and Tailwind CSS.
- 🌍 **Localization**: Supports `date-fns` locales.
- 📱 **Responsive**: Mobile-friendly design.
- 🛠 **Highly Configurable**: Control `minDate`, `maxDate`, `disabledDates`, presets, and more.

## 📦 Installation

```bash
npm install react-smart-date-compare date-fns
# or
yarn add react-smart-date-compare date-fns
```

## 🚀 Usage

### 1. Import Styles

Ensure you import the CSS file in your main entry point (e.g., `App.tsx` or `main.tsx`):

```tsx
import 'react-smart-date-compare/style.css';
```

### 2. Basic Example

```tsx
import { SmartDateCompare, DateRange } from 'react-smart-date-compare';
import { enUS } from 'date-fns/locale';

function App() {
  const handleApply = (range: DateRange, compareRange?: DateRange) => {
    console.log('Selected Range:', range);
    console.log('Compare Range:', compareRange);
  };

  return (
    <SmartDateCompare
        onApply={handleApply}
        primaryColor="#3b82f6"
        compareColor="#f97316"
        enableCompare={true}
        locale={enUS}
    />
  );
}
```

## 📂 Manual Integration (No NPM)

If you prefer to include the source code directly in your project:

1. Copy the `src/lib` folder to your components directory (e.g., `src/components/SmartDateCompare`).
2. Install dependencies:
   ```bash
   npm install date-fns
   ```
3. Ensure Tailwind CSS is configured in your project.
4. Update imports:
   ```tsx
   import { SmartDateCompare } from './components/SmartDateCompare';
   import './components/SmartDateCompare/index.css';
   ```

## ⚙️ Configuration Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `DateRange` | - | Controlled value for the date range. |
| `defaultValue` | `DateRange` | `today` | Initial value if uncontrolled. |
| `onChange` | `(data) => void` | - | Callback when selection changes (before apply). |
| `onApply` | `(range, compareRange) => void` | - | Callback when "Apply" is clicked. |
| `onCancel` | `() => void` | - | Callback when "Cancel" is clicked. |
| `presets` | `Preset[]` | `defaultPresets` | Array of preset ranges (e.g., "Last 7 Days"). |
| `enableCompare` | `boolean` | `false` | Enable comparison mode by default. |
| `compareMode` | `'previousPeriod' \| 'previousPeriodMatchDay' \| 'samePeriodLastYear' \| 'custom'` | `'previousPeriod'` | Default comparison mode. |
| `primaryColor` | `string` | `#3b82f6` | Primary color for selected range (hex). |
| `compareColor` | `string` | `#f97316` | Color for comparison range (hex). |
| `minDate` | `Date` | - | Minimum selectable date. |
| `maxDate` | `Date` | - | Maximum selectable date. |
| `disableFuture` | `boolean` | `false` | Disable all future dates. |
| `disablePast` | `boolean` | `false` | Disable all past dates. |
| `weekStartsOn` | `0-6` | `0` | Day the week starts on (0 = Sunday). |
| `locale` | `Locale` | - | date-fns locale object. |
| `labels` | `object` | - | Custom labels for buttons and text. |
| `classNames` | `object` | - | Custom class names for internal elements. |

### Labels Object

```tsx
labels={{
  apply: "Apply",
  cancel: "Cancel",
  selectDateRange: "Select Date Range",
  vs: "vs",
  custom: "Custom",
  // ... more
}}
```

### ClassNames Object

Override specific parts of the UI with Tailwind classes:

```tsx
classNames={{
  root: "my-custom-wrapper",
  buttonApply: "bg-green-600 hover:bg-green-700",
  daySelected: "bg-purple-600",
  // ...
}}
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT © [Your Name]
