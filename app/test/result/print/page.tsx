import { Suspense } from 'react'
import PrintResultClient from './PrintResultClient'

export default function PrintResultPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        PDF 생성 중...
      </div>
    }>
      <PrintResultClient />
    </Suspense>
  )
}
