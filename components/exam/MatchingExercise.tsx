'use client'

import { useState } from 'react'

interface MatchingItem {
  id: string
  text: string
  pinyin?: string
}

interface MatchingExerciseProps {
  leftItems: MatchingItem[]
  rightItems: MatchingItem[]
  correctPairs: Array<[string, string]>
  onComplete: (score: number) => void
  title: string
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function MatchingExercise({ leftItems, rightItems, correctPairs, onComplete, title, onPrevious, onNext, onReset }: MatchingExerciseProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setPairs({})
    setSelectedLeft(null)
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (leftId: string, rightId: string, isCorrect: boolean): string => {
    const leftItem = leftItems.find(item => item.id === leftId)
    const rightItem = rightItems.find(item => item.id === rightId)
    if (!leftItem || !rightItem) return ''
    
    // Détecter si c'est un exercice de mesure words (量词)
    const isMeasureWord = leftItem.text.length === 1 && !leftItem.pinyin?.includes(' ')
    
    if (isCorrect) {
      if (isMeasureWord) {
        return `Correct ! Le mot de mesure ${leftItem.text} (${leftItem.pinyin || ''}) est utilisé avec ${rightItem.text} car en chinois, chaque type d'objet nécessite un mot de mesure spécifique. ${leftItem.text} est le mot de mesure approprié pour ${rightItem.text} selon les règles de classification des noms chinois.`
      } else {
        return `Correct ! ${leftItem.text}${leftItem.pinyin ? ` (${leftItem.pinyin})` : ''} correspond à ${rightItem.text}${rightItem.pinyin ? ` (${rightItem.pinyin})` : ''} car c'est la traduction directe. En chinois, le vocabulaire de base correspond généralement mot à mot avec l'anglais/français pour les concepts concrets.`
      }
    }
    
    const correctRight = correctPairs.find(([l]) => l === leftId)?.[1]
    const correctRightItem = rightItems.find(item => item.id === correctRight)
    
    if (isMeasureWord) {
      return `Incorrect. Le mot de mesure ${leftItem.text} ne s'utilise pas avec ${rightItem.text}. La bonne correspondance est ${leftItem.text} + ${correctRightItem?.text || ''} car les mots de mesure chinois (量词) sont catégorisés selon la forme, la nature ou l'usage de l'objet. ${leftItem.text} est spécifiquement utilisé pour ${correctRightItem?.text || ''}.`
    } else {
      return `Incorrect. ${leftItem.text}${leftItem.pinyin ? ` (${leftItem.pinyin})` : ''} ne correspond pas à ${rightItem.text}. La bonne traduction est ${correctRightItem?.text || ''}${correctRightItem?.pinyin ? ` (${correctRightItem.pinyin})` : ''}. En chinois, certains mots ont des traductions fixes qui doivent être mémorisées.`
    }
  }

  const handleLeftClick = (leftId: string) => {
    if (submitted) return
    if (selectedLeft === leftId) {
      setSelectedLeft(null)
    } else {
      setSelectedLeft(leftId)
    }
  }

  const handleRightClick = (rightId: string) => {
    if (submitted || !selectedLeft) return
    setPairs({ ...pairs, [selectedLeft]: rightId })
    setSelectedLeft(null)
  }

  const handleSubmit = () => {
    let correct = 0
    correctPairs.forEach(([left, right]) => {
      if (pairs[left] === right) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }


  return (
    <div className="question-container">
      <h3>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>Colonne A</h4>
          {leftItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleLeftClick(item.id)}
              style={{
                padding: '15px',
                marginBottom: '10px',
                background: selectedLeft === item.id ? '#667eea' : pairs[item.id] ? '#e7f3ff' : 'white',
                color: selectedLeft === item.id ? 'white' : '#333',
                border: `2px solid ${selectedLeft === item.id ? '#667eea' : pairs[item.id] ? '#667eea' : '#ddd'}`,
                borderRadius: '8px',
                cursor: submitted ? 'default' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="chinese-text">{item.text}</div>
              {item.pinyin && (
                <div style={{ color: selectedLeft === item.id ? 'rgba(255,255,255,0.9)' : '#666', marginTop: '5px', fontSize: '0.9em' }}>
                  {item.pinyin}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ marginBottom: '15px', color: '#764ba2' }}>Colonne B</h4>
          {rightItems.map((item) => {
            const isPaired = Object.values(pairs).includes(item.id)
            const leftId = Object.keys(pairs).find(key => pairs[key] === item.id)
            const isCorrect = correctPairs.some(([left, right]) => pairs[left] === item.id && right === item.id)
            return (
              <div key={item.id}>
                <div
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    background: isPaired
                      ? submitted
                        ? isCorrect
                          ? '#28a745'
                          : '#dc3545'
                        : '#e7f3ff'
                      : 'white',
                    color: isPaired && submitted ? 'white' : '#333',
                    border: `2px solid ${
                      isPaired
                        ? submitted
                          ? isCorrect
                            ? '#28a745'
                            : '#dc3545'
                          : '#667eea'
                        : '#ddd'
                    }`,
                    borderRadius: '8px',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="chinese-text">{item.text}</div>
                  {item.pinyin && (
                    <div style={{ color: isPaired && submitted ? 'rgba(255,255,255,0.9)' : '#666', marginTop: '5px', fontSize: '0.9em' }}>
                      {item.pinyin}
                    </div>
                  )}
                </div>
                {submitted && isPaired && leftId && (
                  <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '5px', marginBottom: '15px', fontSize: '0.9em' }}>
                    <strong>Explication :</strong> {getExplanation(leftId, item.id, isCorrect)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {!submitted && (
        <button className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
          Valider
        </button>
      )}
      {submitted && (
        <>
          <div className="score">
            Score: {score} / {leftItems.length}
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            {onPrevious && (
              <button className="btn btn-secondary" onClick={onPrevious}>
                ← Section précédente
              </button>
            )}
            <button className="btn btn-primary" onClick={handleReset}>
              ↻ Refaire
            </button>
            {onNext && (
              <button className="btn btn-secondary" onClick={onNext}>
                Section suivante →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

