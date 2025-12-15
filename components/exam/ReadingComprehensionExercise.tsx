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
}

export default function ReadingComprehensionExercise({ passage, questions, onComplete }: ReadingComprehensionExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

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
                    </div>
                  ) : (
                    <div>
                      <strong>✗ Incorrect</strong>
                      <div style={{ marginTop: '5px' }}>Votre réponse : {userAnswer}</div>
                      <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctAnswer} {q.correctPinyin && `(${q.correctPinyin})`}</div>
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
        <div className="score">
          Score: {score} / {questions.length}
        </div>
      )}
    </div>
  )
}

