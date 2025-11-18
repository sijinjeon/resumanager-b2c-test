'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import personalities from '@/data/personalities.json'
import type { PersonalityType, Personality } from '@/lib/types'

export default function PrintPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  
  const userName = searchParams.get('name') || '사용자'
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
  const whyType = searchParams.get('why') as PersonalityType
  const howType = searchParams.get('how') as PersonalityType

  const whyPersonality = personalities[whyType] as Personality
  const howPersonality = personalities[howType] as Personality

  const hexToRgba = (hex: string, opacity: number): string => {
    const cleanHex = hex.replace('#', '')
    let r: number, g: number, b: number
    
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16)
      g = parseInt(cleanHex[1] + cleanHex[1], 16)
      b = parseInt(cleanHex[2] + cleanHex[2], 16)
    } else {
      r = parseInt(cleanHex.slice( 0, 2), 16)
      g = parseInt(cleanHex.slice(2, 4), 16)
      b = parseInt(cleanHex.slice(4, 6), 16)
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  useEffect(() => {
    setLoading(false)
    // 페이지 로드 후 자동으로 인쇄 대화상자 열기
    setTimeout(() => {
      window.print()
    }, 800)
  }, [])

  if (loading || !whyPersonality || !howPersonality) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>
        PDF 생성 중...
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
        
        @media screen {
          .print-only {
            display: none;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      {/* 화면용 안내 메시지 */}
      <div className="no-print" style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#eb6339',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}>
        💡 인쇄 대화상자에서 <strong>"PDF로 저장"</strong>을 선택하세요!
      </div>

      {/* 1페이지 - 모든 내용 */}
      <div style={{
        width: '210mm',
        minHeight: '297mm',
        background: '#ffffff',
        padding: '40px 30px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>💼</div>
        
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#eb6339',
          marginBottom: '6px',
          textAlign: 'center',
        }}>
          커리어 강점 진단 결과
        </h1>
        
        <p style={{
          fontSize: '12px',
          color: '#999999',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          Career Strength Report
        </p>

        <div style={{
          width: '80px',
          height: '2px',
          background: '#eb6339',
          margin: '0 auto 15px',
        }} />

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#666666',
          marginBottom: '30px',
        }}>
          <span style={{ marginRight: '15px' }}><strong>이름:</strong> {userName}</span>
          <span><strong>진단일:</strong> {date}</span>
        </div>

        {/* 메인 컨텐츠 - 2단 레이아웃 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px',
        }}>
          {/* Why 성향 */}
          <div style={{
            background: hexToRgba(whyPersonality.color, 0.08),
            border: `2px solid ${whyPersonality.color}`,
            borderRadius: '10px',
            padding: '20px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: `2px solid ${hexToRgba(whyPersonality.color, 0.2)}`,
            }}>
              <div style={{ fontSize: '40px' }}>
                {whyPersonality.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '10px',
                  color: '#999999',
                  marginBottom: '2px',
                }}>
                  나의 Why 성향
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: whyPersonality.color,
                  marginBottom: '2px',
                }}>
                  {whyPersonality.name}
                </h2>
                <p style={{
                  fontSize: '10px',
                  color: '#666666',
                }}>
                  {whyPersonality.nameEn}
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '11px',
              lineHeight: '1.6',
              color: '#444444',
              marginBottom: '12px',
            }}>
              {whyPersonality.description}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333333',
                marginBottom: '6px',
              }}>
                💡 대표 키워드
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
              }}>
                {whyPersonality.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: hexToRgba(whyPersonality.color, 0.15),
                      color: whyPersonality.color,
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '10px',
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
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333333',
                marginBottom: '6px',
              }}>
                ⭐ 주요 강점
              </div>
              {whyPersonality.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '5px',
                  }}
                >
                  <span style={{
                    color: whyPersonality.color,
                    fontSize: '12px',
                    marginRight: '5px',
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </span>
                  <p style={{
                    fontSize: '10px',
                    lineHeight: '1.5',
                    color: '#555555',
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
            borderRadius: '10px',
            padding: '20px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: `2px solid ${hexToRgba(howPersonality.color, 0.2)}`,
            }}>
              <div style={{ fontSize: '40px' }}>
                {howPersonality.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '10px',
                  color: '#999999',
                  marginBottom: '2px',
                }}>
                  나의 How 성향
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: howPersonality.color,
                  marginBottom: '2px',
                }}>
                  {howPersonality.name}
                </h2>
                <p style={{
                  fontSize: '10px',
                  color: '#666666',
                }}>
                  {howPersonality.nameEn}
                </p>
              </div>
            </div>

            <p style={{
              fontSize: '11px',
              lineHeight: '1.6',
              color: '#444444',
              marginBottom: '12px',
            }}>
              {howPersonality.description}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333333',
                marginBottom: '6px',
              }}>
                💡 대표 키워드
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
              }}>
                {howPersonality.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: hexToRgba(howPersonality.color, 0.15),
                      color: howPersonality.color,
                      padding: '3px 8px',
                      borderRadius: '10px',
                      fontSize: '10px',
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
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333333',
                marginBottom: '6px',
              }}>
                ⭐ 주요 강점
              </div>
              {howPersonality.strengths.map((strength, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '5px',
                  }}
                >
                  <span style={{
                    color: howPersonality.color,
                    fontSize: '12px',
                    marginRight: '5px',
                    fontWeight: 'bold',
                  }}>
                    ✓
                  </span>
                  <p style={{
                    fontSize: '10px',
                    lineHeight: '1.5',
                    color: '#555555',
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
          marginTop: '20px',
          paddingTop: '15px',
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

      {/* 아래 내용 모두 삭제 */}
      <div style={{ display: 'none' }}>
        width: '210mm',
        minHeight: '297mm',
        padding: '50px',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#eb6339',
            marginBottom: '10px',
          }}>
            나의 Why 성향
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#999999',
          }}>
            내가 추구하는 결과와 방향성
          </p>
        </div>

        <div style={{
          background: `${whyPersonality.color}15`,
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
                fontSize: '32px',
                fontWeight: 'bold',
                color: whyPersonality.color,
                marginBottom: '5px',
              }}>
                {whyPersonality.name}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666666',
              }}>
                {whyPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#444444',
          }}>
            {whyPersonality.description}
          </p>
        </div>

        <h4 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: '15px',
        }}>
          💡 대표 키워드
        </h4>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '30px',
        }}>
          {whyPersonality.keywords.map((keyword, idx) => (
            <span
              key={idx}
              style={{
                background: `${whyPersonality.color}20`,
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

        <h4 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333333',
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
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555555',
              }}>
                {strength}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지 3: How 성향 */}
      <div style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '50px',
        background: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#8b5cf6',
            marginBottom: '10px',
          }}>
            나의 How 성향
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#999999',
          }}>
            내가 일하는 방식과 스타일
          </p>
        </div>

        <div style={{
          background: `${howPersonality.color}15`,
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
                fontSize: '32px',
                fontWeight: 'bold',
                color: howPersonality.color,
                marginBottom: '5px',
              }}>
                {howPersonality.name}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666666',
              }}>
                {howPersonality.nameEn}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#444444',
          }}>
            {howPersonality.description}
          </p>
        </div>

        <h4 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: '15px',
        }}>
          💡 대표 키워드
        </h4>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '30px',
        }}>
          {howPersonality.keywords.map((keyword, idx) => (
            <span
              key={idx}
              style={{
                background: `${howPersonality.color}20`,
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

        <h4 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333333',
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
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555555',
              }}>
                {strength}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '50px',
          paddingTop: '20px',
          borderTop: '1px solid #eeeeee',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#999999',
          }}>
            © 2025 Career Strength Test. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}

