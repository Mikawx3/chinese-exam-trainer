'use client'

import { useState } from 'react'

interface DialogueExerciseProps {
  dialogues: Array<{
    id: string
    context?: string
    parts: Array<{
      speaker: 'A' | 'B'
      text?: string
      pinyin?: string
      isBlank: boolean
      correctAnswer?: string
      correctPinyin?: string
    }>
  }>
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function DialogueExercise({ dialogues, onComplete }: DialogueExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const getExplanation = (part: { correctAnswer?: string; correctPinyin?: string }, userAnswer: string, isCorrect: boolean): string => {
    if (!part.correctAnswer) return ''
    
    // Analyser le type de réponse selon les structures courantes
    let grammarRule = ''
    if (part.correctAnswer.includes('什么')) {
      grammarRule = 'La réponse contient "什么" (shénme = quoi), ce qui indique qu\'il s\'agit d\'une question sur un objet ou une chose. En chinois, les questions avec "什么" nécessitent une réponse qui identifie l\'objet demandé.'
    } else if (part.correctAnswer.includes('谁')) {
      grammarRule = 'La réponse contient "谁" (shéi = qui), ce qui indique qu\'il s\'agit d\'une question sur une personne. La réponse doit identifier la personne concernée.'
    } else if (part.correctAnswer.includes('哪里') || part.correctAnswer.includes('哪儿')) {
      grammarRule = 'La réponse contient "哪里/哪儿" (nǎlǐ/nǎr = où), ce qui indique qu\'il s\'agit d\'une question sur un lieu. La réponse doit indiquer un endroit.'
    } else if (part.correctAnswer.includes('几点') || part.correctAnswer.includes('什么时候')) {
      grammarRule = 'La réponse concerne le temps. "几点" (jǐ diǎn) demande une heure précise, "什么时候" (shénme shíhòu) demande un moment. La réponse doit fournir une information temporelle.'
    } else if (part.correctAnswer.includes('吗') || part.correctAnswer.includes('？')) {
      grammarRule = 'Il s\'agit d\'une question. En chinois, les questions se forment soit avec "吗" (ma) en fin de phrase, soit avec des mots interrogatifs (什么, 谁, 哪里, etc.). La réponse doit correspondre au type de question posée.'
    } else if (part.correctAnswer.includes('有')) {
      grammarRule = 'La réponse contient "有" (yǒu = avoir/exister). Dans un dialogue, "有" peut exprimer la possession, l\'existence, ou être utilisé dans des structures comme "有没有" (avoir ou non). La réponse doit être cohérente avec le contexte.'
    } else if (part.correctAnswer.includes('是')) {
      grammarRule = 'La réponse contient "是" (shì = être). "是" est utilisé pour les phrases d\'identification et d\'attribution. La structure est: Sujet + 是 + Attribut.'
    } else {
      grammarRule = 'En chinois, les dialogues suivent des règles de cohérence discursive : chaque réplique doit répondre logiquement à la précédente. Les questions nécessitent des réponses appropriées, et les déclarations peuvent être suivies d\'accords, de désaccords, ou de questions de suivi.'
    }
    
    if (isCorrect) {
      return `Correct ! Dans ce contexte de dialogue, "${part.correctAnswer}" (${part.correctPinyin || ''}) est la réponse appropriée. ${grammarRule} Cette réponse respecte les règles de cohérence conversationnelle en chinois et s'enchaîne naturellement avec les répliques précédentes.`
    }
    
    return `La réponse correcte est "${part.correctAnswer}" (${part.correctPinyin || ''}). ${grammarRule} En chinois, les dialogues suivent des règles de cohérence : chaque réplique doit répondre logiquement à la précédente selon le type de question ou de déclaration. La réponse doit respecter la structure grammaticale et la logique conversationnelle.`
  }

  const handleAnswerChange = (blankId: string, value: string) => {
    setAnswers({ ...answers, [blankId]: value })
  }

  const normalizeAnswer = (answer: string): string => {
    return answer.trim().toLowerCase().replace(/\s+/g, '')
  }

  const handleSubmit = () => {
    let correct = 0
    let totalBlanks = 0
    
    dialogues.forEach((dialogue) => {
      dialogue.parts.forEach((part, index) => {
        if (part.isBlank && part.correctAnswer) {
          totalBlanks++
          const blankId = `${dialogue.id}-${index}`
          const userAnswer = normalizeAnswer(answers[blankId] || '')
          const correctAnswer = normalizeAnswer(part.correctAnswer)
          if (userAnswer === correctAnswer) {
            correct++
          }
        }
      })
    })
    
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>八、完成对话 (Complétez les dialogues)</h3>
      {dialogues.map((dialogue) => (
        <div key={dialogue.id} style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
          {dialogue.context && (
            <div style={{ marginBottom: '15px', color: '#666', fontStyle: 'italic' }}>
              {dialogue.context}
            </div>
          )}
          <div style={{ lineHeight: '2' }}>
            {dialogue.parts.map((part, index) => {
              const blankId = `${dialogue.id}-${index}`
              const userAnswer = answers[blankId] || ''
              const isCorrect = Boolean(submitted && part.isBlank && part.correctAnswer && 
                normalizeAnswer(userAnswer) === normalizeAnswer(part.correctAnswer))
              const isIncorrect = submitted && part.isBlank && userAnswer && !isCorrect

              if (part.isBlank) {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{part.speaker}:</strong>{' '}
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(blankId, e.target.value)}
                      disabled={submitted}
                      placeholder="?"
                      style={{
                        padding: '8px 12px',
                        border: `2px solid ${submitted ? (isCorrect ? '#28a745' : isIncorrect ? '#dc3545' : '#ddd') : '#667eea'}`,
                        borderRadius: '5px',
                        fontSize: '1em',
                        minWidth: '200px'
                      }}
                    />
                    {submitted && part.correctAnswer && (
                      <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '5px', padding: '8px', fontSize: '0.9em' }}>
                        {isCorrect ? (
                          <div>
                            <span>✓ Correct</span>
                            <div style={{ marginTop: '5px', padding: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
                              <strong>Explication :</strong> {getExplanation(part, userAnswer, isCorrect ?? false)}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span>✗ Bonne réponse : {part.correctAnswer} {part.correctPinyin && `(${part.correctPinyin})`}</span>
                            <div style={{ marginTop: '5px', padding: '5px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
                              <strong>Explication :</strong> {getExplanation(part, userAnswer, isCorrect ?? false)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              } else {
                return (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{part.speaker}:</strong>{' '}
                    <div style={{ display: 'inline-block' }}>
                      <span className="chinese-text">{part.text}</span>
                      {part.pinyin && (
                        <div style={{ color: '#666', marginTop: '5px' }}>{part.pinyin}</div>
                      )}
                    </div>
                  </div>
                )
              }
            })}
          </div>
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
            Score: {score} / {dialogues.reduce((sum, d) => sum + d.parts.filter(p => p.isBlank).length, 0)}
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleReset}>
              ↻ Refaire
            </button>
          </div>
        </>
      )}
    </div>
  )
}

