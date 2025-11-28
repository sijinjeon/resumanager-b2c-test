// 질문 타입 (리커트 척도)
export interface Question {
  id: number
  question: string
  type: PersonalityType
}

// 성향 타입 (새로운 12개 성향)
export type PersonalityType =
  | 'application'   // 응용
  | 'pioneering'    // 개척
  | 'stability'     // 안정
  | 'challenge'     // 도전
  | 'achievement'   // 달성
  | 'solution'      // 해결
  | 'understanding' // 이해
  | 'expansion'     // 확장
  | 'coexistence'   // 상생
  | 'response'      // 대응
  | 'cooperation'   // 협력
  | 'proof'         // 증명

// 건축물 정보
export interface BuildingInfo {
  name: string
  nameEn: string
  description: string
  connection: string
}

// Why 리포트 정보
export interface WhyReport {
  summary: string
  verbs: string[]
  sentence: string
  paragraph: string
}

// 성향 정보 (Why 리포트 포함)
export interface Personality {
  id: string
  name: string
  nameEn: string
  icon: string
  color: string
  building: BuildingInfo
  why: WhyReport
}

// 답변 (1-5 스케일: 전혀 아니다 ~ 매우 그렇다)
export type AnswerValue = 1 | 2 | 3 | 4 | 5

// 답변 데이터
export interface Answer {
  questionId: number
  value: AnswerValue
}

// 성향별 점수
export interface PersonalityScores {
  application: number
  pioneering: number
  stability: number
  challenge: number
  achievement: number
  solution: number
  understanding: number
  expansion: number
  coexistence: number
  response: number
  cooperation: number
  proof: number
}

// 진단 결과
export interface TestResult {
  id?: string
  userId: string
  answers: Answer[]
  scores: PersonalityScores
  topPersonality: PersonalityType
  createdAt?: string
}

// 리커트 척도 라벨
export const LIKERT_LABELS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '아니다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
] as const
