# Admin 페이지 구현 계획

포트폴리오 사이트 관리를 위한 Admin 대시보드 구현 문서입니다.

## 개요

### 목적
- 방문자 통계 분석 (Page View Analytics)
- 콘텐츠 관리 (Timeline, Experience, Skills CRUD)
- 통합 대시보드

### 기술 스택
| 영역 | 기술 |
|------|------|
| 인증 | Supabase Auth |
| 데이터베이스 | Supabase (PostgreSQL) |
| 라우트 보호 | Next.js Middleware |
| UI | HeroUI + SCSS Modules |
| 상태 관리 | React hooks |

---

## 페이지 구조

```
/admin
├── /login              # 로그인 페이지
├── /                   # 대시보드 (요약)
├── /analytics          # 방문자 분석
├── /timeline           # 타임라인 관리
├── /experience         # 경력 관리
└── /skills             # 스킬 관리
```

### 파일 구조
```
src/app/admin/
├── layout.tsx              # Admin 레이아웃 (사이드바)
├── page.tsx                # 대시보드
├── login/
│   └── page.tsx            # 로그인 페이지
├── analytics/
│   └── page.tsx            # 방문자 분석
├── timeline/
│   ├── page.tsx            # 목록
│   └── [id]/
│       └── page.tsx        # 수정
├── experience/
│   ├── page.tsx            # 목록
│   └── [id]/
│       └── page.tsx        # 수정
└── skills/
    └── page.tsx            # 목록 + 인라인 수정

src/app/admin/_components/
├── AdminSidebar.tsx        # 사이드바 네비게이션
├── AdminHeader.tsx         # 상단 헤더
├── StatCard.tsx            # 통계 카드
├── DataTable.tsx           # 데이터 테이블
└── FormFields/             # 폼 컴포넌트들
```

---

## 1단계: 인증 + 기본 레이아웃

### 1.1 Supabase Auth 설정

#### 사용자 생성 (Supabase Dashboard)
1. Authentication → Users → Add user
2. 관리자 이메일/비밀번호 등록

#### 환경 변수 (이미 설정됨)
```env
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### 1.2 인증 유틸리티

```typescript
// src/lib/auth.ts
import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### 1.3 Middleware (라우트 보호)

```typescript
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Admin 페이지만 보호
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### 1.4 로그인 페이지

```typescript
// src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}
```

### 1.5 Admin 레이아웃

```typescript
// src/app/admin/layout.tsx
import AdminSidebar from './_components/AdminSidebar';
import AdminHeader from './_components/AdminHeader';
import styles from './admin.module.scss';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <AdminHeader />
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 1.6 완료 기준
- [ ] Supabase Auth에 관리자 계정 생성
- [ ] 로그인/로그아웃 기능 동작
- [ ] 비로그인 시 `/admin/login`으로 리다이렉트
- [ ] 로그인 시 사이드바가 있는 Admin 레이아웃 표시

---

## 2단계: 대시보드 + Analytics

### 2.1 대시보드 (요약)

표시할 정보:
- 오늘 방문자 수 (Unique sessions)
- 오늘 페이지뷰 수
- 총 페이지뷰 수
- 최근 방문 기록 (5건)
- 인기 페이지 Top 5

### 2.2 Analytics 상세

#### 차트
- 일별 방문자 추이 (최근 30일)
- 페이지별 조회수 Bar chart
- 시간대별 방문 패턴

#### 테이블
- 전체 페이지뷰 목록 (페이지네이션)
- 필터: 날짜 범위, 페이지 경로
- 정렬: 최신순, 체류시간순

### 2.3 필요한 쿼리

```typescript
// src/lib/queries.ts 추가

// 오늘 통계
export async function getTodayStats() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('page_views')
    .select('session_id, page_path')
    .gte('created_at', `${today}T00:00:00`)
    .lte('created_at', `${today}T23:59:59`);

  if (error) throw error;

  const uniqueSessions = new Set(data?.map(d => d.session_id)).size;
  const totalViews = data?.length || 0;

  return { uniqueSessions, totalViews };
}

// 일별 통계 (최근 N일)
export async function getDailyStats(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('page_views')
    .select('created_at, session_id')
    .gte('created_at', startDate.toISOString());

  if (error) throw error;

  // 날짜별로 그룹핑
  const grouped = data?.reduce((acc, item) => {
    const date = item.created_at.split('T')[0];
    if (!acc[date]) acc[date] = new Set();
    acc[date].add(item.session_id);
    return acc;
  }, {} as Record<string, Set<string>>);

  return Object.entries(grouped || {}).map(([date, sessions]) => ({
    date,
    visitors: sessions.size,
  }));
}

// 페이지별 조회수
export async function getPageStats() {
  const { data, error } = await supabase
    .from('page_views')
    .select('page_path');

  if (error) throw error;

  const counts = data?.reduce((acc, { page_path }) => {
    acc[page_path] = (acc[page_path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts || {})
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);
}
```

### 2.4 완료 기준
- [ ] 대시보드에 오늘 통계 카드 표시
- [ ] 최근 방문 기록 표시
- [ ] Analytics 페이지에 일별 차트 표시
- [ ] 페이지별 조회수 표시

---

## 3단계: Timeline CRUD

### 3.1 기능
- 타임라인 항목 목록 조회
- 새 항목 추가
- 기존 항목 수정
- 항목 삭제
- 순서 변경 (drag & drop 또는 sort_order 수정)

### 3.2 폼 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| date | string | ✓ | 날짜 (표시용) |
| type | select | ✓ | music, featuring, career, gap, activity |
| tag | string | ✓ | 태그 텍스트 |
| title | string | ✓ | 제목 |
| cover | string | | 앨범 커버 URL |
| artist | string | | 아티스트명 |
| album | string | | 앨범명 |
| role | string | | 직책 |
| description | text | | 설명 |
| link | string | | 링크 URL |
| is_title | boolean | | 타이틀곡 여부 |
| sort_order | number | ✓ | 정렬 순서 |

### 3.3 트랙 관리 (music, featuring 타입)
- 트랙 추가/삭제
- 트랙별 이름, 순서, 타이틀곡 여부

### 3.4 완료 기준
- [ ] 타임라인 목록 테이블 표시
- [ ] 새 항목 추가 폼
- [ ] 항목 수정 폼
- [ ] 삭제 확인 모달
- [ ] 트랙 관리 (music 타입)

---

## 4단계: Experience/Skills CRUD

### 4.1 Experience Summary
경력 요약 관리:
- 회사명, 기간, 링크, 설명
- 포지션 목록 (중첩)
- 각 포지션의 업무 목록 (중첩)

### 4.2 Experience Detail
프로젝트 상세 관리:
- 프로젝트명, 기간, 설명
- 링크 목록
- 사용 기술 목록
- 요약 항목 목록

### 4.3 Skills
스킬 목록 관리:
- 스킬명, 카테고리, 순서
- 인라인 편집 방식 권장

### 4.4 완료 기준
- [ ] Experience Summary CRUD
- [ ] Experience Detail CRUD
- [ ] Skills 인라인 편집

---

## 보안 고려사항

### RLS 정책 업데이트
Admin 기능을 위해 인증된 사용자만 수정 가능하도록:

```sql
-- 예시: timeline 테이블
CREATE POLICY "Allow authenticated insert" ON timeline
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON timeline
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON timeline
  FOR DELETE TO authenticated USING (true);
```

### 환경 분리
- 개발 환경과 프로덕션 환경 Supabase 분리 고려
- Admin 계정 비밀번호 강력하게 설정

---

## 진행 체크리스트

### 1단계 ✅ 인증 + 기본 레이아웃
- [ ] `@supabase/auth-helpers-nextjs` 설치
- [ ] `src/lib/auth.ts` 생성
- [ ] `src/middleware.ts` 생성
- [ ] `src/app/admin/login/page.tsx` 생성
- [ ] `src/app/admin/layout.tsx` 생성
- [ ] `src/app/admin/_components/` 생성
- [ ] Supabase에 관리자 계정 생성
- [ ] 로그인/로그아웃 테스트

### 2단계 ⬜ 대시보드 + Analytics
- [ ] `src/app/admin/page.tsx` (대시보드)
- [ ] `src/app/admin/analytics/page.tsx`
- [ ] 통계 쿼리 함수 추가
- [ ] StatCard 컴포넌트
- [ ] 차트 라이브러리 선택 및 설치

### 3단계 ⬜ Timeline CRUD
- [ ] `src/app/admin/timeline/page.tsx`
- [ ] `src/app/admin/timeline/[id]/page.tsx`
- [ ] DataTable 컴포넌트
- [ ] 폼 컴포넌트
- [ ] Server Actions 또는 API Routes

### 4단계 ⬜ Experience/Skills CRUD
- [ ] Experience Summary 관리
- [ ] Experience Detail 관리
- [ ] Skills 인라인 편집
