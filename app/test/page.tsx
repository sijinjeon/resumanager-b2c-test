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
            <span className="text-xl font-bold">💼 강점진단 테스트</span>
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
            <h2 className="card-title text-3xl mb-4">강점진단을 시작합니다</h2>
            <p className="text-lg text-gray-600 mb-8">
              25개의 질문을 통해 당신의 커리어 강점을 발견해보세요
            </p>

            <div className="stats stats-vertical lg:stats-horizontal shadow mb-8">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div className="stat-title">질문 수</div>
                <div className="stat-value text-primary">25개</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <div className="stat-title">소요 시간</div>
                <div className="stat-value text-secondary">15분</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div className="stat-title">분석 성향</div>
                <div className="stat-value text-accent">12가지</div>
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

