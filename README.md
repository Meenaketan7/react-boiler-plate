# React + TanStack Router Starter

## Quick Start

---

## React + TanStack Router Starter

Opinionated React starter using Vite, TanStack Router/File Routes, TanStack Query, shadcn/ui, Tailwind CSS (v4), and Zustand for auth/session state.

---

## Prerequisites

### Bun (required)

This project uses **Bun** as the package manager and runtime.

#### Install Bun

**macOS / Linux**

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal and verify:

```bash
bun --version
```

**Windows**

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Restart PowerShell and verify:

```powershell
bun --version
```

```


```

1. Install deps

```bash
bun install
```

2. Configure env (`.env.local`)

```
VITE_API_BASE_URL=https://<your-supabase>.supabase.co
VITE_API_KEY=<your-supabase-anon-key>
MODE=development
```

3. Run dev server

```bash
bun dev
```

4. Build

```bash
bun run build
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
5. Run `bun dev` (or `bun run build`) to regenerate `routeTree.gen.ts`.

## Layout & Sidebar

- Shell is in `src/layouts/default-layout/index.tsx`: shadcn sidebar + header/breadcrumb bar + content panes.
- Sidebar content lives in `src/components/screens-component/layouts/app-side-bar.tsx` (brand block, nav, projects, profile menu).

## API Calls

- Use `request()` from `src/config/request.ts` for fetch calls; it handles base URL, apikey, auth headers, error parsing, and session expiry.
- Prefer TanStack Query for data fetching/caching; see `src/hooks/apis/auth/mutaion.ts` as a pattern.

## Scripts

- `bun dev` — start dev server (with host 0.0.0.0).
- `bun run build` — type-check + build.
- `bun preview` — preview build.
- `bun lint` — lint code.
- `bun run lint:fix` — lint and auto-fix.
- `bun run typecheck` — run TypeScript type checking.
- `bun run test:coverage` — run tests with coverage.

## Notes

- Do not edit `routeTree.gen.ts`.
- Keep env secrets out of source control.
- Extend UI using shadcn primitives in `src/components/ui`.
- This project uses Bun as the package manager for faster installs and runtime performance.

## Screen Scaffolding (Recommended)

To keep screens, routes, and APIs consistent, this project includes a **Bun-based screen scaffolding script**.

It automatically creates:

- screen layouts (web + mobile)
- page route files
- optional API hooks with barrel exports

---

### Script Location

```text
/scripts/scaffold-screen.ts
```

Add this to your `package.json`:

```json
{
	"scripts": {
		"new:screen": "bun scripts/scaffold-screen.ts"
	}
}
```

---

### What the Script Generates

#### By default

```
src/components/screens-component/<screen-name>/
├─ components/
│  └─ index.ts
├─ web-layout/
│  └─ index.tsx
├─ mob-layout/
│  └─ index.tsx
└─ index.ts
```

```
src/pages/<parent>/<screen-name>/
├─ index.tsx
└─ routes.ts
```

#### With `--api`

```
src/hooks/apis/<screen-name>/
├─ queries.ts
├─ mutations.ts
├─ type.ts
└─ index.ts
```

Also auto-adds:

```ts
export * from "./<screen-name>";
```

to:

```
src/hooks/apis/index.ts
```

---

### Usage

#### Create a new screen

```bash
bun run new:screen netskill-lp-modules
```

#### Create a screen with API module

```bash
bun run new:screen assessment-performance-report --api
```

#### Create under a specific parent route

```bash
bun run new:screen completion-ratio --parent=app/(_authenticated)/reports
```

#### Skip page creation (layouts only)

```bash
bun run new:screen my-screen --no-pages
```

#### Force overwrite existing files

```bash
bun run new:screen my-screen --force
```

---

### Generated Page Pattern

```tsx
import { ScreenWebLayout } from "@/components/screens-component/screen/web-layout";
import { ScreenMobileLayout } from "@/components/screens-component/screen/mob-layout";
import { useIsMobile } from "@/hooks/use-mobile";

function Screen() {
	const isMobile = useIsMobile();
	return isMobile ? <ScreenMobileLayout /> : <ScreenWebLayout />;
}

export default Screen;
```

---
