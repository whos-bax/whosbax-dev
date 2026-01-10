# whosbax-dev

박상호(SANGHO PARK)의 개인 포트폴리오 웹사이트입니다.

> "하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 본질을 추구하고 기록하고자 합니다."

## Demo

**[https://whoamiiii04.netlify.app/](https://whoamiiii04.netlify.app/)**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS, Tailwind CSS
- **UI Library**: HeroUI, Material UI 6, Framer Motion
- **Deployment**: Netlify (Static Export)

## Features

- **Home**: 메인 인트로 페이지
- **About**: 경력, 프로젝트, 기술 스택, 학력, 자격증 등 이력서 형태의 소개 페이지
- **Guestbook**: Utterances 기반 방명록

## Project Structure

```
src/
├── app/
│   ├── _component/     # 공통 컴포넌트 (Header, Footer, Loading 등)
│   ├── _utils/         # 유틸리티 함수 및 데이터 (experienceMocks, skillList 등)
│   ├── about/          # About 페이지 및 관련 컴포넌트
│   └── guestbook/      # 방명록 페이지
├── fonts/              # Pretendard 폰트
└── type/               # TypeScript 타입 정의
```

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 서버 실행
npm run start
```

## Links

- **Portfolio**: [https://whoamiiii04.netlify.app/](https://whoamiiii04.netlify.app/)
- **GitHub**: [https://github.com/whos-bax](https://github.com/whos-bax)
- **LinkedIn**: [https://www.linkedin.com/in/whoamiiii04](https://www.linkedin.com/in/whoamiiii04)
