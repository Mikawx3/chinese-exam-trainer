'use client'

import { useState } from 'react'

interface FillInBlanksExerciseProps {
  sentences: Array<{
    id: string
    sentence: string
    pinyin?: string
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
    const correctWord = wordBank.find(w => w.word === blank.correctAnswer)
    
    // Règles grammaticales pour les mots courants
    const wordRules: Record<string, string> = {
      '想': '想 (xiǎng) signifie "vouloir/souhaiter" et s\'utilise avant un verbe pour exprimer une intention. Structure: 想 + verbe.',
      '在': '在 (zài) signifie "être en train de" et s\'utilise avant un verbe pour indiquer une action en cours. Structure: 在 + verbe.',
      '很': '很 (hěn) est un adverbe d\'intensité qui modifie les adjectifs. Il s\'utilise entre le sujet et l\'adjectif : 主语 + 很 + 形容词.',
      '也': '也 (yě) signifie "aussi" et s\'utilise avant le verbe pour indiquer une similarité. Structure: 主语 + 也 + verbe.',
      '都': '都 (dōu) signifie "tous/toutes" et s\'utilise après le sujet pluriel et avant le verbe. Structure: 主语(复数) + 都 + verbe.',
      '还': '还 (hái) signifie "encore/également" et s\'utilise avant le verbe pour ajouter une information supplémentaire.',
      '不': '不 (bù) est la négation standard et s\'utilise avant le verbe ou l\'adjectif pour former la négation.',
      '没': '没 (méi) est la négation pour les actions passées et s\'utilise avant le verbe. Structure: 没 + verbe.',
      '的': '的 (de) est une particule possessive qui relie le possesseur au possédé. Structure: 名词1 + 的 + 名词2.',
      '了': '了 (le) est une particule aspectuelle qui indique la complétion d\'une action. Elle se place après le verbe.',
      '吗': '吗 (ma) est une particule interrogative qui transforme une phrase déclarative en question. Elle se place en fin de phrase.',
      '呢': '呢 (ne) est une particule interrogative utilisée pour demander "et...?" ou dans les questions alternatives.'
    }
    
    if (isCorrect && selectedWord) {
      const rule = wordRules[selectedWord.word]
      if (rule) {
        return `Correct ! ${rule} Dans cette phrase, ${selectedWord.word} (${selectedWord.pinyin}) est grammaticalement correct car il respecte cette règle et s'intègre sémantiquement dans le contexte.`
      }
      return `Correct ! Le mot ${selectedWord.word} (${selectedWord.pinyin}) est correct car il respecte l'ordre des mots chinois (SVO) et s'intègre grammaticalement dans la phrase. En chinois, la position des mots détermine leur fonction grammaticale.`
    }
    
    const rule = correctWord ? wordRules[blank.correctAnswer] : null
    if (rule) {
      return `Incorrect. ${rule} Le mot correct est ${blank.correctAnswer} car il respecte cette règle grammaticale. ${selectedWord ? `Le mot ${selectedWord.word} (${selectedWord.pinyin}) ne convient pas ici car il viole les règles de placement ou de sémantique.` : ''}`
    }
    
    return `Incorrect. Le mot correct est ${blank.correctAnswer} car il respecte l'ordre des mots chinois (Sujet-Verbe-Objet) et la structure grammaticale de la phrase. ${selectedWord ? `Le mot ${selectedWord.word} (${selectedWord.pinyin}) ne peut pas être utilisé ici car sa position ou sa fonction grammaticale ne correspond pas au contexte.` : ''} En chinois, chaque mot a une position spécifique selon sa fonction.`
  }

  const handleWordSelect = (blankId: string, wordId: string) => {
    if (submitted) return

    // Si le mot est déjà sélectionné pour ce blank, on le désélectionne
    if (selectedWords[blankId] === wordId) {
      const newSelected = { ...selectedWords }
      delete newSelected[blankId]
      setSelectedWords(newSelected)
      // Retirer le mot de la liste des mots utilisés
      const newUsed = new Set(Array.from(usedWords).filter(id => id !== wordId))
      setUsedWords(newUsed)
      return
    }

    // Calculer les nouveaux états de manière atomique
    const newSelected = { ...selectedWords }
    const newUsed = new Set(Array.from(usedWords))

    // Libérer le mot précédemment utilisé par ce blank
    const previousWord = selectedWords[blankId]
    if (previousWord) {
      newUsed.delete(previousWord)
    }

    // Libérer le blank qui utilisait ce mot
    const currentBlank = Object.keys(selectedWords).find(b => selectedWords[b] === wordId)
    if (currentBlank && currentBlank !== blankId) {
      delete newSelected[currentBlank]
      newUsed.delete(wordId)
    }

    // Assigner le nouveau mot
    newSelected[blankId] = wordId
    newUsed.add(wordId)
    
    setSelectedWords(newSelected)
    setUsedWords(newUsed)
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

  const renderSentence = (sentence: { id: string; sentence: string; pinyin?: string; blanks: Array<{ position: number; correctAnswer: string }> }) => {
    const parts = sentence.sentence.split('___')
    const blankId = `${sentence.id}-${sentence.blanks[0].position}`
    const selectedWord = wordBank.find(w => w.id === selectedWords[blankId])
    const isCorrect = submitted && selectedWord && selectedWord.word === sentence.blanks[0].correctAnswer
    const isIncorrect = submitted && selectedWord && !isCorrect

    return (
      <div key={sentence.id} style={{ marginBottom: '25px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '1.2em', lineHeight: '1.8' }}>
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
          {sentence.pinyin && (
            <div style={{ color: '#666', marginTop: '5px', fontSize: '0.9em', lineHeight: '1.8' }}>
              {sentence.pinyin}
            </div>
          )}
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
                <div>
                  <span className="chinese-text">{word.word}</span>
                  <div style={{ color: isSelected && submitted ? 'rgba(255,255,255,0.9)' : isUsed ? '#999' : '#666', marginTop: '3px', fontSize: '0.85em' }}>
                    {word.pinyin}
                  </div>
                </div>
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

