# CLAUDE.md

Personal portfolio website of Sangho Park (Next.js 14 App Router, Netlify deployment)

**Live URL**: https://whoamiiii04.netlify.app/

## Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Key Files

| To Modify | File Path |
|-----------|-----------|
| Career/Projects | `src/app/_utils/experienceMocks.ts` |
| Introduction | `src/app/_utils/introduce.md` |
| Skills | `src/app/_utils/utils.ts` → `skillList` |
| Social Links | `src/app/_utils/footerLinkList.ts` |

## Tech Stack

Next.js 14, TypeScript, SCSS Modules, Tailwind, NextUI, Material UI, Contentlayer2 (MDX)

## Conventions

- Components: PascalCase
- Private folders: `_` prefix (`_component/`, `_utils/`)
- Styles: SCSS Modules (`*.module.scss`)
