'use client'

import Link from 'next/link'
import MailingListForm from './components/MailingListForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden selection:bg-[#ef6b3b] selection:text-white">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#ef6b3b]/10 blur-[60px] md:blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-blue-500/5 blur-[80px] md:blur-[120px] animate-float delay-200" />
      </div>

      {/* Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-3 md:px-6">
        <nav className="container mx-auto max-w-6xl glass rounded-2xl px-3 md:px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="text-xl md:text-2xl animate-float">💼</div>
            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">레쥬매니저</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/login"
              className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-slate-600 hover:text-[#ef6b3b] transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                alert('서비스 준비 중입니다. 메일링 리스트를 등록해주세요!')
                document.getElementById('mailing-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-white bg-[#ef6b3b] hover:bg-[#ef6b3b]/90 rounded-xl transition-all shadow-lg shadow-[#ef6b3b]/20 hover:shadow-[#ef6b3b]/40 hover:-translate-y-0.5"
            >
              서비스 오픈 알림
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 container mx-auto px-3 md:px-6 pt-28 md:pt-32 pb-12 md:pb-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/50 border border-slate-200/60 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in-up">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#ef6b3b] animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-slate-600">과학적인 커리어 성향 분석</span>
          </div>

          <h1 className="text-4xl md:text-8xl font-extrabold mb-6 md:mb-8 tracking-tight leading-tight animate-fade-in-up delay-100">
            이력서는 강점진단부터!
          </h1>

          <p className="text-base md:text-2xl text-slate-600 mb-8 md:mb-12 max-w-xl md:max-w-2xl leading-relaxed animate-fade-in-up delay-200 px-4">
            나만의 커리어 스토리를
            <br className="hidden md:block" />
            AI 커리어 컨설턴트와 정리해보세요
            <br className="hidden md:block" />
            뻔한 내용의 이력서, 자소서는 이제 그만.
            <br className="hidden md:block" />
            레쥬매니저와 함께 합격하는 지원서를 완성하세요.
          </p>

          <MailingListForm />

          {/* Features Section - Redesigned & Mobile Optimized */}
          <div className="w-full max-w-4xl mx-auto mt-16 md:mt-24 animate-fade-in-up delay-300">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-slate-100">

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
          </div>
        </div>

        {/* 12 Types Grid */}
        <section className="py-20 md:py-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900">
              12가지 커리어 성향
            </h2>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              당신은 어떤 유형인가요? 나만의 특별한 강점을 찾아보세요.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { name: '기존', icon: '📚' }, { name: '새로움', icon: '✨' },
              { name: '안정', icon: '🛡️' }, { name: '도전', icon: '🚀' },
              { name: '목표', icon: '🎯' }, { name: '목적', icon: '💡' },
              { name: '정보', icon: '📊' }, { name: '인사이트', icon: '🔍' },
              { name: '사람', icon: '👥' }, { name: '상황', icon: '🎭' },
              { name: '함께', icon: '🤝' }, { name: '내가', icon: '💪' },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-slate-100 rounded-2xl p-6 md:p-8 text-center hover:border-[#ef6b3b]/30 hover:shadow-xl hover:shadow-[#ef6b3b]/5 transition-all duration-300 cursor-default"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">{item.icon}</div>
                <div className="text-base md:text-lg font-bold text-slate-700 group-hover:text-[#ef6b3b] transition-colors">{item.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm py-8 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm md:text-base text-slate-500 font-medium">
            © 2025 레쥬매니저 · Career Strength Test
          </p>
        </div>
      </footer>
    </div>
  )
}

