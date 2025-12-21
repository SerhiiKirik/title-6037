FSD Conventions

Naming
• kebab-case everywhere: folders, files, components in ui/ (e.g., booking-panel, select-time, confirm-booking).
• 1 slice = 1 responsibility / one business idea.
• All "public" imports should go through index.ts (public API).

Layers
• app/ — providers, global styles, layout, top-level config.
• pages/ — pages (composition of widgets/features), minimal logic.
• widgets/ — large UI blocks of a page (composes features/entities/shared).
• features/ — user actions/scenarios (select date/time, confirm, etc).
• entities/ — domain entities + their state/logic (store, selectors, domain helpers).
• shared/ — reusable UI components, utilities, helpers, base types.

Slice Structure
• ui/ — React components of the slice (CSS Modules alongside).
• model/ — state/store, selectors, derived state.
• lib/ — pure functions/utilities that belong to the slice.
• api/ — requests/adapters (if needed).
• index.ts — single export point to the outside.

Public API Rule
• Imports between layers/slices — only through index.ts.
• ✅ import { BookingPanel } from '@/widgets/booking-panel'
• ❌ import { BookingPanel } from '@/widgets/booking-panel/ui/booking-panel'

Dependency Direction
• Allowed dependency direction:
• app → pages → widgets → features → entities → shared
• shared doesn't depend on anyone (only on its own subfolders).

UI Conventions
• Components in ui/ have the same structure:
• Props interface
• props destructuring
• hooks at the top
• helper functions
• effects (if needed)
• return with layout
• Styles: CSS Modules (\*.module.scss) alongside the component.

CSS/SCSS Conventions
• Use CSS Modules (\*.module.scss).
• Sort CSS properties according to 9elements CSS Rule Order (https://9elements.com/css-rule-order/):

1. Generated content: content
2. Position & Layout: position, z-index, top/right/bottom/left, inset, flexbox/grid properties, float, clear
3. Display & Visibility: display, opacity, transform
4. Clipping: overflow, clip
5. Animation: animation, transition
6. Box Model (outside → in): margin, box-shadow, border, border-radius, box-sizing, width/max-width/min-width, height/max-height/min-height, padding
7. Background: background (and related), cursor
8. Typography: font-size, line-height, font-family, font-weight, font-style, text-\*, letter-spacing, word-spacing, color
   • Use targeted transitions instead of transition: all:
   • Define only those properties that actually change in :hover/:focus/:active/:disabled
   • Format: transition-property: transform, background-color, opacity; transition-duration: var(--transition);
   • Or shorthand: transition: transform 150ms ease, background-color 150ms ease;
   • Preserve comments and code readability.
   • Don't change selectors, specificity, or property values without necessity.
