'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import questions from '@/data/questions.json'
import personalities from '@/data/personalities.json'
import type { Answer, PersonalityScores, PersonalityType, Personality } from '@/lib/types'
// PDF import 제거 (브라우저 인쇄 기능 사용)

export default function TestResultPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [sending, setSending] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
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

      // Supabase에 결과 저장
      try {
        // 먼저 기존 결과가 있는지 확인
        const { data: existingResults, error: selectError } = await supabase
          .from('test_results')
          .select('id')
          .eq('user_id', user.id)

        if (selectError) {
          console.error('기존 결과 조회 오류:', selectError)
          setSaveError(`조회 실패: ${selectError.message}`)
          setLoading(false)
          return
        }

        let saveResult
        if (existingResults && existingResults.length > 0) {
          // 업데이트
          saveResult = await supabase
            .from('test_results')
            .update({
              answers: savedAnswers,
              scores: calculatedScores,
              final_why: why,
              final_how: how,
            })
            .eq('user_id', user.id)
        } else {
          // 새로 삽입
          saveResult = await supabase
            .from('test_results')
            .insert({
              user_id: user.id,
              answers: savedAnswers,
              scores: calculatedScores,
              final_why: why,
              final_how: how,
            })
        }

        if (saveResult.error) {
          console.error('Supabase 저장 오류:', saveResult.error)
          setSaveError(`저장 실패: ${saveResult.error.message} (코드: ${saveResult.error.code || 'N/A'})`)
        } else {
          console.log('✅ 테스트 결과가 Supabase에 저장되었습니다.')
        }
      } catch (error: any) {
        console.error('예기치 않은 오류:', error)
        setSaveError(error.message || JSON.stringify(error))
      }

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

  const handleDownloadPDF = () => {
    if (!finalWhy || !finalHow || !user) return

    const userName = user.user_metadata?.name || user.email || '사용자'
    const date = new Date().toISOString().split('T')[0]

    // 인쇄용 페이지 열기
    const printUrl = `/test/result/print?name=${encodeURIComponent(userName)}&date=${date}&why=${finalWhy}&how=${finalHow}`
    const printWindow = window.open(printUrl, '_blank', 'width=800,height=600')

    if (!printWindow) {
      alert('팝업이 차단되었습니다.\n\n브라우저 설정에서 팝업을 허용해주세요.')
    }
  }

  const handleSendEmail = () => {
    alert('💡 이메일 전송 방법:\n\n1. [PDF로 다운로드] 클릭\n2. 인쇄 대화상자에서 "PDF로 저장"\n3. 저장된 PDF를 이메일에 첨부\n\n곧 자동 이메일 전송 기능을 추가하겠습니다!')
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

        {/* 에러 메시지 표시 (디버깅용) */}
        {saveError && (
          <div className="alert alert-error mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <h3 className="font-bold">저장 오류 발생</h3>
              <div className="text-xs">{saveError}</div>
            </div>
          </div>
        )}

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

