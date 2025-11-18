# Supabase 설정 가이드

## 1️⃣ 환경변수 파일 만들기

프로젝트 루트에 `.env.local` 파일을 만들고 아래 내용을 붙여넣으세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://veyslfwrthsjsimvxkxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleXNsZndydGhzanNpbXZ4a3hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NzIwMzcsImV4cCI6MjA3OTA0ODAzN30.3L4k6exbDv7bN-gBq5vr7LKblIwwQHDHiOXIMkzYpMU

# Resend (나중에 추가)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2️⃣ Supabase 데이터베이스 테이블 만들기

1. Supabase 대시보드 접속: https://supabase.com/dashboard
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **"SQL Editor"** 클릭
4. **"New query"** 클릭
5. 아래 SQL을 복사해서 붙여넣고 **"Run"** 클릭

```sql
-- 사용자 프로필 테이블
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 진단 결과 테이블
CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  final_why TEXT NOT NULL,
  final_how TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- 프로필 정책
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 진단 결과 정책
CREATE POLICY "Users can view own test results"
  ON public.test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON public.test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 회원가입 시 자동으로 프로필 생성하는 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 3️⃣ 이메일 설정 (선택)

Supabase에서 이메일 확인을 비활성화하려면:

1. Supabase 대시보드 → **Authentication** → **Settings**
2. **Email Auth** 섹션에서:
   - **"Confirm email"** 끄기 (개발 중에는)
   - **"Enable email confirmations"** 끄기

⚠️ **운영 환경에서는 이메일 확인을 켜는 것을 권장합니다!**

## ✅ 설정 완료!

이제 다음을 테스트할 수 있습니다:
- 회원가입: http://localhost:3000/signup
- 로그인: http://localhost:3000/login
- 테스트 페이지: http://localhost:3000/test

