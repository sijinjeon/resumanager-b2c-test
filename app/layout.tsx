import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '레쥬매니저 - 나의 커리어 강점을 발견하세요',
  description: '25개 질문으로 알아보는 나의 커리어 성향',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-base-200">{children}</body>
    </html>
  )
}

