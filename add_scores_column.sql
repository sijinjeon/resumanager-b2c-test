-- Supabase Dashboard → SQL Editor에서 실행하세요
-- 만약 scores 컬럼이 없다면 이 SQL을 실행하세요

-- scores 컬럼 추가 (이미 있으면 에러가 발생하지만 문제없습니다)
ALTER TABLE public.test_results
ADD COLUMN IF NOT EXISTS scores JSONB NOT NULL DEFAULT '{}'::jsonb;

-- 확인: 테이블 구조 조회
SELECT 
  column_name,
  data_type,
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'test_results'
ORDER BY 
  ordinal_position;

