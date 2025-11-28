-- ============================================
-- 강점진단 시스템 업데이트 마이그레이션 스크립트
-- ============================================
-- Supabase Dashboard → SQL Editor에서 실행하세요
-- Project ID: veyslfwrthsjsimvxkxh
-- ============================================

-- 1. test_results 테이블에 top_personality 컬럼 추가
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS top_personality TEXT;

-- 2. 기존 데이터 마이그레이션 (final_why 값을 top_personality로 복사)
-- 기존 final_why 값을 새로운 성향 ID로 매핑
UPDATE test_results
SET top_personality = CASE final_why
  WHEN 'legacy' THEN 'application'
  WHEN 'novelty' THEN 'pioneering'
  WHEN 'stability' THEN 'stability'
  WHEN 'challenge' THEN 'challenge'
  WHEN 'goal' THEN 'achievement'
  WHEN 'purpose' THEN 'solution'
  WHEN 'information' THEN 'understanding'
  WHEN 'insight' THEN 'expansion'
  WHEN 'person' THEN 'coexistence'
  WHEN 'situation' THEN 'response'
  WHEN 'together' THEN 'cooperation'
  WHEN 'mySelf' THEN 'proof'
  ELSE final_why
END
WHERE top_personality IS NULL AND final_why IS NOT NULL;

-- 3. (선택사항) 기존 컬럼 삭제 - 필요한 경우에만 실행
-- 주의: 기존 데이터가 손실될 수 있으므로 백업 후 실행하세요
-- ALTER TABLE test_results DROP COLUMN IF EXISTS final_why;
-- ALTER TABLE test_results DROP COLUMN IF EXISTS final_how;

-- 4. 확인: 테이블 구조 확인
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

-- 5. 확인: 마이그레이션 결과 확인
SELECT 
  id,
  user_id,
  final_why,
  final_how,
  top_personality,
  created_at
FROM test_results
LIMIT 10;


