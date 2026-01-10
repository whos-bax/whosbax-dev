# CLAUDE.ko.md

박상호의 개인 포트폴리오 웹사이트 (Next.js 15 App Router, Netlify 배포)

**배포 URL**: https://whoamiiii04.netlify.app/

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 아키텍처

- **Feature-Based 구조**: 도메인별 비즈니스 로직은 `src/features/`에 구성
- **공유 인프라**: Supabase 클라이언트는 `src/shared/lib/`에 위치
- **App Router**: 페이지와 UI 컴포넌트는 `src/app/`에 위치

## 컨벤션

- 컴포넌트: PascalCase
- Private 폴더: `_` prefix (`_component/`, `_utils/`)
- 스타일: SCSS Modules (`*.module.scss`)
- Feature 모듈: `index.ts`를 통한 Barrel exports
