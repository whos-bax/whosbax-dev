# CLAUDE.md

Personal portfolio website of Sangho Park (Next.js 15 App Router, Netlify deployment)

**Live URL**: https://whoamiiii04.netlify.app/

## Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

- **Feature-Based Structure**: Business logic organized by domain in `src/features/`
- **Shared Infrastructure**: Supabase clients in `src/shared/lib/`
- **App Router**: Pages and UI components in `src/app/`

## Conventions

- Components: PascalCase
- Private folders: `_` prefix (`_component/`, `_utils/`)
- Styles: SCSS Modules (`*.module.scss`)
- Feature modules: Barrel exports via `index.ts`

## Workflow

- Run `npm run build` only when commit is requested, check for errors
- During development, proceed with coding without running build
