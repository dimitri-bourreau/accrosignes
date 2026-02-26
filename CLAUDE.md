# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# AccroSignes

A Next.js web application for a Grenoble association teaching French Sign Language (Langue des Signes Française) and facilitating deaf/hearing community meetings.

## Tech Stack

React 19, Next.js 16 (App Router), TypeScript, Tailwind CSS 4 (CSS-first config, no tailwind.config file), TanStack Query, Firebase (Firestore, Auth, Storage), Firebase Admin SDK, Tiptap v3 (rich text editor), nuqs (URL state), react-hook-form, DOMPurify, Storybook 10 (Vite-based via `@storybook/nextjs-vite`), Chromatic (visual regression)

## Development Commands

```bash
# Development
npm run dev                    # Start dev server on localhost:3000

# Building & Production
npm run build                  # Build production bundle
npm start                      # Start production server

# Code Quality
npm run lint                   # Run ESLint (flat config, extends next/core-web-vitals + typescript + storybook)
npm run format                 # Format all files with Prettier
npm run format:check           # Check formatting without writing

# Storybook
npm run storybook              # Start Storybook on localhost:6006 (no auto-open)
npm run build-storybook        # Build Storybook static site

# Firebase Emulators (for local development)
firebase emulators:start       # Start emulators (Auth:9099, Firestore:8080, Storage:9199)
```

## Formatting & Linting

- **Prettier** (`.prettierrc`): `singleQuote: true`, `trailingComma: "all"`, `semi: true`
- **Husky pre-commit hook** runs `lint-staged`:
  - `*.{ts,tsx}` → `eslint --fix`
  - `*.{ts,tsx,js,mjs,json,css,md}` → `prettier --write`

## Path Alias

`@/*` maps to project root (configured in `tsconfig.json`). Use `@/features/...`, `@/components/...`, etc.

## Environment Setup

Copy [.env.example](.env.example) to `.env.local` and fill in:

- Firebase client config (`NEXT_PUBLIC_*` variables)
- Firebase Admin SDK credentials (service account)
- `NEXT_PUBLIC_SITE_URL` (used for metadata base URL in `layout.tsx`, not in `.env.example`)

For local development with emulators, set:

```bash
FIRESTORE_EMULATOR_HOST=localhost:8080
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199
```

## Architecture Overview

### Dual Firebase SDK Pattern

**Critical: The app uses TWO Firebase SDKs simultaneously:**

1. **Client-Side SDK** ([features/auth/config.ts](features/auth/config.ts))
   - Exports: `auth`, `db`, `storage`
   - Used for: Client authentication, Firestore listeners
   - Initialized with public `NEXT_PUBLIC_*` env vars

2. **Server-Side Admin SDK** ([features/auth/admin.ts](features/auth/admin.ts))
   - Exports: `adminAuth`, `adminDb`
   - Used for: API routes, server-side data operations, user management
   - Initialized with service account credentials + `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - **Never import in client components**

### Data Flow Patterns

**Public Pages (SSR with ISR):**

```
Next.js Server Component → Firebase Admin SDK → Firestore → Static response (revalidate: 300s)
```

Example: [app/actualites/page.tsx](app/actualites/page.tsx) directly calls `getAllNews()` using Admin SDK.

**Client Pages (Client-side fetching):**

```
Client Component → useQuery hook → fetch(/api/*) → API route validates auth → Admin SDK → Firestore
```

Example: [app/agenda/page.tsx](app/agenda/page.tsx) uses `useEvents()` hook → calls `/api/events`.

**Mutations:**

```
useMutation → POST/PUT/DELETE to /api/* → userIsAdmin() check → Admin SDK writes → Query invalidation
```

### Feature-Based Organization

Each domain in `features/` typically has `types/`, `services/`, `hooks/` (not all domains have every subfolder):

```
features/{domain}/
  types/              # TypeScript interfaces (e.g., News, Event)
  services/           # Business logic functions (use Admin SDK)
  hooks/              # TanStack Query hooks (useFoo, useCreateFoo, etc.)
  constants/          # Domain constants
  mocks/              # Mock data for Storybook
```

**Key domains:**

- `auth/` - Authentication (email-link), role management, Firebase SDK config
- `news/` - News articles with slug-based routing
- `events/` - Calendar events with recurrence (weekly/monthly), color coding, categories (`"course"` | `"public-event"`)
- `content/` - CMS content blocks (home page, legal pages) with Tiptap rich text editing
- `resources/` - File/folder/link management for member resources (Firebase Storage)
- `users/` - User CRUD operations
- `editor/` - Editor image upload hook
- `firebase/` - Firebase error handling utilities

### Component Organization (Atomic Design)

```
components/
  atoms/              # Basic UI elements (buttons, typography)
  molecules/          # Composite components (forms, cards, content editor)
  organisms/          # Complex components with business logic
```

### API Routes Pattern

All API routes in [app/api/](app/api/) follow this pattern:

```typescript
export async function GET/POST/PUT/DELETE(request: NextRequest) {
  // 1. Parse request data
  // 2. For mutations: check userIsAdmin(uid)
  // 3. Use adminDb or adminAuth for operations
  // 4. Return NextResponse.json()
}
```

**Authorization:** Admin-only operations call `userIsAdmin(uid)` which queries Firestore for user role.

### Authentication Flow

1. User enters email on [/espace-membre/login](app/espace-membre/login/page.tsx)
2. `AuthContext` sends sign-in link via Firebase Auth
3. User clicks link → email stored in `localStorage` as `emailForSignIn` → verifies → signs in
4. Role read from JWT custom claims via `getIdTokenResult(true)` (claims set server-side from Firestore)
5. [/espace-membre](app/espace-membre/page.tsx) acts as a router, redirecting based on role:
   - `"Administrateur"` → `/espace-membre/admin`
   - `"Élève"` → `/espace-membre/student`
   - No role (null) → `/espace-membre/pending`

Role constants defined in [features/auth/constants/roles.ts](features/auth/constants/roles.ts).

### URL State Management

The app uses `nuqs` for URL search parameter state. `NuqsAdapter` wraps the app in [app/providers.tsx](app/providers.tsx). The agenda page syncs selected date and event with URL params via `useQueryState`.

### TanStack Query Configuration

- **Provider:** [app/providers.tsx](app/providers.tsx)
- **Default stale time:** 60 seconds
- **refetchOnWindowFocus:** disabled
- **Invalidation:** Mutations invalidate related query keys
- **Query keys:** Use descriptive arrays (e.g., `['news']`, `['events']`)

### Event Recurrence System

Events support `weekly` and `monthly` recurrence with `parentEventId`, `originalDate`, `isDeleted` fields for instance overrides. [generate-occurrences.service.ts](features/events/services/generate-occurrences.service.ts) handles expansion. Update/delete scopes: `"this"` (single instance) or `"all"` (entire series).

## Code Style

- Use explicit variable names: avoid `e`, `data`, `item`, `res`
- Use `&apos;` instead of `'` in JSX strings (not in .md files)
- Keep functions short: 10 lines maximum
- Avoid comments: use descriptive names instead
- Remove unused imports
- Prioritize simplicity over abstraction

## Coding Conventions

- Write components and handlers as arrow functions
- Name files in kebab-case: `company-list.tsx`, `use-companies.hook.ts`
- Limit components to 150 lines
- Separate UI from logic: components call hooks, hooks call services
- Always respect good contrast ratio
- Buttons must have pointer cursor
- Prefer subtle animations, never move content itself

## Storybook

- Framework: `@storybook/nextjs-vite` (Vite-based)
- Stories in `components/**/*.stories.tsx`
- Import types from `@storybook/nextjs-vite` (not `@storybook/react`)
- Accessibility: `a11y: { test: "error" }` — violations fail (enforces `color-contrast`, `button-name`, `aria-allowed-attr`)
- Chromatic integration for visual regression testing

## Firebase Emulators for Local Development

The [firebase.json](firebase.json) configures emulators:

- **Firestore:** localhost:8080
- **Auth:** localhost:9099
- **Storage:** localhost:9199
- **Realtime Database:** localhost:9000
- **Emulator UI:** localhost:4000

## Key Files to Know

- [app/providers.tsx](app/providers.tsx) - TanStack Query + Auth context + NuqsAdapter setup
- [contexts/AuthContext.tsx](contexts/AuthContext.tsx) - Authentication state & methods
- [features/auth/config.ts](features/auth/config.ts) - Firebase client SDK init
- [features/auth/admin.ts](features/auth/admin.ts) - Firebase Admin SDK init (server-only)
- [features/auth/services/user-is-admin.service.ts](features/auth/services/user-is-admin.service.ts) - Authorization check
- [features/auth/constants/roles.ts](features/auth/constants/roles.ts) - Role values (`"Administrateur"`, `"Élève"`)
- [next.config.ts](next.config.ts) - Firebase Storage image domain whitelisting
- [app/globals.css](app/globals.css) - Tailwind CSS 4 config (CSS-first, no tailwind.config file)

## Common Patterns

### Creating a new feature domain

1. Create `features/{domain}/` with `types/`, `services/`, `hooks/`
2. Define TypeScript interfaces in `types/`
3. Write business logic in `services/` (use Admin SDK)
4. Create TanStack Query hooks in `hooks/`
5. Add API routes in `app/api/{domain}/`
6. Build UI components using hooks

### Adding a new API route

1. Create `app/api/{route}/route.ts`
2. Export async function(s): `GET`, `POST`, `PUT`, `DELETE`
3. For mutations: validate with `userIsAdmin()`
4. Use `adminDb` or `adminAuth` for operations
5. Return `NextResponse.json()`

### Creating a mutation hook

```typescript
export const useCreateFoo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Foo) => {
      const response = await fetch('/api/foo', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foos'] });
    },
  });
};
```

## SEO Note

The site blocks all search engine indexing (`robots: { index: false, follow: false }` in layout metadata + `robots.txt`).

## Interaction Rules

- Keep responses concise: 1-3 paragraphs
- Execute only what is requested
- Avoid unnecessary CLI commands
- Do not run build or tests unless explicitly requested
