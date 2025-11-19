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
            {/* 질문 내용 */}
            <div className="flex flex-col space-y-8">

              {/* Questions Container */}
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                {/* A 옵션 */}
                <div className="flex-1 flex flex-col p-6 md:p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-[#ef6b3b]/50 transition-all group cursor-pointer shadow-sm hover:shadow-md" onClick={() => handleAnswer(1)}>
                  <div className="text-sm font-bold text-slate-400 group-hover:text-[#ef6b3b] mb-3 uppercase tracking-wide transition-colors">Option A</div>
                  <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed flex-grow">
                    {question.questionA}
                  </p>
                </div>

                {/* B 옵션 */}
                <div className="flex-1 flex flex-col p-6 md:p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-[#ef6b3b]/50 transition-all group cursor-pointer shadow-sm hover:shadow-md" onClick={() => handleAnswer(5)}>
                  <div className="text-sm font-bold text-slate-400 group-hover:text-[#ef6b3b] mb-3 uppercase tracking-wide transition-colors">Option B</div>
                  <p className="text-lg md:text-xl font-medium text-slate-800 leading-relaxed flex-grow">
                    {question.questionB}
                  </p>
                </div>
              </div>

              {/* 5단계 척도 */}
              <div className="flex flex-col items-center space-y-6 pt-4">
                <div className="flex items-center justify-between w-full max-w-3xl px-4 relative">
                  {/* Gradient Line Background */}
                  <div className="absolute left-4 right-4 top-1/2 h-1 bg-gradient-to-r from-slate-200 via-[#ef6b3b]/50 to-[#ef6b3b] -z-10 rounded-full opacity-30"></div>

                  {[1, 2, 3, 4, 5].map((value) => {
                    // Calculate opacity/intensity based on value (1 to 5)
                    const intensity = 0.2 + (value * 0.16); // 0.36 to 1.0
                    const activeColor = `rgba(239, 107, 59, ${intensity})`; // #ef6b3b is 239, 107, 59

                    return (
                      <div key={value} className="flex flex-col items-center gap-2 bg-white p-1 rounded-full">
                        <button
                          onClick={() => handleAnswer(value as AnswerValue)}
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-full text-lg md:text-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center border-2 ${currentAnswer === value
                              ? 'text-white scale-110 shadow-lg ring-4 ring-[#ef6b3b]/20 border-transparent'
                              : 'text-slate-400 border-slate-200 hover:border-[#ef6b3b] hover:text-[#ef6b3b]'
                            }`}
                          style={{
                            backgroundColor: currentAnswer === value ? '#ef6b3b' : 'white',
                            // For gradient effect on inactive buttons if desired, or just keep clean
                          }}
                        >
                          {value}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* 라벨 */}
                <div className="flex justify-between w-full max-w-3xl px-2 text-xs md:text-sm font-medium text-slate-400">
                  <span className="text-slate-500">A에 매우 가까움</span>
                  <span className="text-slate-400">중립</span>
                  <span className="text-[#ef6b3b]">B에 매우 가까움</span>
                </div>
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

