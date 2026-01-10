# Admin 페이지 구현 계획

포트폴리오 사이트 관리를 위한 Admin 대시보드 구현 문서입니다.

## 목적

- 방문자 통계 분석 (Page View Analytics)
- 콘텐츠 관리 (Timeline, Experience, Skills CRUD)
- 통합 대시보드

## 기술 스택

| 영역 | 기술 |
|------|------|
| 인증 | Supabase Auth |
| 데이터베이스 | Supabase (PostgreSQL) |
| 라우트 보호 | Next.js Middleware |
| UI | HeroUI + SCSS Modules |
| 차트 | Recharts |

## 진행 체크리스트

### 1단계 완료 - 인증 + 기본 레이아웃
- [x] Supabase Auth 연동
- [x] 로그인/로그아웃 기능
- [x] Middleware로 라우트 보호
- [x] Admin 레이아웃 (사이드바, 헤더)
- [x] 모바일 반응형
- [x] Toast 알림 (sonner)

### 2단계 완료 - 대시보드 + Analytics
- [x] 대시보드 통계 카드 (오늘 방문자, 페이지뷰, 총 조회수)
- [x] 최근 방문 기록
- [x] 인기 페이지 Top 5
- [x] Analytics 상세 페이지
  - [x] 일별 방문 추이 바 차트 (Recharts)
  - [x] 페이지별 조회수 파이 차트
  - [x] 날짜 필터 (프리셋: 오늘, 3일, 7일, 14일, 30일, 90일)
  - [x] 커스텀 날짜 범위 선택
  - [x] 전체 페이지뷰 테이블 (페이지네이션)
  - [x] 모바일 반응형

### 3단계 대기 - Timeline CRUD
- [ ] 목록/추가/수정/삭제
- [ ] 트랙 관리 (music 타입)

### 4단계 대기 - Experience/Skills CRUD
- [ ] Experience Summary/Detail 관리
- [ ] Skills 인라인 편집

## 보안 고려사항

- RLS 정책으로 인증된 사용자만 수정 가능
- Admin 계정 비밀번호 강력하게 설정
