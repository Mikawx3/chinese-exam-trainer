'use client'

import { useState } from 'react'

interface DialogueExerciseProps {
  dialogues: Array<{
    id: string
    context?: string
    parts: Array<{
      speaker: 'A' | 'B'
      text?: string
      pinyin?: string
      isBlank: boolean
      correctAnswer?: string
      correctPinyin?: string
    }>
  }>
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function DialogueExercise({ dialogues, onComplete }: DialogueExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const getExplanation = (part: { correctAnswer?: string; correctPinyin?: string }, userAnswer: string, isCorrect: boolean): string => {
    if (isCorrect && part.correctAnswer) {
      return `Correct ! Dans ce contexte de dialogue, "${part.correctAnswer}" (${part.correctPinyin || ''}) est la réponse appropriée qui s'enchaîne naturellement avec les répliques précédentes.`
    }
    return `La réponse correcte est "${part.correctAnswer || ''}" (${part.correctPinyin || ''}) car elle s'intègre logiquement dans le contexte du dialogue et répond de manière appropriée à la question ou à la déclaration précédente.`
  }

  const handleAnswerChange = (blankId: string, value: string) => {
    setAnswers({ ...answers, [blankId]: value })
  }

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, '')
  }

  const handleSubmit = () => {
    let correct = 0
    let totalBlanks = 0
    
    dialogues.forEach((dialogue) => {
      dialogue.parts.forEach((part, index) => {
        if (part.isBlank && part.correctAnswer) {
          totalBlanks++
          const blankId = `${dialogue.id}-${index}`
          const userAnswer = normalizeAnswer(answers[blankId] || '')
          const correctAnswer = normalizeAnswer(part.correctAnswer)
          if (userAnswer === correctAnswer) {
            correct++
          }
        }
      })
    })
    
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>八、完成对话 (Complétez les dialogues)</h3>
      {dialogues.map((dialogue) => (
        <div key={dialogue.id} style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
          {dialogue.context && (
            <div style={{ marginBottom: '15px', color: '#666', fontStyle: 'italic' }}>
              {dialogue.context}
            </div>
          )}
          <div style={{ lineHeight: '2' }}>
            {dialogue.parts.map((part, index) => {
              const blankId = `${dialogue.id}-${index}`
              const userAnswer = answers[blankId] || ''
              const isCorrect = Boolean(submitted && part.isBlank && part.correctAnswer && 
                normalizeAnswer(userAnswer) === normalizeAnswer(part.correctAnswer))
              const isIncorrect = submitted && part.isBlank && userAnswer && !isCorrect

              if (part.isBlank) {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{part.speaker}:</strong>{' '}
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(blankId, e.target.value)}
                      disabled={submitted}
                      placeholder="?"
                      style={{
                        padding: '8px 12px',
                        border: `2px solid ${submitted ? (isCorrect ? '#28a745' : isIncorrect ? '#dc3545' : '#ddd') : '#667eea'}`,
                        borderRadius: '5px',
                        fontSize: '1em',
                        minWidth: '200px'
                      }}
                    />
                    {submitted && part.correctAnswer && (
                      <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '5px', padding: '8px', fontSize: '0.9em' }}>
                        {isCorrect ? (
                          <div>
                            <span>✓ Correct</span>
                            <div style={{ marginTop: '5px', padding: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
                              <strong>Explication :</strong> {getExplanation(part, userAnswer, isCorrect ?? false)}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span>✗ Bonne réponse : {part.correctAnswer} {part.correctPinyin && `(${part.correctPinyin})`}</span>
                            <div style={{ marginTop: '5px', padding: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
                              <strong>Explication :</strong> {getExplanation(part, userAnswer, isCorrect ?? false)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              } else {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{part.speaker}:</strong>{' '}
                    <span className="chinese-text">{part.text}</span>
                    {part.pinyin && (
                      <span style={{ marginLeft: '10px', color: '#666' }}>({part.pinyin})</span>
                    )}
                  </div>
                )
              }
            })}
          </div>
        </div>
      ))}
      {!submitted && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Valider
        </button>
      )}
      {submitted && (
        <>
          <div className="score">
            Score: {score} / {dialogues.reduce((sum, d) => sum + d.parts.filter(p => p.isBlank).length, 0)}
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleReset}>
              ↻ Refaire
            </button>
          </div>
        </>
      )}
    </div>
  )
}

