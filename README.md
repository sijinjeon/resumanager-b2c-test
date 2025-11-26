# 강점진단 간소화 버전

비개발자와 AI가 함께 만드는 강점진단 서비스

## 🎯 프로젝트 개요

- **목적**: 25-30개 질문으로 12가지 성향을 진단하는 간소화 버전
- **기술 스택**: Next.js 14 + TypeScript + Tailwind CSS + Supabase
- **기능**:
  - 이메일 회원가입/로그인
  - 강점진단 테스트 (25-30문항)
  - 결과 분석 (12가지 성향 중 Top 2)
  - PDF 보고서 생성
  - 이메일로 PDF 전송
  - 랜딩 페이지

## 🚀 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사하여 `.env.local`을 만들고 필요한 값을 입력하세요.

```bash
cp .env.example .env.local
```

그런 다음 `.env.local` 파일을 열어 실제 값을 입력하세요:
- Supabase 설정: [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md) 참고
- Resend 설정: [docs/RESEND_SETUP.md](./docs/RESEND_SETUP.md) 참고

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

## 📁 프로젝트 구조

```
resumanager-b2c-test/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 랜딩 페이지
│   ├── signup/            # 회원가입
│   ├── login/             # 로그인
│   ├── test/              # 진단 테스트
│   │   ├── start/         # 테스트 시작
│   │   └── result/        # 결과 페이지 & PDF 출력
│   └── api/               # API Routes
│       └── send-email/    # 이메일 전송 API
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸리티 함수
│   ├── supabase/         # Supabase 클라이언트
│   └── types/            # TypeScript 타입 정의
├── data/                  # 질문/성향 데이터
│   ├── questions.json    # 진단 질문
│   └── personalities.json # 성향 정보
├── docs/                  # 📚 프로젝트 문서
├── scripts/               # 유틸리티 스크립트
├── .vscode/              # VS Code 워크스페이스 설정
├── middleware.ts         # Next.js 미들웨어 (인증)
├── .env.example          # 환경변수 템플릿
└── package.json          # 프로젝트 의존성
```

## 🗓️ 개발 일정

- **0주차**: 프로젝트 초기 세팅 ✅
- **1주차**: 랜딩 페이지
- **2-3주차**: 회원가입/로그인
- **4-5주차**: 진단 테스트
- **6주차**: 결과 분석
- **7주차**: PDF 생성
- **8주차**: 이메일 전송
- **9주차**: 최종 마무리

## 📚 문서

프로젝트의 상세 문서는 [docs](./docs) 폴더에서 확인하세요:

- **[프로젝트 완료 가이드](./docs/PROJECT_COMPLETE.md)** - 전체 기능 및 구조
- **[Supabase 설정](./docs/SUPABASE_SETUP.md)** - 데이터베이스 설정 방법
- **[Resend 설정](./docs/RESEND_SETUP.md)** - 이메일 서비스 설정
- **[Vercel 배포](./docs/VERCEL_DEPLOY.md)** - 배포 가이드
- **[질문 편집 가이드](./docs/QUESTIONS_EDIT_GUIDE.md)** - 진단 질문 수정 방법
- **[PDF 디자인 가이드](./docs/PDF_DESIGN_GUIDE.md)** - PDF 보고서 디자인

### 외부 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Supabase](https://supabase.com/docs)
- [Resend](https://resend.com/docs)

## 💬 문의

문제가 발생하면 AI와 함께 해결하세요!

