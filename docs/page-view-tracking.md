# Page View Tracking

Supabase를 활용한 페이지 조회 추적 시스템 문서입니다.

## 개요

사용자의 페이지 방문을 추적하여 다음 정보를 기록합니다:
- **어떤 페이지**를 방문했는지 (`page_path`)
- **언제 들어왔는지** (`created_at`)
- **언제 나갔는지** (`viewed_at`)
- **같은 사용자인지** 식별 (`session_id`)

## 데이터베이스 스키마

```sql
CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,           -- 순차적 ID (방문 순서 보장)
  page_path VARCHAR(200) NOT NULL,    -- 방문한 페이지 경로
  session_id VARCHAR(100) NOT NULL,   -- 세션 식별자 (UUID)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- 페이지 진입 시간
  viewed_at TIMESTAMP WITH TIME ZONE  -- 페이지 이탈 시간 (NULL 가능)
);
```

### viewed_at이 NULL인 경우
- 아직 페이지를 보고 있는 중
- 이탈 기록에 실패함 (네트워크 오류, 브라우저 강제 종료 등)

## 세션 관리

### 세션 ID 생성 규칙
- `localStorage`에 저장
- **하루 단위로 갱신** (날짜가 바뀌면 새 세션 ID 발급)
- Daily Unique Visitor 계산에 활용 가능

```typescript
// 저장 키
const SESSION_ID_KEY = 'whosbax_session_id';
const SESSION_DATE_KEY = 'whosbax_session_date';

// 날짜가 바뀌면 세션 초기화
if (storedDate !== today) {
  localStorage.setItem(SESSION_DATE_KEY, today);
  localStorage.removeItem(SESSION_ID_KEY);
}
```

### 왜 sessionStorage가 아닌 localStorage인가?
- `sessionStorage`: 탭마다 별도, 탭 닫으면 삭제
- `localStorage`: 브라우저 전체 공유, 영구 저장
- **선택 이유**: 같은 날 여러 탭을 열어도 같은 사용자로 인식하기 위해

## 이탈 시간 기록 방식

### 1. 페이지 내 이동 (SPA Navigation)
```typescript
// useEffect cleanup 함수에서 처리
return () => {
  if (currentRecordIdRef.current) {
    updateViewedAt(currentRecordIdRef.current);
  }
};
```
- React의 cleanup 함수가 정상 실행됨
- Supabase 클라이언트로 업데이트

### 2. 브라우저/탭 종료
```typescript
const handleBeforeUnload = () => {
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ viewed_at: new Date().toISOString() }),
    keepalive: true,  // 핵심!
  });
};

window.addEventListener('beforeunload', handleBeforeUnload);
```

#### 왜 sendBeacon이 아닌 fetch + keepalive인가?

| 방식 | 커스텀 헤더 | 페이지 종료 후 전송 |
|------|------------|-------------------|
| `sendBeacon` | ❌ 불가 | ✅ 가능 |
| `fetch` | ✅ 가능 | ❌ 불가 |
| `fetch + keepalive` | ✅ 가능 | ✅ 가능 |

- Supabase REST API는 `apikey`와 `Authorization` 헤더 필수
- `sendBeacon`은 헤더 설정 불가 → 인증 실패
- `fetch`에 `keepalive: true` 옵션으로 두 장점 모두 활용

## 파일 구조

```
src/
├── hooks/
│   └── usePageView.ts          # 페이지 뷰 추적 훅
├── app/
│   └── _component/
│       └── PageViewTracker.tsx # 훅을 사용하는 클라이언트 컴포넌트
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트
│   └── queries.ts              # 페이지 뷰 쿼리 함수들
└── type/
    └── supabase.ts             # 타입 정의

supabase/
└── migrations/
    └── 001_page_views.sql      # 테이블 생성 SQL
```

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase RLS 정책

```sql
-- 공개 읽기, 삽입, 업데이트 허용
CREATE POLICY "Allow public read access" ON page_views FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON page_views FOR UPDATE USING (true) WITH CHECK (true);
```

## 쿼리 예시

### 총 페이지뷰 수
```sql
SELECT COUNT(*) FROM page_views;
```

### 페이지별 조회수
```sql
SELECT page_path, COUNT(*) as views
FROM page_views
GROUP BY page_path
ORDER BY views DESC;
```

### 일별 유니크 방문자 수
```sql
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT session_id) as unique_visitors
FROM page_views
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 평균 체류 시간 (viewed_at이 있는 경우만)
```sql
SELECT
  page_path,
  AVG(EXTRACT(EPOCH FROM (viewed_at - created_at))) as avg_seconds
FROM page_views
WHERE viewed_at IS NOT NULL
GROUP BY page_path;
```

### 이탈률 (viewed_at이 NULL인 비율)
```sql
SELECT
  page_path,
  COUNT(*) FILTER (WHERE viewed_at IS NULL) * 100.0 / COUNT(*) as bounce_rate
FROM page_views
GROUP BY page_path;
```

## 제한사항

1. **클라이언트 사이드 전용**: SSR에서는 동작하지 않음
2. **JavaScript 필수**: JS 비활성화 시 추적 불가
3. **브라우저 강제 종료**: `beforeunload` 이벤트가 발생하지 않아 `viewed_at` 기록 실패 가능
4. **keepalive 제한**: 요청 본문 크기 64KB 제한 (현재 사용량으로는 문제없음)
