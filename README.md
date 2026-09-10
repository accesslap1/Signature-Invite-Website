# Signature Invite Website

A responsive preview library for the Signature Invite templates.

## Live website

https://accesslap1.github.io/Signature-Invite-Website/

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

## Repository structure

```text
Signature-Invite-Website/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── Media/
│   ├── Party Template 1/
│   ├── Wedding Template 1/
│   ├── Wedding Template 2/
│   └── Wedding Template 3/
├── Templates/
│   ├── Party/
│   │   └── Party Template 1.tsx
│   └── Wedding/
│       ├── Wedding Template 1.tsx
│       ├── Wedding Template 2.tsx
│       └── Wedding Template 3.tsx
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Case-sensitive paths

Repository paths must use the exact capitalization shown above. Linux-based hosting systems treat `Media/` and `media/`, or `Templates/` and `templates/`, as different directories.

When adding or changing a media URL, preserve the exact folder name and encode spaces as `%0`. Example:

```text
Media/Wedding Template 3/hero.webp
Media/Wedding%20Template%203/hero.webp
```

## Routing and deployment

Routes use URL hashes, such as `#/wedding-1`, so template links work on GitHub Pages without custom redirect rules.

Every push to `main` automatically builds and publishes the site through the GitHub Pages workflow.
