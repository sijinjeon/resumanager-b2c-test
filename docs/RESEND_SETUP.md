# Resend 이메일 설정 가이드 📧

이메일 전송 기능을 사용하려면 Resend API 키가 필요합니다.

---

## 1️⃣ Resend 계정 만들기

1. **Resend 접속**: https://resend.com
2. **Sign Up** 클릭
3. 이메일 입력 후 가입
4. 이메일 확인 (인증 링크 클릭)

---

## 2️⃣ API 키 발급

1. Resend 대시보드 로그인
2. 왼쪽 메뉴 → **API Keys** 클릭
3. **"Create API Key"** 버튼 클릭
4. 이름 입력: `strength-test`
5. **Create** 클릭
6. **API 키 복사** (한 번만 보여줍니다!)

```
예시: re_123abc456def789ghi012jkl345mno678
```

---

## 3️⃣ 환경변수 설정

`.env.local` 파일을 열고 RESEND_API_KEY를 추가하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://veyslfwrthsjsimvxkxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (여기에 API 키 붙여넣기!)
RESEND_API_KEY=re_your_api_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ 주의:**
- API 키는 절대 GitHub에 올리지 마세요!
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다 ✅

---

## 4️⃣ 이메일 도메인 설정 (선택사항)

Resend 무료 플랜에서는 `onboarding@resend.dev`에서 발송됩니다.

**커스텀 도메인 사용하려면:**

1. Resend 대시보드 → **Domains** 메뉴
2. **Add Domain** 클릭
3. 도메인 입력 (예: yourdomain.com)
4. DNS 설정 (Resend가 알려주는 레코드 추가)
5. 확인 대기 (5-10분)

그리고 코드 수정:
`app/api/send-email/route.ts` 파일에서:

```typescript
from: 'Career Strength <noreply@yourdomain.com>',
```

→ 실제 도메인으로 변경

---

## 5️⃣ 개발 서버 재시작

환경변수를 추가했으면 서버를 재시작하세요:

```bash
# 터미널에서 Ctrl+C로 서버 중지 후
npm run dev
```

---

## 🧪 테스트하기

### 1. 결과 페이지로 이동

```
http://localhost:3001/test/result
```

### 2. "이메일로 받기" 버튼 클릭

### 3. 메일함 확인

- 받은편지함 확인
- 스팸함도 확인 (처음에는 스팸으로 갈 수 있음)
- PDF 첨부파일 확인

---

## 📊 무료 플랜 제한

Resend 무료 플랜:
- ✅ 월 3,000통 무료
- ✅ API 키 1개
- ✅ 하루 100통 제한
- ⚠️ `onboarding@resend.dev`에서 발송

**소규모 서비스에는 충분합니다!**

---

## 🆘 문제 해결

### "API Key is invalid" 에러
→ API 키를 다시 확인하고 `.env.local`에 정확히 입력했는지 확인

### "Rate limit exceeded" 에러
→ 하루 100통 제한을 초과했습니다. 내일 다시 시도하거나 유료 플랜으로 업그레이드

### 이메일이 안 와요
→ 스팸함 확인! 처음에는 스팸으로 갈 수 있습니다

### "From address not verified" 에러
→ 커스텀 도메인을 사용하려면 DNS 설정이 완료되어야 합니다

---

## 💡 팁

### Resend에서 이메일 발송 확인하기

1. Resend 대시보드 로그인
2. 왼쪽 메뉴 → **Logs** 클릭
3. 발송된 이메일 목록 확인
4. 각 이메일의 상태 (Sent, Delivered, Bounced 등) 확인

---

**설정 완료 후 테스트해보세요!** 📧

