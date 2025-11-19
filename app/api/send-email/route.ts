import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, userName, pdfBase64, whyName, howName } = body

    if (!email || !userName || !pdfBase64) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // Resend 인스턴스 생성 (런타임에만)
    const resend = new Resend(process.env.RESEND_API_KEY)

    // PDF를 Buffer로 변환
    const pdfBuffer = Buffer.from(pdfBase64, 'base64')
    const today = new Date().toISOString().split('T')[0]

    // 이메일 전송
    const { data, error } = await resend.emails.send({
      from: 'Career Strength <noreply@yourdomain.com>',
      to: [email],
      subject: `${userName}님의 레쥬매니저 결과가 도착했습니다! 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #eb6339 0%, #f59e0b 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 10px;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              .result-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 4px solid #eb6339;
              }
              .button {
                display: inline-block;
                background: #eb6339;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #999;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 레쥬매니저 결과</h1>
              <p>${userName}님의 커리어 강점을 분석했습니다</p>
            </div>
            
            <div class="content">
              <h2>안녕하세요, ${userName}님!</h2>
              <p>
                25개의 질문에 대한 답변을 바탕으로<br>
                ${userName}님의 커리어 강점을 분석했습니다.
              </p>
              
              <div class="result-box">
                <h3 style="margin-top: 0; color: #eb6339;">나의 Why 성향</h3>
                <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">
                  ${whyName}
                </p>
                <p style="color: #666;">
                  내가 추구하는 결과와 방향성
                </p>
              </div>
              
              <div class="result-box">
                <h3 style="margin-top: 0; color: #8b5cf6;">나의 How 성향</h3>
                <p style="font-size: 18px; font-weight: bold; margin: 10px 0;">
                  ${howName}
                </p>
                <p style="color: #666;">
                  내가 일하는 방식과 스타일
                </p>
              </div>
              
              <p>
                <strong>📎 첨부파일</strong>을 확인하시면<br>
                더 자세한 분석 결과를 보실 수 있습니다.
              </p>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/test" class="button">
                  다시 진단하기 →
                </a>
              </center>
            </div>
            
            <div class="footer">
              <p>
                이 이메일은 강점진단 서비스에서 발송되었습니다.<br>
                문의사항이 있으시면 답장해주세요.
              </p>
              <p style="margin-top: 10px;">
                © 2025 Career Strength Test. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `강점진단_${userName}_${today}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: '이메일 전송에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: error.message || '이메일 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

