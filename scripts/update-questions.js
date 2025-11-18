#!/usr/bin/env node

/**
 * QUESTIONS_LIST.md 파일을 읽어서 questions.json을 자동으로 업데이트하는 스크립트
 * 
 * 사용법:
 * npm run update-questions
 */

const fs = require('fs');
const path = require('path');

// 파일 경로
const mdFilePath = path.join(__dirname, '../QUESTIONS_LIST.md');
const jsonFilePath = path.join(__dirname, '../data/questions.json');

console.log('📝 질문 업데이트를 시작합니다...\n');

try {
  // MD 파일 읽기
  const mdContent = fs.readFileSync(mdFilePath, 'utf-8');
  
  // 질문 추출
  const questions = [];
  const lines = mdContent.split('\n');
  
  let currentQuestion = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 질문 번호 감지
    const questionMatch = line.match(/^### 질문 (\d+)번$/);
    if (questionMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        id: parseInt(questionMatch[1]),
        questionA: '',
        questionB: '',
        typeA: '',
        typeB: '',
        category: ''
      };
      continue;
    }
    
    // A 옵션 감지
    const aMatch = line.match(/^- \*\*A \((\w+)\)\*\*: (.+)$/);
    if (aMatch && currentQuestion) {
      currentQuestion.typeA = aMatch[1].toLowerCase();
      currentQuestion.questionA = aMatch[2];
      continue;
    }
    
    // B 옵션 감지
    const bMatch = line.match(/^- \*\*B \((\w+)\)\*\*: (.+)$/);
    if (bMatch && currentQuestion) {
      currentQuestion.typeB = bMatch[1].toLowerCase();
      currentQuestion.questionB = bMatch[2];
      
      // category 추론
      const typeA = currentQuestion.typeA;
      const typeB = currentQuestion.typeB;
      
      if (typeA === 'legacy' || typeB === 'novelty') {
        currentQuestion.category = 'approach';
      } else if (typeA === 'stability' || typeB === 'challenge') {
        currentQuestion.category = 'risk';
      } else if (typeA === 'goal' || typeB === 'purpose') {
        currentQuestion.category = 'motivation';
      } else if (typeA === 'information' || typeB === 'insight') {
        currentQuestion.category = 'decision';
      } else if (typeA === 'person' || typeB === 'situation') {
        currentQuestion.category = 'focus';
      } else if (typeA === 'together' || typeB === 'myself') {
        currentQuestion.category = 'workstyle';
      }
    }
  }
  
  // 마지막 질문 추가
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  // 정렬
  questions.sort((a, b) => a.id - b.id);
  
  // JSON 파일로 저장
  fs.writeFileSync(jsonFilePath, JSON.stringify(questions, null, 2), 'utf-8');
  
  console.log('✅ 성공! 총 ' + questions.length + '개의 질문이 업데이트되었습니다.\n');
  console.log('📄 파일 위치: ' + jsonFilePath + '\n');
  
  // 요약 출력
  console.log('📊 성향별 분포:');
  const distribution = {};
  questions.forEach(q => {
    const pair = `${q.typeA} vs ${q.typeB}`;
    distribution[pair] = (distribution[pair] || 0) + 1;
  });
  
  Object.entries(distribution).forEach(([pair, count]) => {
    console.log(`   ${pair}: ${count}문항`);
  });
  
  console.log('\n🎉 완료!\n');
  
} catch (error) {
  console.error('❌ 에러 발생:', error.message);
  process.exit(1);
}

