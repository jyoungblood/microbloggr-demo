# Microbloggr demo

A standalone Astro site using [Microbloggr](https://github.com/jyoungblood/microbloggr), a local microblog editor.

## Run locally

Use Node 22.22 or newer.

```sh
npm ci
npm run dev
```

Open the URL printed by Astro. `/` shows the public feed; `/editor` opens the local editor and `/editor/archive` shows its archive.

The package is installed from a pinned GitHub commit, so npm publication is not required. After publication, replace the Git dependency with the released version and commit the updated lockfile.

## Build and deploy

```sh
npm run check
npm run build
npm run preview
```

Deploy `dist/` to a static host. Install development dependencies during the build, because Microbloggr is an Astro integration. The deployed site contains published posts only; the editor and its APIs are available only during local development. Files in `public/` remain public, including attachments to drafts. Saving or publishing in the local editor does not deploy the site.

Set `PLAYGROUND_BASE` when deploying under a subpath. `PLAYGROUND_EDITOR_PATH` changes the local editor path; `PLAYGROUND_PROVIDER_LOOKUPS=off` disables provider lookups on save.

## Content and theme

- `src/content/microblog/`: editable Markdown posts.
- `src/microblog.schema.ts` and `src/content.config.ts`: content schema and collection.
- `src/pages/`: public feed and individual post routes.
- `src/components/` and `src/styles/`: independent public theme.
- `public/assets/microblog/`: sample and uploaded media.

`npm run seed` adds missing sample content. `npm run seed:reset` restores known sample posts and media while preserving other posts.

## Test a local package change

Keep this demo checkout and the package repository in sibling directories named `microbloggr-demo/` and `microbloggr/`, with dependencies installed in both repos. `npm run dev` automatically uses the sibling package's source, so local package and theme edits appear in the same server. Running `npm run dev` from the package repository starts this same playground.

A demo checkout without a sibling package repository uses the installed package. `npm run dev:package` explicitly uses that version even when the sibling package repo exists. `npm run build`, `npm run check`, and `npm run preview` always use the installed package; the local development override never changes the dependency or lockfile.

The dev launcher prints which package source it selected. Restart an already running server once after updating this setup.
