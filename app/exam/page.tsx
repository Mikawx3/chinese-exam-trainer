'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { exams, Exam } from '@/data/exams'
import NumberTimeExercise from '@/components/exam/NumberTimeExercise'
import MatchingExercise from '@/components/exam/MatchingExercise'
import VerbObjectExercise from '@/components/exam/VerbObjectExercise'
import FillInBlanksExercise from '@/components/exam/FillInBlanksExercise'
import QuestionFormationExercise from '@/components/exam/QuestionFormationExercise'
import RearrangeExercise from '@/components/exam/RearrangeExercise'
import DialogueExercise from '@/components/exam/DialogueExercise'
import ReadingComprehensionExercise from '@/components/exam/ReadingComprehensionExercise'
import ReviewQuestionsExercise from '@/components/exam/ReviewQuestionsExercise'
import { reviewQuestions } from '@/data/reviewQuestions'

export default function ExamPage() {
  const router = useRouter()
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({})
  const [sectionMaxScores, setSectionMaxScores] = useState<Record<string, number>>({})
  const [showReviewQuestions, setShowReviewQuestions] = useState(false)

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentSection(null)
    setSectionScores({})
    setSectionMaxScores({})
  }

  const handleSectionComplete = (sectionName: string, score: number, maxScore: number) => {
    setSectionScores({ ...sectionScores, [sectionName]: score })
    setSectionMaxScores({ ...sectionMaxScores, [sectionName]: maxScore })
  }

  const getSectionName = (key: string): string => {
    const names: Record<string, string> = {
      numberTime: '一、数字和时间',
      wordMatching: '二、连线 (mots)',
      measureWordMatching: '三、连线 (量词)',
      verbObject: '四、动词和宾语',
      fillInBlanks: '五、选词填空',
      questionFormation: '六、就划线部分提问',
      rearrange: '七、整理成句子',
      dialogue: '八、完成对话',
      readingComprehension: '九、读短文回答问题'
    }
    return names[key] || key
  }

  const getTotalScore = (): { score: number; max: number } => {
    let totalScore = 0
    let totalMax = 0
    Object.keys(sectionScores).forEach((key) => {
      totalScore += sectionScores[key] || 0
      totalMax += sectionMaxScores[key] || 0
    })
    return { score: totalScore, max: totalMax }
  }

  if (showReviewQuestions) {
    return (
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={() => setShowReviewQuestions(false)}>
          ← Retour
        </button>
        <h1>复习问题 - 进修生期末复习1--12课</h1>
        <p style={{ marginBottom: '30px', textAlign: 'center', color: '#666' }}>
          93 questions de révision pour vous entraîner
        </p>
        <ReviewQuestionsExercise
          questions={reviewQuestions}
          onComplete={(score) => {
            // Score tracking pour les questions de révision
            console.log(`Score: ${score}/${reviewQuestions.length}`)
          }}
        />
      </div>
    )
  }

  if (!selectedExam) {
    return (
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={() => router.push('/')}>
          ← Retour à l'accueil
        </button>
        <h1>Mode Examen</h1>
        <p style={{ marginBottom: '30px', textAlign: 'center', color: '#666' }}>
          Choisissez un examen pour commencer. Chaque examen contient les mêmes types de questions mais avec des contenus différents.
        </p>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div
            className="exercise-card"
            onClick={() => setShowReviewQuestions(true)}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ color: 'white', fontSize: '1.8em', marginBottom: '10px' }}>
              📚 复习问题 (Questions de révision)
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1em' }}>
              93 questions de révision - 进修生期末复习1--12课
            </p>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '10px', fontSize: '0.95em' }}>
              Entraînez-vous sur toutes les questions de révision
            </p>
          </div>
        </div>
        <div className="exercise-grid">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="exercise-card"
              onClick={() => handleExamSelect(exam)}
            >
              <h3>{exam.title}</h3>
              <p>Examen complet avec tous les types de questions</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const sections = [
    { key: 'numberTime', component: 'numberTime' },
    { key: 'wordMatching', component: 'wordMatching' },
    { key: 'measureWordMatching', component: 'measureWordMatching' },
    { key: 'verbObject', component: 'verbObject' },
    { key: 'fillInBlanks', component: 'fillInBlanks' },
    { key: 'questionFormation', component: 'questionFormation' },
    { key: 'rearrange', component: 'rearrange' },
    { key: 'dialogue', component: 'dialogue' },
    { key: 'readingComprehension', component: 'readingComprehension' }
  ]

  const availableSections = sections.filter(s => selectedExam.sections[s.key as keyof typeof selectedExam.sections])

  if (currentSection) {
    const section = availableSections.find(s => s.key === currentSection)
    if (!section) {
      return (
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={() => setCurrentSection(null)}>
            ← Retour
          </button>
          <p>Section non trouvée</p>
        </div>
      )
    }

    const sectionKey = section.key as keyof typeof selectedExam.sections
    const sectionData = selectedExam.sections[sectionKey]
    const currentIndex = availableSections.findIndex(s => s.key === currentSection)
    const hasPrevious = currentIndex > 0
    const hasNext = currentIndex < availableSections.length - 1

    const handlePrevious = () => {
      if (hasPrevious) {
        setCurrentSection(availableSections[currentIndex - 1].key)
      }
    }

    const handleNext = () => {
      if (hasNext) {
        setCurrentSection(availableSections[currentIndex + 1].key)
      }
    }

    const handleReset = () => {
      const { [currentSection]: _, ...restScores } = sectionScores
      const { [currentSection]: __, ...restMaxScores } = sectionMaxScores
      setSectionScores(restScores)
      setSectionMaxScores(restMaxScores)
    }

    return (
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={() => setCurrentSection(null)}>
          ← Retour aux sections
        </button>
        <h2 className="exercise-title">{getSectionName(currentSection)}</h2>
        
        {section.key === 'numberTime' && sectionData && 'questions' in sectionData && (
          <NumberTimeExercise
            questions={sectionData.questions as Array<{ chinese: string; pinyin: string; correctAnswer: string }>}
            onComplete={(score) => handleSectionComplete(currentSection, score, (sectionData.questions as Array<{ chinese: string; pinyin: string; correctAnswer: string }>).length)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {(section.key === 'wordMatching' || section.key === 'measureWordMatching') && sectionData && 'leftItems' in sectionData && (
          <MatchingExercise
            leftItems={sectionData.leftItems}
            rightItems={sectionData.rightItems}
            correctPairs={sectionData.correctPairs}
            onComplete={(score) => handleSectionComplete(currentSection, score, sectionData.leftItems.length)}
            title={getSectionName(currentSection)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'verbObject' && sectionData && 'verbs' in sectionData && (
          <VerbObjectExercise
            verbs={sectionData.verbs}
            objects={sectionData.objects}
            correctPairs={sectionData.correctPairs}
            onComplete={(score) => handleSectionComplete(currentSection, score, sectionData.verbs.length)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'fillInBlanks' && sectionData && 'sentences' in sectionData && (
          <FillInBlanksExercise
            sentences={sectionData.sentences}
            wordBank={sectionData.wordBank}
            onComplete={(score) => handleSectionComplete(currentSection, score, sectionData.sentences.reduce((sum, s) => sum + s.blanks.length, 0))}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'questionFormation' && sectionData && 'questions' in sectionData && (
          <QuestionFormationExercise
            questions={sectionData.questions as Array<{
              id: string
              sentence: string
              pinyin: string
              underlinedPart: string
              correctQuestion: string
              correctPinyin: string
            }>}
            onComplete={(score) => handleSectionComplete(currentSection, score, (sectionData.questions as Array<{
              id: string
              sentence: string
              pinyin: string
              underlinedPart: string
              correctQuestion: string
              correctPinyin: string
            }>).length)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'rearrange' && sectionData && 'questions' in sectionData && (
          <RearrangeExercise
            questions={sectionData.questions as Array<{
              id: string
              words: Array<{ word: string; pinyin: string }>
              correctOrder: number[]
              correctSentence: string
              correctPinyin: string
            }>}
            onComplete={(score) => handleSectionComplete(currentSection, score, (sectionData.questions as Array<{
              id: string
              words: Array<{ word: string; pinyin: string }>
              correctOrder: number[]
              correctSentence: string
              correctPinyin: string
            }>).length)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'dialogue' && sectionData && 'dialogues' in sectionData && (
          <DialogueExercise
            dialogues={sectionData.dialogues}
            onComplete={(score) => handleSectionComplete(currentSection, score, sectionData.dialogues.reduce((sum, d) => sum + d.parts.filter(p => p.isBlank).length, 0))}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
        
        {section.key === 'readingComprehension' && sectionData && 'passage' in sectionData && (
          <ReadingComprehensionExercise
            passage={sectionData.passage}
            questions={sectionData.questions as Array<{
              id: string
              question: string
              pinyin: string
              correctAnswer: string
              correctPinyin?: string
            }>}
            onComplete={(score) => handleSectionComplete(currentSection, score, (sectionData.questions as Array<{
              id: string
              question: string
              pinyin: string
              correctAnswer: string
              correctPinyin?: string
            }>).length)}
            onPrevious={hasPrevious ? handlePrevious : undefined}
            onNext={hasNext ? handleNext : undefined}
            onReset={handleReset}
          />
        )}
      </div>
    )
  }

  const total = getTotalScore()
  const allSectionsCompleted = availableSections.every(s => sectionScores[s.key] !== undefined)

  return (
    <div className="container">
      <button className="btn btn-secondary back-button" onClick={() => setSelectedExam(null)}>
        ← Choisir un autre examen
      </button>
      <h1>{selectedExam.title}</h1>
      
      {allSectionsCompleted && (
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          color: 'white',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: 'white', marginBottom: '10px' }}>Examen terminé !</h2>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
            Score total : {total.score} / {total.max}
          </div>
          <div style={{ marginTop: '10px', fontSize: '1.2em' }}>
            {total.max > 0 ? `${Math.round((total.score / total.max) * 100)}%` : '0%'}
          </div>
        </div>
      )}

      <div className="exercise-grid">
        {availableSections.map((section) => {
          const sectionKey = section.key
          const score = sectionScores[sectionKey]
          const maxScore = sectionMaxScores[sectionKey]
          const isCompleted = score !== undefined

          return (
            <div
              key={sectionKey}
              className="exercise-card"
              onClick={() => setCurrentSection(sectionKey)}
              style={{
                borderColor: isCompleted ? (score === maxScore ? '#28a745' : '#ffc107') : undefined,
                borderWidth: isCompleted ? '3px' : '2px'
              }}
            >
              <h3>{getSectionName(sectionKey)}</h3>
              {isCompleted ? (
                <div>
                  <p style={{ marginTop: '10px', fontWeight: 'bold', color: score === maxScore ? '#28a745' : '#ffc107' }}>
                    Score: {score} / {maxScore}
                  </p>
                  <p style={{ marginTop: '5px', fontSize: '0.9em', color: '#666' }}>
                    {score === maxScore ? '✓ Parfait !' : 'Cliquez pour revoir'}
                  </p>
                </div>
              ) : (
                <p>Cliquez pour commencer</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

