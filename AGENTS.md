# AGENTS.md

## Purpose
This file gives implementation guidance for coding agents working in this repository.

## Project Snapshot
- Stack: React 19 + TypeScript + Vite 8 + Tailwind CSS 4.
- Data validation: Zod schemas in `src/schemas/roadmap.ts`.
- Animations and charts: `framer-motion` and `recharts`.
- Main app composition: `src/App.tsx`.

## Quick Commands
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Architecture Notes
- Layout components: `src/components/layout/*`
- Roadmap UI: `src/components/roadmap/*`
- Skill UI: `src/components/skills/*`
- Shared UI primitives: `src/components/ui/*`
- JSON data files: `src/data/*.json`
- Data access/parsing: `src/lib/data.ts`
- Runtime schemas/types: `src/schemas/roadmap.ts`

## Data Contract Rules
- Keep JSON shape aligned with Zod schemas.
- When adding fields to roadmap/profile/skills JSON:
  1. Update Zod schema(s) first.
  2. Update related TypeScript usage/components.
  3. Validate data parsing paths in `src/lib/data.ts`.
- Prefer strict parsing over permissive fallback behavior.

## UI And Design Rules
- Preserve the visual direction in `DESIGN.md`.
- Keep dark-surface aesthetic unless explicitly asked to redesign.
- Reuse existing spacing/container patterns from layout components.
- Prefer Tailwind utility composition and existing UI primitives before creating new abstractions.

## Coding Conventions
- Keep changes small and scoped to the request.
- Avoid broad refactors unless needed to unblock the task.
- Preserve current file organization and naming style.
- Use explicit TypeScript types for non-trivial props and data transforms.
- Do not introduce new dependencies unless there is a clear benefit.

## Safe Change Workflow
1. Read relevant schema + component + data file(s).
2. Implement minimal code changes.
3. Run `npm run lint`.
4. Run `npm run build` for type/build safety when behavior changed.
5. Summarize what changed and any follow-up risks.

## Common Task Playbooks

### Add A New Roadmap Event Field
1. Update `RoadmapEventSchema` in `src/schemas/roadmap.ts`.
2. Update any related inferred type usage.
3. Add field to `src/data/learning-roadmap.json` entries.
4. Render or consume the field in timeline card components.
5. Run lint/build.

### Add A New Section To Home
1. Create component in the appropriate domain folder.
2. Keep section spacing consistent with existing sections.
3. Compose into `src/App.tsx` in intended order.
4. Run lint/build.

## Out Of Scope Defaults
- Do not change brand/design tokens globally without explicit request.
- Do not migrate frameworks/build tools.
- Do not alter JSON semantics silently.

## Definition Of Done
- Requested behavior implemented.
- No avoidable lint/type/build regressions.
- Changes are minimal, readable, and consistent with repository patterns.
