'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions.json'
import type { Question, Answer, AnswerValue, LIKERT_LABELS, PersonalityType } from '@/lib/types'

const LIKERT_OPTIONS = [
  { value: 1 as AnswerValue, label: '전혀 아니다', shortLabel: '전혀 아니다' },
  { value: 2 as AnswerValue, label: '아니다', shortLabel: '아니다' },
  { value: 3 as AnswerValue, label: '보통이다', shortLabel: '보통' },
  { value: 4 as AnswerValue, label: '그렇다', shortLabel: '그렇다' },
  { value: 5 as AnswerValue, label: '매우 그렇다', shortLabel: '매우 그렇다' },
]

export default function TestStartPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // 1. 테스트 질문 목록 설정 (랜덤 생성 또는 복원)
      const savedQuestionIds = localStorage.getItem(`test_question_ids_${user.id}`)
      let selectedQuestions: Question[] = []

      if (savedQuestionIds) {
        // 기존에 진행 중인 테스트 질문 복원
        const ids = JSON.parse(savedQuestionIds) as number[]
        selectedQuestions = ids.map(id => {
          const q = questions.find(q => q.id === id)
          return q ? { ...q, type: q.type as PersonalityType } : null
        }).filter((q): q is Question => q !== null)
        
        // 만약 저장된 질문 ID가 현재 전체 질문 목록에 없으면 (데이터 변경 등) 새로 생성
        if (selectedQuestions.length !== 25) {
          selectedQuestions = generateRandomQuestions()
          localStorage.setItem(`test_question_ids_${user.id}`, JSON.stringify(selectedQuestions.map(q => q.id)))
          // 답변도 초기화
          localStorage.removeItem(`test_answers_${user.id}`)
          setAnswers([])
        }
      } else {
        // 새로운 테스트 질문 생성
        selectedQuestions = generateRandomQuestions()
        localStorage.setItem(`test_question_ids_${user.id}`, JSON.stringify(selectedQuestions.map(q => q.id)))
      }
      
      setTestQuestions(selectedQuestions)

      // 2. 저장된 답변 불러오기
      const saved = localStorage.getItem(`test_answers_${user.id}`)
      if (saved) {
        const savedAnswers = JSON.parse(saved)
        setAnswers(savedAnswers)
        // 마지막 답변 위치로 이동
        const lastAnswered = savedAnswers.length
        if (lastAnswered < selectedQuestions.length) {
          setCurrentQuestion(lastAnswered)
        }
      }

      setLoading(false)
    }

    checkUser()
  }, [router, supabase])

  // 랜덤 질문 생성 로직
  const generateRandomQuestions = (): Question[] => {
    // 1. 성향별로 그룹화
    const grouped: Record<string, Question[]> = {}
    questions.forEach(q => {
      if (!grouped[q.type]) grouped[q.type] = []
      grouped[q.type].push({ ...q, type: q.type as PersonalityType })
    })

    const selected: Question[] = []
    const types = Object.keys(grouped)
    
    // 2. 각 성향(12개)에서 2개씩 랜덤 추출 (총 24개)
    types.forEach(type => {
      const pool = [...grouped[type]]
      // 셔플
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      // 앞의 2개 선택
      selected.push(pool[0])
      selected.push(pool[1])
    })

    // 3. 남은 질문들 중에서 1개 랜덤 추출 (총 25개)
    const remaining = questions
      .filter(q => !selected.find(s => s.id === q.id))
      .map(q => ({ ...q, type: q.type as PersonalityType }))
      
    const randomIdx = Math.floor(Math.random() * remaining.length)
    selected.push(remaining[randomIdx])

    // 4. 전체 셔플 (순서 섞기)
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    return selected
  }

  const handleAnswer = (value: AnswerValue) => {
    const currentQ = testQuestions[currentQuestion]
    const newAnswer: Answer = {
      questionId: currentQ.id,
      value
    }

    const newAnswers = [...answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer]
    setAnswers(newAnswers)

    // localStorage에 자동 저장
    if (user) {
      localStorage.setItem(`test_answers_${user.id}`, JSON.stringify(newAnswers))
    }

    // 다음 질문으로 자동 이동
    if (currentQuestion < testQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 400)
    } else {
      // 모든 질문 완료
      setTimeout(() => {
        router.push('/test/result')
      }, 500)
    }
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const goToNext = () => {
    const currentQ = testQuestions[currentQuestion]
    const currentAnswer = answers.find(a => a.questionId === currentQ.id)
    if (currentAnswer && currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const getCurrentAnswer = () => {
    if (!testQuestions[currentQuestion]) return undefined
    return answers.find(a => a.questionId === testQuestions[currentQuestion].id)?.value
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  // 데이터 로딩 중이거나 에러 시 처리
  if (!testQuestions.length) {
     return (
      <div className="min-h-screen flex items-center justify-center">
        <p>질문 데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    )
  }

  const question = testQuestions[currentQuestion]
  // 사용자의 요청에 따라 현재 문항 번호를 기준으로 진행률 표시 (0/25, 1/25 ...)
  const displayCount = currentQuestion
  const progress = (displayCount / testQuestions.length) * 100
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-3 md:p-4">
      <div className="container mx-auto max-w-3xl py-4 md:py-8">
        {/* 진행률 */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              {displayCount} / {testQuestions.length} 완료
            </span>
            <span className="text-xs md:text-sm font-semibold text-primary">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
            <div
              className="bg-primary h-2 md:h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body p-6 md:p-12">
            {/* 질문 번호 */}
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                Q{currentQuestion + 1}
              </span>
            </div>

            {/* 질문 내용 */}
            <div className="text-center mb-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 leading-relaxed">
                {question.question}
              </h2>
            </div>

            {/* 리커트 척도 */}
            <div className="flex flex-col items-center space-y-6">
              {/* 5점 척도 버튼 */}
              <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
                {LIKERT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl transition-all duration-300 min-w-[60px] md:min-w-[80px] ${currentAnswer === option.value
                        ? 'bg-primary text-white scale-105 shadow-lg ring-4 ring-primary/20'
                        : 'bg-slate-50 text-slate-600 hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-primary/30'
                      }`}
                  >
                    <span className={`text-2xl md:text-3xl font-bold ${currentAnswer === option.value ? 'text-white' : 'text-slate-400'
                      }`}>
                      {option.value}
                    </span>
                    <span className={`text-xs md:text-sm font-medium whitespace-nowrap ${currentAnswer === option.value ? 'text-white/90' : 'text-slate-500'
                      }`}>
                      {option.shortLabel}
                    </span>
                  </button>
                ))}
              </div>

              {/* 라벨 설명 */}
              <div className="flex justify-between w-full max-w-xl text-xs md:text-sm text-slate-400 px-2">
                <span>← 동의하지 않음</span>
                <span>동의함 →</span>
              </div>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t">
              <button
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className="btn btn-ghost"
              >
                ← 이전
              </button>

              <div className="text-center">
                {!currentAnswer && (
                  <p className="text-sm text-gray-500">답변을 선택해주세요</p>
                )}
                {currentAnswer && (
                  <p className="text-sm text-primary font-medium">
                    ✓ 답변 완료
                  </p>
                )}
              </div>

              <button
                onClick={goToNext}
                disabled={!currentAnswer || currentQuestion === testQuestions.length - 1}
                className="btn btn-primary"
              >
                다음 →
              </button>
            </div>

            {/* 진행 정보 */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                💡 편안한 마음으로 직관적으로 답변해주세요
              </p>
            </div>
          </div>
        </div>

        {/* 저장 안내 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ✓ 답변이 자동으로 저장됩니다. 언제든 다시 시작할 수 있어요!
          </p>
        </div>
      </div>
    </div>
  )
}
