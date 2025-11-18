import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* 헤더 */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            💼 강점진단
          </div>
          <div className="space-x-4">
            <Link href="/login" className="btn btn-ghost">
              로그인
            </Link>
            <Link href="/signup" className="btn btn-primary">
              시작하기
            </Link>
          </div>
        </nav>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
            나의 커리어 강점을
            <br />
            <span className="text-primary">발견하세요</span>
          </h1>
          
          {/* 서브 타이틀 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
            25개 질문으로 알아보는 나의 성향
            <br />
            무료 PDF 리포트로 받아보세요
          </p>

          {/* CTA 버튼 */}
          <Link 
            href="/signup" 
            className="btn btn-primary btn-lg text-lg px-12 mb-16 shadow-lg hover:shadow-xl transition-all"
          >
            무료로 시작하기 →
          </Link>

          {/* 특징 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl">
            <div className="card bg-white shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="card-title text-xl">15분 소요</h3>
                <p className="text-gray-600">
                  간단하고 빠르게
                  <br />
                  나의 성향을 파악
                </p>
              </div>
            </div>

            <div className="card bg-white shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="card-title text-xl">12가지 성향</h3>
                <p className="text-gray-600">
                  과학적으로 검증된
                  <br />
                  커리어 성향 분석
                </p>
              </div>
            </div>

            <div className="card bg-white shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📧</div>
                <h3 className="card-title text-xl">무료 PDF</h3>
                <p className="text-gray-600">
                  이메일로 받는
                  <br />
                  맞춤형 진단 보고서
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 12가지 성향 미리보기 */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            12가지 커리어 성향
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: '기존', icon: '📚', color: 'bg-blue-100' },
              { name: '새로움', icon: '✨', color: 'bg-purple-100' },
              { name: '안정', icon: '🛡️', color: 'bg-green-100' },
              { name: '도전', icon: '🚀', color: 'bg-red-100' },
              { name: '목표', icon: '🎯', color: 'bg-yellow-100' },
              { name: '목적', icon: '💡', color: 'bg-pink-100' },
              { name: '정보', icon: '📊', color: 'bg-indigo-100' },
              { name: '인사이트', icon: '🔍', color: 'bg-cyan-100' },
              { name: '사람', icon: '👥', color: 'bg-orange-100' },
              { name: '상황', icon: '🎭', color: 'bg-teal-100' },
              { name: '함께', icon: '🤝', color: 'bg-lime-100' },
              { name: '내가', icon: '💪', color: 'bg-amber-100' },
            ].map((item, index) => (
              <div key={index} className={`${item.color} rounded-lg p-6 text-center`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-gray-800">{item.name}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 강점진단. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

