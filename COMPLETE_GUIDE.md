# Cozac's Life Debugger - 완전 가이드 (Complete Documentation)

## 📚 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [핵심 컨셉](#2-핵심-컨셉)
3. [기술 스택](#3-기술-스택)
4. [아키텍처](#4-아키텍처)
5. [화면별 상세 설명](#5-화면별-상세-설명)
6. [데이터 구조](#6-데이터-구조)
7. [핵심 기능](#7-핵심-기능)
8. [사용자 플로우](#8-사용자-플로우)
9. [배포 및 운영](#9-배포-및-운영)
10. [향후 계획](#10-향후-계획)

---

## 1. 프로젝트 개요

### 1.1 서비스 정의

**Cozac's Life Debugger (lifecode)** 는 프로그래밍 개념을 삶에 적용한 자기 성찰 도구입니다.

#### 한 줄 설명
> "나의 성향(Base Code)과 실제 행동(Daily Log)의 괴리를 ChatGPT로 분석해 삶을 디버깅하는 자기 성찰 도구"

#### 서비스 철학
- **데이터 기반 자기 인식**: 감이 아닌 로그로 나를 파악
- **완벽한 프라이버시**: 모든 데이터는 브라우저에만 저장
- **AI 활용 극대화**: ChatGPT를 전문 분석가로 만드는 프롬프트 제공
- **브랜드 구현**: "코작 - 인생을 코딩하는 작가"를 실제 제품으로 구현

### 1.2 핵심 가치 제안

#### 유저에게 제공하는 가치
1. **명확한 자기 인식**
   - 자신의 '설정값'과 '실제 행동' 사이의 '버그' 명확히 인지

2. **실행 가능한 개선**
   - AI가 '디버깅 리포트'를 통해 구체적인 'Patch' 제공

3. **데이터 기반 의사결정**
   - 감이 아닌 로그에 기반한 합리적 결정

4. **완벽한 프라이버시**
   - 가장 솔직한 로그 기록 가능 → 분석 정확도 극대화

#### 개발자에게 제공하는 가치
1. **독보적인 브랜딩**
   - '인생을 코딩한다'는 추상적 브랜딩을 제품으로 구현

2. **운영 비용 0원**
   - 서버/API 비용 없어 100만 명이 사용해도 비용 발생 없음

3. **강력한 바이럴 루프**
   - 유저가 GPT 리포트를 SNS 인증하며 자연스러운 홍보

4. **전문가 포지셔닝**
   - '프롬프트 엔지니어'이자 '유용한 툴 제작자'로 명확한 포지셔닝

### 1.3 타겟 유저

#### Primary Target (주요 타겟)
- **나이**: 25-40세
- **직업**: 직장인, 프리랜서, 창업가
- **성향**: 논리적 분석을 선호하는 자기계발 관심층
- **기술**: AI 리터러시가 있으며 ChatGPT를 활용하는 유저
- **니즈**:
  - "왜 나는 계획만 세우고 실행은 안 할까?"
  - "내 번아웃 패턴을 데이터로 보고 싶어"
  - "GPT를 내 전문 분석가로 만들고 싶어"

#### Secondary Target (부차 타겟)
- 일기/저널링에 관심 있지만 지속하지 못하는 사람
- 프라이버시를 중시하는 사람
- 개발자/프로그래머 (프로그래밍 메타포에 공감)

### 1.4 경쟁 서비스 비교

| 특징 | 일반 일기앱 | 자기계발 앱 | ChatGPT | Cozac's Life Debugger |
|-----|----------|-----------|---------|---------------------|
| 구조화 | ❌ 자유 형식 | ✅ 체계적 | ❌ 자유 형식 | ✅ 구조화된 데이터 |
| 분석 | ❌ 없음 | ⚠️ 단순 통계 | ✅ AI 분석 | ✅ AI + 전문 프롬프트 |
| 프라이버시 | ⚠️ 서버 저장 | ⚠️ 서버 저장 | ⚠️ 서버 저장 | ✅ 100% 로컬 |
| 비용 | 무료~$5/월 | $10-20/월 | $20/월 | ✅ 무료 |
| AI 활용 | ❌ 없음 | ⚠️ 제한적 | ✅ 직접 대화 | ✅ 최적화된 활용 |
| 브랜딩 | 일반적 | 동기부여 | 범용 AI | ✅ '디버깅' 컨셉 |

### 1.5 비즈니스 모델

#### 현재 (MVP v1.0)
- **100% 무료**
- 서버 비용 없음
- 광고 없음
- 기능 제한 없음

#### 향후 수익화 옵션 (v2.0+)

**프리미엄 ($4.99/월)**
- AI 직접 통합 (OpenAI API 대체)
- 무제한 리포트 저장
- 고급 통계 (12개월 추이)
- 프리미엄 프롬프트 템플릿
- 우선 지원

**엔터프라이즈 ($49/월)**
- 팀 기능
- 관리자 대시보드
- 코칭 세션 연동
- 맞춤 프롬프트

**핵심 원칙**: 기본 기능은 영원히 무료!

---

## 2. 핵심 컨셉

### 2.1 프로그래밍 메타포

소프트웨어 개발 개념을 삶에 적용:

```
당신의 삶 = 프로그램

Base Code (기본 코드)
  ↓
  당신이 원하는 삶의 방식
  당신의 성향과 가치관

Daily Log (실행 로그)
  ↓
  실제로 살아가는 방식
  매일의 에너지, 활동, 감정

Bug (버그)
  ↓
  Base Code와 Daily Log의 괴리
  "계획 지향인데 즉흥적으로 행동"

Debug (디버깅)
  ↓
  ChatGPT가 패턴 분석
  구체적인 개선 방법 제시

Patch (패치)
  ↓
  다음 주 액션 플랜
  실행 가능한 개선안
```

### 2.2 사용자 여정 (User Journey)

#### Phase 1: 초기 설정 (5분, 1회)
```
온보딩 화면
  ↓
"당신의 삶을 디버깅하세요"
  ↓
Base Code 정의 (5가지 질문)
  ↓
Q1. 에너지 방향: 도전 vs 안정
Q2. 의사 결정: 논리 vs 공감
Q3. 행동 방식: 실행 vs 계획
Q4. 핵심 가치: 성장 vs 균형
Q5. 회복 방식: 활동 vs 정적
  ↓
Base Code 저장 완료!
```

#### Phase 2: 일상 기록 (30초/일, 매일)
```
Daily Log 화면 (메인)
  ↓
오늘의 로그 작성
  ↓
에너지 레벨: 1-5 슬라이더
주요 활동: 업무/공부/운동/관계/휴식/창작/기타
핵심 감정: 🔥열정/💡영감/😊만족/😐평온/😥피로/🤯스트레스
한 줄 메모: (선택) "기획안 통과", "번아웃"
  ↓
로그 저장 → 스트릭 +1
```

#### Phase 3: AI 분석 (주 1회, 클릭 한 번)
```
디버깅 리포트 생성 화면
  ↓
분석 기간 선택: 7일/14일/30일
  ↓
자동 생성:
[재료 1] 데이터 패킷
  - Base Code 요약
  - 주간 로그 통계
  - 일별 상세 로그

[재료 2] Cozac's Master Prompt
  - AI에게 주는 분석 명령
  - Bug/Synergy 탐지 프롬프트
  - Patch 제안 요청
  ↓
[복사] 버튼 클릭 × 2
  ↓
ChatGPT 붙여넣기
  ↓
AI 디버깅 리포트 수령
  ↓
다음 주 실천!
```

### 2.3 핵심 용어 정의

| 용어 | 의미 | 예시 |
|-----|------|-----|
| **Base Code** | 초기 설정값, 당신의 기본 성향 | "나는 계획 지향이고 성장 지향" |
| **Daily Log** | 실행 로그, 매일의 실제 행동 | "에너지 2/5, 업무, 스트레스" |
| **Bug** | 버그, 괴리 | "계획 지향인데 즉흥적으로 행동" |
| **Synergy** | 시너지, 잘 맞는 행동 | "성장 지향 + 도전적 프로젝트" |
| **Debug** | 디버깅, AI 분석 | ChatGPT가 패턴 분석 |
| **Patch** | 패치, 개선안 | "매일 아침 10분 계획 시간" |
| **Streak** | 스트릭, 연속 기록일 | "🔥 7일 연속 기록 중!" |

---

## 3. 기술 스택

### 3.1 프론트엔드

#### 핵심 프레임워크
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "typescript": "~5.6.2"
}
```

**선택 이유:**
- React 18: 안정적이고 성숙한 생태계
- TypeScript: 타입 안전성으로 버그 사전 방지
- React Router v6: SPA 라우팅

#### 빌드 도구
```json
{
  "vite": "^7.1.12"
}
```

**선택 이유:**
- 빠른 개발 서버 (HMR)
- 최적화된 프로덕션 빌드
- 번들 크기 87KB (gzip)

#### 스타일링
```json
{
  "tailwindcss": "^3.4.17",
  "postcss": "^8.4.49",
  "autoprefixer": "^10.4.20"
}
```

**선택 이유:**
- Utility-first CSS (빠른 개발)
- 반응형 디자인 최적화
- 작은 번들 크기 (~4KB gzip)

### 3.2 데이터 관리

#### Storage
```typescript
// 100% localStorage
const STORAGE_KEY = 'cozac-life-debugger';

interface AppData {
  version: string;
  isFirstVisit: boolean;
  baseCode?: BaseCode;
  dailyLogs: DailyLog[];
  generatedReports: GeneratedReport[];
  settings: Settings;
  metadata: Metadata;
}
```

**선택 이유:**
- **완벽한 프라이버시**: 데이터가 절대 외부로 나가지 않음
- **서버 비용 0원**: 100만 명이 사용해도 비용 없음
- **오프라인 동작**: 인터넷 없어도 사용 가능
- **빠른 응답**: 네트워크 지연 없음

**제약사항:**
- 브라우저별 독립 저장 (크로스 브라우저 동기화 불가)
- 5-10MB 용량 제한 (5년치 로그 충분)
- 캐시 삭제 시 데이터 손실 가능 → 백업 기능 필수

### 3.3 프로젝트 구조

```
dailylog/
├── public/
│   └── vite.svg                 # 파비콘
│
├── src/
│   ├── assets/                  # 정적 파일
│   │   └── react.svg
│   │
│   ├── pages/                   # 화면 컴포넌트
│   │   ├── Onboarding.tsx      # 화면 0: 온보딩
│   │   ├── BaseCode.tsx        # 화면 1: Base Code 정의
│   │   ├── DailyLog.tsx        # 화면 2: Daily Log (메인)
│   │   ├── Report.tsx          # 화면 3: 리포트 생성
│   │   └── Settings.tsx        # 화면 4: 설정
│   │
│   ├── types/                   # TypeScript 타입
│   │   └── index.ts            # 모든 타입 정의
│   │
│   ├── utils/                   # 유틸리티 함수
│   │   └── localStorage.ts     # 데이터 관리 로직
│   │
│   ├── App.tsx                  # 메인 앱 + 라우팅
│   ├── main.tsx                 # 엔트리 포인트
│   └── index.css                # Tailwind 설정
│
├── PLANNING.md                  # 프로젝트 기획안 v2.0
├── FEATURE_ROADMAP.md           # 추가 기능 로드맵
├── DEPLOYMENT.md                # 배포 가이드
├── netlify.toml                 # Netlify 설정
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

### 3.4 번들 크기 (최적화됨)

```
프로덕션 빌드 결과:

dist/index.html              0.46 KB  (gzip:  0.29 KB)
dist/assets/index.css       20.63 KB  (gzip:  4.12 KB)
dist/assets/index.js       261.55 KB  (gzip: 82.35 KB)
────────────────────────────────────────────────────
총 초기 로드:               ~87 KB   (gzip)
```

**성능 목표:**
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- ✅ 모든 목표 달성 가능한 크기

---

## 4. 아키텍처

### 4.1 시스템 아키텍처

```
┌─────────────────────────────────────────────┐
│         User Browser (Client)               │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   React Application (SPA)             │ │
│  │                                       │ │
│  │  ┌─────────┐  ┌──────────┐  ┌──────┐│ │
│  │  │ Pages   │  │ Utils    │  │ Types││ │
│  │  │         │  │          │  │      ││ │
│  │  │ - Login │→ │ Storage  │→ │ Data ││ │
│  │  │ - Log   │  │ Analytics│  │Models││ │
│  │  │ - Report│  │ Export   │  │      ││ │
│  │  └─────────┘  └──────────┘  └──────┘│ │
│  │                     ↕                 │ │
│  │              localStorage             │ │
│  │         (All Data Stored Here)       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  User manually:                             │
│  Copy → ChatGPT → Paste → Analyze          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│        External (User's Choice)             │
│                                             │
│           ChatGPT / Claude                  │
│         (User brings their own)             │
└─────────────────────────────────────────────┘

No Server • No Database • No API • No Backend
→ 100% Client-Side Application
```

**핵심 특징:**
- ✅ 서버 없음 (Serverless가 아니라 Server-ZERO)
- ✅ 백엔드 없음
- ✅ 데이터베이스 없음
- ✅ API 호출 없음 (Clipboard API 제외)
- ✅ 완전한 정적 사이트

### 4.2 데이터 플로우

```
┌─────────────────────────────────────────────┐
│  1. 유저가 Base Code 정의                    │
└──────────────────┬──────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  saveBaseCode()                              │
│  → localStorage에 JSON 저장                  │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  2. 유저가 Daily Log 작성 (매일)             │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  saveDailyLog()                              │
│  → 날짜별 로그 배열에 추가                    │
│  → 스트릭 자동 계산                          │
│  → localStorage 업데이트                     │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  3. 유저가 리포트 생성 요청 (주 1회)          │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  generateDataPacket()                        │
│  1. loadAppData() - localStorage에서 로드     │
│  2. getBaseCode() - Base Code 불러오기        │
│  3. getDailyLogsByPeriod(7일) - 로그 필터링  │
│  4. 통계 계산 (평균, 비중, 빈도)              │
│  5. 데이터 패킷 텍스트 생성                   │
│  6. 프롬프트와 함께 표시                      │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  4. 유저가 [복사] 버튼 클릭                   │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  navigator.clipboard.writeText()             │
│  → 클립보드에 복사                            │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  5. 유저가 ChatGPT에 수동으로 붙여넣기        │
│     (앱 밖에서 발생)                          │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  6. ChatGPT가 분석 리포트 생성                │
│     (앱 밖에서 발생)                          │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  7. (선택) 유저가 [리포트 저장] 클릭         │
└──────────────────┬───────────────────────────┘
                   ↓
┌──────────────────────────────────────────────┐
│  saveGeneratedReport()                       │
│  → generatedReports 배열에 추가              │
│  → localStorage 업데이트                     │
└───────────────────────────────────────────────┘
```

### 4.3 라우팅 구조

```typescript
// App.tsx

<Router>
  <Routes>
    {/* 조건부 리다이렉트 */}
    <Route path="/" element={
      isFirstVisit
        ? <Navigate to="/onboarding" />
        : !hasBaseCode
          ? <Navigate to="/base-code" />
          : <Navigate to="/daily-log" />
    } />

    {/* 각 화면 */}
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/base-code" element={<BaseCode />} />
    <Route path="/daily-log" element={<DailyLog />} />
    <Route path="/report" element={<Report />} />
    <Route path="/settings" element={<Settings />} />

    {/* 404 */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>
```

**라우팅 로직:**
1. 첫 방문 (`isFirstVisit: true`) → `/onboarding`
2. Base Code 미정의 → `/base-code`
3. Base Code 정의 완료 → `/daily-log` (메인)
4. 이후 자유롭게 네비게이션

---

## 5. 화면별 상세 설명

### 5.1 화면 0: 온보딩 (Onboarding)

**경로:** `/onboarding`

**목적:** 신규 유저에게 서비스 가치를 전달하고 시작 유도

**UI 구성:**

```
┌─────────────────────────────────────┐
│ Cozac's Life Debugger               │
│ 당신의 삶을 '디버깅'하세요           │
│                                     │
│ [프로세스 설명]                      │
│ 1️⃣ Base Code 정의 → 당신의 설정값   │
│ 2️⃣ Daily Log 기록 → 실제 행동      │
│ 3️⃣ AI 리포트 생성 → ChatGPT 분석   │
│                                     │
│ [핵심 가치 카드]                     │
│ 📊 데이터 기반  🔒 프라이버시        │
│ 🤖 고급 프롬프트                     │
│                                     │
│ [Base Code 정의하러 가기] 버튼       │
│                                     │
│ ⚠️ 중요: 데이터는 이 브라우저에만    │
│ 저장됩니다. 정기적 백업 권장.        │
└─────────────────────────────────────┘
```

**주요 기능:**
- 서비스 소개
- 3단계 프로세스 설명
- 프라이버시 강조
- CTA 버튼 → Base Code 정의

**데이터 흐름:**
```typescript
handleStart() {
  markFirstVisitComplete(); // isFirstVisit: false
  navigate('/base-code');
}
```

---

### 5.2 화면 1: Base Code 정의 (BaseCode)

**경로:** `/base-code`

**목적:** 5단계 질문으로 유저의 기본 성향 정의

**UI 구성:**

```
┌─────────────────────────────────────┐
│ Base Code 정의                       │
│ 당신의 삶을 디버깅하기 위해,         │
│ '초기 설정값'을 먼저 정의합니다.     │
│                                     │
│ [진행률]  2 / 5   (40%)             │
│ ████████░░░░░░░░                    │
│                                     │
│ Q2. 중요한 결정을 내릴 때 기준은?    │
│                                     │
│ ┌─────────────────────────────────┐│
│ │ 🔵 A                            ││
│ │ 데이터와 논리, 객관적인 사실     ││
│ │ (논리 중심)                     ││
│ └─────────────────────────────────┘│
│ ┌─────────────────────────────────┐│
│ │ 🟣 B                            ││
│ │ 관계와 감정, 조화로운 결과       ││
│ │ (공감 중심)                     ││
│ └─────────────────────────────────┘│
│                                     │
│ 💡 힌트: '이게 합리적인가?'를       │
│    먼저 따진다면 A                  │
│                                     │
│ ← 이전 질문                         │
└─────────────────────────────────────┘
```

**5가지 질문:**

| No | 질문 | 옵션 A | 옵션 B |
|----|------|--------|--------|
| Q1 | 에너지 방향 | 외부 활동/새로운 자극 (도전) | 내면 집중/안정적 환경 (안정) |
| Q2 | 의사 결정 | 데이터/논리 (논리 중심) | 관계/감정 (공감 중심) |
| Q3 | 행동 방식 | 즉각 실행/유연 적응 (실행) | 명확한 계획/체계적 절차 (계획) |
| Q4 | 핵심 가치 | 성장/성취 (성장 지향) | 안정/균형 (균형 지향) |
| Q5 | 회복 방식 | 활동적 (운동/외출) | 정적 (휴식/혼자) |

**주요 기능:**
- 단계별 진행률 표시
- 이전 질문으로 돌아가기
- 각 질문마다 힌트 제공
- 마지막 질문 후 자동 저장

**데이터 저장:**
```typescript
const baseCode: BaseCode = {
  version: '1.0',
  createdAt: new Date().toISOString(),
  energy: 'A',     // 도전 지향
  decision: 'A',   // 논리 중심
  action: 'B',     // 계획 지향
  value: 'A',      // 성장 지향
  recovery: 'B',   // 정적 방식
};

saveBaseCode(baseCode);
// → localStorage['cozac-life-debugger'].baseCode에 저장
```

**완료 후:**
- "✅ Base Code가 저장되었습니다!" 알림
- `/daily-log`로 자동 이동

---

### 5.3 화면 2: Daily Log (메인 화면)

**경로:** `/daily-log`

**목적:** 매일의 에너지, 활동, 감정을 30초 내로 기록

**UI 구성:**

```
┌─────────────────────────────────────┐
│ Cozac's Life Debugger   🔥 7일  ⚙️  │
├─────────────────────────────────────┤
│ [스트릭 카드]                        │
│ 🔥 연속 기록 7일!                    │
│ 이번 주 로그 완성도: 5/7일           │
│ 이번 달 로그: 15/24일                │
├─────────────────────────────────────┤
│ [로그 입력 카드]                     │
│                                     │
│ ←  10월 24일 (목)  →                │
│                                     │
│ Q1. 오늘의 에너지 레벨은?            │
│ ◯─────◉─────◯─────◯─────◯          │
│ 1     2     3     4     5           │
│ (탈진)             (최고조)          │
│                                     │
│ Q2. 오늘 가장 많은 시간을 쓴 활동?   │
│ [업무] [공부] [운동] [관계]          │
│ [휴식] [창작] [기타]                 │
│                                     │
│ Q3. 오늘의 핵심 감정은?              │
│ 🔥 열정/의욕    💡 영감/깨달음       │
│ 😊 만족/기쁨    😐 평온/무난         │
│ 😥 피로/우울    🤯 혼란/스트레스     │
│                                     │
│ Q4. 한 줄 로그 (선택)                │
│ ┌─────────────────────────────────┐│
│ │ 예: '기획안 통과', '번아웃'     ││
│ └─────────────────────────────────┘│
│                                     │
│ [로그 저장하기]                      │
├─────────────────────────────────────┤
│ 📊 이번 주 AI 분석 받기 (로그 5일)   │
└─────────────────────────────────────┘
```

**주요 기능:**

1. **스트릭 시스템**
   - 연속 기록일 표시 (🔥 7일)
   - 주간 완성도 (5/7일)
   - 월간 완성도 (15/24일)

2. **날짜 네비게이션**
   - 좌우 화살표로 날짜 변경
   - 과거 로그 수정 가능
   - 미래 날짜는 비활성화

3. **4가지 입력 필드**
   - 에너지: 1-5 슬라이더
   - 활동: 7개 버튼 (단일 선택)
   - 감정: 6개 이모지 버튼 (단일 선택)
   - 메모: 텍스트 입력 (선택)

4. **리포트 생성 버튼**
   - 로그 3일 미만: 비활성화
   - 로그 3일 이상: 활성화 + 클릭 시 `/report` 이동

**데이터 저장:**
```typescript
const log: DailyLog = {
  date: '2025-10-24',
  energy: 3,
  activity: '업무',
  emotion: '😊',
  note: '기획안 통과',
  createdAt: new Date().toISOString()
};

saveDailyLog(log);
// → dailyLogs 배열에 추가
// → 스트릭 자동 계산
// → localStorage 업데이트
```

**스트릭 계산 로직:**
```typescript
// 오늘부터 과거로 거슬러 올라가며 연속 기록 확인
calculateCurrentStreak(logs: DailyLog[]): number {
  let streak = 0;
  let currentDate = new Date();

  for (const log of sortedLogs) {
    const diffDays = daysBetween(currentDate, log.date);
    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break; // 연속 끊김
    }
  }

  return streak;
}
```

**모바일 최적화:**
- 모든 버튼 최소 48px 높이 (터치 타겟)
- 감정 이모지 큰 크기 (text-3xl)
- 슬라이더 터치 영역 확대
- 입력 필드 가독성 향상 (py-4, text-base)

---

### 5.4 화면 3: 디버깅 리포트 생성 (Report)

**경로:** `/report`

**목적:** ChatGPT 분석용 데이터 패킷과 프롬프트 생성

**UI 구성:**

```
┌─────────────────────────────────────┐
│ ← 돌아가기                           │
│                                     │
│ AI 분석을 위한 '재료'가              │
│ 준비되었습니다.                      │
│                                     │
│ 아래 1, 2번을 복사하여               │
│ ChatGPT에 붙여넣으세요.              │
│                                     │
│ [분석 기간 선택]                     │
│ ⦿ 최근 7일 (권장)                   │
│ ◯ 최근 14일                         │
│ ◯ 최근 30일                         │
│                                     │
├─────────────────────────────────────┤
│ 1번 재료: 나의 데이터 패킷           │
│ [데이터 복사] ✅ 복사 완료!          │
│ ┌─────────────────────────────────┐│
│ │ [분석 요청 데이터]              ││
│ │                                 ││
│ │ 1. 나의 'Base Code':            ││
│ │ - 에너지: 도전 지향             ││
│ │ - 결정: 논리 중심               ││
│ │ ...                             ││
│ │                                 ││
│ │ 2. 나의 '주간 로그' (7일):      ││
│ │ - 평균 에너지: 2.6 / 5.0       ││
│ │ - 주요 활동: 업무(80%)          ││
│ │ - 핵심 감정: 스트레스(3회)      ││
│ │ [일별 상세 로그]                ││
│ │ - 10/24: 에너지 2, 업무, 🤯    ││
│ │ ...                             ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ 2번 재료: Cozac's Master Prompt v1.0│
│ [프롬프트 복사]                      │
│ ┌─────────────────────────────────┐│
│ │ [프롬프트 명령어] v1.0          ││
│ │                                 ││
│ │ 너는 '라이프 코치'이자 냉철한   ││
│ │ '데이터 분석가'다.              ││
│ │                                 ││
│ │ [분석 목표]                     ││
│ │ Base Code와 주간 로그 사이의    ││
│ │ 시너지와 충돌을 찾아라...       ││
│ │ ...                             ││
│ └─────────────────────────────────┘│
├─────────────────────────────────────┤
│ [복사 순서 가이드]                   │
│ 1. [데이터 복사] 클릭               │
│ 2. ChatGPT 열고 붙여넣기 (Ctrl+V)  │
│ 3. Shift+Enter (줄바꿈)            │
│ 4. [프롬프트 복사] 클릭             │
│ 5. 붙여넣기 → 전송!                 │
│                                     │
│ [이 리포트 저장하기]                 │
│                                     │
│ 📌 리포트를 SNS에 공유하면          │
│ 동기부여가 됩니다!                   │
└─────────────────────────────────────┘
```

**데이터 패킷 생성 로직:**

```typescript
function generateDataPacket(period: '7' | '14' | '30') {
  // 1. Base Code 불러오기
  const baseCode = loadAppData().baseCode;
  const baseCodeText = formatBaseCode(baseCode);

  // 2. 기간별 로그 필터링
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - (Number(period) - 1));

  const logs = getDailyLogsByPeriod(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );

  // 3. 통계 계산
  const avgEnergy = logs.reduce((sum, log) =>
    sum + log.energy, 0) / logs.length;

  const activityCount = {};
  logs.forEach(log => {
    activityCount[log.activity] =
      (activityCount[log.activity] || 0) + 1;
  });

  const activityPercent = Object.entries(activityCount)
    .map(([activity, count]) =>
      `${activity}(${Math.round((count / logs.length) * 100)}%)`
    ).join(', ');

  // 4. 일별 로그 요약
  const dailySummary = logs.map(log =>
    `${formatDate(log.date)} (에너지 ${log.energy}/5, ` +
    `${log.activity}, ${log.emotion})${log.note ? `: '${log.note}'` : ''}`
  ).join('\n');

  // 5. 최종 데이터 패킷 생성
  return `[분석 요청 데이터]

1. 나의 'Base Code (초기 설정값)':
${baseCodeText}

2. 나의 '주간 로그' (${startDate} ~ ${endDate}, 총 ${logs.length}일):
   - 평균 에너지 레벨: ${avgEnergy.toFixed(1)} / 5.0
   - 주요 활동 비중: ${activityPercent}
   - 핵심 감정 빈도: ${emotionFreq}

   [일별 상세 로그]
${dailySummary}`;
}
```

**Cozac's Master Prompt v1.0:**

```
[프롬프트 명령어] v1.0

너는 '라이프 코치'이자 냉철한 '데이터 분석가'다.
나의 'Base Code (초기 설정값)'와 나의 '주간 로그' 데이터가 주어졌다.

[분석 목표]
'Base Code'(내가 정의한 성향)와 '주간 로그'(나의 실제 행동) 사이의
'시너지'와 '충돌(버그)'을 찾아내고, '삶을 디버깅'하기 위한
구체적인 액션 플랜을 제시해야 한다.

[분석 단계]
1. **데이터 요약:**
   'Base Code'와 '주간 로그'의 핵심을 각각 한 문장으로 요약한다.

2. **패턴 분석 (Synergy):**
   이번 주 로그에서 'Base Code'의 성향과 '잘 맞는(시너지)'
   긍정적인 행동을 1~2가지 찾아라.
   왜 이것이 시너지인지 'Base Code'에 기반하여 설명하라.

3. **버그 탐지 (Conflict):**
   이번 주 로그에서 'Base Code'의 성향과 '충돌하는(버그)'
   행동 패턴을 1~2가지 찾아라.
   이것이 왜 문제인지 'Base Code'에 기반하여 논리적으로 설명하라.
   (예: "당신은 '계획 지향'인데, 실제로는 즉흥적으로 움직여 피로도가 높았다")

4. **디버깅 패치 (Action Plan):**
   탐지된 '버그'를 해결하고 '시너지'를 강화하기 위한
   '다음 주 액션 플랜'을 3가지 제안하라.
   각 플랜은 구체적이고 실행 가능해야 한다.
   (예: "매일 아침 10분 계획 시간 갖기" 같은 명확한 행동)

[출력 형식]
- 톤앤매너: '코작(Cozac)'의 톤으로, 논리적이고 명료하며,
  공감하되 냉철하게 '디버깅 리포트' 형식으로 작성하라.
- 'Base Code', 'Log', 'Bug', 'Synergy', 'Patch' 같은
  프로그래밍 용어를 적극 활용하라.
- 각 섹션을 명확히 구분하고, 불렛 포인트로 가독성을 높여라.

[제목 형식]
"🔍 Life Debugging Report | [분석 기간]"
```

**주요 기능:**

1. **분석 기간 선택**
   - 7일 (기본, 권장)
   - 14일
   - 30일
   - 선택 시 데이터 패킷 자동 재생성

2. **클립보드 복사**
   ```typescript
   async function copyToClipboard(text: string) {
     await navigator.clipboard.writeText(text);
     // 복사 성공 시 버튼 텍스트 변경
     // "데이터 복사" → "✅ 복사 완료!" (2초간)
   }
   ```

3. **리포트 저장**
   ```typescript
   const report: GeneratedReport = {
     id: `report-${Date.now()}`,
     createdAt: new Date().toISOString(),
     period: {
       start: '2025-10-18',
       end: '2025-10-24'
     },
     dataPacket: generatedDataPacket,
     promptVersion: 'v1.0'
   };

   saveGeneratedReport(report);
   // → generatedReports 배열에 추가
   ```

**경고 메시지:**
- 로그 5일 미만: "⚠️ 로그가 5일 미만이면 분석 정확도가 떨어질 수 있습니다."
- 로그 3일 미만: 리포트 생성 불가 (Daily Log에서 버튼 비활성화)

---

### 5.5 화면 4: 설정 (Settings)

**경로:** `/settings`

**목적:** Base Code 재평가, 데이터 백업/복구, 앱 설정

**UI 구성:**

```
┌─────────────────────────────────────┐
│ ← 돌아가기                           │
│                                     │
│ 설정                                 │
│                                     │
├─────────────────────────────────────┤
│ [섹션 1: Base Code 관리]             │
│                                     │
│ 현재 Base Code (v1.0, 7/15 생성):   │
│ • 에너지: 도전 지향                  │
│ • 결정: 논리 중심                    │
│ • 행동: 계획 지향                    │
│ • 가치: 성장 지향                    │
│ • 회복: 정적 방식                    │
│                                     │
│ [Base Code 재평가하기]               │
│                                     │
├─────────────────────────────────────┤
│ [섹션 2: 데이터 관리]                │
│                                     │
│ 📊 저장 공간 사용량: 1.2MB / 5MB    │
│ ████████░░░░░░░░ (24%)              │
│                                     │
│ [내 데이터 내보내기 (JSON)]          │
│ [데이터 가져오기]                    │
│                                     │
│ ⚠️ 중요: 데이터는 이 브라우저에만    │
│ 저장됩니다. 정기적으로 백업하세요!   │
│                                     │
├─────────────────────────────────────┤
│ [섹션 3: 위험 영역]                  │
│                                     │
│ [모든 데이터 삭제] (빨간색)          │
│                                     │
│ (클릭 시)                            │
│ ┌───────────────────────────────┐  │
│ │ 🚨 정말 모든 데이터 삭제?     │  │
│ │ 삭제되는 항목: Base Code,     │  │
│ │ 모든 로그, 리포트              │  │
│ │                               │  │
│ │ 삭제하려면 'DELETE' 입력:     │  │
│ │ ┌───────────────────────────┐│  │
│ │ │ [입력창]                  ││  │
│ │ └───────────────────────────┘│  │
│ │ [취소] [삭제]                 │  │
│ └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [섹션 4: 정보]                       │
│                                     │
│ 버전: v1.0                           │
│ 총 로그: 45개                        │
│ 최장 스트릭: 21일                    │
│ 첫 로그: 2025-07-16                 │
│ 마지막 백업: 2025-10-20             │
│                                     │
│ Made by Cozac (코작)                │
│ 인생을 코딩하는 작가                 │
└─────────────────────────────────────┘
```

**주요 기능:**

#### 1. Base Code 재평가
```typescript
function handleReassessBaseCode() {
  // 확인 모달
  if (confirm('현재 Base Code를 업데이트하시겠습니까?\n이전 버전은 이력에 저장됩니다.')) {
    // 현재 Base Code를 히스토리로 이동
    const currentBaseCode = loadAppData().baseCode;
    if (currentBaseCode) {
      baseCodeHistory.push({
        ...currentBaseCode,
        archivedAt: new Date().toISOString()
      });
    }

    // Base Code 정의 화면으로 이동
    navigate('/base-code');
  }
}
```

#### 2. 데이터 내보내기 (백업)
```typescript
function handleExportData() {
  // 전체 데이터 가져오기
  const jsonData = exportDataAsJSON();

  // Blob 생성
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // 다운로드 링크 생성
  const link = document.createElement('a');
  link.href = url;
  link.download = `cozac-life-debugger-backup-${today}.json`;

  // 클릭 시뮬레이션
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // 백업 날짜 업데이트
  updateLastBackupDate();

  alert('✅ 데이터가 다운로드되었습니다!');
}
```

**백업 파일 형식:**
```json
{
  "version": "1.0",
  "isFirstVisit": false,
  "baseCode": { ... },
  "baseCodeHistory": [ ... ],
  "dailyLogs": [ ... ],
  "generatedReports": [ ... ],
  "settings": { ... },
  "metadata": { ... }
}
```

#### 3. 데이터 가져오기 (복구)
```typescript
function handleImportData() {
  // 파일 선택 다이얼로그
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonString = event.target.result;

      // 확인
      const confirmed = confirm(
        '⚠️ 현재 데이터를 백업 파일로 덮어쓰시겠습니까?\n' +
        '현재 데이터는 삭제됩니다.'
      );

      if (confirmed) {
        // 데이터 유효성 검증
        const success = importDataFromJSON(jsonString);

        if (success) {
          alert('✅ 데이터를 가져왔습니다! 페이지를 새로고침합니다.');
          window.location.reload();
        } else {
          alert('❌ 잘못된 파일 형식입니다.');
        }
      }
    };

    reader.readAsText(file);
  };

  input.click();
}
```

#### 4. 모든 데이터 삭제
```typescript
function handleDeleteAllData() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  function executeDelete() {
    // 확인 텍스트 검증
    if (confirmText !== 'DELETE') {
      alert('삭제하려면 "DELETE"를 정확히 입력해주세요.');
      return;
    }

    // 모든 데이터 삭제
    clearAllData();

    alert('✅ 모든 데이터가 삭제되었습니다.');

    // 홈으로 이동 (온보딩부터 다시 시작)
    window.location.href = '/';
  }
}
```

#### 5. 저장 공간 표시
```typescript
function getStorageSize(): number {
  const data = localStorage.getItem('cozac-life-debugger');
  if (!data) return 0;
  return new Blob([data]).size; // bytes
}

function getStorageSizeMB(): string {
  const bytes = getStorageSize();
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2); // "1.23"
}

// localStorage 제한: 5-10MB (브라우저마다 다름)
// 예상 사용량: 1년 로그 = ~180KB
```

---

## 6. 데이터 구조

### 6.1 전체 데이터 스키마

```typescript
interface AppData {
  version: string;              // "1.0"
  isFirstVisit: boolean;        // true → 온보딩, false → 메인
  baseCode?: BaseCode;          // 초기 설정값
  baseCodeHistory: BaseCodeHistory[];  // 재평가 이력
  dailyLogs: DailyLog[];        // 일별 로그
  generatedReports: GeneratedReport[];  // 생성된 리포트
  settings: Settings;           // 앱 설정
  metadata: Metadata;           // 통계 메타데이터
}
```

### 6.2 Base Code 구조

```typescript
interface BaseCode {
  version: string;              // "1.0", "2.0", ...
  createdAt: string;            // ISO 8601 날짜
  lastUpdatedAt?: string;       // 마지막 수정 날짜
  energy: 'A' | 'B';            // A: 도전, B: 안정
  decision: 'A' | 'B';          // A: 논리, B: 공감
  action: 'A' | 'B';            // A: 실행, B: 계획
  value: 'A' | 'B';             // A: 성장, B: 균형
  recovery: 'A' | 'B';          // A: 활동, B: 정적
}

// 예시
{
  "version": "1.0",
  "createdAt": "2025-07-15T10:00:00.000Z",
  "energy": "A",     // 도전 지향
  "decision": "A",   // 논리 중심
  "action": "B",     // 계획 지향
  "value": "A",      // 성장 지향
  "recovery": "B"    // 정적 방식
}
```

### 6.3 Daily Log 구조

```typescript
interface DailyLog {
  date: string;                 // "YYYY-MM-DD"
  energy: number;               // 1-5
  activity: ActivityType;       // 7가지 중 1개
  emotion: EmotionType;         // 6가지 이모지 중 1개
  note?: string;                // 선택적 메모
  createdAt: string;            // ISO 8601 날짜
}

type ActivityType =
  | '업무'
  | '공부'
  | '운동'
  | '관계'
  | '휴식'
  | '창작'
  | '기타';

type EmotionType =
  | '🔥'  // 열정/의욕
  | '💡'  // 영감/깨달음
  | '😊'  // 만족/기쁨
  | '😐'  // 평온/무난
  | '😥'  // 피로/우울
  | '🤯'; // 혼란/스트레스

// 예시
{
  "date": "2025-10-24",
  "energy": 3,
  "activity": "업무",
  "emotion": "😊",
  "note": "기획안 통과",
  "createdAt": "2025-10-24T21:30:00.000Z"
}
```

### 6.4 Generated Report 구조

```typescript
interface GeneratedReport {
  id: string;                   // "report-1729800000000"
  createdAt: string;            // ISO 8601 날짜
  period: {
    start: string;              // "YYYY-MM-DD"
    end: string;                // "YYYY-MM-DD"
  };
  dataPacket: string;           // 생성된 데이터 패킷 전문
  promptVersion: string;        // "v1.0"
}

// 예시
{
  "id": "report-1729800000000",
  "createdAt": "2025-10-24T15:00:00.000Z",
  "period": {
    "start": "2025-10-18",
    "end": "2025-10-24"
  },
  "dataPacket": "[분석 요청 데이터]\n\n1. 나의 'Base Code':\n...",
  "promptVersion": "v1.0"
}
```

### 6.5 Metadata 구조

```typescript
interface Metadata {
  totalLogs: number;            // 총 로그 개수
  currentStreak: number;        // 현재 연속 기록일
  longestStreak: number;        // 최장 스트릭
  firstLogDate?: string;        // 첫 로그 날짜
  lastBackupDate?: string;      // 마지막 백업 날짜
}

// 예시
{
  "totalLogs": 45,
  "currentStreak": 7,
  "longestStreak": 21,
  "firstLogDate": "2025-07-16",
  "lastBackupDate": "2025-10-20"
}
```

### 6.6 localStorage 저장 예시

```javascript
// localStorage['cozac-life-debugger']
{
  "version": "1.0",
  "isFirstVisit": false,

  "baseCode": {
    "version": "1.0",
    "createdAt": "2025-07-15T10:00:00.000Z",
    "energy": "A",
    "decision": "A",
    "action": "B",
    "value": "A",
    "recovery": "B"
  },

  "baseCodeHistory": [
    {
      "version": "0.9",
      "createdAt": "2025-07-15T10:00:00.000Z",
      "archivedAt": "2025-10-15T14:00:00.000Z",
      "energy": "B",
      "decision": "A",
      "action": "B",
      "value": "B",
      "recovery": "B"
    }
  ],

  "dailyLogs": [
    {
      "date": "2025-10-24",
      "energy": 3,
      "activity": "업무",
      "emotion": "😊",
      "note": "기획안 통과",
      "createdAt": "2025-10-24T21:30:00.000Z"
    },
    {
      "date": "2025-10-23",
      "energy": 2,
      "activity": "업무",
      "emotion": "🤯",
      "note": "마감 임박",
      "createdAt": "2025-10-23T22:00:00.000Z"
    }
    // ... more logs
  ],

  "generatedReports": [
    {
      "id": "report-1729800000000",
      "createdAt": "2025-10-24T15:00:00.000Z",
      "period": {
        "start": "2025-10-18",
        "end": "2025-10-24"
      },
      "dataPacket": "...",
      "promptVersion": "v1.0"
    }
  ],

  "settings": {
    "notifications": {
      "enabled": false,
      "time": "21:00"
    },
    "promptVersion": "v1.0"
  },

  "metadata": {
    "totalLogs": 45,
    "currentStreak": 7,
    "longestStreak": 21,
    "firstLogDate": "2025-07-16",
    "lastBackupDate": "2025-10-20"
  }
}
```

---

## 7. 핵심 기능

### 7.1 스트릭 시스템 (Streak)

**목적:** 로그 작성 독려 및 게이미피케이션

**표시 위치:**
- Daily Log 화면 상단 헤더 (🔥 7일)
- 스트릭 카드 ("연속 기록 7일!")

**계산 로직:**
```typescript
function calculateCurrentStreak(logs: DailyLog[]): number {
  if (logs.length === 0) return 0;

  // 날짜순 정렬 (최신 → 과거)
  const sortedLogs = [...logs].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  let currentDate = new Date(today);

  for (const log of sortedLogs) {
    const logDate = new Date(log.date);
    const diffDays = Math.floor(
      (currentDate.getTime() - logDate.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    // diffDays === streak: 연속됨
    if (diffDays === streak) {
      streak++;
    }
    // diffDays > streak: 끊김
    else if (diffDays > streak) {
      break;
    }
  }

  return streak;
}
```

**예시:**
```
오늘: 10/24
로그: 10/24, 10/23, 10/22, 10/21, 10/20

10/24: diffDays = 0, streak = 0 → 일치, streak = 1
10/23: diffDays = 1, streak = 1 → 일치, streak = 2
10/22: diffDays = 2, streak = 2 → 일치, streak = 3
10/21: diffDays = 3, streak = 3 → 일치, streak = 4
10/20: diffDays = 4, streak = 4 → 일치, streak = 5

→ 현재 스트릭: 5일
```

**끊어진 경우:**
```
오늘: 10/24
로그: 10/24, 10/23, 10/21 (10/22 없음), 10/20

10/24: diffDays = 0, streak = 0 → 일치, streak = 1
10/23: diffDays = 1, streak = 1 → 일치, streak = 2
10/21: diffDays = 3, streak = 2 → 불일치 (diffDays > streak)

→ 현재 스트릭: 2일 (10/22에 끊김)
```

### 7.2 주간/월간 완성도

**주간 완성도:**
```typescript
function getWeeklyCompletion() {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6);  // 7일 전

  const weekStart = weekAgo.toISOString().split('T')[0];
  const weekEnd = today.toISOString().split('T')[0];

  const logsThisWeek = getDailyLogsByPeriod(weekStart, weekEnd);

  return {
    completed: logsThisWeek.length,  // 5
    total: 7                          // 7
  };
}

// 표시: "이번 주 5/7일"
```

**월간 완성도:**
```typescript
function getMonthlyCompletion() {
  const today = new Date();
  const monthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toISOString().split('T')[0];

  const monthEnd = today.toISOString().split('T')[0];

  const logsThisMonth = getDailyLogsByPeriod(monthStart, monthEnd);
  const daysInMonth = today.getDate();

  return {
    completed: logsThisMonth.length,  // 15
    total: daysInMonth                // 24
  };
}

// 표시: "이번 달 15/24일"
```

### 7.3 데이터 백업/복구

**백업 (내보내기):**
```typescript
// 1. 전체 데이터 JSON으로 변환
const jsonData = JSON.stringify(loadAppData(), null, 2);

// 2. Blob 생성
const blob = new Blob([jsonData], { type: 'application/json' });

// 3. 다운로드 URL 생성
const url = URL.createObjectURL(blob);

// 4. <a> 태그로 다운로드 트리거
const link = document.createElement('a');
link.href = url;
link.download = `cozac-life-debugger-backup-${날짜}.json`;
link.click();

// 5. 정리
URL.revokeObjectURL(url);
```

**복구 (가져오기):**
```typescript
// 1. 파일 선택
const input = document.createElement('input');
input.type = 'file';
input.accept = '.json';

input.onchange = (e) => {
  const file = e.target.files[0];

  // 2. 파일 읽기
  const reader = new FileReader();
  reader.onload = (event) => {
    const jsonString = event.target.result;

    try {
      // 3. JSON 파싱
      const data = JSON.parse(jsonString);

      // 4. 유효성 검증
      if (!data.version || !Array.isArray(data.dailyLogs)) {
        throw new Error('Invalid format');
      }

      // 5. localStorage에 저장
      localStorage.setItem('cozac-life-debugger', jsonString);

      // 6. 페이지 새로고침
      window.location.reload();
    } catch (error) {
      alert('❌ 잘못된 파일 형식입니다.');
    }
  };

  reader.readAsText(file);
};

input.click();
```

### 7.4 클립보드 복사

**Clipboard API 사용:**
```typescript
async function copyToClipboard(
  text: string,
  type: 'data' | 'prompt'
) {
  try {
    // HTTPS 필수!
    await navigator.clipboard.writeText(text);

    // 성공 피드백
    if (type === 'data') {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  } catch (error) {
    // Fallback: 수동 복사 안내
    alert(
      '복사에 실패했습니다.\n' +
      '텍스트를 수동으로 선택해서 복사해주세요.\n' +
      '(Ctrl+C 또는 Cmd+C)'
    );
  }
}
```

**Fallback (구형 브라우저):**
```typescript
function copyToClipboardFallback(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    alert('✅ 복사 완료!');
  } catch (error) {
    alert('❌ 복사 실패');
  }

  document.body.removeChild(textarea);
}
```

### 7.5 날짜 네비게이션

**날짜 변경:**
```typescript
const [currentDate, setCurrentDate] = useState(
  new Date().toISOString().split('T')[0]
);

function handleDateChange(offset: number) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + offset);
  setCurrentDate(date.toISOString().split('T')[0]);
}

// ← 버튼: handleDateChange(-1)
// → 버튼: handleDateChange(1)
```

**과거 로그 자동 로드:**
```typescript
useEffect(() => {
  const log = getDailyLog(currentDate);

  if (log) {
    // 기존 로그 불러오기
    setEnergy(log.energy);
    setActivity(log.activity);
    setEmotion(log.emotion);
    setNote(log.note || '');
  } else {
    // 새 날짜: 기본값
    setEnergy(3);
    setActivity('');
    setEmotion('');
    setNote('');
  }
}, [currentDate]);
```

**미래 날짜 비활성화:**
```typescript
<button
  onClick={() => handleDateChange(1)}
  disabled={currentDate >= new Date().toISOString().split('T')[0]}
  className="... disabled:opacity-30 disabled:cursor-not-allowed"
>
  →
</button>
```

---

## 8. 사용자 플로우

### 8.1 첫 방문 유저 (신규 가입)

```
[앱 접속]
    ↓
localStorage 체크: isFirstVisit = true
    ↓
[화면 0: 온보딩]
"Cozac's Life Debugger에 오신 것을 환영합니다"
- 서비스 소개
- 3단계 프로세스 설명
- [Base Code 정의하러 가기] 버튼
    ↓
클릭: markFirstVisitComplete()
isFirstVisit = false 저장
    ↓
[화면 1: Base Code 정의]
5가지 질문에 답변
Q1. 에너지 방향
Q2. 의사 결정
Q3. 행동 방식
Q4. 핵심 가치
Q5. 회복 방식
    ↓
마지막 질문 후 자동 저장
saveBaseCode({ energy: 'A', ... })
    ↓
"✅ Base Code가 저장되었습니다!"
    ↓
[화면 2: Daily Log] (메인 화면)
"오늘의 로그를 작성해보세요"
- 에너지 레벨 선택
- 활동 선택
- 감정 선택
- 한 줄 메모 (선택)
    ↓
[로그 저장하기] 클릭
saveDailyLog({ date, energy, activity, emotion, note })
    ↓
"✅ 로그 저장 완료!"
스트릭 1일 시작! 🔥 1일
```

### 8.2 기존 유저 (로그 작성)

```
[Day 1]
앱 접속
  ↓
localStorage 체크:
  isFirstVisit = false
  baseCode 존재
  ↓
[화면 2: Daily Log] 바로 진입
  ↓
오늘 날짜 로그 작성
- 에너지: 3
- 활동: 업무
- 감정: 🤯
- 메모: "프로젝트 마감"
  ↓
[로그 저장]
  ↓
스트릭: 🔥 1일
주간 완성도: 1/7일

---

[Day 2]
앱 접속
  ↓
[화면 2: Daily Log]
  ↓
어제 로그 미리보기 (향후 기능)
"💡 어제는 에너지 3/5, 업무, 스트레스"
  ↓
오늘 로그 작성
- 에너지: 2
- 활동: 업무
- 감정: 😥
- 메모: "야근"
  ↓
[로그 저장]
  ↓
스트릭: 🔥 2일
주간 완성도: 2/7일

---

[Day 3-7]
동일하게 매일 로그 작성
  ↓
스트릭: 🔥 7일
주간 완성도: 7/7일

---

[Day 7 (일요일)]
앱 접속
  ↓
[화면 2: Daily Log]
  ↓
하단 버튼 활성화됨
"📊 이번 주 AI 분석 받기 (로그 7일)"
  ↓
[클릭]
  ↓
[화면 3: 디버깅 리포트 생성]
  ↓
분석 기간: ⦿ 최근 7일 (권장)
  ↓
자동 생성:
[1번 재료] 데이터 패킷
[2번 재료] Cozac's Master Prompt
  ↓
[데이터 복사] 클릭
"✅ 복사 완료!"
  ↓
[프롬프트 복사] 클릭
"✅ 복사 완료!"
  ↓
ChatGPT 앱/웹 접속 (앱 외부)
  ↓
1번 붙여넣기 (Ctrl+V)
Shift+Enter (줄바꿈)
2번 붙여넣기
Enter (전송)
  ↓
ChatGPT 분석 리포트 수령:
"🔍 Life Debugging Report | 10/18-10/24

**Bug 발견:**
당신은 '계획 지향'인데, 실제로는
즉흥적으로 일처리하며 스트레스가
높았습니다.

**Patch 제안:**
1. 매일 아침 10분 계획 시간 갖기
2. 업무 전 우선순위 3가지만 정하기
3. 주 2회 운동 스케줄 고정하기"
  ↓
분석 내용 확인 및 다음 주 실천!
  ↓
(선택) 앱으로 돌아와서
[이 리포트 저장하기] 클릭
  ↓
"✅ 리포트가 저장되었습니다!"
```

### 8.3 기존 유저 (설정 관리)

```
[정기 백업]
앱 접속
  ↓
우상단 ⚙️ 클릭
  ↓
[화면 4: 설정]
  ↓
[섹션 2: 데이터 관리]
  ↓
[내 데이터 내보내기 (JSON)] 클릭
  ↓
파일 다운로드:
cozac-life-debugger-backup-2025-10-24.json
  ↓
안전한 장소에 보관
(Google Drive, iCloud, USB 등)

---

[3개월 후 - Base Code 재평가]
앱 접속
  ↓
Daily Log 상단 배너 (향후 기능):
"📅 3개월이 지났습니다!
Base Code를 재평가해보세요."
  ↓
[재평가하기] 클릭
  ↓
확인 모달:
"현재 Base Code를 업데이트하시겠습니까?
이전 버전은 이력에 저장됩니다."
  ↓
[업데이트] 클릭
  ↓
[화면 1: Base Code 정의]
5가지 질문 다시 답변
  ↓
저장 시:
- 현재 Base Code → baseCodeHistory 이동
- 새 Base Code → baseCode로 저장
  ↓
Settings에서 변화 이력 확인 가능:
"v1.0 (7월) → v2.0 (10월)
- 에너지: 안정 지향 → 도전 지향
- 회복: 활동적 → 정적"

---

[브라우저/기기 변경]
새 브라우저/기기에서 앱 접속
  ↓
데이터 없음 (localStorage는 기기별 독립)
  ↓
온보딩부터 시작하거나
  ↓
⚙️ 설정 → [데이터 가져오기]
  ↓
백업 JSON 파일 선택
  ↓
확인 모달:
"현재 데이터를 덮어쓰시겠습니까?"
  ↓
[덮어쓰기] 클릭
  ↓
데이터 복구 완료!
페이지 새로고침
  ↓
모든 로그, Base Code, 리포트 복구됨
```

---

## 9. 배포 및 운영

### 9.1 Netlify 배포

**설정 파일: `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

**배포 방법 1: GitHub 연동 (추천)**

```
1. GitHub에 코드 푸시
2. Netlify 대시보드 접속
   https://app.netlify.com/
3. [Add new site] → [Import from Git]
4. GitHub 연결 및 저장소 선택
5. 브랜치 선택:
   claude/life-debugger-planning-011CURvdbRfZquqUUcyhNEGk
6. 빌드 설정 확인 (자동 감지됨):
   - Build command: npm run build
   - Publish directory: dist
7. [Deploy site] 클릭
8. 3-5분 대기
9. 배포 완료!
   → https://[random-name].netlify.app
```

**배포 방법 2: Netlify CLI**

```bash
# 1. Netlify CLI 설치
npm install -g netlify-cli

# 2. 로그인
netlify login

# 3. 프로덕션 배포
netlify deploy --prod

# 또는 수동 빌드 후 배포
npm run build
netlify deploy --dir=dist --prod
```

### 9.2 커스텀 도메인 (lifecode)

**DNS 설정:**

```
Type: CNAME
Name: lifecode
Value: [your-netlify-site].netlify.app
TTL: Auto (또는 3600)
```

**예시:**
```
lifecode.yourdomain.com → cozac-lifecode.netlify.app
```

**HTTPS 자동 설정:**
- Netlify가 Let's Encrypt로 자동 발급
- 10-30분 소요
- 이후 `https://lifecode.yourdomain.com` 접속 가능

### 9.3 환경 변수

**현재:** 환경 변수 없음 (100% 클라이언트 사이드)

**향후 (AI 직접 통합 시):**
```bash
# Netlify 환경 변수 설정
# (유저가 직접 입력하므로 불필요할 수도 있음)

VITE_OPENAI_API_KEY=sk-...  # (보안상 권장하지 않음)
```

### 9.4 성능 최적화

**Netlify 자동 최적화:**
- ✅ Gzip/Brotli 압축
- ✅ CDN 캐싱 (전 세계)
- ✅ Asset Minification
- ✅ HTTP/2

**추가 최적화 (향후):**
- 이미지 WebP 변환
- Service Worker (PWA)
- 코드 스플리팅
- Tree Shaking (이미 적용됨)

### 9.5 모니터링

**Netlify Analytics (유료, $9/월):**
- 서버 사이드 분석
- 광고 차단기 우회
- 실시간 트래픽

**Google Analytics (무료):**
```html
<!-- index.html에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**에러 추적 (선택):**
- Sentry
- LogRocket
- (현재는 불필요 - 클라이언트 사이드만)

---

## 10. 향후 계획

### 10.1 Phase 2: 핵심 기능 강화 (v1.1)

**예상 기간:** 1-2주

#### 우선순위 1: 과거 리포트 보기
- 화면 6 추가
- 생성된 리포트 목록 표시
- 리포트 상세 보기 모달
- 데이터 재복사 기능
- 리포트 삭제 기능

#### 우선순위 2: 어제 로그 미리보기
- Daily Log 상단에 어제 요약
- [오늘도 비슷해요] 버튼
- 어제 값 자동 입력

#### 우선순위 3: 캘린더 뷰
- 월간 캘린더 표시
- 로그 작성일 표시 (🟢/⚪)
- 날짜 클릭으로 로그 편집

#### 우선순위 4: 브라우저 알림
- 알림 권한 요청
- 매일 저녁 리마인더
- Settings에서 시간 설정

### 10.2 Phase 3: 고급 기능 (v1.2)

**예상 기간:** 2-3주

#### 통계/데이터 시각화 ⭐⭐⭐⭐⭐
- 화면 5: Statistics 추가
- Chart.js 또는 Recharts 사용
- 3가지 차트:
  1. 에너지 추이 (Line Chart)
  2. 활동 비중 (Pie Chart)
  3. 감정 빈도 (Bar Chart)
- 주요 인사이트 카드
- 기간 선택 (7/30/90일/전체)

#### Base Code 재평가 시스템
- 3개월마다 재평가 제안
- Base Code 변화 이력 표시
- 타임라인 시각화

#### 프롬프트 버전 관리
- 여러 프롬프트 제공:
  - v1.0: 표준 (현재)
  - v1.1: 간결한 버전
  - v1.2: 상세한 버전
- Settings에서 선택 가능
- 새 버전 출시 알림

### 10.3 Phase 4: 프로페셔널 기능 (v2.0)

**예상 기간:** 3-4주

#### PWA (Progressive Web App) ⭐⭐⭐⭐⭐
- 홈 화면에 추가
- 오프라인 지원
- 앱 아이콘, 스플래시 스크린
- 더 강력한 푸시 알림
- Service Worker 구현

#### AI 직접 통합 (유료 옵션)
- OpenAI API 연동
- 유저가 API 키 입력
- 앱 내에서 리포트 직접 생성
- 로딩 스피너, 에러 처리

#### 다크 모드
- 라이트/다크/시스템 설정
- Tailwind dark: 클래스
- 전체 색상 테마 전환

#### 다국어 지원 (영어)
- react-i18next
- 한국어/영어 전환
- 모든 텍스트 번역

#### 리포트 SNS 공유
- html2canvas로 이미지 변환
- 개인정보 마스킹
- Web Share API 연동
- 워터마크 추가

### 10.4 Phase 5: 엔터프라이즈 (v3.0)

**예상 기간:** 2-3개월

#### 팀/그룹 모드
- 서버 필요 (최초)
- 팀 단위 디버깅
- 관리자 대시보드

#### 코칭 세션 연동
- 라이프 코치와 리포트 공유
- 세션 스케줄링

#### 프리미엄 프롬프트 마켓
- 전문가 제작 프롬프트 판매
- 분야별 프롬프트 (업무/관계/건강)

#### 구독 모델
- 프리미엄: $4.99/월
- 엔터프라이즈: $49/월
- 결제 시스템 통합

### 10.5 개발 우선순위 요약

| Phase | 기능 | 난이도 | 유저 가치 | 예상 기간 |
|-------|------|--------|----------|----------|
| v1.1 | 과거 리포트 보기 | ⭐⭐ | ⭐⭐⭐⭐⭐ | 2일 |
| v1.1 | 어제 로그 미리보기 | ⭐ | ⭐⭐⭐ | 1일 |
| v1.1 | 캘린더 뷰 | ⭐⭐⭐ | ⭐⭐⭐⭐ | 3일 |
| v1.2 | 통계/시각화 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 4-5일 |
| v1.2 | Base Code 재평가 | ⭐⭐⭐ | ⭐⭐⭐ | 2일 |
| v1.2 | 프롬프트 버전 관리 | ⭐⭐ | ⭐⭐⭐ | 1일 |
| v2.0 | PWA 변환 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 3일 |
| v2.0 | AI 직접 통합 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 5일 |
| v2.0 | 다크 모드 | ⭐⭐⭐ | ⭐⭐⭐ | 3일 |

---

## 📚 관련 문서

- **PLANNING.md** - 프로젝트 기획안 v2.0
- **FEATURE_ROADMAP.md** - 추가 기능 로드맵
- **DEPLOYMENT.md** - Netlify 배포 가이드
- **PR_BODY.md** - Pull Request 템플릿
- **CREATE_PR_GUIDE.md** - PR 생성 가이드

---

## 🎊 결론

**Cozac's Life Debugger**는 프로그래밍 개념을 삶에 적용한 혁신적인 자기 성찰 도구입니다.

### 핵심 강점
1. ✅ **완벽한 프라이버시** (100% 로컬 저장)
2. ✅ **운영 비용 0원** (서버 없음)
3. ✅ **AI 활용 극대화** (전문 프롬프트 제공)
4. ✅ **독보적인 브랜딩** ('디버깅' 컨셉)
5. ✅ **모바일 최적화** (터치 타겟 48px+)
6. ✅ **가벼운 번들** (87KB gzip)

### 다음 단계
1. **Netlify 배포** → https://lifecode.yourdomain.com
2. **베타 테스터 모집** (10-20명)
3. **피드백 수집** (1주일)
4. **Phase 2 개발 시작** (과거 리포트, 캘린더, 통계)
5. **마케팅 시작** (#라이프디버깅챌린지)

---

**문서 작성일:** 2025-10-24
**버전:** Complete Guide v1.0
**작성자:** Claude Code
