'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'next/navigation'
import personalities from '@/data/personalities.json'
import type { PersonalityType, Personality } from '@/lib/types'

const PAGE_CONTAINER_STYLE: CSSProperties = {
  width: '210mm',
  minHeight: '297mm',
  background: '#ffffff',
  padding: '40px',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif',
}

export default function PrintResultClient() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)

  const userName = searchParams.get('name') || '사용자'
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
  const personalityType = searchParams.get('type') as PersonalityType

  const personality = personalities[personalityType] as Personality

  useEffect(() => {
    setLoading(false)
    setTimeout(() => {
      window.print()
    }, 800)
  }, [])

  if (loading || !personality) {
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

      {/* 1페이지 - Why 리포트 */}
      <div style={PAGE_CONTAINER_STYLE}>
        {/* 헤더 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #f1f5f9',
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            🎯 강점진단 Why 리포트
          </h1>

          <div style={{
            display: 'inline-flex',
            gap: '20px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '10px 24px',
            fontSize: '13px',
            color: '#475569',
          }}>
            <span>
              <span style={{ color: '#94a3b8', marginRight: '8px' }}>이름</span>
              <strong>{userName}</strong>
            </span>
            <span>
              <span style={{ color: '#94a3b8', marginRight: '8px' }}>진단일</span>
              <strong>{date}</strong>
            </span>
          </div>
        </div>

        {/* 성향 카드 헤더 */}
        <div style={{
          background: personality.color,
          borderRadius: '16px 16px 0 0',
          padding: '24px',
          color: 'white',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontSize: '56px' }}>{personality.icon}</div>
            <div>
              <div style={{
                fontSize: '14px',
                opacity: 0.9,
                marginBottom: '4px',
              }}>
                나의 Why 성향
              </div>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                {personality.name}
              </h2>
              <p style={{
                fontSize: '16px',
                opacity: 0.9,
              }}>
                {personality.nameEn}
              </p>
            </div>
          </div>
        </div>

        {/* 성향 카드 본문 */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderTop: 'none',
          borderRadius: '0 0 16px 16px',
          padding: '28px',
        }}>
          {/* Why 요약 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid #e2e8f0',
          }}>
            <div style={{
              display: 'inline-block',
              background: personality.color + '15',
              padding: '12px 32px',
              borderRadius: '50px',
              marginBottom: '16px',
            }}>
              <span style={{
                fontSize: '28px',
                fontWeight: '700',
                color: personality.color,
              }}>
                "{personality.why.summary}"
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
              {personality.why.verbs.map((verb, idx) => (
                <span
                  key={idx}
                  style={{
                    background: personality.color + '20',
                    color: personality.color,
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                >
                  {verb}
                </span>
              ))}
            </div>
          </div>

          {/* Why 설명 문장 */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#334155',
              textAlign: 'center',
              lineHeight: '1.6',
            }}>
              {personality.why.sentence}
            </p>
          </div>

          {/* Why 설명 문단 */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: personality.color,
              }}></span>
              나의 Why에 대하여
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#475569',
              textAlign: 'justify',
            }}>
              {personality.why.paragraph}
            </p>
          </div>

          {/* 건축물 비유 */}
          <div style={{
            background: '#fafafa',
            borderRadius: '12px',
            padding: '20px',
            border: `2px solid ${personality.color}30`,
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: personality.color,
              }}></span>
              나를 닮은 건축물: {personality.building.name}
            </h3>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.7',
              color: '#64748b',
              marginBottom: '12px',
            }}>
              {personality.building.description}
            </p>
            <div style={{
              background: personality.color + '15',
              borderLeft: `3px solid ${personality.color}`,
              padding: '12px 16px',
              borderRadius: '0 8px 8px 0',
            }}>
              <p style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#334155',
                lineHeight: '1.6',
              }}>
                {personality.building.connection}
              </p>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '11px',
            color: '#94a3b8',
          }}>
            © 2025 강점진단 · Career Strength Report
          </p>
        </div>
      </div>
    </>
  )
}
