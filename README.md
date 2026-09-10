# Signature Invite Website

A responsive preview library for the Signature Invite templates.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The landing page provides access to every available invitation template.

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Structure

- `src/` — preview catalogue and application entry point
- `Templates/Wedding/` — wedding invitation templates
- `Templates/Party/` — party invitation templates
- `Media/` — template videos, music and images

Routes use URL hashes, such as `#/wedding-1`, so template links work correctly on static hosting platforms without custom redirect rules.
