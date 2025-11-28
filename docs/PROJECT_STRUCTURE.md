# 📂 프로젝트 구조 가이드

이 문서는 강점진단 프로젝트의 전체 구조를 설명합니다.

## 🗂️ 디렉토리 구조

```
resumanager-b2c-test/
├── 📱 app/                      # Next.js App Router
│   ├── page.tsx                # 랜딩 페이지
│   ├── layout.tsx              # 루트 레이아웃
│   ├── globals.css             # 글로벌 스타일
│   ├── signup/                 # 회원가입 페이지
│   ├── login/                  # 로그인 페이지
│   ├── test/                   # 진단 테스트
│   │   ├── page.tsx           # 테스트 메인
│   │   ├── start/             # 테스트 시작
│   │   └── result/            # 결과 페이지
│   │       ├── page.tsx       # 결과 화면
│   │       └── print/         # PDF 출력
│   └── api/                    # API Routes
│       └── send-email/         # 이메일 전송 API
│
├── 🧩 components/               # 재사용 가능한 컴포넌트
│
├── 📚 lib/                      # 유틸리티 & 라이브러리
│   ├── supabase/               # Supabase 클라이언트
│   │   ├── client.ts          # 클라이언트 사이드
│   │   └── server.ts          # 서버 사이드
│   └── types/                  # TypeScript 타입 정의
│       ├── database.types.ts  # DB 타입
│       └── index.ts           # 공통 타입
│
├── 📊 data/                     # 정적 데이터
│   ├── questions.json         # 진단 질문 (현재 사용)
│   ├── questions-improved.json # 개선된 질문 (예비)
│   └── personalities.json     # 12가지 성향 정보
│
├── 📖 docs/                     # 프로젝트 문서
│   ├── README.md              # 문서 인덱스
│   ├── PROJECT_COMPLETE.md    # 프로젝트 완료 가이드
│   ├── PROJECT_STRUCTURE.md   # 이 파일
│   ├── SUPABASE_SETUP.md      # Supabase 설정
│   ├── RESEND_SETUP.md        # Resend 설정
│   ├── VERCEL_DEPLOY.md       # 배포 가이드
│   ├── PDF_DESIGN_GUIDE.md    # PDF 디자인
│   ├── QUESTIONS_EDIT_GUIDE.md # 질문 편집
│   └── QUESTIONS_LIST.md      # 질문 목록
│
├── 🔧 scripts/                  # 유틸리티 스크립트
│   └── update-questions.js    # 질문 업데이트 스크립트
│
├── ⚙️ .vscode/                  # VS Code 설정
│   ├── settings.json          # 에디터 설정
│   ├── extensions.json        # 권장 확장 프로그램
│   └── workspace.code-workspace # 워크스페이스 설정
│
├── 📄 설정 파일
│   ├── .env.example           # 환경변수 템플릿
│   ├── .env.local             # 환경변수 (gitignore)
│   ├── .editorconfig          # 코드 스타일 설정
│   ├── .gitignore             # Git 제외 파일
│   ├── next.config.js         # Next.js 설정
│   ├── tailwind.config.ts     # Tailwind CSS 설정
│   ├── postcss.config.js      # PostCSS 설정
│   ├── tsconfig.json          # TypeScript 설정
│   ├── package.json           # 프로젝트 의존성
│   ├── package-lock.json      # 의존성 잠금 파일
│   └── middleware.ts          # Next.js 미들웨어 (인증)
│
└── 📖 README.md                 # 프로젝트 메인 문서
```

## 📱 주요 페이지 구조

### 1. 랜딩 페이지 (`/`)
- 파일: `app/page.tsx`
- 기능: 서비스 소개, 테스트 시작 버튼

### 2. 회원가입 (`/signup`)
- 파일: `app/signup/page.tsx`
- 기능: 이메일 회원가입

### 3. 로그인 (`/login`)
- 파일: `app/login/page.tsx`
- 기능: 이메일 로그인

### 4. 진단 테스트 (`/test`)
- 파일: `app/test/page.tsx`
- 기능: 테스트 진행 중 상태 확인

### 5. 테스트 시작 (`/test/start`)
- 파일: `app/test/start/page.tsx`
- 기능: 25-30개 질문 진행

### 6. 결과 페이지 (`/test/result`)
- 파일: `app/test/result/page.tsx`
- 기능: Top 2 성향 분석 결과 표시

### 7. PDF 출력 (`/test/result/print`)
- 파일: `app/test/result/print/page.tsx`
- 기능: PDF 보고서 생성 및 이메일 전송

## 🔌 API 라우트

### POST `/api/send-email`
- 파일: `app/api/send-email/route.ts`
- 기능: Resend를 통한 PDF 이메일 전송
- 요청: `{ email, pdfUrl, userName }`
- 응답: `{ success: boolean, messageId?: string }`

## 🗄️ 데이터 구조

### questions.json
```json
{
  "questions": [
    {
      "id": 1,
      "text": "질문 내용",
      "category": "성향 카테고리"
    }
  ]
}
```

### personalities.json
```json
{
  "personalities": {
    "성향명": {
      "name": "성향 이름",
      "description": "설명",
      "strengths": ["강점1", "강점2"],
      "careers": ["직업1", "직업2"]
    }
  }
}
```

## 🔐 인증 흐름

1. 사용자가 `/signup` 또는 `/login`에서 인증
2. Supabase Auth가 세션 생성
3. `middleware.ts`가 보호된 라우트 접근 제어
4. 클라이언트는 `lib/supabase/client.ts` 사용
5. 서버 컴포넌트는 `lib/supabase/server.ts` 사용

## 📝 개발 워크플로우

### 새로운 기능 추가
1. `app/` 폴더에 새 라우트 생성
2. 필요시 `components/`에 재사용 컴포넌트 추가
3. 타입 정의는 `lib/types/`에 추가
4. API가 필요하면 `app/api/`에 추가

### 질문 수정
1. `data/questions.json` 직접 수정, 또는
2. `scripts/update-questions.js` 스크립트 사용
3. 자세한 내용은 [QUESTIONS_EDIT_GUIDE.md](./QUESTIONS_EDIT_GUIDE.md) 참고

### 스타일 수정
- 글로벌 스타일: `app/globals.css`
- Tailwind 설정: `tailwind.config.ts`
- 컴포넌트별 스타일: Tailwind 클래스 사용

## 🚀 배포 구조

### Vercel 배포
- 자동 배포: `main` 브랜치 푸시 시
- 환경변수: Vercel 대시보드에서 설정
- 자세한 내용: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

### 환경 분리
- 개발: `http://localhost:3000`
- 프로덕션: Vercel 도메인

## 💡 파일 명명 규칙

### Next.js App Router 규칙
- `page.tsx`: 라우트 페이지
- `layout.tsx`: 레이아웃
- `route.ts`: API 라우트
- `loading.tsx`: 로딩 UI
- `error.tsx`: 에러 UI

### 일반 규칙
- 컴포넌트: PascalCase (예: `TestCard.tsx`)
- 유틸리티: camelCase (예: `formatDate.ts`)
- 타입: PascalCase (예: `User`, `TestResult`)
- 상수: UPPER_SNAKE_CASE (예: `MAX_QUESTIONS`)

## 🔍 주요 파일 설명

### middleware.ts
- Next.js 미들웨어
- 인증이 필요한 라우트 보호
- `/test/*` 경로 접근 제어

### next.config.js
- Next.js 설정
- 이미지 최적화
- 환경변수 설정

### tailwind.config.ts
- Tailwind CSS 설정
- DaisyUI 테마 설정
- 커스텀 색상 및 폰트

### tsconfig.json
- TypeScript 컴파일러 설정
- 경로 별칭 (`@/`)
- 타입 체크 옵션

## 📦 주요 의존성

### 프레임워크
- `next`: 14.x - React 프레임워크
- `react`: 18.x - UI 라이브러리
- `typescript`: 5.x - 타입 시스템

### UI
- `tailwindcss`: 3.x - CSS 프레임워크
- `daisyui`: 4.x - UI 컴포넌트

### 백엔드 서비스
- `@supabase/supabase-js`: 2.x - 데이터베이스 & 인증
- `resend`: 3.x - 이메일 전송

### 유틸리티
- `react-to-print`: 2.x - PDF 생성
- `jspdf`: 2.x - PDF 라이브러리 (대체 옵션)

## 🎯 다음 단계

프로젝트 구조를 이해했다면:
1. [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)로 전체 기능 파악
2. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)로 데이터베이스 설정
3. 개발 시작! 🚀






