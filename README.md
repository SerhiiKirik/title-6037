# Booking Session Page

A responsive booking session page built with Next.js 14, TypeScript, and Feature-Sliced Design architecture.

## 🚀 Live Demo

**[View Demo on Vercel](https://title-6037.vercel.app/en)**

## Features

### Core Features (Task Requirements)

- **Date Selection**: Browse and select dates from today up to 6 weeks ahead
- **Time Slots**: Choose from 15-minute interval time slots in 12-hour format (AM/PM)
- **Past Time Prevention**: Automatically disables time slots that have already passed for the current day
- **Active Confirm Button**: Enabled only when both date and time are selected
- **Timestamp Output**: Outputs Unix timestamp to console on confirmation
- **Responsive Design**: Fully adaptive layout from iPhone SE (320px) to 4K displays
- **Type-Safe**: Built with TypeScript for robust type checking

### Bonus Features (Beyond Requirements)

- **🌍 Internationalization (i18n)**: Multi-language support (English/Ukrainian) with next-intl
  - Automatic locale detection and routing
  - Localized date formats (day names, months)
  - Language switcher in header with preserved URL params
- **✅ Success Page**: Confirmation page with booking details
  - Displays selected date and time
  - Email confirmation form (mock)
  - Automatic navigation with timestamp
- **🏗️ Feature-Sliced Design**: Professional scalable architecture
  - Clear separation of concerns
  - Layer-based structure (app → pages → widgets → features → entities → shared)
  - Integrated with Next.js App Router
- **🎨 Advanced UI/UX**:
  - Smooth animations and transitions
  - Loading states with Suspense boundaries
  - Skeleton placeholders
  - Hover effects and visual feedback
- **🔧 Development Experience**:
  - Pre-commit hooks (Husky + lint-staged)
  - Automatic code formatting (Prettier)
  - Type checking and linting on commit
  - Comprehensive documentation (CLAUDE.md, FSD-CONVENTIONS.md, AGENTS.md)
- **📦 SEO Optimization**:
  - Meta tags configuration
  - OpenGraph support
  - JSON-LD structured data
  - Locale-aware metadata
- **♿ Accessibility**:
  - Full keyboard navigation support
  - ARIA labels and roles
  - Screen reader friendly
- **⚡ Performance**:
  - Static site generation (SSG)
  - Optimized bundle size
  - Code splitting
  - Tree-shakable imports

## Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and improved DX
- **React 18** - UI library with latest features

### State & Data
- **Zustand** - Lightweight state management
- **date-fns** - Modern date/time utility library

### Styling
- **SCSS Modules** - Scoped styling with Sass
- **clsx** - Conditional className utility
- **modern-normalize** - CSS normalization

### Internationalization
- **next-intl** - i18n with App Router support

### Code Quality
- **ESLint (Airbnb)** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Architecture

This project follows **Feature-Sliced Design (FSD)** methodology integrated with Next.js App Router. See [FSD-CONVENTIONS.md](./FSD-CONVENTIONS.md) and [CLAUDE.md](./CLAUDE.md) for detailed architectural guidelines.

### Structure

```
booking-session-page/
├── app/                    # Next.js App Router
│   └── [locale]/          # Locale routing (en, uk)
│
├── src/                   # FSD architecture layers
│   ├── pages/            # Page compositions (booking, success)
│   ├── widgets/          # Large UI blocks (booking-panel, hero)
│   ├── features/         # User features (language-switcher, select-date-time)
│   ├── entities/         # Domain logic (booking, seo)
│   └── shared/           # Reusable code
│       ├── config/       # App configuration (i18n)
│       ├── ui/           # UI components (button, header, icons)
│       ├── lib/          # Utilities & hooks
│       ├── styles/       # SCSS variables & mixins
│       └── types/        # TypeScript types
│
├── public/               # Static assets
├── i18n.ts              # next-intl configuration
├── middleware.ts        # Locale routing middleware
└── *.md                 # Documentation
```

**Layer Dependencies:**
```
app → pages → widgets → features → entities → shared
```

Each layer can only import from layers to its right. See [FSD-CONVENTIONS.md](./FSD-CONVENTIONS.md) for details.

## Library Choices

### date-fns

Chosen for its modular approach, excellent TypeScript support, and comprehensive date/time manipulation capabilities. It provides:

- Reliable timezone handling
- Simple API for date ranges and formatting
- Tree-shakable functions for optimal bundle size

### Zustand

Selected for state management because:

- Minimal boilerplate
- Simple API without providers/context
- Excellent TypeScript inference
- Perfect for derived state (isConfirmEnabled, availableTimeSlots)

### CSS Modules

Used for styling to:

- Avoid naming conflicts
- Co-locate styles with components
- Zero runtime overhead
- Great TypeScript integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

### Code Quality

```bash
# Run linter
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format

# Check formatting
npm run format:check
```

## Usage

1. **Select a Date**: Click on any date card from the available range
2. **Choose a Time**: After selecting a date, available time slots will appear (past times are disabled for today)
3. **Confirm Booking**: Click "Confirm Booking" button (enabled only when both date and time are selected)
4. **View Result**: Check browser console for the timestamp output in Unix seconds format

## Key Implementation Details

### Date Range Logic

- Generates dates from today (00:00 local time) to +6 weeks inclusive
- Handles month/year transitions correctly
- DST-aware date generation

### Time Slots Logic

- 15-minute intervals (00:00 to 23:45)
- 12-hour format with AM/PM
- Smart disabling of past times for current day
- Automatic validation when switching dates

### State Management

The Zustand store manages:

- `selectedDate`: Currently selected date
- `selectedTime`: Selected time in minutes from midnight
- `availableTimeSlots`: Computed slots based on selected date
- `isConfirmEnabled`: Derived state for button activation

### Timestamp Generation

On confirmation, combines selected date and time into a Unix timestamp (seconds, not milliseconds).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
