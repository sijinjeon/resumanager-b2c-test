-- Supabase Dashboard → SQL Editor에서 실행하세요
-- test_results 테이블의 컬럼 구조를 확인합니다

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public' 
  AND table_name = 'test_results'
ORDER BY 
  ordinal_position;

