# CLAUDE.ko.md

박상호 개인 포트폴리오 웹사이트 (Next.js 15 App Router, Netlify 배포)

**라이브 URL**: https://whoamiiii04.netlify.app/

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 아키텍처

- **기능 기반 구조**: `src/features/`에 도메인별 비즈니스 로직 구성
- **공유 인프라**: `src/shared/lib/`에 Supabase 클라이언트
- **App Router**: `src/app/`에 페이지 및 UI 컴포넌트

## 규칙

- 컴포넌트: PascalCase
- 비공개 폴더: `_` 접두사 (`_component/`, `_utils/`)
- 스타일: SCSS 모듈 (`*.module.scss`)
- 기능 모듈: `index.ts`를 통한 배럴 익스포트

## 워크플로우

- 커밋 요청 시에만 `npm run build` 실행 및 에러 확인
- 개발 중에는 빌드 없이 코드 작성 진행
