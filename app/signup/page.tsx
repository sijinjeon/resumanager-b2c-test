'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Supabase 회원가입
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // 회원가입 성공
        alert('회원가입이 완료되었습니다! 이메일을 확인해주세요.')
        router.push('/login')
      }
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.')
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
            <h2 className="text-2xl font-bold mt-4 text-gray-800">회원가입</h2>
            <p className="text-gray-600 mt-2">나의 커리어 강점을 발견하세요</p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* 회원가입 폼 */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* 이름 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">이름</span>
              </label>
              <input
                type="text"
                placeholder="홍길동"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="최소 6자 이상"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  최소 6자 이상 입력해주세요
                </span>
              </label>
            </div>

            {/* 가입 버튼 */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? '처리 중...' : '가입하기'}
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className="divider">또는</div>
          <div className="text-center">
            <span className="text-gray-600">이미 계정이 있으신가요? </span>
            <Link href="/login" className="link link-primary font-semibold">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

