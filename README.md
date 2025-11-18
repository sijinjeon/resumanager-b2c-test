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
│   ├── result/            # 결과 페이지
│   └── api/               # API Routes
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸리티 함수
├── data/                  # 질문/성향 데이터
└── public/                # 정적 파일
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

## 📚 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Supabase](https://supabase.com/docs)
- [Resend](https://resend.com/docs)

## 💬 문의

문제가 발생하면 AI와 함께 해결하세요!

