'use client'

import { useState } from 'react'

interface Exercise {
  id: string
  title: string
  questions: Array<{
    question: string
    chinese?: string
    options: string[]
    correctAnswer: number
    explanation?: string
  }>
}

interface MultipleChoiceExerciseProps {
  exercise: Exercise
}

export default function MultipleChoiceExercise({ exercise }: MultipleChoiceExerciseProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const question = exercise.questions[currentQuestion]

  const handleAnswerSelect = (index: number) => {
    if (answered) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    setAnswered(true)
    setShowFeedback(true)
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < exercise.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setAnswered(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setAnswered(false)
  }

  const progress = ((currentQuestion + 1) / exercise.questions.length) * 100
  const isLastQuestion = currentQuestion === exercise.questions.length - 1

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

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showFeedback
                  ? index === question.correctAnswer
                    ? 'correct'
                    : selectedAnswer === index && selectedAnswer !== question.correctAnswer
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {!answered && selectedAnswer !== null && (
          <button className="btn btn-primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Valider
          </button>
        )}

        {showFeedback && (
          <div className={`feedback ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
            {selectedAnswer === question.correctAnswer ? (
              <div>
                <strong>✓ Correct !</strong>
                {question.explanation && <div style={{ marginTop: '10px' }}>{question.explanation}</div>}
              </div>
            ) : (
              <div>
                <strong>✗ Incorrect</strong>
                <div style={{ marginTop: '10px' }}>
                  La bonne réponse est : <strong>{question.options[question.correctAnswer]}</strong>
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

