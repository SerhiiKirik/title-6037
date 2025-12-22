# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**For AI assistants:** Also read **AGENTS.md** for detailed patterns, templates, and anti-patterns when working on this codebase.

## Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run format       # Format all files with Prettier
npm run format:check # Check if files are formatted correctly
```

## Architecture

This project follows **Feature-Sliced Design (FSD)** methodology with strict architectural conventions, integrated with Next.js App Router according to [official FSD guidelines](https://feature-sliced.github.io/documentation/docs/guides/tech/with-nextjs).

### Layer Structure

The codebase is organized into layers with unidirectional dependencies:

```
app → pages → widgets → features → entities → shared
```

Each layer can only import from layers to the right. The `shared` layer doesn't depend on anyone (only its own subfolders).

### Directory Structure

```
├── app/                 # Next.js App Router (root level)
├── pages/              # Empty folder (prevents Next.js from scanning src/pages/)
└── src/
    ├── pages/          # FSD pages layer - page compositions
    ├── widgets/        # Large UI blocks
    ├── features/       # User actions/scenarios
    ├── entities/       # Domain entities with state/logic
    └── shared/         # Reusable components, utilities, base types
```

**How it works:**

- **`app/`** (root) - Next.js App Router for routing
- **`src/pages/`** - FSD pages layer (re-exported in `app/`)
- **`pages/`** (root, empty) - Prevents Next.js Pages Router from scanning `src/pages/`

The App Router imports FSD pages from `src/`:

```typescript
// app/page.tsx
import { BookingPage } from '@/pages/booking';
export default () => <BookingPage />;
```

### Slice Structure

Each slice follows a standard internal structure:

- **ui/** - React components (SCSS Modules co-located)
- **model/** - State/store, selectors, derived state
- **lib/** - Pure functions/utilities belonging to the slice
- **api/** - Requests/adapters (if needed)
- **index.ts** - Single export point (Public API)

### Naming Conventions

- **kebab-case** for everything: folders, files, components in ui/ (e.g., `booking-panel`, `select-time`, `confirm-booking`)
- One slice = one responsibility / one business idea
- All public imports must go through `index.ts`

### Import Rules

**Correct:**

```typescript
import { BookingPanel } from '@/widgets/booking-panel';
```

**Incorrect:**

```typescript
import { BookingPanel } from '@/widgets/booking-panel/ui/booking-panel';
```

### Component Structure

Components in `ui/` should follow this structure:

1. Props interface
2. Props destructuring
3. Hooks (at the top)
4. Helper functions
5. Effects (if needed)
6. Return with layout

Use SCSS Modules (`*.module.scss`) co-located with components.

### Domain Logic Placement

- **Pure date/time logic** (generating ranges, 15-min intervals, time rounding) → `entities/*/lib` or `shared/lib` (depending on generality)
- **Selection state** (selected date/time, isConfirmEnabled) → `entities/*/model`

## Technology Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **next-intl** - Internationalization (i18n) with App Router support
- **Zustand** - State management (lightweight, minimal boilerplate)
- **date-fns** - Date/time utilities (modular, tree-shakable, TypeScript-friendly)
- **SCSS Modules** - Component styling (scoped, co-located with components)
- **clsx** - Conditional className (object-style only)
- **modern-normalize** - CSS normalization
- **ESLint (Airbnb config)** - Code quality
- **Prettier** - Code formatting (single quotes, semicolons, trailing commas)
- **Husky + lint-staged** - Pre-commit hooks

## Project-Specific Conventions

### State Management

The booking state is managed in `src/entities/booking/model/booking-store.ts` using Zustand. The store manages:

- Selected date/time
- Available time slots (derived from selected date)
- Confirm button state (derived from date + time selection)

### Date/Time Handling

- All date logic in `src/entities/booking/lib/date-utils.ts`
- Time slot generation in `src/entities/booking/lib/time-utils.ts`
- Always use local timezone for user selections
- Past times are automatically disabled for current day
- Time stored as "minutes from midnight" for easier calculations

### Component Pattern

All React components follow this structure:

1. Props interface definition (always named `Props`, not component-specific like `ButtonProps`)
2. Props destructuring
3. Hooks (useState, useMemo, useCallback, custom hooks)
4. Helper functions
5. useEffect (if needed)
6. Return JSX

**Example:**

```typescript
interface Props {
  title: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  // hooks
  const [state, setState] = useState();

  // helper functions
  const handleClick = () => {};

  // return JSX
  return <div>{title}</div>;
};
```

### Internationalization (i18n)

The project uses **next-intl** for internationalization with the Next.js App Router.

**Supported locales:**

- English (`en`) - default
- Ukrainian (`uk`)

**Configuration structure:**

```
src/shared/config/i18n/
├── config.ts              # Locale definitions and metadata
├── messages/
│   ├── en.json           # English translations
│   └── uk.json           # Ukrainian translations
└── index.ts              # Public API

i18n.ts                   # next-intl configuration (root)
middleware.ts             # Locale routing middleware (root)
```

**Key files:**

- **`i18n.ts`** - Loads translation messages based on locale
- **`middleware.ts`** - Handles automatic locale routing (always prefixes URLs with locale)
- **`src/shared/config/i18n/config.ts`** - Locale metadata for SEO (htmlLang, ogLocale, flags, native names)

**App structure:**

```
app/
├── layout.tsx           # Root layout (minimal, delegates to locale layout)
└── [locale]/            # Locale-specific routing
    ├── layout.tsx       # Wraps with NextIntlClientProvider
    ├── page.tsx         # Home page
    └── success/
        └── page.tsx     # Success page
```

**Using translations in components:**

```typescript
'use client';

import { useTranslations } from 'next-intl';

export const BookingPanel: FC = () => {
  const t = useTranslations('booking');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('confirmButton')}</button>
    </div>
  );
};
```

**Translation file structure:**

```json
{
  "booking": {
    "title": "Book Your Session",
    "subtitle": "Select a date and time",
    "confirmButton": "Confirm Booking"
  },
  "success": {
    "title": "Booking Confirmed!",
    "subtitle": "Your session has been successfully booked"
  },
  "common": {
    "language": "Language"
  }
}
```

**Language switcher:**

Located in `src/features/language-switcher/`, the switcher:

- Uses `useLocale()` to get current locale
- Uses `useRouter()` and `usePathname()` from `next/navigation` for navigation
- Strips current locale from pathname and adds new locale
- Uses `useTransition()` for loading state
- Implemented as a select dropdown with flags and native language names

**Locale-aware links:**

```typescript
import { useLocale } from 'next-intl';
import Link from 'next/link';

export const Component: FC = () => {
  const locale = useLocale();

  return <Link href={`/${locale}`}>Home</Link>;
};
```

**SEO integration:**

The locale metadata in `src/shared/config/i18n/config.ts` includes `htmlLang` and `ogLocale` properties used by the SEO entity for proper language tags in HTML and OpenGraph metadata.

### SCSS Conventions

- Use SCSS Modules (`*.module.scss`) co-located with components
- Use nesting where appropriate
- **CSS property order** follows 9elements CSS Rule Order:
  1. Generated content: `content`
  2. Position & Layout: `position`, `z-index`, `top/right/bottom/left`, `inset`, flexbox/grid properties, `float`, `clear`
  3. Display & Visibility: `display`, `opacity`, `transform`
  4. Clipping: `overflow`, `clip`
  5. Animation: `animation`, `transition`
  6. Box Model (outside → in): `margin`, `box-shadow`, `border`, `border-radius`, `box-sizing`, `width/max-width/min-width`, `height/max-height/min-height`, `padding`
  7. Background: `background` (and related), `cursor`
  8. Typography: `font-size`, `line-height`, `font-family`, `font-weight`, `font-style`, `text-*`, `letter-spacing`, `word-spacing`, `color`
- **Transitions:** Use targeted transitions instead of `transition: all`:
  - Define only those properties that actually change in `:hover/:focus/:active/:disabled`
  - Format: `transition-property: transform, background-color, opacity; transition-duration: var(--transition);`
  - Or shorthand: `transition: transform 150ms ease, background-color 150ms ease;`

### clsx Usage

Always use **object-style** syntax for conditional classNames:

```typescript
// ✅ Correct
className={clsx(styles.button, {
  [styles.active]: isActive,
  [styles.disabled]: isDisabled,
})}

// ❌ Incorrect
className={clsx(styles.button, isActive && styles.active)}
```

### SEO Configuration

SEO is managed in `src/entities/seo/`:

- **config.ts** - Default SEO values (`SEO_DEFAULTS`)
- **utils.ts** - `generateMetadata()` and `generateJsonLdData()` functions
- **types.ts** - TypeScript definitions
- **components/json-ld.tsx** - JSON-LD component for structured data

**Usage in pages:**

```typescript
import { generateMetadata, SEO_DEFAULTS } from '@/entities/seo';

export const metadata = generateMetadata(
  {
    url: 'https://yoursite.com/page/',
    title: 'Page Title',
    metaDescription: 'Page description',
    robots: true,
  },
  SEO_DEFAULTS,
);
```

- Organization, icons, manifest, and OpenGraph defaults are automatically included from `SEO_DEFAULTS`
- Override per-page as needed by passing specific values

### Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 1024px (lg)
- CSS custom properties in `src/app/globals.css` for theming
- Grid layouts adapt from mobile to desktop

### Import Paths

All imports use the `@/` alias which maps to `src/`:

```typescript
import { BookingPanel } from '@/widgets/booking-panel';
import { useBookingStore } from '@/entities/booking';
```

## Code Quality

### Pre-commit Hooks

This project uses Husky + lint-staged to automatically run checks before commits:

- ESLint with autofix
- Prettier formatting
- Type checking
- Build verification

**These hooks enforce code quality and prevent broken commits.**

### ESLint Configuration

- Airbnb config (TypeScript variant)
- Next.js core web vitals
- Prettier integration
- Custom rules:
  - React components must use arrow functions
  - No default exports required (named exports preferred)
  - No default props required
  - Button type not enforced

### Prettier Configuration

- Single quotes
- Semicolons required
- Trailing commas
- 80 character print width
- 2 space indentation

## Important Files

- **`AGENTS.md`** - Detailed patterns, templates, and anti-patterns for AI assistants
- **`FSD-CONVENTIONS.md`** - Detailed FSD architectural rules
- **`src/app/globals.css`** - CSS custom properties and global styles
- **`src/entities/booking/model/booking-store.ts`** - Main state management
- **`src/entities/booking/lib/`** - Core date/time logic
- **`src/entities/seo/`** - SEO utilities and configuration
- **`tsconfig.json`** - TypeScript configuration with path aliases
