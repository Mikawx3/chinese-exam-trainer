'use client'

import { useState } from 'react'

interface ReadingComprehensionExerciseProps {
  passage: {
    text: string
    pinyin: string
  }
  questions: Array<{
    id: string
    question: string
    pinyin: string
    correctAnswer: string
    correctPinyin?: string
  }>
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function ReadingComprehensionExercise({ passage, questions, onComplete, onPrevious, onNext, onReset }: ReadingComprehensionExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (q: { question: string; correctAnswer: string; correctPinyin?: string }, userAnswer: string, isCorrect: boolean): string => {
    if (isCorrect) {
      return `Correct ! La réponse "${q.correctAnswer}" ${q.correctPinyin ? `(${q.correctPinyin})` : ''} est directement mentionnée ou peut être déduite du texte.`
    }
    return `La réponse correcte est "${q.correctAnswer}" ${q.correctPinyin ? `(${q.correctPinyin})` : ''} car elle correspond aux informations données dans le texte. Relisez attentivement le passage pour trouver la réponse.`
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, '')
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q) => {
      const userAnswer = normalizeAnswer(answers[q.id] || '')
      const correctAnswer = normalizeAnswer(q.correctAnswer)
      if (userAnswer === correctAnswer) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>九、读短文回答问题 (Lisez le passage et répondez aux questions)</h3>
      
      <div style={{ marginBottom: '30px', padding: '20px', background: '#f0f4ff', borderRadius: '10px', border: '2px solid #667eea' }}>
        <h4 style={{ marginBottom: '15px', color: '#667eea' }}>Texte :</h4>
        <div className="chinese-text" style={{ fontSize: '1.3em', lineHeight: '1.8', marginBottom: '10px' }}>
          {passage.text}
        </div>
        <div style={{ color: '#666', lineHeight: '1.8' }}>
          {passage.pinyin}
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '20px', color: '#764ba2' }}>Questions :</h4>
        {questions.map((q) => {
          const userAnswer = answers[q.id] || ''
          const isCorrect = submitted && normalizeAnswer(userAnswer) === normalizeAnswer(q.correctAnswer)
          const isIncorrect = submitted && userAnswer && !isCorrect

          return (
            <div key={q.id} style={{ marginBottom: '25px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
              <div style={{ marginBottom: '15px' }}>
                <div className="chinese-text" style={{ fontSize: '1.2em' }}>{q.question}</div>
                <div style={{ color: '#666', marginTop: '5px' }}>{q.pinyin}</div>
              </div>
              <input
                type="text"
                className="input-field"
                value={userAnswer}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={submitted}
                placeholder="Votre réponse en chinois"
                style={{
                  borderColor: submitted
                    ? isCorrect
                      ? '#28a745'
                      : isIncorrect
                      ? '#dc3545'
                      : undefined
                    : undefined
                }}
              />
              {submitted && (
                <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '10px' }}>
                  {isCorrect ? (
                    <div>
                      <strong>✓ Correct !</strong>
                      <div style={{ marginTop: '5px' }}>Votre réponse : {userAnswer}</div>
                      <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                        <strong>Explication :</strong> {getExplanation(q, userAnswer, isCorrect)}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <strong>✗ Incorrect</strong>
                      <div style={{ marginTop: '5px' }}>Votre réponse : {userAnswer}</div>
                      <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctAnswer} {q.correctPinyin && `(${q.correctPinyin})`}</div>
                      <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                        <strong>Explication :</strong> {getExplanation(q, userAnswer, isCorrect)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

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

