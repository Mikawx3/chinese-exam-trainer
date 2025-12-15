'use client'

import { useState } from 'react'

interface FillInBlanksExerciseProps {
  sentences: Array<{
    id: string
    sentence: string
    blanks: Array<{ position: number; correctAnswer: string }>
  }>
  wordBank: Array<{ id: string; word: string; pinyin: string }>
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function FillInBlanksExercise({ sentences, wordBank, onComplete, onPrevious, onNext, onReset }: FillInBlanksExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<Record<string, string>>({})
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setSelectedWords({})
    setUsedWords(new Set())
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (sentence: { id: string; sentence: string; blanks: Array<{ position: number; correctAnswer: string }> }, selectedWordId: string | undefined, isCorrect: boolean): string => {
    const blank = sentence.blanks[0]
    const selectedWord = wordBank.find(w => w.id === selectedWordId)
    
    if (isCorrect && selectedWord) {
      return `Le mot ${selectedWord.word} (${selectedWord.pinyin}) est correct car il complète grammaticalement et sémantiquement la phrase "${sentence.sentence.replace('___', selectedWord.word)}".`
    }
    return `Le mot correct est ${blank.correctAnswer} car il s'intègre parfaitement dans le contexte de la phrase. ${selectedWord ? `Vous avez choisi ${selectedWord.word} (${selectedWord.pinyin}) qui ne convient pas ici.` : ''}`
  }

  const handleWordSelect = (blankId: string, wordId: string) => {
    if (submitted) return

    // Libérer le mot précédemment utilisé par ce blank
    if (selectedWords[blankId]) {
      const newUsed = new Set(Array.from(usedWords).filter(id => id !== selectedWords[blankId]))
      setUsedWords(newUsed)
    }

    // Libérer le blank qui utilisait ce mot
    const currentBlank = Object.keys(selectedWords).find(b => selectedWords[b] === wordId)
    if (currentBlank && currentBlank !== blankId) {
      const newSelected = { ...selectedWords }
      delete newSelected[currentBlank]
      setSelectedWords(newSelected)
      const newUsed = new Set(Array.from(usedWords).filter(id => id !== wordId))
      setUsedWords(newUsed)
    }

    // Assigner le nouveau mot
    setSelectedWords({ ...selectedWords, [blankId]: wordId })
    setUsedWords(new Set([...Array.from(usedWords), wordId]))
  }

  const handleSubmit = () => {
    let correct = 0
    let totalBlanks = 0
    
    sentences.forEach((sentence) => {
      sentence.blanks.forEach((blank) => {
        totalBlanks++
        const blankId = `${sentence.id}-${blank.position}`
        const selectedWord = wordBank.find(w => w.id === selectedWords[blankId])
        if (selectedWord && selectedWord.word === blank.correctAnswer) {
          correct++
        }
      })
    })
    
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  const renderSentence = (sentence: { id: string; sentence: string; blanks: Array<{ position: number; correctAnswer: string }> }) => {
    const parts = sentence.sentence.split('___')
    const blankId = `${sentence.id}-${sentence.blanks[0].position}`
    const selectedWord = wordBank.find(w => w.id === selectedWords[blankId])
    const isCorrect = submitted && selectedWord && selectedWord.word === sentence.blanks[0].correctAnswer
    const isIncorrect = submitted && selectedWord && !isCorrect

    return (
      <div key={sentence.id} style={{ marginBottom: '25px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
        <div style={{ fontSize: '1.2em', marginBottom: '15px', lineHeight: '1.8' }}>
          {parts[0]}
          <span
            style={{
              padding: '5px 10px',
              margin: '0 5px',
              border: `2px solid ${
                selectedWord
                  ? submitted
                    ? isCorrect
                      ? '#28a745'
                      : '#dc3545'
                    : '#667eea'
                  : '#ddd'
              }`,
              background: selectedWord
                ? submitted
                  ? isCorrect
                    ? '#28a745'
                    : '#dc3545'
                  : '#e7f3ff'
                : 'white',
              color: selectedWord && submitted ? 'white' : '#333',
              borderRadius: '5px',
              display: 'inline-block',
              minWidth: '100px',
              textAlign: 'center'
            }}
          >
            {selectedWord ? selectedWord.word : '___'}
          </span>
          {parts[1]}
        </div>
        {submitted && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '10px', marginBottom: '15px' }}>
            <strong>Explication :</strong> {getExplanation(sentence, blankId, isCorrect ?? false)}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {wordBank.map((word) => {
            const isSelected = selectedWords[blankId] === word.id
            const isUsed = usedWords.has(word.id) && !isSelected
            
            return (
              <button
                key={word.id}
                onClick={() => handleWordSelect(blankId, word.id)}
                disabled={submitted || isUsed}
                style={{
                  padding: '8px 15px',
                  border: `2px solid ${isSelected ? (submitted ? (isCorrect ? '#28a745' : '#dc3545') : '#667eea') : isUsed ? '#ccc' : '#ddd'}`,
                  background: isSelected ? (submitted ? (isCorrect ? '#28a745' : '#dc3545') : '#667eea') : isUsed ? '#f0f0f0' : 'white',
                  color: isSelected && submitted ? 'white' : isUsed ? '#999' : '#333',
                  borderRadius: '8px',
                  cursor: submitted || isUsed ? 'default' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {word.word} ({word.pinyin})
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="question-container">
      <h3>五、选词填空 (Choisissez les mots pour remplir les blancs)</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>Chaque mot ne peut être utilisé qu'une seule fois</p>
      
      {sentences.map(renderSentence)}

      {!submitted && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Valider
        </button>
      )}
      {submitted && (
        <>
          <div className="score">
            Score: {score} / {sentences.reduce((sum, s) => sum + s.blanks.length, 0)}
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

