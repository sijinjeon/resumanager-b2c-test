'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions.json'
import personalities from '@/data/personalities.json'
import type { Answer, PersonalityScores, PersonalityType, Personality } from '@/lib/types'
import { generatePDF, generatePDFBase64, formatDate } from '@/lib/pdf/generator-new'

export default function TestResultPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [sending, setSending] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState<PersonalityScores | null>(null)
  const [finalWhy, setFinalWhy] = useState<PersonalityType | null>(null)
  const [finalHow, setFinalHow] = useState<PersonalityType | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadResults = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }
      
      setUser(user)

      // localStorage에서 답변 불러오기
      const saved = localStorage.getItem(`test_answers_${user.id}`)
      if (!saved) {
        router.push('/test')
        return
      }

      const savedAnswers = JSON.parse(saved) as Answer[]
      
      // 모든 질문에 답변했는지 확인
      if (savedAnswers.length < questions.length) {
        router.push('/test/start')
        return
      }

      setAnswers(savedAnswers)
      
      // 점수 계산
      const calculatedScores = calculateScores(savedAnswers)
      setScores(calculatedScores)
      
      // 최종 성향 결정
      const { why, how } = determineFinalTypes(calculatedScores)
      setFinalWhy(why)
      setFinalHow(how)
      
      setLoading(false)
    }

    loadResults()
  }, [router, supabase])

  const calculateScores = (answers: Answer[]): PersonalityScores => {
    const scores: PersonalityScores = {
      legacy: 0,
      novelty: 0,
      stability: 0,
      challenge: 0,
      goal: 0,
      purpose: 0,
      information: 0,
      insight: 0,
      person: 0,
      situation: 0,
      together: 0,
      mySelf: 0
    }

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId)
      if (!question) return

      const typeA = question.typeA as PersonalityType
      const typeB = question.typeB as PersonalityType
      const value = answer.value

      // 1: A에 +2, 2: A에 +1, 3: 중립, 4: B에 +1, 5: B에 +2
      if (value === 1) {
        scores[typeA] += 2
      } else if (value === 2) {
        scores[typeA] += 1
      } else if (value === 4) {
        scores[typeB] += 1
      } else if (value === 5) {
        scores[typeB] += 2
      }
    })

    return scores
  }

  const determineFinalTypes = (scores: PersonalityScores): { why: PersonalityType, how: PersonalityType } => {
    // Why 그룹 (목적/방향)
    const whyGroup: PersonalityType[] = ['legacy', 'novelty', 'stability', 'challenge', 'goal', 'purpose']
    const whyScores = whyGroup.map(type => ({ type, score: scores[type] }))
    whyScores.sort((a, b) => b.score - a.score)
    
    // How 그룹 (방법/스타일)
    const howGroup: PersonalityType[] = ['information', 'insight', 'person', 'situation', 'together', 'mySelf']
    const howScores = howGroup.map(type => ({ type, score: scores[type] }))
    howScores.sort((a, b) => b.score - a.score)

    return {
      why: whyScores[0].type,
      how: howScores[0].type
    }
  }

  const handleDownloadPDF = async () => {
    if (!finalWhy || !finalHow || !user) return
    
    setDownloading(true)
    try {
      await generatePDF({
        userName: user.user_metadata?.name || user.email || '사용자',
        date: formatDate(new Date()),
        whyType: finalWhy,
        howType: finalHow,
        whyPersonality: personalities[finalWhy] as Personality,
        howPersonality: personalities[finalHow] as Personality
      })
      
      alert('PDF 다운로드가 완료되었습니다! 📄')
    } catch (error) {
      console.error('PDF 생성 오류:', error)
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setDownloading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!finalWhy || !finalHow || !user) return
    
    setSending(true)
    try {
      // PDF Base64 생성
      const pdfBase64 = await generatePDFBase64({
        userName: user.user_metadata?.name || user.email || '사용자',
        date: formatDate(new Date()),
        whyType: finalWhy,
        howType: finalHow,
        whyPersonality: personalities[finalWhy] as Personality,
        howPersonality: personalities[finalHow] as Personality
      })

      // 이메일 전송 API 호출
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          userName: user.user_metadata?.name || user.email,
          pdfBase64,
          whyName: personalities[finalWhy].name,
          howName: personalities[finalHow].name,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '이메일 전송 실패')
      }

      alert(`${user.email}로 진단 결과를 전송했습니다! 📧\n\n메일함을 확인해주세요.`)
    } catch (error: any) {
      console.error('이메일 전송 오류:', error)
      alert(`이메일 전송에 실패했습니다.\n${error.message}\n\n관리자에게 문의해주세요.`)
    } finally {
      setSending(false)
    }
  }

  if (loading || !scores || !finalWhy || !finalHow) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-lg text-gray-600">결과를 분석하고 있습니다...</p>
      </div>
    )
  }

  const whyPersonality = personalities[finalWhy] as Personality
  const howPersonality = personalities[finalHow] as Personality

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* 완료 헤더 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            진단이 완료되었습니다!
          </h1>
          <p className="text-lg text-gray-600">
            {user?.user_metadata?.name || '사용자'}님의 커리어 강점을 분석했어요
          </p>
        </div>

        {/* 결과 카드 */}
        <div className="space-y-6">
          {/* Why 성향 */}
          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{whyPersonality.icon}</div>
                <div>
                  <div className="text-sm text-gray-500">나의 Why 성향</div>
                  <h2 className="text-3xl font-bold" style={{ color: whyPersonality.color }}>
                    {whyPersonality.name} ({whyPersonality.nameEn})
                  </h2>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-4">
                {whyPersonality.description}
              </p>

              <div className="divider">키워드</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {whyPersonality.keywords.map((keyword, idx) => (
                  <span 
                    key={idx}
                    className="badge badge-lg"
                    style={{ backgroundColor: whyPersonality.color + '20', color: whyPersonality.color }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="divider">강점</div>
              <ul className="space-y-2">
                {whyPersonality.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How 성향 */}
          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{howPersonality.icon}</div>
                <div>
                  <div className="text-sm text-gray-500">나의 How 성향</div>
                  <h2 className="text-3xl font-bold" style={{ color: howPersonality.color }}>
                    {howPersonality.name} ({howPersonality.nameEn})
                  </h2>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-4">
                {howPersonality.description}
              </p>

              <div className="divider">키워드</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {howPersonality.keywords.map((keyword, idx) => (
                  <span 
                    key={idx}
                    className="badge badge-lg"
                    style={{ backgroundColor: howPersonality.color + '20', color: howPersonality.color }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="divider">강점</div>
              <ul className="space-y-2">
                {howPersonality.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            className="btn btn-primary btn-lg flex-1"
            onClick={handleDownloadPDF}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <span className="loading loading-spinner"></span>
                생성 중...
              </>
            ) : (
              <>📄 PDF로 다운로드</>
            )}
          </button>
          <button 
            className="btn btn-outline btn-lg flex-1"
            onClick={handleSendEmail}
            disabled={sending}
          >
            {sending ? (
              <>
                <span className="loading loading-spinner"></span>
                전송 중...
              </>
            ) : (
              <>📧 이메일로 받기</>
            )}
          </button>
        </div>

        {/* 다시 하기 */}
        <div className="text-center mt-6">
          <button 
            onClick={() => {
              if (confirm('진단을 다시 하시겠어요? 현재 결과가 삭제됩니다.')) {
                localStorage.removeItem(`test_answers_${user.id}`)
                router.push('/test')
              }
            }}
            className="btn btn-ghost btn-sm"
          >
            🔄 다시 진단하기
          </button>
        </div>
      </div>
    </div>
  )
}

