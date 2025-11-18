import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 헤더 - shadcn 스타일 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl">💼</div>
            <span className="text-xl font-bold text-slate-900">강점진단</span>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              로그인
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2 text-sm font-medium text-white bg-[#ef6b3b] hover:bg-[#ef6b3b]/90 rounded-lg transition-all shadow-sm hover:shadow"
            >
              시작하기
            </Link>
          </div>
        </nav>
      </header>

      {/* 메인 히어로 섹션 - shadcn 스타일 */}
      <main className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 tracking-tight">
            나의 커리어 강점을
            <br />
            <span className="text-[#ef6b3b]">발견하세요</span>
          </h1>
          
          {/* 서브 타이틀 */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
            25개 질문으로 알아보는 나의 성향
            <br />
            무료 PDF 리포트로 받아보세요
          </p>

          {/* CTA 버튼 - shadcn 스타일 */}
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#ef6b3b] hover:bg-[#ef6b3b]/90 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 mb-16"
          >
            무료로 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* 특징 카드 - shadcn 스타일 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl">
            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">15분 소요</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  간단하고 빠르게
                  <br />
                  나의 성향을 파악
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">12가지 성향</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  과학적으로 검증된
                  <br />
                  커리어 성향 분석
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">무료 PDF</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  이메일로 받는
                  <br />
                  맞춤형 진단 보고서
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 12가지 성향 미리보기 - shadcn 스타일 */}
        <section className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
            12가지 커리어 성향
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            당신의 성향을 정확하게 분석합니다
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: '기존', icon: '📚' },
              { name: '새로움', icon: '✨' },
              { name: '안정', icon: '🛡️' },
              { name: '도전', icon: '🚀' },
              { name: '목표', icon: '🎯' },
              { name: '목적', icon: '💡' },
              { name: '정보', icon: '📊' },
              { name: '인사이트', icon: '🔍' },
              { name: '사람', icon: '👥' },
              { name: '상황', icon: '🎭' },
              { name: '함께', icon: '🤝' },
              { name: '내가', icon: '💪' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-[#ef6b3b]/50 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-slate-700">{item.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 - shadcn 스타일 */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">
            © 2025 강점진단 · Career Strength Test
          </p>
        </div>
      </footer>
    </div>
  )
}

