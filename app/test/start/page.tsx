'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions.json'
import type { Question, Answer, AnswerValue } from '@/lib/types'

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
      }, 300)
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
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              질문 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body p-8 md:p-12">
            {/* 질문 내용 */}
            <div className="space-y-8">
              {/* A 옵션 */}
              <div className="text-left p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="text-sm font-bold text-blue-600 mb-2">A</div>
                <p className="text-lg md:text-xl font-medium text-gray-800">
                  {question.questionA}
                </p>
              </div>

              {/* 5단계 척도 */}
              <div className="flex flex-col items-center space-y-4 py-6">
                <div className="flex items-center justify-between w-full max-w-2xl">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(value as AnswerValue)}
                      className={`btn btn-circle transition-all duration-200 ${
                        currentAnswer === value
                          ? 'btn-primary btn-lg scale-110'
                          : value === 1 || value === 5
                          ? 'btn-outline btn-lg'
                          : 'btn-outline btn-md'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                
                {/* 라벨 */}
                <div className="flex justify-between w-full max-w-2xl text-xs md:text-sm text-gray-500">
                  <span>A에 매우 가까움</span>
                  <span>중립</span>
                  <span>B에 매우 가까움</span>
                </div>
              </div>

              {/* B 옵션 */}
              <div className="text-left p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="text-sm font-bold text-purple-600 mb-2">B</div>
                <p className="text-lg md:text-xl font-medium text-gray-800">
                  {question.questionB}
                </p>
              </div>
            </div>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
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

