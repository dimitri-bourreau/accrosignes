# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# AccroSignes

A Next.js web application for a Grenoble association teaching French Sign Language (Langue des Signes Française) and facilitating deaf/hearing community meetings.

## Tech Stack

React 19, Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Playwright, TanStack Query, shadcn/ui, Firebase (Firestore, Auth, Storage), Firebase Admin SDK

## Development Commands

```bash
# Development
npm run dev                    # Start dev server on localhost:3000

# Building & Production
npm run build                  # Build production bundle
npm start                      # Start production server

# Code Quality
npm run lint                   # Run ESLint

# Testing
npm run test                   # Run Jest unit tests
npm run test:watch             # Run Jest in watch mode
npm run test:e2e               # Run Playwright e2e tests (auto-starts Firebase emulators & dev server)

# Storybook
npm run storybook              # Start Storybook on localhost:6006
npm run build-storybook        # Build Storybook static site

# Firebase Emulators (for local development)
firebase emulators:start       # Start emulators (Auth:9099, Firestore:8080, Storage:9199)
```

## Environment Setup

Copy [.env.example](.env.example) to `.env.local` and fill in:
- Firebase client config (`NEXT_PUBLIC_*` variables)
- Firebase Admin SDK credentials (service account)

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
   - Initialized with service account credentials
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

Each domain in `features/` follows this structure:
```
features/{domain}/
  types/              # TypeScript interfaces (e.g., News, Event)
  services/           # Business logic functions (use Admin SDK)
  hooks/              # TanStack Query hooks (useFoo, useCreateFoo, etc.)
  constants/          # Domain constants
```

**Key domains:**
- `auth/` - Authentication (email-link), role management
- `news/` - News articles with slug-based routing
- `events/` - Calendar events with recurrence & color coding
- `content/` - CMS content blocks (home page, legal pages)
- `resources/` - File/folder management for member resources
- `users/` - User CRUD operations

### Component Organization (Atomic Design)

```
components/
  atoms/              # Basic UI elements (buttons, typography)
  molecules/          # Composite components (forms, cards)
  organisms/          # Complex components with business logic
  ui/                 # shadcn/ui components (DO NOT MODIFY)
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
3. User clicks link → verifies → signs in
4. Custom claims refresh fetches role from Firestore
5. Route based on role:
   - `admin` → `/espace-membre/admin`
   - `student` → `/espace-membre/student`
   - `pending` → `/espace-membre/pending`

### TanStack Query Configuration

- **Provider:** [app/providers.tsx](app/providers.tsx)
- **Default stale time:** 60 seconds
- **Invalidation:** Mutations invalidate related query keys
- **Query keys:** Use descriptive arrays (e.g., `['news']`, `['events']`)

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

## Testing

### E2E Tests (Playwright)

- Location: [e2e/](e2e/)
- Config: [playwright.config.ts](playwright.config.ts)
- **Auto-starts Firebase emulators + dev server**
- Tests run on Chromium
- Base URL: `http://localhost:3000`
- Timeout: 30 seconds

**When implementing features:**
- Propose e2e test systematically
- When updating logic, check if e2e test exists and update it
- Test both presence AND absence of features (e.g., table not shown when condition unmet)
- Keep tests short, assert one thing only
- Use mock data from `features/{domain}/mocks/`

### Unit Tests (Jest)

- Run with `npm test` or `npm run test:watch`
- Example: [features/news/services/generate-slug.test.ts](features/news/services/generate-slug.test.ts)

## Firebase Emulators for Local Development

The [firebase.json](firebase.json) configures emulators:
- **Firestore:** localhost:8080
- **Auth:** localhost:9099
- **Storage:** localhost:9199
- **Emulator UI:** Enabled (usually localhost:4000)

Playwright automatically starts emulators before tests. For manual development:
```bash
firebase emulators:start
```

Then set environment variables before starting dev server:
```bash
FIRESTORE_EMULATOR_HOST=localhost:8080 \
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 \
FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199 \
npm run dev
```

## Key Files to Know

- [app/providers.tsx](app/providers.tsx) - TanStack Query + Auth context setup
- [contexts/AuthContext.tsx](contexts/AuthContext.tsx) - Authentication state & methods
- [features/auth/config.ts](features/auth/config.ts) - Firebase client SDK init
- [features/auth/admin.ts](features/auth/admin.ts) - Firebase Admin SDK init (server-only)
- [features/auth/services/user-is-admin.service.ts](features/auth/services/user-is-admin.service.ts) - Authorization check
- [next.config.ts](next.config.ts) - Firebase Storage image domain whitelisting

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

## Interaction Rules

- Keep responses concise: 1-3 paragraphs
- Execute only what is requested
- Avoid unnecessary CLI commands
- Do not run build or tests unless explicitly requested
