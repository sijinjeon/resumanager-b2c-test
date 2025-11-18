// 질문 타입
export interface Question {
  id: number
  questionA: string
  questionB: string
  typeA: PersonalityType
  typeB: PersonalityType
  category: string
}

// 성향 타입
export type PersonalityType =
  | 'legacy'
  | 'novelty'
  | 'stability'
  | 'challenge'
  | 'goal'
  | 'purpose'
  | 'information'
  | 'insight'
  | 'person'
  | 'situation'
  | 'together'
  | 'mySelf'

// 성향 정보
export interface Personality {
  name: string
  nameEn: string
  description: string
  keywords: string[]
  strengths: string[]
  icon: string
  color: string
}

// 답변 (1-5 스케일)
export type AnswerValue = 1 | 2 | 3 | 4 | 5

// 답변 데이터
export interface Answer {
  questionId: number
  value: AnswerValue
}

// 성향별 점수
export interface PersonalityScores {
  legacy: number
  novelty: number
  stability: number
  challenge: number
  goal: number
  purpose: number
  information: number
  insight: number
  person: number
  situation: number
  together: number
  mySelf: number
}

// 진단 결과
export interface TestResult {
  id?: string
  userId: string
  answers: Answer[]
  scores: PersonalityScores
  finalWhy: PersonalityType
  finalHow: PersonalityType
  createdAt?: string
}

