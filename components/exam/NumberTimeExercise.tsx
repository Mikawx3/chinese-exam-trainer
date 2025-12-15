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
    const isTime = q.chinese.includes('点') || q.chinese.includes('刻') || q.chinese.includes('分')
    const isNumber = !isTime
    
    if (userAnswer?.trim() === q.correctAnswer.trim()) {
      if (isTime) {
        return `Correct ! En chinois, l'heure se lit de manière séquentielle : ${q.chinese} signifie littéralement "${q.pinyin}". La structure est : heure (点) + minutes (分) ou "刻" (quart d'heure = 15 minutes). "差" signifie "moins" (ex: 差一刻八点 = 7:45).`
      } else {
        return `Correct ! Les nombres en chinois suivent un système décimal : ${q.chinese} (${q.pinyin}) se construit avec les unités 百 (cent), 十 (dix), et les chiffres de base. La lecture va de gauche à droite, chaque position ayant sa propre valeur.`
      }
    }
    
    if (isTime) {
      return `La réponse correcte est ${q.correctAnswer}. En chinois, pour lire l'heure : ${q.chinese} (${q.pinyin}) suit la structure "heure点 + minutes分". "一刻" = 15 minutes, "半" = 30 minutes. "差X分Y点" signifie "Y heures moins X minutes".`
    } else {
      return `La réponse correcte est ${q.correctAnswer}. Les nombres chinois utilisent un système positionnel : ${q.chinese} (${q.pinyin}) se décompose avec 百 (bǎi = 100), 十 (shí = 10), et les chiffres de 1 à 9. Chaque position se lit indépendamment.`
    }
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
            <div className="chinese-text">{q.chinese}</div>
            <div style={{ color: '#666', marginTop: '5px' }}>{q.pinyin}</div>
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

