# 질문 수정 가이드 📝

> 비개발자도 쉽게 질문을 수정할 수 있는 가이드입니다!

---

## 🎯 질문 수정 방법 (간단!)

### 1단계: QUESTIONS_LIST.md 파일 열기

VS Code에서 `QUESTIONS_LIST.md` 파일을 엽니다.

### 2단계: 원하는 질문 수정

예를 들어 **질문 1번**을 수정하고 싶다면:

```markdown
### 질문 1번
- **A (Legacy)**: 여기를 수정하세요!
- **B (Novelty)**: 여기를 수정하세요!
```

**⚠️ 주의사항:**
- `### 질문 X번` 형식은 그대로 유지하세요
- `- **A (Legacy)**:` 부분도 그대로 두고, `:` 뒤의 내용만 수정하세요
- `- **B (Novelty)**:` 부분도 마찬가지입니다

### 3단계: 저장하기

`Cmd + S` (Mac) 또는 `Ctrl + S` (Windows)로 저장합니다.

### 4단계: 자동 업데이트 실행

터미널을 열고 다음 명령어를 실행하세요:

```bash
npm run update-questions
```

그러면 자동으로 `data/questions.json` 파일이 업데이트됩니다! 🎉

---

## ✏️ 수정 예시

### Before (수정 전)
```markdown
### 질문 1번
- **A (Legacy)**: 이미 검증되고 신뢰할 수 있는 방법으로 일을 진행하는 편이에요
- **B (Novelty)**: 새롭고 혁신적인 방법을 시도하며 일을 진행하는 편이에요
```

### After (수정 후)
```markdown
### 질문 1번
- **A (Legacy)**: 검증된 기존 방법을 선호하는 편이에요
- **B (Novelty)**: 새로운 방법을 시도하는 걸 좋아해요
```

---

## 🆕 새 질문 추가하는 방법

### 1. 적절한 섹션 찾기

추가하고 싶은 성향 그룹을 찾습니다. 예: "Legacy vs Novelty"

### 2. 새 질문 추가

```markdown
### 질문 26번
- **A (Legacy)**: 새로운 질문 A
- **B (Novelty)**: 새로운 질문 B
```

### 3. 업데이트 실행

```bash
npm run update-questions
```

---

## ❌ 질문 삭제하는 방법

### 1. QUESTIONS_LIST.md에서 삭제

삭제하고 싶은 질문 섹션을 통째로 지웁니다:

```markdown
### 질문 X번              ← 이 3줄을
- **A (...)**: ...        ← 전체
- **B (...)**: ...        ← 삭제
```

### 2. 질문 번호 재정렬

나머지 질문들의 번호를 순서대로 수정합니다.

### 3. 업데이트 실행

```bash
npm run update-questions
```

---

## 🔍 성향 타입 목록

질문을 수정할 때 사용할 수 있는 성향 타입:

| 성향 코드 | 한글명 | 영문 |
|-----------|--------|------|
| `legacy` | 기존 | Legacy |
| `novelty` | 새로움 | Novelty |
| `stability` | 안정 | Stability |
| `challenge` | 도전 | Challenge |
| `goal` | 목표 | Goal |
| `purpose` | 목적 | Purpose |
| `information` | 정보 | Information |
| `insight` | 인사이트 | Insight |
| `person` | 사람 | Person |
| `situation` | 상황 | Situation |
| `together` | 함께 | Together |
| `mySelf` | 내가 | MySelf |

---

## ⚠️ 실수하지 않기 위한 체크리스트

수정 전에 확인하세요:

- [ ] `### 질문 X번` 형식을 유지했나요?
- [ ] `- **A (타입)**:` 형식을 유지했나요?
- [ ] `- **B (타입)**:` 형식을 유지했나요?
- [ ] 질문 번호가 순서대로 되어 있나요? (1, 2, 3, ...)
- [ ] 저장했나요? (Cmd/Ctrl + S)

---

## 🆘 문제 해결

### "npm run update-questions가 안 돼요"

```bash
# 프로젝트 폴더로 이동
cd "/Users/sijin/Downloads/07. Cursor/10. resumanager-b2c-test"

# 다시 시도
npm run update-questions
```

### "에러 메시지가 나와요"

1. QUESTIONS_LIST.md 파일의 형식을 확인하세요
2. 위의 체크리스트를 다시 확인하세요
3. 에러 메시지를 저(AI)에게 알려주세요

### "JSON 파일이 업데이트 안 돼요"

```bash
# 현재 질문 파일 확인
cat data/questions.json

# 스크립트 직접 실행
node scripts/update-questions.js
```

---

## 💡 팁

### 1. 백업 만들기
중요한 수정 전에는 백업을 만드세요:

```bash
cp data/questions.json data/questions.backup.json
```

### 2. Git 커밋
수정 후에는 Git에 저장하세요:

```bash
git add .
git commit -m "질문 수정: X번 질문 내용 변경"
git push
```

### 3. 미리보기
VS Code에서 `QUESTIONS_LIST.md`를 열고 우측 상단의 미리보기 아이콘을 클릭하면 예쁘게 포맷된 문서를 볼 수 있어요!

---

## 📞 도움이 필요하면

질문이나 문제가 있으면 저(AI)에게 물어보세요:

- "X번 질문을 이렇게 바꾸고 싶어"
- "새 질문을 추가하고 싶어"
- "에러가 났어: [에러 메시지]"

**언제든 도와드릴게요!** 💪

---

**작성일**: 2025년 11월 18일  
**버전**: 1.0

