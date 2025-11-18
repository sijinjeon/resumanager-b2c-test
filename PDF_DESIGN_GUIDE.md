# PDF 디자인 수정 가이드 📄

> PDF의 디자인과 내용을 쉽게 수정하는 방법

---

## 📂 수정할 파일

```
app/test/result/print/page.tsx
```

**이 파일 하나만 수정하면 PDF가 바뀝니다!** ✨

---

## 🎨 빠른 수정 가이드

### 1️⃣ 제목 변경

**위치:** 132줄

```typescript
커리어 강점 진단 결과
```

**수정 예시:**
```typescript
→ 나만의 커리어 DNA
→ 강점 발견 보고서
→ Career Profile
```

### 2️⃣ 아이콘 변경

**위치:** 123줄

```typescript
<div style={{ fontSize: '56px', ... }}>💼</div>
```

**다른 아이콘으로:**
```
💼 → 🎯 타겟
💼 → ⭐ 별
💼 → 🚀 로켓
💼 → 💡 전구
💼 → 🎨 팔레트
```

### 3️⃣ 메인 색상 변경

**현재 색상:** `#ef6b3b` (주황)

**전체 변경:**
VS Code에서 Cmd/Ctrl + H (찾아 바꾸기)
- 찾기: `#ef6b3b`
- 바꾸기: `#3b82f6` (파란색) 또는 원하는 색상

### 4️⃣ Why/How 라벨 변경

**위치:** 209줄, 364줄

```typescript
Why · 내가 추구하는 것
→ WHY · 목적과 가치

How · 내가 일하는 방식
→ HOW · 업무 스타일
```

### 5️⃣ 사용자 정보 라벨

**위치:** 162-165줄

```typescript
<span style={{ color: '#94a3b8' }}>이름</span> {userName}
→ <span style={{ color: '#94a3b8' }}>Name</span> {userName}

<span style={{ color: '#94a3b8' }}>진단일</span> {date}
→ <span style={{ color: '#94a3b8' }}>Date</span> {date}
```

### 6️⃣ 폰트 크기 조정

**제목 크기 (128줄):**
```typescript
fontSize: '36px',  // 현재
→ fontSize: '42px',  // 더 크게
→ fontSize: '30px',  // 더 작게
```

**본문 크기 (232줄, 387줄):**
```typescript
fontSize: '11px',  // 현재
→ fontSize: '12px',  // 더 크게
→ fontSize: '10px',  // 더 작게
```

### 7️⃣ 카드 간격 조정

**위치:** 174줄

```typescript
gap: '24px',  // 현재
→ gap: '20px',  // 더 좁게
→ gap: '30px',  // 더 넓게
```

### 8️⃣ 푸터 텍스트

**위치:** 500줄

```typescript
© 2025 Career Strength Test · 커리어 강점 진단
```

**수정 예시:**
```typescript
→ © 2025 [회사명] · Powered by AI
→ © 2025 Career DNA Test
→ Designed by [디자이너 이름]
```

---

## 🎨 색상 팔레트

### shadcn UI 색상

| 색상 | HEX | 용도 |
|------|-----|------|
| 🟠 메인 | `#ef6b3b` | 버튼, 강조 |
| 🟤 서브 | `#ddd7d4` | 보조 색상 |
| ⚫ Slate 900 | `#0f172a` | 제목 |
| ⚫ Slate 700 | `#334155` | 본문 |
| ⚫ Slate 500 | `#64748b` | 라벨 |
| ⚫ Slate 300 | `#cbd5e1` | 테두리 |
| ⚫ Slate 100 | `#f1f5f9` | 배경 |

### 다른 색상으로 변경

**파란색 테마:**
```typescript
#ef6b3b → #3b82f6 (파란색)
```

**초록색 테마:**
```typescript
#ef6b3b → #10b981 (초록색)
```

**보라색 테마:**
```typescript
#ef6b3b → #8b5cf6 (보라색)
```

---

## 📐 레이아웃 조정

### 페이지 여백

**위치:** 111줄

```typescript
padding: '50px 40px',  // 현재 (상하 50px, 좌우 40px)
```

**조정:**
```typescript
→ padding: '40px 30px',  // 더 좁게
→ padding: '60px 50px',  // 더 넓게
```

### 카드 안쪽 여백

**위치:** 182줄, 337줄

```typescript
padding: '24px',  // 현재
→ padding: '20px',  // 더 좁게
→ padding: '28px',  // 더 넓게
```

### 섹션 간 간격

**키워드 섹션 (242줄, 397줄):**
```typescript
marginBottom: '16px',  // 현재
→ marginBottom: '12px',  // 더 좁게
→ marginBottom: '20px',  // 더 넓게
```

---

## ✏️ 실전 수정 예시

### 예시 1: 브랜드 컬러로 변경

```typescript
// 1. Cmd/Ctrl + H (찾아 바꾸기)
// 2. 찾기: #ef6b3b
// 3. 바꾸기: #3b82f6  (또는 원하는 색상)
// 4. 모두 바꾸기 클릭
// 5. 저장 (Cmd/Ctrl + S)
```

### 예시 2: 회사 로고/이름 추가

**푸터 수정 (500줄):**
```typescript
Before:
© 2025 Career Strength Test · 커리어 강점 진단

After:
© 2025 [회사명] | www.company.com
```

### 예시 3: 레이아웃을 더 컴팩트하게

```typescript
// 111줄: 전체 패딩 줄이기
padding: '50px 40px' → padding: '40px 30px'

// 174줄: 카드 간격 줄이기
gap: '24px' → gap: '18px'

// 182줄: 카드 안쪽 여백 줄이기
padding: '24px' → padding: '20px'
```

---

## 🔍 VS Code에서 효율적으로 수정하기

### 찾기 (Cmd/Ctrl + F)
```
특정 텍스트 검색:
- "커리어 강점 진단 결과" → 제목 찾기
- "fontSize" → 폰트 크기 찾기
- "#ef6b3b" → 메인 색상 찾기
```

### 찾아 바꾸기 (Cmd/Ctrl + H)
```
일괄 변경:
- 찾기: #ef6b3b
- 바꾸기: #3b82f6
- "모두 바꾸기" 클릭
```

### 멀티 커서 (Cmd/Ctrl + D)
```
같은 단어 여러 개 동시 수정:
1. 단어 선택
2. Cmd/Ctrl + D (같은 단어 추가 선택)
3. 여러 번 누르기
4. 한 번에 수정
```

---

## 🧪 수정 후 테스트

### 1. 저장
```
Cmd + S (Mac)
Ctrl + S (Windows)
```

### 2. 브라우저 새로고침
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### 3. PDF 다운로드 테스트
```
1. 결과 페이지 이동
2. [PDF로 다운로드] 클릭
3. PDF 확인
4. 변경사항 확인!
```

---

## 📊 현재 적용된 디자인

### shadcn UI 특징
- ✅ 미니멀하고 정갈함
- ✅ 부드러운 그림자
- ✅ 깔끔한 테두리 (1px)
- ✅ 중성적인 회색 톤
- ✅ 일관된 간격 (4, 8, 12, 16, 24px)
- ✅ 둥근 모서리 (6px, 8px, 12px)

### 색상 시스템
- **메인:** #ef6b3b (따뜻한 주황)
- **서브:** #ddd7d4 (베이지 그레이)
- **텍스트:** Slate 계열
- **배경:** 흰색 + 연한 회색

---

## 💡 더 예쁘게 만들기

### 그림자 강화
```typescript
boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
→ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
```

### 둥근 모서리 증가
```typescript
borderRadius: '12px',
→ borderRadius: '16px',
```

### 배경 패턴 추가
```typescript
background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
→ background: 'radial-gradient(circle at top, #fafafa 0%, #ffffff 100%)',
```

---

## 🎯 자주 수정하는 항목 Quick Reference

| 항목 | 줄 번호 | 검색어 |
|------|---------|--------|
| 제목 | 132 | `커리어 강점` |
| 아이콘 | 123 | `💼` |
| 메인 컬러 | 전체 | `#ef6b3b` |
| Why 라벨 | 209 | `Why ·` |
| How 라벨 | 364 | `How ·` |
| 푸터 | 500 | `© 2025` |

---

## 🆘 문제 해결

### 저장했는데 안 바뀌어요
→ 브라우저 캐시 삭제 (Cmd/Ctrl + Shift + R)

### 색상 변경이 안 보여요
→ 모든 `#ef6b3b`를 찾아서 변경했는지 확인

### 레이아웃이 깨졌어요
→ Git으로 이전 버전으로 되돌리기:
```bash
git checkout app/test/result/print/page.tsx
```

---

**작성일:** 2025년 11월 18일  
**버전:** 1.0  
**참고:** [shadcn UI](https://ui.shadcn.com/)

