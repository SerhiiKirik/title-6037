# Booking Session Page

A responsive booking session page built with Next.js 14, TypeScript, and Feature-Sliced Design architecture.

## Features

- **Date Selection**: Browse and select dates from today up to 6 weeks ahead
- **Time Slots**: Choose from 15-minute interval time slots in 12-hour format
- **Past Time Prevention**: Automatically disables time slots that have already passed for the current day
- **Responsive Design**: Fully adaptive layout from iPhone SE (320px) to 4K displays
- **Accessibility**: Full keyboard navigation support with ARIA labels
- **Type-Safe**: Built with TypeScript for robust type checking

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and improved DX
- **Zustand** - Lightweight state management
- **date-fns** - Modern date/time utility library
- **CSS Modules** - Scoped styling
- **ESLint (Airbnb)** - Code quality and consistency
- **Prettier** - Automatic code formatting

## Architecture

This project follows **Feature-Sliced Design (FSD)** methodology integrated with Next.js App Router. See [FSD-CONVENTIONS.md](./FSD-CONVENTIONS.md) and [CLAUDE.md](./CLAUDE.md) for detailed architectural guidelines.

### Structure

```
├── app/                 # Next.js App Router (root level)
├── pages/              # Empty (prevents Next.js from scanning src/pages/)
└── src/
    ├── pages/          # FSD pages layer - page compositions
    ├── widgets/        # Large UI blocks (booking-panel)
    ├── features/       # User actions (select-date-time)
    ├── entities/       # Domain entities (booking with model & lib)
    └── shared/         # Reusable components and utilities
```

The App Router (`app/`) imports and re-exports pages from the FSD structure (`src/pages/`), following [official FSD guidelines for Next.js](https://feature-sliced.github.io/documentation/docs/guides/tech/with-nextjs).

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
