# Shared Styles

Centralized SCSS variables and mixins for the project.

## Important Rule

**ALL sizes must be in pixels (px), NOT rem or em.**
This is a project-wide convention for consistency and simplicity.

## Usage

Import in your SCSS modules:

```scss
@import '@/shared/styles';
```

This imports both variables and mixins.

## Variables

### Typography

- `$font-poppins` - Primary font (Poppins)
- `$font-kaisei` - Secondary font (Kaisei Tokumin)

### Colors

- `$color-primary` - Primary brand color (#2563eb)
- `$color-primary-hover` - Primary hover state (#1d4ed8)
- `$color-text` - Main text color (#1f2937)
- `$color-text-secondary` - Secondary text color (#6b7280)
- `$color-background` - Background color (#ffffff)
- `$color-border` - Border color (#e5e7eb)
- `$color-disabled` - Disabled state color (#9ca3af)
- `$color-selected` - Selected state color (#dbeafe)

### Spacing

- `$spacing-xs` - 4px
- `$spacing-sm` - 8px
- `$spacing-md` - 16px
- `$spacing-lg` - 24px
- `$spacing-xl` - 32px

### Other

- `$border-radius` - 8px
- `$transition` - 300ms ease-in-out
- `$header-height-mobile` - 64px
- `$header-height-desktop` - 86px

### Breakpoints

- `$breakpoint-sm` - 640px (tablet)
- `$breakpoint-lg` - 1024px (desktop)

## Mixins

### Responsive (Mobile-First)

```scss
.element {
  // Mobile styles (base)
  padding: 1rem;

  @include onTablet {
    // Tablet and up (min-width: 640px)
    padding: 1.5rem;
  }

  @include onDesktop {
    // Desktop and up (min-width: 1024px)
    padding: 2rem;
  }
}
```

### Transitions

```scss
.button {
  @include smoothTransition(transform, background-color, opacity);
}
```

### Flexbox Helpers

```scss
.centered {
  @include flexCenter; // align-items: center; justify-content: center;
}

.header {
  @include flexBetween; // align-items: center; justify-content: space-between;
}
```

### Focus Outline

```scss
.button {
  @include focusOutline;
  // Adds 2px solid outline on :focus-visible
}
```

### Disabled State

```scss
.button {
  @include disabled;
  // Adds opacity: 0.6 and cursor: not-allowed on :disabled
}
```

## Example

```scss
@import '@/shared/styles';

.card {
  border-radius: $border-radius;
  padding: $spacing-md;
  background-color: $color-background;

  @include onTablet {
    padding: $spacing-lg;
  }

  @include onDesktop {
    padding: $spacing-xl;
  }
}

.button {
  @include smoothTransition(background-color, transform);
  @include focusOutline;

  background-color: $color-primary;
  color: white;

  &:hover {
    background-color: $color-primary-hover;
  }

  @include disabled;
}
```
