# React Smart Date Compare 📅

[![npm version](https://img.shields.io/npm/v/react-smart-date-compare)](https://www.npmjs.com/package/react-smart-date-compare)
[![npm downloads](https://img.shields.io/npm/dm/react-smart-date-compare)](https://www.npmjs.com/package/react-smart-date-compare)
[![license](https://img.shields.io/npm/l/react-smart-date-compare)](https://github.com/POTUMANOJKUMAR/react-smart-date-compare/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**React Smart Date Compare** is a professional, high-performance date range picker for React. Designed for analytics and dashboards, it features advanced **period comparison** (YoY, PoP), **single date mode**, and full **Tailwind CSS** integration.

[Live Demo & Playground](https://potumanojkumar.github.io/react-smart-date-compare/)

---

## ✨ Features

- 📅 **Range & Single Mode**: Seamlessly switch between selecting a range or a single day.
- 🔁 **Advanced Comparison**: Comparison with Previous Period, Same Period Last Year (YoY), or Custom Range. Built-in logic for matching days of the week.
- 📱 **Fully Responsive**: Optimized for mobile and desktop. Stacks vertically on small screens and expands gracefully.
- 🎨 **Premium Aesthetics**: Clean, modern UI with smooth transitions and customizable theme colors (Primary & Compare).
- 🌍 **Localization**: Native support for `date-fns` locales (English, Spanish, French, etc.).
- 🛠 **Highly Configurable**: Control `minDate`, `maxDate`, `disableFuture`, `weekStartsOn`, and custom presets.
- ♿ **Accessible**: ARIA labels and keyboard-friendly design.

## 📦 Installation

```bash
npm install react-smart-date-compare date-fns
```

## 🚀 Quick Start

### 1. Import Styles

Import the bundled CSS to your app's entry point:

```tsx
import 'react-smart-date-compare/style.css';
```

### 2. Basic Usage

```tsx
import { SmartDateCompare } from 'react-smart-date-compare';

function App() {
  return (
    <SmartDateCompare
        onApply={(range, compareRange) => console.log(range, compareRange)}
        primaryColor="#6366f1"
        enableCompare={true}
        isCompare={true} // Set to false for single date mode
    />
  );
}
```

## ⚙️ Props API

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `isCompare` | `boolean` | `true` | When `true`, enables range selection and comparison. When `false`, enables single date selection. |
| `enableCompare` | `boolean` | `false` | Whether comparison is active by default. |
| `primaryColor` | `string` | `#3b82f6` | Hex code for the primary selection color. |
| `compareColor` | `string` | `#f97316` | Hex code for the comparison selection color. |
| `minDate` / `maxDate` | `Date` | - | Limits for selectable dates. |
| `disableFuture` | `boolean` | `false` | Prevent selection of future dates. |
| `locale` | `Locale` | `en-US` | `date-fns` locale object for formatting and translations. |
| `presets` | `Preset[]` | - | Custom sidebar shortcuts (e.g., "Last 7 Days"). |

## 💡 Why this package?

Most date pickers treat comparison as an afterthought. **React Smart Date Compare** was built specifically for businesses that need to analyze data trends over time. It handles the complex date calculations (like matching "Tuesday to Tuesday" for previous periods) out of the box.

## 🤝 Contributing

We love contributions! Whether it's a bug fix, new feature, or improving documentation:
1. Fork the repo
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [POTUMANOJKUMAR](https://github.com/POTUMANOJKUMAR)
