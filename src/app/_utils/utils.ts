import {ExperienceType} from "@/model/ExperienceType";

export const utils = {
    title: `꿈이 많은 어른 아이`,
    author: `박상호`
}

export const linkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width='1.1rem'><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>`

export const experienceList: {company: string; list: ExperienceType[]}[] = [
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
                        link: `https://www.dangyoung.com/`
                    },
                    {
                        title: `당영투게더 오징어약사 (예시)`,
                        link: `https://www.dangyoung.com/together/@ojing`
                    }
                ],
                skills: ['React', 'JavaScript', 'Nextjs', 'React-Bootstrap', 'Github', 'Zustand', 'AWS (EC2, S3, CloudFront)'],
                description: '기존 AI 추천 웹/앱 서비스에서 커머스 플랫폼으로 전환하면서, 신규 서비스 개시 수준의 프로젝트 설정과 Next.js로의 마이그레이션 진행, 서비스 개발/배포/운영',
                summaryList: [
                    '이슈, 일정 관리 등 중간 관리자 역할 수행',
                    '크로스 브라우징 이슈 처리 및 반응형 웹 제작',
                    'PortOne 서비스를 이용하여 결제 시스템 개발',
                    'SEO 최적화를 위해 React에서 Next.js로 마이그레이션 (네이버 서치어드바이저, 구글 서치콘솔)',
                    'Axios를 이용하여 REST API 연동',
                    'Zustand를 활용하여 전역 상태 관리',
                    '이미지 최적화를 위해 S3 -> CDN 적용',
                    '1:1 문의, 리뷰 등 필요 여부에 따라 일부 백엔드 CRUD 개발',
                    'Beusable로 사용자 여정 탐색, Skeleton UI 적용 및 로딩 컴포넌트 적용 등 UI/UX 개선을 통한 이탈율 200% 감소',
                    'Google Analytics 내 결제 및 주문, 회원가입, 로그인 데이터 연동'
                ]
            },
            {
                id: 1,
                title: `당신의 영양제 admin`,
                startDate: new Date(`2022-08-24`),
                endDate: new Date(`2024-03-08`),
                linkList: [
                    {
                        title: `당신의 영양제 관리자 페이지 (PLUTUS)`,
                        link: `https://admin.dangyoung.com/`
                    },
                ],
                skills: ['React', 'JavaScript', 'AntD', 'Redux', 'Github', 'AWS (EC2, S3, CloudFront)'],
                description: '물류, 문의, CS, 전화주문 관리, 상품 등록, 정산 관리 등 백오피스 서비스 개발/배포/운영',
                summaryList: [
                    'Github Action을 이용한 빌드/배포 자동화',
                    'CS팀의 원활한 고객 응대 및 업무 능률 향상을 위해 FAQ 표기 및 검색 기능, Editor를 이용한 인사이트 기능 개발',
                    'Axios를 이용하여 REST API 연동',
                    'Redux를 활용하여 전역 상태 관리'
                ]
            },
            {
                id: 2,
                title: `당영투게더`,
                startDate: new Date(`2023-02`),
                endDate: new Date(`2024-03-08`),
                linkList: [
                    {
                        title: `당영투게더 / 관리자페이지`,
                        link: `https://together.dangyoung.com/`
                    },
                    {
                        title: `당영투게더 메디슨맨 약사 (예시)`,
                        link: `https://together.dangyoung.com/together/channel?id=mediman`
                    },
                ],
                skills: ['React', 'JavaScript', 'AntD', 'Redux', 'Github', 'Git Action', 'AWS (EC2, S3, CloudFront)'],
                description: '사용자가 활용 할 수 있는 개인 페이지를 정형화된 틀을 제공하고, 이를 관리할 수 있는 관리자 페이지 개발/배포/운영',
                summaryList: [
                    '이슈, 일정 관리 등 중간 관리자 역할 수행',
                    '크로스 브라우징 이슈 처리 및 반응형 웹 제작',
                    '카테고리, 영양제, 댓글 표기 등 대시보드 백엔드 CRUD 개발',
                    'Github Action을 이용한 빌드/배포 자동화',
                    '사용자가 한눈에 알아볼 수 있도록 매출, 유입량 등을 Chart.js를 사용하여 UI/UX를 개선',
                    '모바일 사용자 UX를 개선하기 위해 무한 스크롤 기능, 페이지 내 컴포넌트 요소 재배치',
                    '가비아로 각 사용자들에게 적합한 도메인 제공',
                    'ESLint, Prettier, husky, lint-staged 적용하여 협업 개발 대비',
                ]
            },
            {
                id: 3,
                title: `당신의 영양제 (앱)`,
                startDate: new Date(`2023-08`),
                endDate: new Date(`2024-03-08`),
                linkList: [
                    {
                        title: `플레이스토어 (AOS)`,
                        link: `https://play.google.com/store/apps/details?id=com.dangyounglonglifeapp&pli=1`
                    },
                    {
                        title: `앱스토어 (iOS)`,
                        link: `https://apps.apple.com/kr/app/%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%98%81%EC%96%91%EC%A0%9C-%EC%A0%84%EB%AC%B8%EA%B0%80%EB%93%A4%EC%9D%98-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EB%93%9C%EB%9F%AD%EC%8A%A4%ED%86%A0%EC%96%B4/id6462846633`
                    },
                ],
                skills: ['React-Native', 'JavaScript', 'Github', 'AWS(S3)', 'Android Studio', 'Xcode'],
                description: '인플루언서가 구독자들과 소통할 수 있는 폐쇄형 앱 서비스 개발/배포/운영',
                summaryList: [
                    '프로젝트 기술 스택 선정 및 이슈, 일정 관리 등 프로젝트 리딩',
                    'Android, IOS 기기별 UI/UX 통일화',
                    'Android 만보기 기능 개발을 위한 Foreground Service 개발',
                    '웹과 디자인 일원화 과정에서 editor로 작성된 게시글 HTML Render를 통해 표기 및 UI 통일화',
                    '컴포넌트 재사용을 고려하여 아토믹 디자인 패턴 도입',
                    'CodePush 활용하여 모바일 앱 업데이트 개발',
                ]
            },
            {
                id: 4,
                title: `당영파트너스 (앱)`,
                startDate: new Date(`2023-11`),
                endDate: new Date(`2024-03-08`),
                linkList: [
                    {
                        title: `플레이스토어 (AOS)`,
                        link: `https://play.google.com/store/apps/details?id=com.dangyoungtogetherapp`
                    },
                    {
                        title: `앱스토어 (iOS)`,
                        link: `https://apps.apple.com/us/app/%EB%8B%B9%EC%98%81%ED%8C%8C%ED%8A%B8%EB%84%88%EC%8A%A4/id6471548816`
                    },
                ],
                skills: ['React-Native', 'JavaScript', 'Github', 'AWS(S3)', 'Android Studio', 'Xcode'],
                description: '당영투게더 admin 앱, 당신의 영양제 관리 및 데이터 정보 전달을 위한 앱 서비스 개발/배포/운영',
                summaryList: [
                    '프로젝트 기술 스택 선정 및 이슈, 일정 관리 등 프로젝트 리딩',
                    'Android, IOS 기기별 UI/UX 통일화',
                    '클라이언트 사이드 담당',
                    'CodePush 활용하여 모바일 앱 업데이트 개발',
                ]
            },
        ]
    }
]

export const skillList = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native', 'Redux', 'Zustand', 'React-query', 'AsyncStorage', 'Axios', 'Sass', 'Bootstrap', 'Tailwind', 'AntD',
    'Github', 'IntelliJ', 'VSCode', 'AWS (EC2, S3, CloudFront 등)', 'SQL', 'Google Analytics', '네이버 서치어드바이저', 'Google Search Console'
]
