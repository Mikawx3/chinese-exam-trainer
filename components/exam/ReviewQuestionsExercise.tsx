'use client'

import { useState } from 'react'
import { ReviewQuestion } from '@/data/reviewQuestions'

interface ReviewQuestionsExerciseProps {
  questions: ReviewQuestion[]
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function ReviewQuestionsExercise({ 
  questions, 
  onComplete, 
  onPrevious, 
  onNext, 
  onReset 
}: ReviewQuestionsExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({})
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentIndex]
  const userAnswer = answers[currentQuestion.id] || ''
  const isAnswered = userAnswer.trim().length > 0

  const normalizeAnswer = (answer: string): string => {
    return answer
      .trim()
      .toLowerCase()
      .replace(/[，。！？、]/g, '')
      .replace(/\s+/g, '')
      .replace(/吗/g, '')
      .replace(/呢/g, '')
  }

  const checkAnswer = (userQuestion: string, correctQuestion: string): boolean => {
    if (!userQuestion || !userQuestion.trim()) {
      return false
    }
    
    const normalizedUser = normalizeAnswer(userQuestion)
    const normalizedCorrect = normalizeAnswer(correctQuestion)
    
    // Vérification exacte
    if (normalizedUser === normalizedCorrect) {
      return true
    }
    
    // Vérification flexible : on cherche les mots-clés importants
    // Extraire les mots-clés de la question correcte (en ignorant les pronoms et particules)
    const removeCommonWords = (text: string) => {
      return text
        .replace(/你/g, '')
        .replace(/我/g, '')
        .replace(/他/g, '')
        .replace(/她/g, '')
        .replace(/它/g, '')
        .replace(/们/g, '')
        .replace(/的/g, '')
        .replace(/了/g, '')
        .replace(/吗/g, '')
        .replace(/呢/g, '')
        .replace(/啊/g, '')
        .replace(/吧/g, '')
        .trim()
    }
    
    const userKeyWords = removeCommonWords(normalizedUser)
    const correctKeyWords = removeCommonWords(normalizedCorrect)
    
    // Si les mots-clés sont identiques après suppression des mots communs
    if (userKeyWords === correctKeyWords && userKeyWords.length > 0) {
      return true
    }
    
    // Vérification par similarité : compter les caractères communs
    const userChars = userKeyWords.split('').filter(c => c.length > 0)
    const correctChars = correctKeyWords.split('').filter(c => c.length > 0)
    
    if (correctChars.length === 0) {
      return false
    }
    
    let matchCount = 0
    const userCharSet = new Set(userChars)
    correctChars.forEach(char => {
      if (userCharSet.has(char)) {
        matchCount++
      }
    })
    
    // Si au moins 75% des caractères importants correspondent
    const similarity = matchCount / correctChars.length
    return similarity >= 0.75
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleShowAnswer = (questionId: string) => {
    setShowAnswer({ ...showAnswer, [questionId]: true })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach((q) => {
      const userQuestion = answers[q.id] || ''
      if (userQuestion.trim().length > 0) {
        if (checkAnswer(userQuestion, q.question)) {
          correct++
        }
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setShowAnswer({})
    setScore(0)
    setCurrentIndex(0)
    if (onReset) onReset()
  }

  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).filter(id => answers[id]?.trim().length > 0).length

  return (
    <div className="question-container">
      <div style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h3 style={{ margin: 0 }}>复习问题 - 根据回答写问题 (Formuler la question)</h3>
          <div style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#667eea' }}>
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          background: '#e0e0e0', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
          已回答: {answeredCount} / {questions.length} (Questions formulées)
        </div>
      </div>

      <div style={{ 
        padding: '30px', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '15px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: '12px',
            border: '3px solid #2196f3',
            marginBottom: '20px'
          }}>
            <div style={{ 
              fontSize: '0.9em', 
              fontWeight: 'bold', 
              color: '#1976d2',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              📝 回答 (Réponse) :
            </div>
            <div style={{ 
              fontSize: '1.4em', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}>
              <span className="chinese-text">
                {currentQuestion.correctAnswer || '（示例回答 - Exemple de réponse）'}
              </span>
            </div>
            {currentQuestion.correctPinyin && (
              <div style={{ 
                color: '#666', 
                fontSize: '1.1em',
                marginTop: '8px',
                padding: '8px',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '6px'
              }}>
                {currentQuestion.correctPinyin}
              </div>
            )}
            {!currentQuestion.correctAnswer && (
              <div style={{ 
                color: '#ff9800', 
                fontSize: '0.9em',
                marginTop: '8px',
                fontStyle: 'italic'
              }}>
                ⚠️ 此问题没有示例回答 (Cette question n'a pas d'exemple de réponse)
              </div>
            )}
          </div>

          <div style={{ 
            fontSize: '0.9em', 
            color: '#666',
            marginBottom: '15px',
            padding: '10px',
            background: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffc107'
          }}>
            💡 <strong>任务 (Tâche)</strong> : 根据上面的回答，用中文写一个问题。
            <br />
            <em>Formulez une question en chinois qui correspond à cette réponse.</em>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '10px', 
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1.1em'
          }}>
            {currentQuestion.number}. 你的问题 (Votre question) :
          </label>
          <textarea
            className="input-field"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            disabled={submitted}
            placeholder="用中文写问题，例如：你叫什么名字？"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '15px',
              fontSize: '1.1em',
              borderColor: submitted 
                ? checkAnswer(userAnswer, currentQuestion.question)
                  ? '#28a745'
                  : isAnswered
                  ? '#dc3545'
                  : '#ddd'
                : isAnswered ? '#667eea' : '#ddd',
              borderRadius: '8px',
              resize: 'vertical',
              fontFamily: 'inherit',
              borderWidth: '2px'
            }}
          />
        </div>

        {submitted && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px',
            border: '2px solid',
            borderColor: checkAnswer(userAnswer, currentQuestion.question) ? '#28a745' : '#dc3545',
            background: checkAnswer(userAnswer, currentQuestion.question) 
              ? 'rgba(40, 167, 69, 0.1)' 
              : 'rgba(220, 53, 69, 0.1)'
          }}>
            {checkAnswer(userAnswer, currentQuestion.question) ? (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#28a745' }}>
                  ✓ 正确！(Correct !)
                </div>
                <div className="chinese-text" style={{ fontSize: '1.1em', marginBottom: '5px' }}>
                  你的问题：{userAnswer}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#dc3545' }}>
                  ✗ 不正确 (Incorrect)
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div className="chinese-text" style={{ fontSize: '1em', marginBottom: '5px' }}>
                    你的问题：{userAnswer || '（未回答）'}
                  </div>
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  borderRadius: '6px',
                  border: '1px solid #667eea'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#667eea' }}>
                    💡 正确答案 (Question correcte) :
                  </div>
                  <div className="chinese-text" style={{ fontSize: '1.1em', marginBottom: '5px' }}>
                    {currentQuestion.question}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.95em' }}>
                    {currentQuestion.pinyin}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!submitted && (
          <button
            onClick={() => handleShowAnswer(currentQuestion.id)}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#5568d3'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#667eea'
            }}
          >
            💡 显示正确答案 (Afficher la question correcte)
          </button>
        )}

        {showAnswer[currentQuestion.id] && !submitted && (
          <div style={{
            padding: '15px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '8px',
            border: '2px solid #667eea',
            marginTop: '15px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#667eea' }}>
              💡 正确答案 (Question correcte) :
            </div>
            <div className="chinese-text" style={{ fontSize: '1.1em', marginBottom: '5px' }}>
              {currentQuestion.question}
            </div>
            <div style={{ color: '#666', fontSize: '0.95em' }}>
              {currentQuestion.pinyin}
            </div>
          </div>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            opacity: currentIndex === 0 ? 0.5 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← 上一题 (Question précédente)
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          style={{
            opacity: currentIndex === questions.length - 1 ? 0.5 : 1,
            cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          下一题 (Question suivante) →
        </button>
      </div>

      {submitted && (
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          color: 'white',
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <h3 style={{ color: 'white', marginBottom: '15px' }}>🎉 完成！(Terminé !)</h3>
          <div style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '10px' }}>
            {score} / {questions.length}
          </div>
          <div style={{ fontSize: '1.2em' }}>
            {questions.length > 0 ? `${Math.round((score / questions.length) * 100)}%` : '0%'}
          </div>
        </div>
      )}

      {!submitted && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            style={{
              fontSize: '1.2em',
              padding: '15px 40px',
              opacity: answeredCount === 0 ? 0.5 : 1,
              cursor: answeredCount === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ✓ 完成练习 (Terminer l'exercice)
          </button>
        </div>
      )}

      {submitted && (
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          marginTop: '30px', 
          flexWrap: 'wrap' 
        }}>
          {onPrevious && (
            <button className="btn btn-secondary" onClick={onPrevious}>
              ← Section précédente
            </button>
          )}
          <button className="btn btn-primary" onClick={handleReset}>
            ↻ 重新开始 (Recommencer)
          </button>
          {onNext && (
            <button className="btn btn-secondary" onClick={onNext}>
              Section suivante →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

