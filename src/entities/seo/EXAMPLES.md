# SEO Library Usage Examples

This SEO library for Next.js provides utilities for generating SEO metadata and JSON-LD structured data.

## Table of Contents

1. [Basic WebPage](#basic-webpage)
2. [With JSON-LD Component](#with-json-ld-component)
3. [Breadcrumbs for Canonical URLs](#breadcrumbs-for-canonical-urls)
4. [Customizing Organization Data](#customizing-organization-data)

---

## Basic WebPage

For regular pages like Home, About, Booking, etc.

```typescript
// app/about/page.tsx
import { generateMetadata as generateSeoMetadata } from '@/shared/lib/seo';
import { SEO_DEFAULTS } from '@/shared/lib/seo';

export const metadata = generateSeoMetadata(
  {
    url: `${SEO_DEFAULTS.siteUrl}/about/`,
    title: 'About Us - Booking Session',
    metaDescription:
      'Learn about our company, mission, and team. We provide the best booking solutions.',
    keywords: 'about, company, team, mission',
    robots: true, // index this page
  },
  SEO_DEFAULTS,
);

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Your content here...</p>
    </div>
  );
}
```

---

## With JSON-LD Component

If you need more control over JSON-LD rendering (for example, in client components or when you need dynamic data), use the `JsonLd` component:

```typescript
// app/dynamic/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { JsonLd, generateJsonLdData } from '@/shared/lib/seo';
import { SEO_DEFAULTS } from '@/shared/lib/seo';

export default function DynamicPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch dynamic data
    fetch('/api/page-data')
      .then((res) => res.json())
      .then((pageData) => setData(pageData));
  }, []);

  const jsonLd = data
    ? generateJsonLdData(
        {
          url: `${SEO_DEFAULTS.siteUrl}/dynamic/`,
          title: data.title,
          metaDescription: data.description,
        },
        SEO_DEFAULTS,
      )
    : null;

  return (
    <>
      <JsonLd data={jsonLd} />
      <div>
        <h1>{data?.title || 'Loading...'}</h1>
        <p>{data?.description}</p>
      </div>
    </>
  );
}
```

---

## Breadcrumbs for Canonical URLs

You can specify breadcrumbs to generate canonical URLs:

```typescript
export const metadata = generateSeoMetadata(
  {
    url: `${SEO_DEFAULTS.siteUrl}/services/booking/online/`,
    title: 'Online Booking - Services',
    metaDescription: 'Book your appointment online',
    breadcrumbs: [
      { name: 'Services', slug: '/services/', canonical: true },
      { name: 'Booking', slug: '/booking/', canonical: true },
      { name: 'Online', slug: '/online/', canonical: true },
    ],
    robots: true,
  },
  SEO_DEFAULTS,
);
```

This will generate a canonical URL based on the breadcrumbs: `https://yoursite.com/services/booking/online/`

---

## Customizing Organization Data

Edit `src/shared/lib/seo/config.ts` to customize your organization data:

```typescript
export const ORGANIZATION: JsonLdOrganization = {
  name: 'Your Company Name',
  logo: {
    url: 'https://yoursite.com/logo.png',
    width: 250,
    height: 60,
  },
  sameAs: [
    'https://twitter.com/yourcompany',
    'https://linkedin.com/company/yourcompany',
    'https://facebook.com/yourcompany',
  ],
};
```

---

## Overriding Icons for Specific Pages

Icons and manifest are automatically included from `SEO_DEFAULTS`. You can override them per page if needed:

```typescript
export const metadata = generateSeoMetadata(
  {
    url: `${SEO_DEFAULTS.siteUrl}/special/`,
    title: 'Special Page',
    metaDescription: 'A special page with custom icons',
    robots: true,
    icons: {
      icon: '/special-favicon.ico',
      shortcut: '/special-favicon.ico',
      apple: '/special-apple-touch-icon.png',
    },
    manifest: '/special-manifest.json',
  },
  SEO_DEFAULTS,
);
```

---

## Generated Output

The `generateMetadata` function generates:

- Title tag
- Meta description
- Keywords (if provided)
- Robots meta tag
- Canonical URL
- Favicon and app icons (from `SEO_DEFAULTS` or page-specific)
- Web app manifest
- OpenGraph tags (for Facebook, LinkedIn, etc.)
- Twitter Card tags
- JSON-LD structured data (WebSite and WebPage schemas)

All optimized for SEO and social media sharing!
