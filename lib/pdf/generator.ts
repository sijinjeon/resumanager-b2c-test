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

export async function generatePDF(data: PDFData): Promise<void> {
  const { userName, date } = data

  // PDF 생성할 HTML 엘리먼트
  const element = document.getElementById('pdf-content')
  
  if (!element) {
    throw new Error('PDF 콘텐츠를 찾을 수 없습니다.')
  }

  const opt = {
    margin: 0,
    filename: `강점진단_${userName}_${date}.pdf`,
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

  await html2pdf().set(opt).from(element).save()
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

