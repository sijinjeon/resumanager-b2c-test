import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { Personality } from '@/lib/types'

interface PDFDocumentProps {
  userName: string
  date: string
  whyPersonality: Personality
  howPersonality: Personality
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  coverPage: {
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#eb6339',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#eb6339',
    marginVertical: 30,
  },
  userInfo: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: '#ffffff',
    border: '2px solid #eb6339',
    borderRadius: 12,
    padding: 30,
    marginTop: 40,
    width: '80%',
  },
  resultLabel: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 15,
  },
  personalityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  personalityNameEn: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 20,
  },
  plus: {
    fontSize: 20,
    color: '#cccccc',
    textAlign: 'center',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 25,
  },
  card: {
    borderRadius: 12,
    padding: 25,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardIcon: {
    fontSize: 48,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  description: {
    fontSize: 13,
    lineHeight: 1.8,
    color: '#444444',
  },
  keywordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 25,
    marginBottom: 12,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 25,
  },
  keyword: {
    padding: '6 12',
    borderRadius: 15,
    fontSize: 11,
    fontWeight: 'bold',
  },
  strengthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  strengthCheck: {
    fontSize: 14,
    marginRight: 8,
    fontWeight: 'bold',
  },
  strengthText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#555555',
    flex: 1,
  },
  footer: {
    marginTop: 40,
    paddingTop: 15,
    borderTop: '1px solid #eeeeee',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#999999',
  },
})

export default function PDFDocument({ 
  userName, 
  date, 
  whyPersonality, 
  howPersonality 
}: PDFDocumentProps) {
  return (
    <Document>
      {/* 페이지 1: 표지 */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.icon}>💼</Text>
        <Text style={styles.mainTitle}>커리어 강점 진단 결과</Text>
        <Text style={styles.subtitle}>Career Strength Report</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.userInfo}>이름: {userName}</Text>
        <Text style={styles.userInfo}>진단일: {date}</Text>
        
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>나의 커리어 성향</Text>
          
          <Text style={styles.icon}>{whyPersonality.icon}</Text>
          <Text style={[styles.personalityName, { color: whyPersonality.color }]}>
            {whyPersonality.name}
          </Text>
          <Text style={styles.personalityNameEn}>{whyPersonality.nameEn}</Text>
          
          <Text style={styles.plus}>+</Text>
          
          <Text style={styles.icon}>{howPersonality.icon}</Text>
          <Text style={[styles.personalityName, { color: howPersonality.color }]}>
            {howPersonality.name}
          </Text>
          <Text style={styles.personalityNameEn}>{howPersonality.nameEn}</Text>
        </View>
        
        <Text style={[styles.footerText, { marginTop: 60 }]}>
          Powered by Career Strength Test
        </Text>
      </Page>

      {/* 페이지 2: Why 성향 */}
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 25 }}>
          <Text style={[styles.sectionTitle, { color: '#eb6339' }]}>
            나의 Why 성향
          </Text>
          <Text style={styles.sectionSubtitle}>
            내가 추구하는 결과와 방향성
          </Text>
        </View>
        
        <View style={[styles.card, { 
          backgroundColor: hexToRgba(whyPersonality.color, 0.08),
          border: `3px solid ${whyPersonality.color}`
        }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>{whyPersonality.icon}</Text>
            <View>
              <Text style={[styles.cardTitle, { color: whyPersonality.color }]}>
                {whyPersonality.name}
              </Text>
              <Text style={styles.cardSubtitle}>{whyPersonality.nameEn}</Text>
            </View>
          </View>
          <Text style={styles.description}>{whyPersonality.description}</Text>
        </View>
        
        <Text style={styles.keywordTitle}>💡 대표 키워드</Text>
        <View style={styles.keywordContainer}>
          {whyPersonality.keywords.map((keyword, idx) => (
            <View 
              key={idx} 
              style={[styles.keyword, { 
                backgroundColor: hexToRgba(whyPersonality.color, 0.12),
              }]}
            >
              <Text style={{ color: whyPersonality.color }}>{keyword}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.strengthTitle}>⭐ 주요 강점</Text>
        {whyPersonality.strengths.map((strength, idx) => (
          <View key={idx} style={styles.strengthItem}>
            <Text style={[styles.strengthCheck, { color: whyPersonality.color }]}>
              ✓
            </Text>
            <Text style={styles.strengthText}>{strength}</Text>
          </View>
        ))}
      </Page>

      {/* 페이지 3: How 성향 */}
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 25 }}>
          <Text style={[styles.sectionTitle, { color: '#8b5cf6' }]}>
            나의 How 성향
          </Text>
          <Text style={styles.sectionSubtitle}>
            내가 일하는 방식과 스타일
          </Text>
        </View>
        
        <View style={[styles.card, { 
          backgroundColor: hexToRgba(howPersonality.color, 0.08),
          border: `3px solid ${howPersonality.color}`
        }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>{howPersonality.icon}</Text>
            <View>
              <Text style={[styles.cardTitle, { color: howPersonality.color }]}>
                {howPersonality.name}
              </Text>
              <Text style={styles.cardSubtitle}>{howPersonality.nameEn}</Text>
            </View>
          </View>
          <Text style={styles.description}>{howPersonality.description}</Text>
        </View>
        
        <Text style={styles.keywordTitle}>💡 대표 키워드</Text>
        <View style={styles.keywordContainer}>
          {howPersonality.keywords.map((keyword, idx) => (
            <View 
              key={idx} 
              style={[styles.keyword, { 
                backgroundColor: hexToRgba(howPersonality.color, 0.12),
              }]}
            >
              <Text style={{ color: howPersonality.color }}>{keyword}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.strengthTitle}>⭐ 주요 강점</Text>
        {howPersonality.strengths.map((strength, idx) => (
          <View key={idx} style={styles.strengthItem}>
            <Text style={[styles.strengthCheck, { color: howPersonality.color }]}>
              ✓
            </Text>
            <Text style={styles.strengthText}>{strength}</Text>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Career Strength Test. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// HEX 색상을 RGBA로 변환
function hexToRgba(hex: string, opacity: number): string {
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

