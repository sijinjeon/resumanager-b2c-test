import type { Personality } from '@/lib/types'

interface PDFPreviewProps {
  userName: string
  date: string
  whyPersonality: Personality
  howPersonality: Personality
}

export default function PDFPreview({ 
  userName, 
  date, 
  whyPersonality, 
  howPersonality 
}: PDFPreviewProps) {
  // HEX 색상을 RGBA로 변환하는 헬퍼 함수
  const hexToRgba = (hex: string, opacity: number): string => {
    const cleanHex = hex.replace('#', '')
    let r: number, g: number, b: number
    
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16)
      g = parseInt(cleanHex[1] + cleanHex[1], 16)
      b = parseInt(cleanHex[2] + cleanHex[2], 16)
    } else {
      r = parseInt(cleanHex.slice(0, 2), 16)
      g = parseInt(cleanHex.slice(2, 4), 16)
      b = parseInt(cleanHex.slice(4, 6), 16)
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div 
      id="pdf-preview" 
      style={{
        width: '794px', // A4 width in pixels (210mm)
        minHeight: '1123px', // A4 height in pixels (297mm)
        background: '#ffffff',
        padding: '60px 50px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
        position: 'fixed',
        left: '-10000px',
        top: 0,
        boxSizing: 'border-box',
        color: '#000000',
      }}
    >
      {/* 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>💼</div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#eb6339',
          marginBottom: '8px',
        }}>
          커리어 강점 진단 결과
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#999999',
          marginBottom: '20px',
        }}>
          Career Strength Report
        </p>
        <div style={{
          width: '100px',
          height: '2px',
          background: '#eb6339',
          margin: '0 auto 20px',
        }} />
        <div style={{
          fontSize: '14px',
          color: '#666666',
        }}>
          <span style={{ marginRight: '20px' }}><strong>이름:</strong> {userName}</span>
          <span><strong>진단일:</strong> {date}</span>
        </div>
      </div>

      {/* 메인 컨텐츠 - 2단 레이아웃 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px',
      }}>
        {/* Why 성향 */}
        <div style={{
          background: hexToRgba(whyPersonality.color, 0.08),
          border: `2px solid ${whyPersonality.color}`,
          borderRadius: '12px',
          padding: '25px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '15px',
            paddingBottom: '15px',
            borderBottom: `2px solid ${hexToRgba(whyPersonality.color, 0.2)}`,
          }}>
            <div style={{ fontSize: '48px' }}>
              {whyPersonality.icon}
            </div>
            <div>
              <div style={{
                fontSize: '11px',
                color: '#999999',
                marginBottom: '3px',
              }}>
                나의 Why 성향
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: whyPersonality.color,
                marginBottom: '3px',
              }}>
                {whyPersonality.name}
              </h2>
              <p style={{
                fontSize: '11px',
                color: '#666666',
              }}>
                {whyPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '12px',
            lineHeight: '1.7',
            color: '#444444',
            marginBottom: '15px',
          }}>
            {whyPersonality.description}
          </p>

          <div style={{ marginBottom: '15px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333333',
              marginBottom: '8px',
            }}>
              💡 대표 키워드
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {whyPersonality.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  style={{
                    background: hexToRgba(whyPersonality.color, 0.15),
                    color: whyPersonality.color,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333333',
              marginBottom: '8px',
            }}>
              ⭐ 주요 강점
            </div>
            {whyPersonality.strengths.map((strength, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}
              >
                <span style={{
                  color: whyPersonality.color,
                  fontSize: '14px',
                  marginRight: '6px',
                  fontWeight: 'bold',
                  minWidth: '14px',
                }}>
                  ✓
                </span>
                <p style={{
                  fontSize: '11px',
                  lineHeight: '1.5',
                  color: '#555555',
                  margin: 0,
                }}>
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How 성향 */}
        <div style={{
          background: hexToRgba(howPersonality.color, 0.08),
          border: `2px solid ${howPersonality.color}`,
          borderRadius: '12px',
          padding: '25px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '15px',
            paddingBottom: '15px',
            borderBottom: `2px solid ${hexToRgba(howPersonality.color, 0.2)}`,
          }}>
            <div style={{ fontSize: '48px' }}>
              {howPersonality.icon}
            </div>
            <div>
              <div style={{
                fontSize: '11px',
                color: '#999999',
                marginBottom: '3px',
              }}>
                나의 How 성향
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: howPersonality.color,
                marginBottom: '3px',
              }}>
                {howPersonality.name}
              </h2>
              <p style={{
                fontSize: '11px',
                color: '#666666',
              }}>
                {howPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '12px',
            lineHeight: '1.7',
            color: '#444444',
            marginBottom: '15px',
          }}>
            {howPersonality.description}
          </p>

          <div style={{ marginBottom: '15px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333333',
              marginBottom: '8px',
            }}>
              💡 대표 키워드
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {howPersonality.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  style={{
                    background: hexToRgba(howPersonality.color, 0.15),
                    color: howPersonality.color,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333333',
              marginBottom: '8px',
            }}>
              ⭐ 주요 강점
            </div>
            {howPersonality.strengths.map((strength, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}
              >
                <span style={{
                  color: howPersonality.color,
                  fontSize: '14px',
                  marginRight: '6px',
                  fontWeight: 'bold',
                  minWidth: '14px',
                }}>
                  ✓
                </span>
                <p style={{
                  fontSize: '11px',
                  lineHeight: '1.5',
                  color: '#555555',
                  margin: 0,
                }}>
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #eeeeee',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '10px',
          color: '#999999',
        }}>
          © 2025 Career Strength Test. All rights reserved.
        </p>
      </div>
    </div>
  )
}

