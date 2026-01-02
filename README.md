# React + TanStack Router Starter

Opinionated React starter using Vite, TanStack Router/File Routes, TanStack Query, shadcn/ui, Tailwind CSS (v4), and Zustand for auth/session state.

## Quick Start

1. Install deps

```bash
npm install
```

2. Configure env (`.env.local`)

```
VITE_API_BASE_URL=https://<your-supabase>.supabase.co
VITE_API_KEY=<your-supabase-anon-key>
MODE=development
```

3. Run dev server

```bash
npm run dev
```

4. Build

```bash
npm run build
```

## Project Structure

- `src/main.tsx` — router + providers bootstrap.
- `src/routes.ts` — virtual route config (TanStack Router plugin).
- `src/routeTree.gen.ts` — generated; do not edit.
- `src/pages/` — file-based routes:
  - `auth/` login/forgot flows (guarded by `middlewares/restrict-login-signup`).
  - `middlewares/` route guards (auth, admin).
  - `app/` protected area (layout + dashboards/admin).
  - `error/` error routes.
  - `public/` public screens.
- `src/layouts/default-layout/` — main app shell (dark, shadcn sidebar layout).
- `src/components/` — UI (shadcn primitives) and screen-level components.
- `src/styles/global.css` — theme tokens + Tailwind base.
- `src/hooks/`:
  - `apis/` — TanStack Query client, auth mutation, request helpers.
  - `store/auth/` — Zustand store for tokens/user with expiry checks.
  - utility hooks.
- `src/lib/utils/` — helpers (token service, classnames, role checks).
- `src/config/` — env loader, fetch wrapper (`request.ts`).

## Theming

- Tokens defined in `src/styles/global.css` (`:root` and `.dark`) mapped to Tailwind via `@theme inline`.
- Dark-friendly palette with brand purple (`--primary`) and neutrals.
- Components consume CSS variables (`bg-background`, `text-foreground`, etc.).

## Routing

- TanStack Router with virtual config (`src/routes.ts`) → generated `routeTree.gen.ts`.
- Middlewares:
  - `middlewares/restrict-login-signup` — redirects authed users away from auth pages.
  - `middlewares/authenticate` — protects app area; redirects to `/login`.
  - `middlewares/require-admin` — role-gated areas.
- Protected layout: `src/pages/app/layout.tsx` wraps sidebar shell + `<Outlet />`.

## Auth Flow

- Login screen (`src/pages/auth/login/index.tsx`) uses `useLogin` mutation (TanStack Query).
- `request.ts` adds `apikey` and `Authorization` headers from Zustand state; expires check clears session.
- Zustand store (`src/hooks/store/auth`) persists tokens/expiry in `localStorage`.
- `tokenServices` provides localStorage helpers.

## Creating Screens

1. Add a route file under `src/pages/.../routes.ts[x]` using `createFileRoute("/path")`.
2. Add the screen component in the same folder.
3. If the route is protected, place under `app/` so it is wrapped by `authenticate` middleware; for admin-only, nest under `require-admin`.
4. Update `src/routes.ts` if you need a new virtual entry (path or layout).
5. Run `npm run dev` (or `vite build`) to regenerate `routeTree.gen.ts`.

## Layout & Sidebar

- Shell is in `src/layouts/default-layout/index.tsx`: shadcn sidebar + header/breadcrumb bar + content panes.
- Sidebar content lives in `src/components/screens-component/layouts/app-side-bar.tsx` (brand block, nav, projects, profile menu).

## API Calls

- Use `request()` from `src/config/request.ts` for fetch calls; it handles base URL, apikey, auth headers, error parsing, and session expiry.
- Prefer TanStack Query for data fetching/caching; see `src/hooks/apis/auth/mutaion.ts` as a pattern.

## Scripts

- `npm run dev` — start dev server.
- `npm run build` — type-check + build.
- `npm run preview` — preview build.
- `npm run lint` — lint.

## Notes

- Do not edit `routeTree.gen.ts`.
- Keep env secrets out of source control.
- Extend UI using shadcn primitives in `src/components/ui`.
