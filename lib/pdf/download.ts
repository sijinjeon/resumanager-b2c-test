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
    throw new Error('PDF로 변환할 요소를 찾을 수 없습니다. (요소 ID: ' + elementId + ')')
  }

  console.log('PDF 생성 시작...', { elementId, fileName })

  try {
    // 요소가 제대로 렌더링될 때까지 잠깐 대기
    await new Promise(resolve => setTimeout(resolve, 100))

    console.log('html2canvas 시작...')
    
    // HTML을 캔버스로 변환
    const canvas = await html2canvas(element, {
      scale: 2, // 고해상도
      useCORS: true,
      allowTaint: true,
      logging: true, // 디버깅용
      backgroundColor: '#ffffff',
      width: 794, // A4 width in pixels
      height: 1123, // A4 height in pixels
      onclone: (clonedDoc) => {
        console.log('DOM 복제 완료')
        // 복제된 문서에서 모든 oklch 색상 제거
        const clonedElement = clonedDoc.getElementById(elementId)
        if (clonedElement) {
          // 모든 스타일을 인라인으로 고정
          clonedElement.style.all = 'initial'
          clonedElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }
      }
    })

    console.log('캔버스 생성 완료')

    // 캔버스를 이미지로 변환
    const imgData = canvas.toDataURL('image/png', 1.0)
    
    console.log('이미지 변환 완료')
    
    // PDF 생성 (A4 사이즈)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    console.log('PDF 객체 생성 완료')

    // 이미지를 PDF에 추가 (전체 페이지)
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')

    console.log('이미지 추가 완료, 다운로드 시작...')

    // PDF 다운로드
    pdf.save(fileName)
    
    console.log('PDF 다운로드 완료!')
  } catch (error: any) {
    console.error('PDF 생성 상세 오류:', error)
    console.error('오류 스택:', error.stack)
    throw new Error(`PDF 생성 실패: ${error.message}`)
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

