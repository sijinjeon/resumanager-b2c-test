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
      r = parseInt(cleanHex.slice(0, 2), 16)
      g = parseInt(cleanHex.slice(2, 4), 16)
      b = parseInt(cleanHex.slice(4, 6), 16)
    }
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  useEffect(() => {
    setLoading(false)
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
        background: '#ef6b3b',
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
        background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
        padding: '50px 40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
      }}>
        {/* 헤더 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '35px',
        }}>
          <div style={{ 
            fontSize: '56px', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
          }}>💼</div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            커리어 강점 진단 결과
          </h1>
          
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '20px',
            fontWeight: '500',
          }}>
            Career Strength Report
          </p>

          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, #ef6b3b 0%, #ddd7d4 100%)',
            margin: '0 auto 20px',
            borderRadius: '2px',
          }} />

          <div style={{
            display: 'inline-block',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 24px',
            fontSize: '12px',
            color: '#475569',
          }}>
            <span style={{ marginRight: '20px', fontWeight: '600' }}>
              <span style={{ color: '#94a3b8' }}>이름</span> {userName}
            </span>
            <span style={{ fontWeight: '600' }}>
              <span style={{ color: '#94a3b8' }}>진단일</span> {date}
            </span>
          </div>
        </div>

        {/* 메인 컨텐츠 - shadcn UI 스타일 2단 레이아웃 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Why 성향 - shadcn 카드 스타일 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          }}>
            {/* 헤더 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e2e8f0',
            }}>
              <div style={{ 
                fontSize: '48px',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
              }}>
                {whyPersonality.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '11px',
                  color: '#64748b',
                  fontWeight: '500',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Why · 내가 추구하는 것
                </div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '4px',
                  letterSpacing: '-0.01em',
                }}>
                  {whyPersonality.name}
                </h2>
                <p style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  fontWeight: '500',
                }}>
                  {whyPersonality.nameEn}
                </p>
              </div>
            </div>

            {/* 설명 */}
            <p style={{
              fontSize: '11px',
              lineHeight: '1.7',
              color: '#334155',
              marginBottom: '16px',
              textAlign: 'justify',
            }}>
              {whyPersonality.description}
            </p>

            {/* 키워드 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>💡</span>
                <span>대표 키워드</span>
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
                      background: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600',
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 강점 */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>⭐</span>
                <span>주요 강점</span>
              </div>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
              }}>
                {whyPersonality.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: idx < whyPersonality.strengths.length - 1 ? '8px' : '0',
                    }}
                  >
                    <span style={{
                      color: whyPersonality.color,
                      fontSize: '14px',
                      marginRight: '8px',
                      fontWeight: 'bold',
                      minWidth: '14px',
                    }}>
                      ✓
                    </span>
                    <p style={{
                      fontSize: '10px',
                      lineHeight: '1.6',
                      color: '#475569',
                      margin: 0,
                    }}>
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How 성향 - shadcn 카드 스타일 */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          }}>
            {/* 헤더 */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e2e8f0',
            }}>
              <div style={{ 
                fontSize: '48px',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
              }}>
                {howPersonality.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '11px',
                  color: '#64748b',
                  fontWeight: '500',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  How · 내가 일하는 방식
                </div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '4px',
                  letterSpacing: '-0.01em',
                }}>
                  {howPersonality.name}
                </h2>
                <p style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  fontWeight: '500',
                }}>
                  {howPersonality.nameEn}
                </p>
              </div>
            </div>

            {/* 설명 */}
            <p style={{
              fontSize: '11px',
              lineHeight: '1.7',
              color: '#334155',
              marginBottom: '16px',
              textAlign: 'justify',
            }}>
              {howPersonality.description}
            </p>

            {/* 키워드 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>💡</span>
                <span>대표 키워드</span>
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
                      background: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: '600',
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 강점 */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <span>⭐</span>
                <span>주요 강점</span>
              </div>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
              }}>
                {howPersonality.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: idx < howPersonality.strengths.length - 1 ? '8px' : '0',
                    }}
                  >
                    <span style={{
                      color: howPersonality.color,
                      fontSize: '14px',
                      marginRight: '8px',
                      fontWeight: 'bold',
                      minWidth: '14px',
                    }}>
                      ✓
                    </span>
                    <p style={{
                      fontSize: '10px',
                      lineHeight: '1.6',
                      color: '#475569',
                      margin: 0,
                    }}>
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 - shadcn 스타일 */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '10px',
            color: '#94a3b8',
            fontWeight: '500',
          }}>
            © 2025 Career Strength Test · 커리어 강점 진단
          </p>
        </div>
      </div>
    </>
  )
}

