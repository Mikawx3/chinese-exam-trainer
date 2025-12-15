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
}

export default function MatchingExercise({ leftItems, rightItems, correctPairs, onComplete, title }: MatchingExerciseProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

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

  const getItemText = (item: MatchingItem) => {
    return item.pinyin ? `${item.text} (${item.pinyin})` : item.text
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
              {getItemText(item)}
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ marginBottom: '15px', color: '#764ba2' }}>Colonne B</h4>
          {rightItems.map((item) => {
            const isPaired = Object.values(pairs).includes(item.id)
            const isCorrect = correctPairs.some(([left, right]) => pairs[left] === item.id && right === item.id)
            return (
              <div
                key={item.id}
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
                {getItemText(item)}
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
        <div className="score">
          Score: {score} / {leftItems.length}
        </div>
      )}
    </div>
  )
}

