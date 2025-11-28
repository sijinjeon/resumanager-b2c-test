'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions.json'
import type { Question, Answer, AnswerValue, LIKERT_LABELS } from '@/lib/types'

const LIKERT_OPTIONS = [
  { value: 1 as AnswerValue, label: '전혀 아니다', shortLabel: '전혀' },
  { value: 2 as AnswerValue, label: '아니다', shortLabel: '아니다' },
  { value: 3 as AnswerValue, label: '보통이다', shortLabel: '보통' },
  { value: 4 as AnswerValue, label: '그렇다', shortLabel: '그렇다' },
  { value: 5 as AnswerValue, label: '매우 그렇다', shortLabel: '매우' },
]

export default function TestStartPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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

      // 저장된 답변 불러오기 (localStorage에서)
      const saved = localStorage.getItem(`test_answers_${user.id}`)
      if (saved) {
        const savedAnswers = JSON.parse(saved)
        setAnswers(savedAnswers)
        // 마지막 답변 위치로 이동
        const lastAnswered = savedAnswers.length
        if (lastAnswered < questions.length) {
          setCurrentQuestion(lastAnswered)
        }
      }

      setLoading(false)
    }

    checkUser()
  }, [router, supabase])

  const handleAnswer = (value: AnswerValue) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      value
    }

    const newAnswers = [...answers.filter(a => a.questionId !== newAnswer.questionId), newAnswer]
    setAnswers(newAnswers)

    // localStorage에 자동 저장
    if (user) {
      localStorage.setItem(`test_answers_${user.id}`, JSON.stringify(newAnswers))
    }

    // 다음 질문으로 자동 이동
    if (currentQuestion < questions.length - 1) {
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
    const currentAnswer = answers.find(a => a.questionId === questions[currentQuestion].id)
    if (currentAnswer && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === questions[currentQuestion].id)?.value
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  const question = questions[currentQuestion] as Question
  // 사용자의 요청에 따라 현재 문항 번호를 기준으로 진행률 표시 (0/25, 1/25 ...)
  const displayCount = currentQuestion
  const progress = (displayCount / questions.length) * 100
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-3 md:p-4">
      <div className="container mx-auto max-w-3xl py-4 md:py-8">
        {/* 진행률 */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              {displayCount} / {questions.length} 완료
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
                disabled={!currentAnswer || currentQuestion === questions.length - 1}
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
