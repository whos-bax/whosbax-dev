import { ExperienceType, SummaryType } from '@/type/ExperienceType';
import dayjs from 'dayjs';

export const summaryList: SummaryType[] = [
  {
    startDate: '2025-04-21',
    endDate: '',
    name: '데이티움',
    department: [
      {
        position: 'Software Developer (25.04 ~)',
        tasks: [],
      },
    ],
    link: 'https://www.datium.xyz/',
    description: `AI 정비소 관리 시스템 서비스를 제공하는 스타트업`,
  },
  {
    startDate: '2024-07-01',
    endDate: '2025-03-01',
    name: '텐서큐브',
    department: [
      {
        position: 'Software Developer (24.07 ~ 25.03)',
        tasks: [],
      },
    ],
    link: 'https://tensorcube.net/',
    description: `AI 데이터 라벨링 및 스토리지 서비스를 제공하는 스타트업`,
  },
  {
    startDate: '2024-04-01',
    endDate: dayjs('2024-06').endOf('month').format('YYYY-MM-DD'),
    name: '갭이어',
    department: [],
    link: null,
    description: null,
    isBreakTime: true,
  },
  {
    startDate: '2022-08-24',
    endDate: '2024-03-08',
    name: '하우투약',
    department: [
      {
        position: 'Frontend Developer (22.08 ~ 24.03)',
        tasks: [],
      },
      {
        position: 'PM (22.11 ~ 23.02)',
        tasks: ['MAU 10만 달성, 매출 23억 달성 및 연간 BEP 달성'],
      },
    ],
    link: 'https://howtoyak.com/',
    description: `약사 인플루언서와 함께하는 영양제 플랫폼, <b>당신의 영양제</b> 서비스 스타트업`,
  },
];

export const experienceList: { company: string; list: ExperienceType[] }[] = [
  {
    company: '데이티움',
    list: [
      {
        title: `데이티움`,
        startDate: new Date(`2025-04-21`),
        endDate: null,
        linkList: [
          {
            label: `오토호스(AutoHOS)`,
            url: `https://autohos.imweb.me/`,
          },
        ],
        skills: [
          'Nextjs',
          'React-Native',
          'TypeScript',
          'Material UI',
          'Recoil',
          'Google Cloud Platform',
        ],
        description:
          '매출 증대를 위한 LLM 활용 기능 개발 및 웹/앱 UI/UX/성능 개선 및 운영',
        summaryList: [
          'LLM 활용 홍보 기능 개발',
          '- GPT, Claude API를 활용해 정비소별 맞춤형 블로그 콘텐츠 자동 생성 시스템 설계 및 개발',
          '- 기능 출시 후 1개월 내 첫 매출 발생, 월간 콘텐츠 생성량 100건 이상으로 확장 가능성 확인',
          '앱 UI/UX/성능 개선',
          '- 사용자 행동 로그 및 VOC 분석을 통해 핵심 니즈 도출, 우선순위 기능 기획 및 개발',
          '- React Native 코드베이스 전면 리팩토링을 통해 렌더링 속도 30% 개선',
          '- 중복 컴포넌트 제거 및 공통 모듈화로 재사용률 향상, 유지보수 비용 감소',
          '- 모바일 최적화 디자인 시스템 재정비를 통해 Android/iOS 간 UI 일관성 확보 및 사용자 만족도 향상',
        ],
      },
    ],
  },
  {
    company: '텐서큐브',
    list: [
      {
        title: `텐서큐브`,
        startDate: new Date(`2024-07-01`),
        endDate: new Date(`2025-03-01`),
        linkList: [
          {
            label: `텐서큐브`,
            url: `https://www.tensorcube.net/`,
          },
          {
            label: `텐서큐브 (Saas)`,
            url: `https://app.tensorcube.net/`,
          },
        ],
        skills: [
          'Nextjs',
          'TypeScript',
          'Material UI',
          'Jotai',
          'GitHub (GitHub Action)',
          'Docker',
          'Nginx',
          'Vultr',
          'ncloud',
        ],
        description:
          'AI 데이터 라벨링 및 스토리지 서비스 스타트업에서 초기 프로젝트 설정부터 배포·운영까지 전 과정 기여',
        summaryList: [
          '클라우드 스토리지 및 데이터셋 관리 도구 개발',
          '- Next.js·TypeScript·Material UI 기반 UI/UX 설계 및 구현 개발',
          '- Jotai로 상태 관리 통일 및 MUI로 일관된 디자인 시스템 구축',
          'WebSocket 기반 업로드/다운로드 기능 도입',
          '- 실시간 파일 전송 최적화로 트래픽 비용 절감',
          '- Stream API 활용으로 서버 메모리 사용량 감소 및 대용량 파일 처리 성능 개선',
          'AI 라벨링 워크플로우 도구 개발',
          '- Canvas API & Onnx 모델 연동 라벨링 도구 개발',
          '- 데이터 라벨링 워크플로우에 AI 모델 추론 기능 추가',
          '서브도메인 분리 호스팅 및 MSA 도입',
          '- Vultr 단일 IP 환경에서 Nginx + Docker로 3개 서브도메인 컨테이너화 및 독립적인 상태 관리 설정',
          '- 서비스 간 의존성 최소화, 독립성 및 확장성 강화',
          'CI/CD & 무중단 배포',
          '- GitHub Actions와 Blue/Green 배포 전략으로 배포 안정성 확보',
          '정부 사업 과제 참여',
          '- Unreal Engine 5 기반 라벨링용 영상/이미지 제작',
        ],
      },
    ],
  },
  {
    company: '갭이어',
    list: [
      {
        title: `경력 휴식기`,
        startDate: new Date(`2024-04-01`),
        endDate: new Date(`2024-06-01`),
        linkList: [],
        skills: [],
        description: '',
        isBreakTime: true,
        summaryList: [
          'Wanted 프리온보딩 프론트엔드 챌린지 (2024.05)',
          '정보처리기사 자격증 취득 (한국산업인력공단) (2024.06)',
          'EO 리얼밸리 컨퍼런스 참가 (2024.07)',
          '프론트엔드 코리아 2024 컨퍼런스 참가 (2024.08)',
          '요즘사 파인더스 클럽 2기 활동 (2024.06 ~ 2024.08)',
        ],
      },
    ],
  },
  {
    company: '하우투약',
    list: [
      {
        title: `당신의 영양제 (당영몰)`,
        startDate: new Date(`2022-08-24`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            label: `당영몰`,
            url: `https://www.dangyoung.com/`,
          },
          {
            label: `당영투게더 오징어약사 (예시)`,
            url: `https://www.dangyoung.com/together/@ojing`,
          },
        ],
        skills: [
          'React',
          'JavaScript',
          'Nextjs',
          'React-Bootstrap',
          'GitHub',
          'AWS (EC2, S3, CloudFront)',
          'Spring Boot',
          'QueryDsl',
        ],
        description:
          '기존 AI 추천 웹/앱 서비스에서 커머스 플랫폼으로 전환하면서, 신규 서비스 개시 수준의 프로젝트 설정과 Next.js로의 마이그레이션 진행, 서비스 개발/배포/운영',
        summaryList: [
          '프로젝트 관리',
          '- 프로젝트 기획, 이슈, 일정 관리로 안정적인 서비스 운영',
          '기술 스택 전환 및 사용자 경험 최적화',
          '- React -> Next.js 마이그레이션: SEO 가시성 300% 이상 증가, 매출 10배 증가 기여',
          '- Beausable 및 Google Analytics 주요 UX 지표 분석 및 개선을 통한 이탈율 50% 감소',
          'UI/UX 성능 개선',
          '- AWS S3 + CloudFront CDN 적용: 이미지 로딩 속도 50% 단축, 이탈률 50%↓',
          '- Skeleton UI 및 로딩 컴포넌트 적용으로 사용자 체감 성능 대폭 개선',
          '결제 및 API 통합',
          '- PortOne 결제 시스템 연동으로 안정적 결제 흐름 개발',
        ],
      },
      {
        title: `당신의 영양제 관리자 페이지`,
        startDate: new Date(`2022-08-24`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            label: `당신의 영양제 관리자 페이지 (PLUTUS)`,
            url: `https://admin.dangyoung.com/`,
          },
        ],
        skills: [
          'React',
          'JavaScript',
          'AntD',
          'Redux',
          'GitHub',
          'AWS (EC2, S3, CloudFront)',
          'Spring Boot',
          'QueryDsl',
        ],
        description:
          'React,AntD 기반 백오피스 시스템 개선 프로젝트: 물류/CS/상품등록/정산 관리 기능 재설계 및 CI/CD 자동화 구축',
        summaryList: [
          'CI/CD 배포 자동화 구축',
          '- GitHub Actions로 빌드·배포 파이프라인 구현, 배포 시간 30% 단축',
          '운영 기능 개발 및 UX 강화',
          '- 내부 Editor 개발하여 CS 응답 시간 20% 단축',
          '- 사용자 피드백 반영 UI 개선으로 운영 편의성 향상',
          '전역 상태 관리 및 코드 품질 개선',
          '- Redux 아키텍처 재구성으로 상태 관리 이슈 80% 감소',
          '- ESLint·Prettier 도입으로 코드 일관성 및 협업 효율 25% 상승',
        ],
      },
      {
        title: `당영투게더`,
        startDate: new Date(`2023-02`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            label: `당영투게더 / 관리자페이지`,
            url: `https://together.dangyoung.com/`,
          },
          {
            label: `당영투게더 메디슨맨 약사 (예시)`,
            url: `https://together.dangyoung.com/together/channel?id=mediman`,
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
          'UI/UX & 반응형 개발',
          '- AntD 컴포넌트 커스터마이징으로 브랜드 일체감 유지',
          '데이터 시각화 및 CRUD 기능',
          '- Chart.js 도입해 매출·유입량 실시간 시각화 대시보드 구축',
          '- 카테고리,영양제,댓글 관리용 CRUD 기능 개발',

          'CI/CD 및 코드 품질 보장',
          '- GitHub Actions로 빌드/배포 자동화, 배포 성공률 99% 확보',
          '- ESLint, Prettier, Husky, lint-staged 도입하여 코드 표준화 적용',
          '도메인 관리 및 인프라 운영',
          '- 가비아를 통한 사용자별 커스텀 도메인 발급',
          '- AWS S3/CloudFront로 정적 자산 캐싱, 페이지 로드 평균 시간 1초 내외 달성',
        ],
      },
      {
        title: `당신의 영양제 (앱)`,
        startDate: new Date(`2023-08`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            label: `플레이스토어 (AOS)`,
            url: `https://play.google.com/store/apps/details?id=com.dangyounglonglifeapp&pli=1`,
          },
          {
            label: `앱스토어 (iOS)`,
            url: `https://apps.apple.com/kr/app/%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%98%81%EC%96%91%EC%A0%9C-%EC%A0%84%EB%AC%B8%EA%B0%80%EB%93%A4%EC%9D%98-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EB%93%9C%EB%9F%AD%EC%8A%A4%ED%86%A0%EC%96%B4/id6462846633`,
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
          '인플루언서-구독자 소통을 위한 React Native 기반 폐쇄형 모바일 앱 서비스 개발 및 운영',
        summaryList: [
          '프로젝트 리딩',
          '- 기술 스택 선정 및 스프린트 계획 주도 → 2주 단위 릴리즈 안정화',
          'UI/UX 일관성 확보',
          '- Android, iOS 컴포넌트/디자인 통일 -> 사용자 만족도 설문 4.5/5.0 달성',
          '- HTML 렌더링 컴포넌트 도입으로 웹 콘텐츠와 디자인 통일',
          '핵심 기능 개발',
          '- Foreground Service 기반 만보기 기능 설계/구현',
          '- 아토믹 디자인 패턴 적용으로 컴포넌트 재사용성 40% 향상',
          '빠른 배포 적용',
          '- CodePush 연동으로 즉시 업데이트 반영',
        ],
      },
      {
        title: `당영파트너스 (앱)`,
        startDate: new Date(`2023-11`),
        endDate: new Date(`2024-03-08`),
        linkList: [
          {
            label: `플레이스토어 (AOS)`,
            url: `https://play.google.com/store/apps/details?id=com.dangyoungtogetherapp`,
          },
          {
            label: `앱스토어 (iOS)`,
            url: `https://apps.apple.com/us/app/%EB%8B%B9%EC%98%81%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4/id6471548816`,
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
          '당영투게더 관리자용 모바일 앱 개발 프로젝트: 운영 효율성 및 데이터 전달 최적화',
        summaryList: [
          '프로젝트 리딩',
          '- 기술 스택 선정 및 스프린트 계획 주도 → 2주 단위 릴리즈 안정화',
          'UI/UX 일관성 확보',
          '- Android, iOS 컴포넌트/디자인 통일',
          '기능 개발',
          '- 클라이언트 사이드 알림/데이터 동기화 기능 구현',
          '- 사용자별 데이터 캐싱 전략 도입 → 네트워크 호출 25% 감소',
          '빠른 배포 적용',
          '- CodePush 연동으로 즉시 업데이트 반영',
        ],
      },
    ],
  },
];
