import { pdf } from '@react-pdf/renderer'
import type { PersonalityType, Personality } from '@/lib/types'
import PDFDocument from '@/components/PDFDocument'

interface PDFData {
  userName: string
  date: string
  whyType: PersonalityType
  howType: PersonalityType
  whyPersonality: Personality
  howPersonality: Personality
}

/**
 * React-PDF를 사용하여 PDF 생성 (다운로드용)
 */
export async function generatePDF(data: PDFData): Promise<void> {
  const { userName, date } = data

  const blob = await pdf(
    <PDFDocument {...data} />
  ).toBlob()

  // Blob을 다운로드
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `강점진단_${userName}_${date}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * React-PDF를 사용하여 PDF를 Base64로 변환 (이메일용)
 */
export async function generatePDFBase64(data: PDFData): Promise<string> {
  const blob = await pdf(
    <PDFDocument {...data} />
  ).toBlob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64data = reader.result as string
      const base64 = base64data.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

