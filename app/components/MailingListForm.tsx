'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MailingListForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      alert('올바른 이메일 주소를 입력해주세요.')
      return
    }

    setStatus('loading')
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('mailing_list')
        .insert({ email })

      if (error) {
        if (error.code === '23505') { // Unique violation
          alert('이미 등록된 이메일입니다.')
          setStatus('idle')
        } else {
          throw error
        }
      } else {
        setStatus('success')
        setEmail('')
        alert('메일링 리스트에 등록되었습니다! 오픈 시 가장 먼저 알려드릴게요.')
      }
    } catch (e) {
      console.error('Error adding to mailing list:', e)
      setErrorMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      setStatus('error')
    } finally {
      if (status !== 'success') {
        setStatus('idle')
      }
    }
  }

  return (
    <div id="mailing-section" className="w-full max-w-md mx-auto animate-fade-in-up delay-300">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex gap-2">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력하세요" 
          className="flex-1 input input-ghost bg-transparent focus:bg-transparent border-none focus:outline-none px-4 text-slate-900"
          disabled={status === 'loading' || status === 'success'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
        <button 
          className="btn bg-[#ef6b3b] hover:bg-[#ef6b3b]/90 text-white border-none rounded-xl px-6 disabled:bg-slate-300"
          onClick={handleSubmit}
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? '등록 중...' : status === 'success' ? '등록 완료' : '오픈 알림 받기'}
        </button>
      </div>
      <p className="text-sm text-slate-500 mt-3">
        * 서비스가 오픈되면 가장 먼저 알려드립니다.
      </p>
    </div>
  )
}


