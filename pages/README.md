# Pages Directory

This directory exists to prevent Next.js from using `src/pages/` as the Pages Router.

Our project uses:

- **Next.js App Router** - located in `/app`
- **FSD pages layer** - located in `/src/pages`

The App Router imports and re-exports pages from the FSD structure.
