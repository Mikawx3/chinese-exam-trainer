'use client'

import { useState } from 'react'

interface Exercise {
  id: string
  title: string
  questions: Array<{
    question: string
    chinese?: string
    options?: string[]
    correctAnswer: string | number | string[]
    explanation?: string
    hint?: string
  }>
}

interface TextInputExerciseProps {
  exercise: Exercise
}

export default function TextInputExercise({ exercise }: TextInputExerciseProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const question = exercise.questions[currentQuestion]

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, ' ')
  }

  const checkAnswer = (user: string, correct: string | number | string[]): boolean => {
    const normalizedUser = normalizeAnswer(user)
    
    if (Array.isArray(correct)) {
      return correct.some(c => normalizeAnswer(String(c)) === normalizedUser)
    }
    
    return normalizeAnswer(String(correct)) === normalizedUser
  }

  const handleSubmit = () => {
    if (!userAnswer.trim()) return
    
    setAnswered(true)
    setShowFeedback(true)
    
    if (checkAnswer(userAnswer, question.correctAnswer)) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer('')
      setShowFeedback(false)
      setAnswered(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setUserAnswer('')
    setShowFeedback(false)
    setScore(0)
    setAnswered(false)
  }

  const progress = ((currentQuestion + 1) / exercise.questions.length) * 100
  const isLastQuestion = currentQuestion === exercise.questions.length - 1
  const isCorrect = answered && checkAnswer(userAnswer, question.correctAnswer)

  return (
    <div>
      <h2 className="exercise-title">{exercise.title}</h2>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="score">
        Question {currentQuestion + 1} / {exercise.questions.length} | Score: {score} / {exercise.questions.length}
      </div>

      <div className="question-container">
        <div className="question-text">{question.question}</div>
        {question.chinese && (
          <div className="chinese-text">{question.chinese}</div>
        )}
        {question.hint && !answered && (
          <div style={{ marginTop: '10px', color: '#666', fontStyle: 'italic' }}>
            Indice : {question.hint}
          </div>
        )}

        <input
          type="text"
          className="input-field"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !answered) {
              handleSubmit()
            }
          }}
          placeholder="Tapez votre réponse..."
          disabled={answered}
          style={{
            borderColor: answered
              ? isCorrect
                ? '#28a745'
                : '#dc3545'
              : undefined
          }}
        />

        {!answered && userAnswer.trim() && (
          <button className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Valider
          </button>
        )}

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <strong>✓ Correct !</strong>
                {question.explanation && <div style={{ marginTop: '10px' }}>{question.explanation}</div>}
              </div>
            ) : (
              <div>
                <strong>✗ Incorrect</strong>
                <div style={{ marginTop: '10px' }}>
                  La bonne réponse est : <strong>
                    {Array.isArray(question.correctAnswer)
                      ? question.correctAnswer.join(' ou ')
                      : question.correctAnswer}
                  </strong>
                </div>
                {question.explanation && <div style={{ marginTop: '10px' }}>{question.explanation}</div>}
              </div>
            )}
          </div>
        )}

        {showFeedback && (
          <div className="navigation">
            {!isLastQuestion ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Question suivante →
              </button>
            ) : (
              <div>
                <div style={{ marginBottom: '20px', fontSize: '1.3em', textAlign: 'center' }}>
                  <strong>Exercice terminé !</strong>
                  <div style={{ marginTop: '10px' }}>
                    Score final : {score} / {exercise.questions.length}
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleRestart}>
                  Recommencer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

