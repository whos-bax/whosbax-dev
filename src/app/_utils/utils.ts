import { ExperienceType } from '@/model/ExperienceType';

export const utils = {
  title: `꿈이 많은 어른 아이`,
  author: `박상호`,
};

export const linkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width='1.1rem'><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>`;

export const experienceList: { company: string; list: ExperienceType[] }[] = [
  {
    company: '텐서큐브',
    list: [
      {
        id: 0,
        title: `텐서큐브`,
        startDate: new Date(`2024-07-01`),
        endDate: null,
        linkList: [
          {
            title: `텐서큐브`,
            link: `https://www.tensorcube.net/`,
          },
          {
            title: `텐서큐브 (Saas)`,
            link: `https://app.tensorcube.net/`,
          },
        ],
        skills: [
          'Nextjs',
          'TypeScript',
          'Material UI',
          'Jotai',
          'GitHub (GitHub Action)',
          'Docker',
          'Vultr (Nginx)',
        ],
        description:
          '초기 단계 스타트업에서 프로젝트 설정, 배포 및 운영에 기여',
        summaryList: [
          'AI 개발을 위한 클라우드 스토리지, 데이터셋 관리 및 라벨링 도구 개발',
          'WebSocket을 통한 업로드/다운로드 기능으로 트래픽 비용 절감',
          'Stream API를 활용하여 데이터 스트리밍을 구현, 업로드/다운로드 과정에서 메모리 효율성을 향상시키고 대용량 파일 처리 성능을 최적화',
          'Canvas API와 Onnx 모델을 활용한 데이터 라벨링 도구 개발 및 AI 모델 지원 기능 구현',
          'Vultr의 단일 IP 서버에서 Nginx로 3개의 서브 도메인을 호스팅, 각 도메인을 Docker로 컨테이너화하여 독립적인 상태 관리 설정',
          'MSA(Microservice Architecture) 적용으로 서비스 간 의존성을 줄이고 독립성을 강화하여, 확장성과 안정성을 높였으며, 기능 추가 및 수정 시 다른 서비스에 미치는 영향을 최소화',
          'GitHub Action과 green/blue 배포 전략을 적용해 무중단 배포를 구현',
          'Material UI로 일관된 UI/UX를 구축하고, Jotai를 통해 전역 상태를 효율적으로 관리',
        ],
      },
    ],
  },
  {
    company: '하우투약',
    list: [
      {
        id: 0,
        title: `당신의 영양제 (당영몰)`,
        startDate: new Date(`2022-08-24`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            title: `당영몰`,
            link: `https://www.dangyoung.com/`,
          },
          {
            title: `당영투게더 오징어약사 (예시)`,
            link: `https://www.dangyoung.com/together/@ojing`,
          },
        ],
        skills: [
          'React',
          'JavaScript',
          'Nextjs',
          'React-Bootstrap',
          'GitHub',
          'Zustand',
          'AWS (EC2, S3, CloudFront)',
        ],
        description:
          '기존 AI 추천 웹/앱 서비스에서 커머스 플랫폼으로 전환하면서, 신규 서비스 개시 수준의 프로젝트 설정과 Next.js로의 마이그레이션 진행, 서비스 개발/배포/운영',
        summaryList: [
          '이슈 및 일정 관리로 프로젝트 조율 역할 수행',
          '다양한 브라우저 환경에서 호환성 문제 해결 및 반응형 웹 개발',
          'PortOne 서비스를 이용하여 결제 시스템 개발',
          'SEO 최적화를 위해 React에서 Next.js로 마이그레이션을 진행하여 검색 엔진 가시성을 크게 개선 (매출 10배 증가 기여)',
          'Axios를 이용하여 REST API 연동',
          'Zustand를 활용하여 전역 상태 관리',
          '이미지 로딩 속도를 개선하고 UX를 향상시키기 위해, AWS S3에 저장된 이미지를 CDN을 통해 배포',
          '1:1 문의, 리뷰 등 필요 여부에 따라 일부 백엔드 CRUD 개발',
          'Beusable로 사용자 여정 탐색, Skeleton UI 적용 및 로딩 컴포넌트 적용 등 UI/UX 개선으로 이탈율 절반 이하로 감소',
          'Google Analytics 내 결제 및 주문, 회원가입, 로그인 데이터 연동하여 사용자 행동 분석',
        ],
      },
      {
        id: 1,
        title: `당신의 영양제 admin`,
        startDate: new Date(`2022-08-24`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            title: `당신의 영양제 관리자 페이지 (PLUTUS)`,
            link: `https://admin.dangyoung.com/`,
          },
        ],
        skills: [
          'React',
          'JavaScript',
          'AntD',
          'Redux',
          'GitHub',
          'AWS (EC2, S3, CloudFront)',
        ],
        description:
          '기존 백오피스 시스템을 개선하여 물류, CS, 상품 등록, 정산 관리 등 다양한 운영 기능 개발 및 배포',
        summaryList: [
          'GitHub Action을 활용한 빌드 및 배포 자동화로 효율성 증대',
          'CS팀의 고객 응대와 업무 효율성을 향상을 위해 FAQ 표기, 검색 기능, 인사이트 제공용 Editor 기능 개발',
          'Axios를 이용하여 REST API 연동, 데이터 흐름 최적화',
          'Redux를 활용하여 전역 상태 관리, 복잡한 데이터 구조 체계적 관리',
        ],
      },
      {
        id: 2,
        title: `당영투게더`,
        startDate: new Date(`2023-02`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            title: `당영투게더 / 관리자페이지`,
            link: `https://together.dangyoung.com/`,
          },
          {
            title: `당영투게더 메디슨맨 약사 (예시)`,
            link: `https://together.dangyoung.com/together/channel?id=mediman`,
          },
        ],
        skills: [
          'React',
          'JavaScript',
          'AntD',
          'Redux',
          'GitHub',
          'Git Action',
          'AWS (EC2, S3, CloudFront)',
        ],
        description:
          '사용자(인플루언서) 맞춤형 개인 페이지 제공 및 이를 관리할 수 있는 관리자 페이지 개발 및 운영',
        summaryList: [
          '이슈 및 일정 관리로 프로젝트 조율 역할 수행',
          '다양한 브라우저 환경에서 호환성 문제 해결 및 반응형 웹 개발',
          '카테고리, 영양제, 댓글 관리 기능을 포함한 백엔드 CRUD 개발',
          'GitHub Action을 이용한 자동화된 빌드/배포',
          'Chart.js를 사용하여 매출 및 유입량을 시각화, UX 개선',
          '모바일 UX 향상을 위해 무한 스크롤과 컴포넌트 배치 최적화',
          '가비아를 통해 사용자별 도메인 제공',
          'ESLint, Prettier, husky, lint-staged로 협업 효율성 증대',
        ],
      },
      {
        id: 3,
        title: `당신의 영양제 (앱)`,
        startDate: new Date(`2023-08`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            title: `플레이스토어 (AOS)`,
            link: `https://play.google.com/store/apps/details?id=com.dangyounglonglifeapp&pli=1`,
          },
          {
            title: `앱스토어 (iOS)`,
            link: `https://apps.apple.com/kr/app/%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%98%81%EC%96%91%EC%A0%9C-%EC%A0%84%EB%AC%B8%EA%B0%80%EB%93%A4%EC%9D%98-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EB%93%9C%EB%9F%AD%EC%8A%A4%ED%86%A0%EC%96%B4/id6462846633`,
          },
        ],
        skills: [
          'React Native',
          'JavaScript',
          'GitHub',
          'AWS(S3)',
          'Android Studio',
          'Xcode',
        ],
        description:
          '인플루언서와 구독자 간의 소통을 위한 폐쇄형 앱 서비스 개발 및 운영',
        summaryList: [
          '프로젝트 기술 스택 선정 및 일정 관리 등 프로젝트 리딩',
          'Android 및 iOS 기기 간 UI/UX 통일화',
          'Android 만보기 기능을 위한 Foreground Service 개발',
          '웹과의 일관성을 위해 HTML 렌더링을 통한 게시글 표시 및 UI 통일',
          '아토믹 디자인 패턴을 적용하여 컴포넌트 재사용성 향상',
          'CodePush를 활용하여 앱 업데이트 자동화',
        ],
      },
      {
        id: 4,
        title: `당영파트너스 (앱)`,
        startDate: new Date(`2023-11`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            title: `플레이스토어 (AOS)`,
            link: `https://play.google.com/store/apps/details?id=com.dangyoungtogetherapp`,
          },
          {
            title: `앱스토어 (iOS)`,
            link: `https://apps.apple.com/us/app/%EB%8B%B9%EC%98%81%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4/id6471548816`,
          },
        ],
        skills: [
          'React Native',
          'JavaScript',
          'GitHub',
          'AWS(S3)',
          'Android Studio',
          'Xcode',
        ],
        description:
          '당영투게더 admin 앱, 당신의 영양제 관리 및 데이터 정보 전달을 위한 앱 서비스 개발/배포/운영',
        summaryList: [
          '프로젝트 기술 스택 선정 및 일정 관리 등 프로젝트 리딩',
          'Android 및 iOS 기기 간 UI/UX 통일화',
          '클라이언트 사이드 기능 개발',
          'CodePush를 활용하여 앱 업데이트 자동화',
        ],
      },
    ],
  },
];

export const skillList = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'React Native',
  'Redux',
  'Zustand',
  'React-query',
  'AsyncStorage',
  'Axios',
  'Sass',
  'Bootstrap',
  'Tailwind',
  'AntD',
  'GitHub',
  'IntelliJ',
  'VSCode',
  'AWS (EC2, S3, CloudFront 등)',
  'SQL',
  'Google Analytics',
  '네이버 서치어드바이저',
  'Google Search Console',
];
