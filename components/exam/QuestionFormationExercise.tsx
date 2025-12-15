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
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function QuestionFormationExercise({ questions, onComplete, onPrevious, onNext, onReset }: QuestionFormationExerciseProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (q: { underlinedPart: string; correctQuestion: string; correctPinyin: string }, userAnswer: string, isCorrect: boolean): string => {
    // Détecter le type de question selon le mot interrogatif utilisé
    let questionType = ''
    let grammarRule = ''
    
    if (q.correctQuestion.includes('什么')) {
      questionType = '什么 (shénme) = "quoi/quel"'
      grammarRule = 'Utilisé pour interroger sur des objets, choses ou concepts. Remplace le nom dans la phrase. Structure: ...什么...?'
    } else if (q.correctQuestion.includes('谁') || q.correctQuestion.includes('谁')) {
      questionType = '谁 (shéi/shéi) = "qui"'
      grammarRule = 'Utilisé pour interroger sur des personnes. Remplace le sujet ou l\'objet désignant une personne. Structure: 谁 + verbe...?'
    } else if (q.correctQuestion.includes('哪里') || q.correctQuestion.includes('哪儿')) {
      questionType = '哪里/哪儿 (nǎlǐ/nǎr) = "où"'
      grammarRule = 'Utilisé pour interroger sur un lieu. Remplace le complément de lieu. Structure: ...在哪里/哪儿...?'
    } else if (q.correctQuestion.includes('怎么')) {
      questionType = '怎么 (zěnme) = "comment"'
      grammarRule = 'Utilisé pour interroger sur la manière ou la méthode. Se place avant le verbe. Structure: 怎么 + verbe...?'
    } else if (q.correctQuestion.includes('为什么')) {
      questionType = '为什么 (wèishénme) = "pourquoi"'
      grammarRule = 'Utilisé pour interroger sur la raison. Se place en début de phrase. Structure: 为什么 + phrase...?'
    } else if (q.correctQuestion.includes('几点') || q.correctQuestion.includes('什么时候')) {
      questionType = '几点/什么时候 (jǐ diǎn/shénme shíhòu) = "quelle heure/quand"'
      grammarRule = 'Utilisé pour interroger sur le temps. 几点 pour l\'heure précise, 什么时候 pour un moment général.'
    } else if (q.correctQuestion.includes('多少') || q.correctQuestion.includes('几')) {
      questionType = '多少/几 (duōshao/jǐ) = "combien"'
      grammarRule = 'Utilisé pour interroger sur la quantité. 多少 pour les grands nombres, 几 pour les petits nombres (1-10).'
    }
    
    if (isCorrect) {
      if (questionType) {
        return `Correct ! Pour interroger sur "${q.underlinedPart}", on utilise ${questionType}. ${grammarRule} La question "${q.correctQuestion}" (${q.correctPinyin}) suit cette règle grammaticale.`
      }
      return `Correct ! Pour interroger sur "${q.underlinedPart}", la question "${q.correctQuestion}" (${q.correctPinyin}) est correcte. En chinois, on forme les questions en remplaçant l'élément interrogé par le mot interrogatif approprié et en gardant la structure SVO.`
    }
    
    if (questionType) {
      return `Incorrect. Pour interroger sur "${q.underlinedPart}", on doit utiliser ${questionType}. ${grammarRule} La question correcte est "${q.correctQuestion}" (${q.correctPinyin}). En chinois, chaque type d'information (personne, lieu, temps, etc.) a son mot interrogatif spécifique.`
    }
    
    return `Incorrect. Pour interroger sur "${q.underlinedPart}", la question correcte est "${q.correctQuestion}" (${q.correctPinyin}). En chinois, on forme les questions en remplaçant l'élément interrogé par le mot interrogatif approprié (什么, 谁, 哪里, 怎么, etc.) tout en conservant l'ordre des mots SVO.`
  }

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
                    <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                      <strong>Explication :</strong> {getExplanation(q, userAnswer, isCorrect)}
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>✗ Incorrect</strong>
                    <div style={{ marginTop: '5px' }}>Votre réponse : {userAnswer}</div>
                    <div style={{ marginTop: '5px' }}>Bonne réponse : {q.correctQuestion} ({q.correctPinyin})</div>
                    <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.3)', borderRadius: '5px' }}>
                      <strong>Explication :</strong> {getExplanation(q, userAnswer, isCorrect)}
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

