'use client'

import { useState } from 'react'

interface RearrangeExerciseProps {
  questions: Array<{
    id: string
    words: Array<{ word: string; pinyin: string }>
    correctOrder: number[]
    correctSentence: string
    correctPinyin: string
  }>
  onComplete: (score: number) => void
}

export default function RearrangeExercise({ questions, onComplete }: RearrangeExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<Record<string, number[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleWordClick = (questionId: string, wordIndex: number) => {
    if (submitted) return
    
    const currentOrder = selectedWords[questionId] || []
    if (currentOrder.includes(wordIndex)) {
      // Retirer le mot
      setSelectedWords({
        ...selectedWords,
        [questionId]: currentOrder.filter(i => i !== wordIndex)
      })
    } else {
      // Ajouter le mot
      setSelectedWords({
        ...selectedWords,
        [questionId]: [...currentOrder, wordIndex]
      })
    }
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q) => {
      const userOrder = selectedWords[q.id] || []
      if (userOrder.length === q.correctOrder.length &&
          userOrder.every((val, idx) => val === q.correctOrder[idx])) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>七、把下面的词语整理成句子 (Réarrangez les mots pour faire des phrases)</h3>
      {questions.map((q) => {
        const userOrder = selectedWords[q.id] || []
        const isCorrect = submitted && 
          userOrder.length === q.correctOrder.length &&
          userOrder.every((val, idx) => val === q.correctOrder[idx])

        return (
          <div key={q.id} style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong>Mots disponibles :</strong>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {q.words.map((word, index) => {
                const isSelected = userOrder.includes(index)
                const position = userOrder.indexOf(index)
                
                return (
                  <button
                    key={index}
                    onClick={() => handleWordClick(q.id, index)}
                    disabled={submitted}
                    style={{
                      padding: '10px 15px',
                      border: `2px solid ${isSelected ? '#667eea' : '#ddd'}`,
                      background: isSelected ? '#667eea' : 'white',
                      color: isSelected ? 'white' : '#333',
                      borderRadius: '8px',
                      cursor: submitted ? 'default' : 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {word.word} ({word.pinyin})
                    {isSelected && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#28a745',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {position + 1}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong>Votre phrase :</strong>
            </div>
            <div style={{
              padding: '15px',
              background: 'white',
              border: `2px solid ${submitted ? (isCorrect ? '#28a745' : '#dc3545') : '#ddd'}`,
              borderRadius: '8px',
              minHeight: '50px',
              fontSize: '1.2em'
            }}>
              {userOrder.length > 0 ? (
                userOrder.map((idx, i) => (
                  <span key={i}>
                    <span className="chinese-text" style={{ fontSize: '1.2em' }}>{q.words[idx].word}</span>
                    {i < userOrder.length - 1 && ' '}
                  </span>
                ))
              ) : (
                <span style={{ color: '#999' }}>Cliquez sur les mots dans l'ordre pour former la phrase</span>
              )}
            </div>

            {submitted && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '15px' }}>
                {isCorrect ? (
                  <div>
                    <strong>✓ Correct !</strong>
                    <div style={{ marginTop: '5px' }}>Phrase correcte : {q.correctSentence} ({q.correctPinyin})</div>
                  </div>
                ) : (
                  <div>
                    <strong>✗ Incorrect</strong>
                    <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctSentence} ({q.correctPinyin})</div>
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

