# Vercel 배포 가이드 🚀

전 세계 사람들이 사용할 수 있도록 서비스를 배포해봅시다!

---

## 🌐 Vercel이란?

- Next.js를 만든 회사의 호스팅 서비스
- **무료 플랜**으로 충분히 사용 가능
- GitHub과 자동 연동
- 코드를 push하면 자동으로 배포

**월 무료 제공:**
- ✅ 100GB 대역폭
- ✅ 무제한 요청
- ✅ SSL 인증서 (HTTPS)
- ✅ 커스텀 도메인

---

## 1️⃣ Vercel 계정 만들기

1. **Vercel 접속**: https://vercel.com
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택
4. GitHub 계정으로 로그인

---

## 2️⃣ 프로젝트 배포하기

### 방법 1: Vercel 대시보드에서 (추천!)

1. **Vercel 대시보드**: https://vercel.com/dashboard
2. **Add New...** → **Project** 클릭
3. GitHub 저장소 목록에서 **resumanager-b2c-test** 찾기
4. **Import** 클릭
5. 프로젝트 설정:
   - **Project Name**: `strength-test` (원하는 이름)
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (그대로 둠)
6. **Environment Variables** 섹션 펼치기
7. 환경변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL
https://veyslfwrthsjsimvxkxh.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

RESEND_API_KEY
re_your_resend_api_key

NEXT_PUBLIC_APP_URL
https://your-project.vercel.app
```

8. **Deploy** 버튼 클릭!
9. **배포 완료** (약 2-3분 소요)

### 방법 2: 터미널에서

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 운영 환경에 배포
vercel --prod
```

---

## 3️⃣ 환경변수 설정

배포 후에도 환경변수를 추가/수정할 수 있습니다:

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 변수 추가:
   - **NEXT_PUBLIC_SUPABASE_URL**: Supabase URL
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Supabase Anon Key
   - **RESEND_API_KEY**: Resend API Key
   - **NEXT_PUBLIC_APP_URL**: 배포된 URL (예: https://strength-test.vercel.app)

4. **Save** 클릭
5. **Redeploy** (재배포 필요)

---

## 4️⃣ 커스텀 도메인 연결 (선택사항)

### 도메인이 있다면:

1. Vercel 프로젝트 → **Settings** → **Domains**
2. **Add** 클릭
3. 도메인 입력 (예: mystrength.com)
4. DNS 설정 안내에 따라 설정
5. 확인 대기 (5-30분)

### 도메인이 없다면:

Vercel이 자동으로 제공하는 URL 사용:
```
https://your-project.vercel.app
```

---

## 5️⃣ 자동 배포 설정

GitHub에 코드를 push하면 자동으로 배포됩니다!

```bash
# 코드 수정 후
git add .
git commit -m "update: 기능 개선"
git push

# Vercel이 자동으로 배포 시작!
```

**배포 상태 확인:**
- Vercel 대시보드에서 실시간 로그 확인 가능

---

## ✅ 배포 완료 체크리스트

배포가 완료되면 다음을 확인하세요:

### 기본 기능
- [ ] 랜딩 페이지 접속됨
- [ ] 회원가입 작동
- [ ] 로그인 작동
- [ ] 진단 테스트 작동
- [ ] 결과 페이지 표시
- [ ] PDF 다운로드 작동
- [ ] 이메일 전송 작동

### 성능
- [ ] 페이지 로딩이 빠름 (3초 이내)
- [ ] 모바일에서도 잘 보임
- [ ] 이미지가 깨지지 않음

### 보안
- [ ] HTTPS 적용됨 (자동)
- [ ] 환경변수 노출 안 됨

---

## 🔄 배포 후 업데이트 방법

코드를 수정하고 싶으면:

```bash
# 1. 코드 수정
# 2. Git 커밋
git add .
git commit -m "update: 수정 내용"

# 3. GitHub에 push
git push

# 4. Vercel이 자동으로 배포! (2-3분)
```

---

## 📊 배포 URL 예시

배포가 완료되면 다음과 같은 URL을 받게 됩니다:

- **Vercel 기본**: `https://resumanager-b2c-test.vercel.app`
- **커스텀 도메인**: `https://mystrength.com` (설정 시)

---

## 🆘 문제 해결

### "Build failed" 에러
→ 로컬에서 `npm run build` 실행해서 에러 확인
→ 에러 수정 후 다시 push

### 환경변수 에러
→ Vercel Settings에서 환경변수 다시 확인
→ 재배포 (Redeploy)

### 페이지가 안 열려요
→ Vercel 대시보드에서 Deployment 로그 확인
→ 에러 메시지를 저(AI)에게 알려주세요

### Supabase 연결 안 됨
→ Supabase URL이 `NEXT_PUBLIC_APP_URL`에 정확히 입력되었는지 확인
→ Supabase에서 해당 URL을 허용 목록에 추가

---

## 💡 유용한 팁

### 1. 배포 미리보기
Git 브랜치별로 자동 배포 URL 생성됩니다:
- `main` 브랜치 → 운영 환경
- 다른 브랜치 → 테스트 환경

### 2. 로그 확인
Vercel 대시보드에서 실시간 로그를 볼 수 있습니다.

### 3. 분석
Vercel이 자동으로 제공하는 Analytics로 방문자 수 확인 가능!

---

**배포 준비되셨나요?** 🚀

상세한 내용은 이 파일(`VERCEL_DEPLOY.md`)에 있습니다!

