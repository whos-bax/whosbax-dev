# CLAUDE.ko.md

박상호의 개인 포트폴리오 웹사이트 (Next.js 15 App Router, Netlify 배포)

**배포 URL**: https://whoamiiii04.netlify.app/

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 핵심 파일

| 수정 대상 | 파일 경로 |
|----------|----------|
| 경력/프로젝트 | `src/app/_utils/experienceMocks.ts` |
| 자기소개 | `src/app/_utils/introduce.md` |
| 기술 스택 | `src/app/_utils/utils.ts` → `skillList` |
| 소셜 링크 | `src/app/_utils/footerLinkList.ts` |

## 기술 스택

Next.js 15, TypeScript, SCSS Modules, Tailwind, HeroUI, Material UI 6

## 컨벤션

- 컴포넌트: PascalCase
- Private 폴더: `_` prefix (`_component/`, `_utils/`)
- 스타일: SCSS Modules (`*.module.scss`)
