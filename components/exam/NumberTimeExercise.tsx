'use client'

import { useState } from 'react'

interface Question {
  chinese: string
  pinyin: string
  correctAnswer: string
}

interface NumberTimeExerciseProps {
  questions: Question[]
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function NumberTimeExercise({ questions, onComplete, onPrevious, onNext, onReset }: NumberTimeExerciseProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (q: Question, userAnswer: string): string => {
    if (userAnswer?.trim() === q.correctAnswer.trim()) {
      return `Correct ! ${q.chinese} (${q.pinyin}) correspond bien à ${q.correctAnswer}.`
    }
    return `La réponse correcte est ${q.correctAnswer} car ${q.chinese} (${q.pinyin}) se traduit par ${q.correctAnswer} en chiffres arabes.`
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers({ ...answers, [index]: value })
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q, index) => {
      if (answers[index]?.trim() === q.correctAnswer.trim()) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>一、请写出下面的数字或时间 (Écrivez les nombres ou temps en chiffres arabes)</h3>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <span className="chinese-text">{q.chinese}</span>
            <span style={{ marginLeft: '10px', color: '#666' }}>({q.pinyin})</span>
          </div>
          <input
            type="text"
            className="input-field"
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            disabled={submitted}
            placeholder="Réponse en chiffres arabes"
            style={{
              borderColor: submitted
                ? answers[index]?.trim() === q.correctAnswer.trim()
                  ? '#28a745'
                  : '#dc3545'
                : undefined
            }}
          />
          {submitted && (
            <div className={`feedback ${answers[index]?.trim() === q.correctAnswer.trim() ? 'correct' : 'incorrect'}`} style={{ marginTop: '10px' }}>
              {answers[index]?.trim() === q.correctAnswer.trim() ? (
                <div>
                  <strong>✓ Correct</strong>
                  <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                    <strong>Explication :</strong> {getExplanation(q, answers[index] || '')}
                  </div>
                </div>
              ) : (
                <div>
                  <strong>✗ Incorrect. La bonne réponse est : {q.correctAnswer}</strong>
                  <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                    <strong>Explication :</strong> {getExplanation(q, answers[index] || '')}
                  </div>
                </div>
              )}
            </div>
          )}
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
            Score: {score} / {questions.length}
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

