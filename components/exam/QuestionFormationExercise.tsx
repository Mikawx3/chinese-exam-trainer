'use client'

import { useState } from 'react'

interface QuestionFormationExerciseProps {
  questions: Array<{
    id: string
    sentence: string
    pinyin: string
    underlinedPart: string
    correctQuestion: string
    correctPinyin: string
  }>
  onComplete: (score: number) => void
}

export default function QuestionFormationExercise({ questions, onComplete }: QuestionFormationExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value })
  }

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, '')
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q) => {
      const userAnswer = normalizeAnswer(answers[q.id] || '')
      const correctAnswer = normalizeAnswer(q.correctQuestion)
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
      <h3>六、就划线部分提问 (Faites des questions sur les parties soulignées)</h3>
      {questions.map((q) => {
        const userAnswer = answers[q.id] || ''
        const isCorrect = submitted && normalizeAnswer(userAnswer) === normalizeAnswer(q.correctQuestion)
        const isIncorrect = submitted && userAnswer && !isCorrect

        return (
          <div key={q.id} style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div className="chinese-text" style={{ fontSize: '1.3em' }}>{q.sentence}</div>
              <div style={{ color: '#666', marginTop: '5px' }}>{q.pinyin}</div>
              <div style={{ marginTop: '10px', color: '#667eea', fontWeight: 'bold' }}>
                Partie soulignée : {q.underlinedPart}
              </div>
            </div>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Votre question :</div>
            <input
              type="text"
              className="input-field"
              value={userAnswer}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              disabled={submitted}
              placeholder="Écrivez la question en chinois"
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
                    <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctQuestion} ({q.correctPinyin})</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
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

