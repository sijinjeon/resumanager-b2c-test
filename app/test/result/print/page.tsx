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

  useEffect(() => {
    setLoading(false)
    // 페이지 로드 후 자동으로 인쇄 대화상자 열기
    setTimeout(() => {
      window.print()
    }, 500)
  }, [])

  if (loading || !whyPersonality || !howPersonality) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        로딩 중...
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
          .page-break {
            page-break-after: always;
          }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      {/* 페이지 1: 표지 */}
      <div className="page-break" style={{
        width: '210mm',
        height: '297mm',
        background: 'linear-gradient(135deg, #fff5f0 0%, #ffffff 50%, #fff5f0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ fontSize: '72px', marginBottom: '30px' }}>💼</div>
        
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#eb6339',
          marginBottom: '15px',
          textAlign: 'center',
        }}>
          커리어 강점 진단 결과
        </h1>
        
        <h2 style={{
          fontSize: '24px',
          color: '#666666',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'normal',
        }}>
          Career Strength Report
        </h2>

        <div style={{
          width: '200px',
          height: '2px',
          background: '#eb6339',
          marginBottom: '40px',
        }} />

        <div style={{
          textAlign: 'center',
          fontSize: '16px',
          color: '#666666',
          marginBottom: '50px',
        }}>
          <p style={{ marginBottom: '10px' }}>
            <strong>이름:</strong> {userName}
          </p>
          <p>
            <strong>진단일:</strong> {date}
          </p>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#999999',
            marginBottom: '25px',
          }}>
            나의 커리어 성향
          </p>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
              {whyPersonality.icon}
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: whyPersonality.color,
              marginBottom: '5px',
            }}>
              {whyPersonality.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#999999',
            }}>
              {whyPersonality.nameEn}
            </p>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '24px',
            color: '#cccccc',
            margin: '15px 0',
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
              marginBottom: '5px',
            }}>
              {howPersonality.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#999999',
            }}>
              {howPersonality.nameEn}
            </p>
          </div>
        </div>

        <p style={{
          marginTop: '60px',
          fontSize: '12px',
          color: '#cccccc',
          textAlign: 'center',
        }}>
          Powered by Career Strength Test
        </p>
      </div>

      {/* 페이지 2: Why 성향 */}
      <div className="page-break" style={{
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

