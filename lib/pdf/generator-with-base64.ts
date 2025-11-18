import html2pdf from 'html2pdf.js'
import type { PersonalityType, Personality } from '@/lib/types'

interface PDFData {
  userName: string
  date: string
  whyType: PersonalityType
  howType: PersonalityType
  whyPersonality: Personality
  howPersonality: Personality
}

/**
 * PDF를 생성하고 Base64로 반환 (이메일 전송용)
 */
export async function generatePDFBase64(data: PDFData): Promise<string> {
  const element = document.getElementById('pdf-content')
  
  if (!element) {
    throw new Error('PDF 콘텐츠를 찾을 수 없습니다.')
  }

  const opt = {
    margin: 0,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  }

  // PDF를 Blob으로 생성
  const pdfBlob = await html2pdf().set(opt).from(element).output('blob')
  
  // Blob을 Base64로 변환
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = reader.result as string
      // "data:application/pdf;base64," 부분 제거
      const base64 = base64data.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(pdfBlob)
  })
}

