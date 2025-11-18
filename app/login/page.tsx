'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (data.user) {
        // 로그인 성공
        router.push('/test')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white shadow-2xl">
        <div className="card-body">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <Link href="/" className="text-3xl font-bold text-primary">
              💼 강점진단
            </Link>
            <h2 className="text-2xl font-bold mt-4 text-gray-800">로그인</h2>
            <p className="text-gray-600 mt-2">다시 만나서 반가워요!</p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* 이메일 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">이메일</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* 비밀번호 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">비밀번호</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <Link href="/reset-password" className="label-text-alt link link-hover">
                  비밀번호를 잊으셨나요?
                </Link>
              </label>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? '처리 중...' : '로그인'}
            </button>
          </form>

          {/* 회원가입 링크 */}
          <div className="divider">또는</div>
          <div className="text-center">
            <span className="text-gray-600">아직 계정이 없으신가요? </span>
            <Link href="/signup" className="link link-primary font-semibold">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

