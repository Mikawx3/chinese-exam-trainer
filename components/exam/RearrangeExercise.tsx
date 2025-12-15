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
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function RearrangeExercise({ questions, onComplete, onPrevious, onNext, onReset }: RearrangeExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<Record<string, number[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setSelectedWords({})
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (q: { correctSentence: string; correctPinyin: string }, userOrder: number[], isCorrect: boolean): string => {
    // Analyser la structure de la phrase correcte
    const sentence = q.correctSentence
    let structure = ''
    
    if (sentence.includes('在')) {
      structure = 'La phrase contient "在" (zài) qui indique le lieu. Structure: Sujet + 在 + Lieu + Verbe. Exemple: 我在图书馆学习 (Je suis à la bibliothèque pour étudier).'
    } else if (sentence.includes('跟') || sentence.includes('和')) {
      structure = 'La phrase contient "跟/和" (gēn/hé = avec) pour exprimer la compagnie. Structure: Sujet1 + 跟/和 + Sujet2 + Verbe. Exemple: 我跟朋友见面 (Je rencontre des amis).'
    } else if (sentence.includes('想') || sentence.includes('要')) {
      structure = 'La phrase contient "想/要" (xiǎng/yào = vouloir) pour exprimer une intention. Structure: Sujet + 想/要 + Verbe + Objet. Exemple: 我想去公园 (Je veux aller au parc).'
    } else if (sentence.includes('有')) {
      structure = 'La phrase contient "有" (yǒu = avoir/exister) pour exprimer la possession ou l\'existence. Structure: Lieu + 有 + Objet ou Sujet + 有 + Objet. Exemple: 食堂前面有一个超市 (Il y a un supermarché devant la cantine).'
    } else {
      structure = 'Structure de base SVO (Sujet-Verbe-Objet) : Le sujet vient en premier, suivi du verbe, puis du complément d\'objet. Les compléments de lieu et de temps se placent généralement avant le verbe.'
    }
    
    if (isCorrect) {
      return `Correct ! L'ordre des mots "${q.correctSentence}" (${q.correctPinyin}) respecte la structure grammaticale chinoise. ${structure} En chinois, l'ordre des mots est fixe et détermine le sens de la phrase.`
    }
    
    return `L'ordre correct est "${q.correctSentence}" (${q.correctPinyin}). ${structure} En chinois, l'ordre des mots suit des règles strictes : Sujet + (Temps) + (Lieu) + Verbe + Objet. Changer l'ordre change le sens ou rend la phrase incorrecte.`
  }

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
                <div>
                  <div style={{ marginBottom: '5px' }}>
                    {userOrder.map((idx, i) => (
                      <span key={i}>
                        <span className="chinese-text" style={{ fontSize: '1.2em' }}>{q.words[idx].word}</span>
                        {i < userOrder.length - 1 && ' '}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9em' }}>
                    {userOrder.map((idx, i) => (
                      <span key={i}>
                        {q.words[idx].pinyin}
                        {i < userOrder.length - 1 && ' '}
                      </span>
                    ))}
                  </div>
                </div>
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
                    <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                      <strong>Explication :</strong> {getExplanation(q, userOrder, isCorrect)}
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>✗ Incorrect</strong>
                    <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctSentence} ({q.correctPinyin})</div>
                    <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                      <strong>Explication :</strong> {getExplanation(q, userOrder, isCorrect)}
                    </div>
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

