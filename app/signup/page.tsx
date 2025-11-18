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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl">💼</span>
            <span className="text-2xl font-bold text-slate-900">강점진단</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">회원가입</h2>
          <p className="text-sm text-slate-600">나의 커리어 강점을 발견하세요</p>
        </div>

        {/* 에러 메시지 - shadcn alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* 회원가입 폼 */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* 이름 - shadcn input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ef6b3b] focus:border-transparent transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 이메일 - shadcn input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              이메일
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ef6b3b] focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 - shadcn input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="최소 6자 이상"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ef6b3b] focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-slate-500 mt-1">
              최소 6자 이상 입력해주세요
            </p>
          </div>

          {/* 가입 버튼 - shadcn button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#ef6b3b] hover:bg-[#ef6b3b]/90 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                처리 중...
              </span>
            ) : '가입하기'}
          </button>
        </form>

        {/* 로그인 링크 - shadcn 스타일 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-500">또는</span>
          </div>
        </div>
        <div className="text-center text-sm">
          <span className="text-slate-600">이미 계정이 있으신가요? </span>
          <Link href="/login" className="font-semibold text-[#ef6b3b] hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  )
}

