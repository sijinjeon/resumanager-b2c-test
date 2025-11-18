import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * HTML 요소를 PDF로 변환하여 다운로드
 */
export async function downloadPDF(
  elementId: string,
  fileName: string
): Promise<void> {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.')
  }

  try {
    // HTML을 캔버스로 변환
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels
      height: 1123, // A4 height in pixels
    })

    // 캔버스를 이미지로 변환
    const imgData = canvas.toDataURL('image/png')
    
    // PDF 생성 (A4 사이즈)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // 이미지를 PDF에 추가 (전체 페이지)
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')

    // PDF 다운로드
    pdf.save(fileName)
  } catch (error) {
    console.error('PDF 생성 오류:', error)
    throw error
  }
}

/**
 * HTML 요소를 Base64 PDF로 변환 (이메일용)
 */
export async function generatePDFBase64(
  elementId: string
): Promise<string> {
  const element = document.getElementById(elementId)
  
  if (!element) {
    throw new Error('PDF로 변환할 요소를 찾을 수 없습니다.')
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
    })

    const imgData = canvas.toDataURL('image/png')
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')

    // Base64로 변환
    const pdfBase64 = pdf.output('datauristring').split(',')[1]
    return pdfBase64
  } catch (error) {
    console.error('PDF Base64 생성 오류:', error)
    throw error
  }
}

