import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
  const { userName, date, whyPersonality, howPersonality } = data

  // PDF 객체 생성
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20

  // 한글 폰트 설정을 위한 기본 설정
  pdf.setFont('helvetica')

  // 페이지 1: 표지
  // 배경색
  pdf.setFillColor(255, 250, 240) // 연한 오렌지
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  // 제목
  pdf.setFontSize(32)
  pdf.setTextColor(235, 99, 57) // primary color
  pdf.text('Career Strength Report', pageWidth / 2, 60, { align: 'center' })
  
  pdf.setFontSize(28)
  pdf.setTextColor(60, 60, 60)
  pdf.text('커리어 강점 진단 결과', pageWidth / 2, 75, { align: 'center' })

  // 사용자 정보
  pdf.setFontSize(14)
  pdf.setTextColor(100, 100, 100)
  pdf.text(`Name: ${userName}`, pageWidth / 2, 100, { align: 'center' })
  pdf.text(`Date: ${date}`, pageWidth / 2, 110, { align: 'center' })

  // 데코레이션
  pdf.setDrawColor(235, 99, 57)
  pdf.setLineWidth(0.5)
  pdf.line(margin, 130, pageWidth - margin, 130)

  // 요약 정보
  pdf.setFontSize(16)
  pdf.setTextColor(80, 80, 80)
  pdf.text('Your Career Personality', pageWidth / 2, 150, { align: 'center' })

  pdf.setFontSize(20)
  pdf.setTextColor(235, 99, 57)
  pdf.text(`${whyPersonality.icon} ${whyPersonality.name} (${whyPersonality.nameEn})`, pageWidth / 2, 165, { align: 'center' })
  
  pdf.setFontSize(14)
  pdf.setTextColor(100, 100, 100)
  pdf.text('+', pageWidth / 2, 175, { align: 'center' })
  
  pdf.setFontSize(20)
  pdf.setTextColor(139, 92, 246) // purple
  pdf.text(`${howPersonality.icon} ${howPersonality.name} (${howPersonality.nameEn})`, pageWidth / 2, 185, { align: 'center' })

  // 푸터
  pdf.setFontSize(10)
  pdf.setTextColor(150, 150, 150)
  pdf.text('Powered by Career Strength Test', pageWidth / 2, pageHeight - 20, { align: 'center' })

  // 페이지 2: Why 성향
  pdf.addPage()
  
  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  // 타이틀
  pdf.setFontSize(24)
  pdf.setTextColor(235, 99, 57)
  pdf.text('Why Personality - What I Pursue', margin, 30)
  
  pdf.setFontSize(20)
  pdf.setTextColor(80, 80, 80)
  pdf.text(`${whyPersonality.icon} ${whyPersonality.name} (${whyPersonality.nameEn})`, margin, 45)

  // 설명
  pdf.setFontSize(12)
  pdf.setTextColor(100, 100, 100)
  const whyDesc = pdf.splitTextToSize(whyPersonality.description, pageWidth - 2 * margin)
  pdf.text(whyDesc, margin, 60)

  // 키워드
  pdf.setFontSize(14)
  pdf.setTextColor(235, 99, 57)
  pdf.text('Keywords', margin, 85)
  
  pdf.setFontSize(11)
  pdf.setTextColor(80, 80, 80)
  const keywords = whyPersonality.keywords.join(' • ')
  pdf.text(keywords, margin, 95)

  // 강점
  pdf.setFontSize(14)
  pdf.setTextColor(235, 99, 57)
  pdf.text('Strengths', margin, 115)
  
  pdf.setFontSize(11)
  pdf.setTextColor(80, 80, 80)
  let yPosition = 125
  whyPersonality.strengths.forEach((strength, index) => {
    const wrappedText = pdf.splitTextToSize(`${index + 1}. ${strength}`, pageWidth - 2 * margin - 5)
    pdf.text(wrappedText, margin + 5, yPosition)
    yPosition += wrappedText.length * 7
  })

  // 페이지 3: How 성향
  pdf.addPage()
  
  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, pageWidth, pageHeight, 'F')

  // 타이틀
  pdf.setFontSize(24)
  pdf.setTextColor(139, 92, 246) // purple
  pdf.text('How Personality - How I Work', margin, 30)
  
  pdf.setFontSize(20)
  pdf.setTextColor(80, 80, 80)
  pdf.text(`${howPersonality.icon} ${howPersonality.name} (${howPersonality.nameEn})`, margin, 45)

  // 설명
  pdf.setFontSize(12)
  pdf.setTextColor(100, 100, 100)
  const howDesc = pdf.splitTextToSize(howPersonality.description, pageWidth - 2 * margin)
  pdf.text(howDesc, margin, 60)

  // 키워드
  pdf.setFontSize(14)
  pdf.setTextColor(139, 92, 246)
  pdf.text('Keywords', margin, 85)
  
  pdf.setFontSize(11)
  pdf.setTextColor(80, 80, 80)
  const howKeywords = howPersonality.keywords.join(' • ')
  pdf.text(howKeywords, margin, 95)

  // 강점
  pdf.setFontSize(14)
  pdf.setTextColor(139, 92, 246)
  pdf.text('Strengths', margin, 115)
  
  pdf.setFontSize(11)
  pdf.setTextColor(80, 80, 80)
  yPosition = 125
  howPersonality.strengths.forEach((strength, index) => {
    const wrappedText = pdf.splitTextToSize(`${index + 1}. ${strength}`, pageWidth - 2 * margin - 5)
    pdf.text(wrappedText, margin + 5, yPosition)
    yPosition += wrappedText.length * 7
  })

  // PDF 다운로드
  const fileName = `강점진단_${userName}_${date}.pdf`
  pdf.save(fileName)
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

