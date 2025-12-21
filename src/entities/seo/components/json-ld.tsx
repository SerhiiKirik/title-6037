/**
 * JSON-LD Component for Next.js
 *
 * Renders structured data as JSON-LD script tag in the page head.
 * This is the recommended Next.js approach for adding JSON-LD.
 *
 * @example
 * ```typescript
 * import { JsonLd, generateJsonLdData } from '@/shared/lib/seo';
 *
 * export default function Page() {
 *   const jsonLd = generateJsonLdData({
 *     url: 'https://example.com',
 *     title: 'Page Title',
 *     metaDescription: 'Description',
 *     jsonLd: {
 *       pageType: 'webpage',
 *       organization: ORGANIZATION,
 *     },
 *   }, SEO_DEFAULTS);
 *
 *   return (
 *     <>
 *       <JsonLd data={jsonLd} />
 *       <div>Page content...</div>
 *     </>
 *   );
 * }
 * ```
 */

import type { FC } from 'react';
import Script from 'next/script';

type Props = {
  data: object | object[] | null;
};

// eslint-disable-next-line react/prop-types
export const JsonLd: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};
