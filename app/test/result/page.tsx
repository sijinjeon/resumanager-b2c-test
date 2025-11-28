'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import questions from '@/data/questions.json'
import personalities from '@/data/personalities.json'
import type { Answer, PersonalityScores, PersonalityType, Personality } from '@/lib/types'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export default function TestResultPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [sending, setSending] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState<PersonalityScores | null>(null)
  const [topPersonality, setTopPersonality] = useState<PersonalityType | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const printRef = useRef<HTMLDivElement>(null)

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

      // 최종 성향 결정 (가장 높은 점수의 성향)
      const topType = determineTopPersonality(calculatedScores)
      setTopPersonality(topType)

      // Supabase에 결과 저장
      try {
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
          saveResult = await supabase
            .from('test_results')
            .update({
              answers: savedAnswers,
              scores: calculatedScores,
              final_why: topType,  // 기존 컬럼 호환성 유지
              final_how: topType,  // 기존 컬럼 호환성 유지
              top_personality: topType,
            })
            .eq('user_id', user.id)
        } else {
          saveResult = await supabase
            .from('test_results')
            .insert({
              user_id: user.id,
              answers: savedAnswers,
              scores: calculatedScores,
              final_why: topType,  // 기존 컬럼 호환성 유지
              final_how: topType,  // 기존 컬럼 호환성 유지
              top_personality: topType,
            })
        }

        if (saveResult.error) {
          console.error('Supabase 저장 오류:', saveResult.error)
          setSaveError(`저장 실패: ${saveResult.error.message}`)
        } else {
          console.log('✅ 테스트 결과가 저장되었습니다.')
        }
      } catch (error: any) {
        console.error('예기치 않은 오류:', error)
        setSaveError(error.message || JSON.stringify(error))
      }

      setLoading(false)
    }

    loadResults()
  }, [router, supabase])

  // 새로운 점수 계산 로직 (리커트 척도)
  const calculateScores = (answers: Answer[]): PersonalityScores => {
    const scores: PersonalityScores = {
      application: 0,
      pioneering: 0,
      stability: 0,
      challenge: 0,
      achievement: 0,
      solution: 0,
      understanding: 0,
      expansion: 0,
      coexistence: 0,
      response: 0,
      cooperation: 0,
      proof: 0
    }

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId)
      if (!question) return

      const type = question.type as PersonalityType
      // 리커트 척도: 1~5점을 그대로 해당 성향에 추가
      scores[type] += answer.value
    })

    return scores
  }

  // 가장 높은 점수의 성향 결정
  const determineTopPersonality = (scores: PersonalityScores): PersonalityType => {
    const entries = Object.entries(scores) as [PersonalityType, number][]
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  }

  const handleDownloadPDF = async () => {
    if (!printRef.current || !topPersonality || !user) return

    setDownloading(true)
    try {
      const element = printRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = pdfWidth / imgWidth
      const contentHeight = imgHeight * ratio

      let heightLeft = contentHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, contentHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position -= pdfHeight // Move image up by one page height
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, contentHeight)
        heightLeft -= pdfHeight
      }

      const userEmailId = getEmailId(user.email)
      const date = new Date().toISOString().split('T')[0]
      // UTF-8 filename handling is automatic in modern browsers, but we ensure safe characters
      const filename = `${userEmailId}_strength_report_${date}.pdf`

      pdf.save(filename)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('PDF 생성에 실패했습니다.')
    } finally {
      setDownloading(false)
    }
  }

  const handleSendEmail = () => {
    alert('💡 이메일 전송 방법:\n\n1. [PDF로 다운로드] 클릭\n2. 저장된 PDF를 이메일에 첨부')
  }

  // 이메일에서 ID 추출 (@ 앞 부분)
  const getEmailId = (email: string | undefined): string => {
    if (!email) return ''
    return email.split('@')[0]
  }

  // 텍스트에서 "님은", "님도"를 개인화된 이름으로 대체
  const personalizeText = (text: string, emailId: string): string => {
    return text
      .replace(/님은/g, `${emailId}님은`)
      .replace(/님도/g, `${emailId}님도`)
  }

  if (loading || !scores || !topPersonality) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-lg text-gray-600">결과를 분석하고 있습니다...</p>
      </div>
    )
  }

  const personality = personalities[topPersonality] as Personality
  const emailId = getEmailId(user?.email)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* 완료 헤더 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            진단이 완료되었습니다!
          </h1>
          <p className="text-lg text-gray-600">
            {user?.user_metadata?.name || '사용자'}님의 강점 성향을 분석했어요
          </p>
        </div>

        {/* 에러 메시지 표시 */}
        {saveError && (
          <div className="alert alert-warning mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold">저장 알림</h3>
              <div className="text-xs">{saveError}</div>
            </div>
          </div>
        )}

        {/* Why 리포트 카드 */}
        <div ref={printRef} className="card bg-white shadow-2xl overflow-hidden">
          {/* 상단 헤더 */}
          <div
            className="p-6 md:p-8 text-white"
            style={{ backgroundColor: personality.color }}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl">{personality.icon}</div>
              <div>
                <div className="text-sm md:text-base opacity-90 mb-1">나의 Why 성향</div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {personality.name}
                </h2>
                <p className="text-lg opacity-90">{personality.nameEn}</p>
              </div>
            </div>
          </div>

          <div className="card-body p-6 md:p-8">
            {/* Why 요약 */}
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-3 rounded-full mb-4" style={{ backgroundColor: personality.color + '15' }}>
                <span className="text-2xl md:text-3xl font-bold" style={{ color: personality.color }}>
                  "{personality.why.summary}"
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {personality.why.verbs.map((verb, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: personality.color + '20', color: personality.color }}
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* Why 설명 문장 */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <p className="text-xl md:text-2xl font-medium text-slate-800 text-center leading-relaxed">
                {personalizeText(personality.why.sentence, emailId)}
              </p>
            </div>

            {/* Why 설명 문단 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span style={{ color: personality.color }}>●</span>
                나의 Why에 대하여
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {personality.why.paragraph}
              </p>
            </div>

            {/* 건축물 비유 */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span style={{ color: personality.color }}>●</span>
                나를 닮은 건축물: <span className="underline decoration-2" style={{ textDecorationColor: personality.color }}>{personality.building.name}</span>
              </h3>

              {/* 건축물 이미지 */}
              <div className="relative w-full rounded-xl overflow-hidden mb-4">
                <Image
                  src={`/images/buildings/${topPersonality}.png`}
                  alt={personality.building.name}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                {personality.building.description}
              </p>
              <div
                className="p-4 rounded-xl border-l-4"
                style={{ backgroundColor: personality.color + '10', borderColor: personality.color }}
              >
                <p className="text-slate-700 font-medium">
                  {personalizeText(personality.building.connection, emailId)}
                </p>
              </div>
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
