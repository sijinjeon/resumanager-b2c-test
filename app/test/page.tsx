'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function TestPage() {
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
      setLoading(false)
    }

    checkUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="navbar bg-base-100 rounded-box shadow-lg mb-8">
          <div className="flex-1">
            <span className="text-xl font-bold">💼 레쥬매니저 테스트</span>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                <div className="bg-primary text-white rounded-full w-10">
                  <span>{user?.user_metadata?.name?.[0] || user?.email?.[0].toUpperCase()}</span>
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="menu-title">
                  <span>{user?.user_metadata?.name || '사용자'}</span>
                  <span className="text-xs opacity-60">{user?.email}</span>
                </li>
                <li><button onClick={handleLogout}>로그아웃</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 테스트 시작 카드 */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-4">레쥬매니저을 시작합니다</h2>
            <p className="text-lg text-gray-600 mb-8">
              25개의 질문을 통해 당신의 커리어 강점을 발견해보세요
            </p>

            <div className="w-full mb-8 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {/* Section 1: Question Count */}
              <div className="flex-1 w-full flex flex-row md:flex-col items-center justify-between md:justify-center p-4 md:p-6 group hover:bg-slate-50/50 transition-colors rounded-2xl">
                <div className="text-sm md:text-base text-slate-500 md:mb-2 font-semibold tracking-wide uppercase">질문 수</div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-4xl md:text-6xl font-black bg-gradient-to-br from-[#ef6b3b] to-[#ff8f6b] bg-clip-text text-transparent filter drop-shadow-sm">25개</span>
                  <div className="text-2xl md:text-3xl animate-bounce text-[#ef6b3b]">⚡</div>
                </div>
              </div>

              {/* Section 2: Time Required */}
              <div className="flex-1 w-full flex flex-row md:flex-col items-center justify-between md:justify-center p-4 md:p-6 group hover:bg-slate-50/50 transition-colors rounded-2xl">
                <div className="text-sm md:text-base text-slate-500 md:mb-2 font-semibold tracking-wide uppercase">소요 시간</div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-4xl md:text-6xl font-black bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-sm">5분</span>
                  <div className="text-2xl md:text-3xl text-blue-500">⏱️</div>
                </div>
              </div>

              {/* Section 3: Analysis Types */}
              <div className="flex-1 w-full flex flex-row md:flex-col items-center justify-between md:justify-center p-4 md:p-6 group hover:bg-slate-50/50 transition-colors rounded-2xl">
                <div className="text-sm md:text-base text-slate-500 md:mb-2 font-semibold tracking-wide uppercase">분석 성향</div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-4xl md:text-6xl font-black bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent filter drop-shadow-sm">12가지</span>
                  <div className="text-2xl md:text-3xl text-purple-500">✨</div>
                </div>
              </div>

            </div>

            <div className="alert alert-info mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>편안한 마음으로 직관적으로 답변해주세요. 정답은 없습니다!</span>
            </div>

            <button
              onClick={() => router.push('/test/start')}
              className="btn btn-primary btn-lg px-12"
            >
              테스트 시작하기 →
            </button>

            <p className="text-sm text-gray-500 mt-4">
              * 진단 중 언제든 나갔다가 다시 시작할 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

