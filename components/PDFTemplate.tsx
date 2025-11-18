import type { Personality } from '@/lib/types'

interface PDFTemplateProps {
  userName: string
  date: string
  whyPersonality: Personality
  howPersonality: Personality
}

// HEX 색상을 RGBA로 변환하는 헬퍼 함수
function hexToRgba(hex: string, opacity: number): string {
  // #RGB 또는 #RRGGBB 형식 지원
  const cleanHex = hex.replace('#', '')
  
  let r: number, g: number, b: number
  
  if (cleanHex.length === 3) {
    // #RGB 형식
    r = parseInt(cleanHex[0] + cleanHex[0], 16)
    g = parseInt(cleanHex[1] + cleanHex[1], 16)
    b = parseInt(cleanHex[2] + cleanHex[2], 16)
  } else {
    // #RRGGBB 형식
    r = parseInt(cleanHex.slice(0, 2), 16)
    g = parseInt(cleanHex.slice(2, 4), 16)
    b = parseInt(cleanHex.slice(4, 6), 16)
  }
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export default function PDFTemplate({ 
  userName, 
  date, 
  whyPersonality, 
  howPersonality 
}: PDFTemplateProps) {
  return (
    <div 
      id="pdf-content" 
      style={{
        all: 'initial',
        width: '210mm',
        minHeight: '297mm',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#333333',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* 페이지 1: 표지 */}
      <div style={{
        width: '100%',
        height: '297mm',
        background: 'linear-gradient(135deg, #fff5f0 0%, #ffffff 50%, #fff5f0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        boxSizing: 'border-box',
        pageBreakAfter: 'always',
      }}>
        {/* 로고/아이콘 */}
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>💼</div>
        
        {/* 메인 타이틀 */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#eb6339',
          margin: '0 0 10px 0',
          textAlign: 'center',
        }}>
          커리어 강점 진단 결과
        </h1>
        
        <h2 style={{
          fontSize: '24px',
          color: '#666',
          margin: '0 0 60px 0',
          fontWeight: 'normal',
        }}>
          Career Strength Report
        </h2>

        {/* 구분선 */}
        <div style={{
          width: '200px',
          height: '2px',
          background: '#eb6339',
          margin: '0 0 40px 0',
        }}></div>

        {/* 사용자 정보 */}
        <div style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#666',
          marginBottom: '60px',
        }}>
          <p style={{ margin: '10px 0' }}>
            <strong>이름:</strong> {userName}
          </p>
          <p style={{ margin: '10px 0' }}>
            <strong>진단일:</strong> {date}
          </p>
        </div>

        {/* 결과 요약 박스 */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#999',
            margin: '0 0 20px 0',
          }}>
            나의 커리어 성향
          </p>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
              {whyPersonality.icon}
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: whyPersonality.color,
              margin: '0',
            }}>
              {whyPersonality.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#999',
              margin: '5px 0 0 0',
            }}>
              {whyPersonality.nameEn}
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '24px',
            color: '#ccc',
            margin: '10px 0',
          }}>
            +
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
              {howPersonality.icon}
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: howPersonality.color,
              margin: '0',
            }}>
              {howPersonality.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#999',
              margin: '5px 0 0 0',
            }}>
              {howPersonality.nameEn}
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <p style={{
          position: 'absolute',
          bottom: '30px',
          left: '0',
          right: '0',
          textAlign: 'center',
          fontSize: '12px',
          color: '#ccc',
        }}>
          Powered by Career Strength Test
        </p>
      </div>

      {/* 페이지 2: Why 성향 */}
      <div style={{
        width: '100%',
        minHeight: '297mm',
        padding: '40px',
        boxSizing: 'border-box',
        pageBreakAfter: 'always',
      }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#eb6339',
            margin: '0 0 10px 0',
          }}>
            나의 Why 성향
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#999',
            margin: '0',
          }}>
            내가 추구하는 결과와 방향성
          </p>
        </div>

        {/* 성향 카드 */}
        <div style={{
          background: hexToRgba(whyPersonality.color, 0.08),
          border: `3px solid ${whyPersonality.color}`,
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}>
            <div style={{ fontSize: '64px' }}>
              {whyPersonality.icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: whyPersonality.color,
                margin: '0',
              }}>
                {whyPersonality.name}
              </h3>
              <p style={{
                fontSize: '18px',
                color: '#666',
                margin: '5px 0 0 0',
              }}>
                {whyPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0',
          }}>
            {whyPersonality.description}
          </p>
        </div>

        {/* 키워드 */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
          }}>
            💡 대표 키워드
          </h4>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {whyPersonality.keywords.map((keyword, idx) => (
              <span
                key={idx}
                style={{
                  background: hexToRgba(whyPersonality.color, 0.12),
                  color: whyPersonality.color,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 강점 */}
        <div>
          <h4 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
          }}>
            ⭐ 주요 강점
          </h4>
          <div style={{ paddingLeft: '10px' }}>
            {whyPersonality.strengths.map((strength, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <span style={{
                  color: whyPersonality.color,
                  fontSize: '18px',
                  marginRight: '10px',
                  fontWeight: 'bold',
                }}>
                  ✓
                </span>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#555',
                  margin: '0',
                }}>
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 페이지 3: How 성향 */}
      <div style={{
        width: '100%',
        minHeight: '297mm',
        padding: '40px',
        boxSizing: 'border-box',
      }}>
        {/* 헤더 */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#8b5cf6',
            margin: '0 0 10px 0',
          }}>
            나의 How 성향
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#999',
            margin: '0',
          }}>
            내가 일하는 방식과 스타일
          </p>
        </div>

        {/* 성향 카드 */}
        <div style={{
          background: hexToRgba(howPersonality.color, 0.08),
          border: `3px solid ${howPersonality.color}`,
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}>
            <div style={{ fontSize: '64px' }}>
              {howPersonality.icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: howPersonality.color,
                margin: '0',
              }}>
                {howPersonality.name}
              </h3>
              <p style={{
                fontSize: '18px',
                color: '#666',
                margin: '5px 0 0 0',
              }}>
                {howPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#444',
            margin: '0',
          }}>
            {howPersonality.description}
          </p>
        </div>

        {/* 키워드 */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
          }}>
            💡 대표 키워드
          </h4>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {howPersonality.keywords.map((keyword, idx) => (
              <span
                key={idx}
                style={{
                  background: hexToRgba(howPersonality.color, 0.12),
                  color: howPersonality.color,
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* 강점 */}
        <div>
          <h4 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
          }}>
            ⭐ 주요 강점
          </h4>
          <div style={{ paddingLeft: '10px' }}>
            {howPersonality.strengths.map((strength, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <span style={{
                  color: howPersonality.color,
                  fontSize: '18px',
                  marginRight: '10px',
                  fontWeight: 'bold',
                }}>
                  ✓
                </span>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#555',
                  margin: '0',
                }}>
                  {strength}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div style={{
          marginTop: '60px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#999',
            margin: '0',
          }}>
            © 2025 Career Strength Test. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

