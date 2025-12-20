'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { reviewQuestions } from '@/data/reviewQuestions'

// Fonction pour mélanger un tableau de manière aléatoire (algorithme Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const STORAGE_KEYS = {
  answers: 'review_answers',
  checkedAnswers: 'review_checked',
  correctAnswers: 'review_correct',
  markedQuestions: 'review_marked',
  shuffledOrder: 'review_shuffled_order',
  currentIndex: 'review_current_index',
  showOnlyMarked: 'review_show_only_marked'
}

export default function ReviewPage() {
  const router = useRouter()
  
  // Charger les données depuis localStorage au démarrage
  const [loaded, setLoaded] = useState(false)
  const [showOnlyMarked, setShowOnlyMarked] = useState(false)
  const [showOnlyFailed, setShowOnlyFailed] = useState(false)
  
  // Utiliser un état pour les questions mélangées au lieu d'un useMemo
  // Initialiser avec l'ordre original pour éviter les erreurs d'hydratation
  const [shuffledQuestions, setShuffledQuestions] = useState(reviewQuestions)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({})
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<Record<string, boolean>>({})
  const [markedQuestions, setMarkedQuestions] = useState<Set<string>>(new Set())
  
  // Charger l'ordre mélangé et les données depuis localStorage au montage (côté client uniquement)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      // Charger l'ordre mélangé sauvegardé ou créer un nouvel ordre
      const savedOrder = localStorage.getItem(STORAGE_KEYS.shuffledOrder)
      let questions = reviewQuestions
      
      if (savedOrder) {
        try {
          const order = JSON.parse(savedOrder) as string[]
          // Reconstruire l'ordre à partir des IDs sauvegardés
          questions = order.map(id => reviewQuestions.find(q => q.id === id)!).filter(Boolean)
        } catch (e) {
          console.error('Error loading saved order:', e)
        }
      }
      
      // Si aucun ordre sauvegardé, créer un nouvel ordre et le sauvegarder
      if (!savedOrder) {
        questions = shuffleArray(reviewQuestions)
        localStorage.setItem(STORAGE_KEYS.shuffledOrder, JSON.stringify(questions.map(q => q.id)))
      }
      
      // Mettre à jour l'état avec les questions mélangées
      setShuffledQuestions(questions)
      
      // Charger les autres données
      const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers)
      const savedChecked = localStorage.getItem(STORAGE_KEYS.checkedAnswers)
      const savedCorrect = localStorage.getItem(STORAGE_KEYS.correctAnswers)
      const savedMarked = localStorage.getItem(STORAGE_KEYS.markedQuestions)
      const savedIndex = localStorage.getItem(STORAGE_KEYS.currentIndex)
      const savedShowOnlyMarked = localStorage.getItem(STORAGE_KEYS.showOnlyMarked)
      
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedChecked) setCheckedAnswers(JSON.parse(savedChecked))
      if (savedCorrect) setShowCorrectAnswer(JSON.parse(savedCorrect))
      if (savedMarked) setMarkedQuestions(new Set(JSON.parse(savedMarked)))
      if (savedIndex) {
        const index = parseInt(savedIndex, 10)
        // S'assurer que l'index est valide par rapport aux questions chargées
        if (index >= 0 && index < questions.length) {
          setCurrentIndex(index)
        }
      }
      if (savedShowOnlyMarked) setShowOnlyMarked(savedShowOnlyMarked === 'true')
    } catch (e) {
      console.error('Error loading from localStorage:', e)
    }
    setLoaded(true)
  }, [])
  
  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (!loaded || typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers))
      localStorage.setItem(STORAGE_KEYS.checkedAnswers, JSON.stringify(checkedAnswers))
      localStorage.setItem(STORAGE_KEYS.correctAnswers, JSON.stringify(showCorrectAnswer))
      localStorage.setItem(STORAGE_KEYS.markedQuestions, JSON.stringify(Array.from(markedQuestions)))
      localStorage.setItem(STORAGE_KEYS.currentIndex, currentIndex.toString())
      localStorage.setItem(STORAGE_KEYS.showOnlyMarked, showOnlyMarked.toString())
    } catch (e) {
      console.error('Error saving to localStorage:', e)
    }
  }, [answers, checkedAnswers, showCorrectAnswer, markedQuestions, currentIndex, showOnlyMarked, loaded])
  
  // Filtrer les questions selon le mode
  const filteredQuestions = useMemo(() => {
    let filtered = shuffledQuestions
    
    if (showOnlyMarked) {
      filtered = filtered.filter(q => markedQuestions.has(q.id))
    }
    
    if (showOnlyFailed) {
      filtered = filtered.filter(q => {
        // Une question est échouée si elle a été vérifiée ET la réponse était incorrecte
        return checkedAnswers[q.id] === true && showCorrectAnswer[q.id] === false
      })
    }
    
    return filtered
  }, [shuffledQuestions, showOnlyMarked, markedQuestions, showOnlyFailed, checkedAnswers, showCorrectAnswer])
  
  // Ajuster l'index si nécessaire après filtrage
  useEffect(() => {
    if (filteredQuestions.length > 0 && currentIndex >= filteredQuestions.length) {
      setCurrentIndex(Math.max(0, filteredQuestions.length - 1))
    } else if (filteredQuestions.length > 0 && currentIndex < 0) {
      setCurrentIndex(0)
    }
  }, [filteredQuestions.length, currentIndex])
  
  // Réinitialiser l'index quand on change de filtre (mais pas quand on revient à la progression)
  const [isReturningToProgress, setIsReturningToProgress] = useState(false)
  const [savedIndexToRestore, setSavedIndexToRestore] = useState<number | null>(null)
  
  useEffect(() => {
    // Si on revient à la progression et que les filtres sont désactivés, restaurer l'index
    if (isReturningToProgress && !showOnlyMarked && !showOnlyFailed && savedIndexToRestore !== null) {
      if (savedIndexToRestore >= 0 && savedIndexToRestore < shuffledQuestions.length) {
        setCurrentIndex(savedIndexToRestore)
      }
      setIsReturningToProgress(false)
      setSavedIndexToRestore(null)
      return
    }
    
    // Sinon, réinitialiser l'index à 0 quand on change de filtre
    if (!isReturningToProgress && filteredQuestions.length > 0) {
      setCurrentIndex(0)
    }
  }, [showOnlyMarked, showOnlyFailed, isReturningToProgress, filteredQuestions.length, savedIndexToRestore, shuffledQuestions.length])

  const currentQuestion = filteredQuestions[currentIndex]
  if (!currentQuestion) {
    return (
      <div className="container">
        <button className="btn btn-secondary back-button" onClick={() => router.push('/')}>
          ← Retour à l'accueil
        </button>
        <h1>复习问题 - 根据回答写问题</h1>
        <p style={{ marginBottom: '30px', textAlign: 'center', color: '#666' }}>
          {showOnlyMarked && filteredQuestions.length === 0 ? 'Aucune question marquée pour le moment.' : 
           showOnlyFailed && filteredQuestions.length === 0 ? 'Aucune question échouée pour le moment.' : 
           'Chargement...'}
        </p>
      </div>
    )
  }
  
  const userAnswer = answers[currentQuestion.id] || ''
  const isChecked = checkedAnswers[currentQuestion.id] || false
  const isCorrect = showCorrectAnswer[currentQuestion.id] || false
  const isMarked = markedQuestions.has(currentQuestion.id)

  const normalizeAnswer = (answer: string): string => {
    return answer
      .trim()
      .replace(/[，。！？、]/g, '')
      .replace(/\s+/g, '')
      .replace(/吗/g, '')
      .replace(/呢/g, '')
      .replace(/\([^)]*\)/g, '') // Supprimer les annotations entre parenthèses comme (有时候)
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
    
    // Vérification flexible : accepter les variantes d'ordre des mots temporels
    // Par exemple : "晚上你做什么" et "你晚上做什么" sont équivalents
    const normalizeWordOrder = (text: string): string => {
      // Extraire les mots temporels courants
      const timeWords = ['晚上', '早上', '中午', '下午', '平时', '周末', '现在', '今天', '明天', '昨天', '每天', '什么时候']
      let result = text
      
      // Pour chaque mot temporel, vérifier s'il peut être déplacé
      timeWords.forEach(timeWord => {
        // Pattern: [mot temporel][sujet] ou [sujet][mot temporel]
        const pattern1 = new RegExp(`(${timeWord})(你|我|他|她)`, 'g')
        const pattern2 = new RegExp(`(你|我|他|她)(${timeWord})`, 'g')
        
        if (pattern1.test(result) || pattern2.test(result)) {
          // Normaliser en plaçant le mot temporel au début
          result = result.replace(pattern2, `$1$2`) // Garder l'ordre original mais normaliser
          result = result.replace(pattern1, `$1$2`) // Garder l'ordre original mais normaliser
        }
      })
      
      return result
    }
    
    // Vérification avec normalisation de l'ordre des mots
    const normalizedUserOrder = normalizeWordOrder(normalizedUser)
    const normalizedCorrectOrder = normalizeWordOrder(normalizedCorrect)
    
    if (normalizedUserOrder === normalizedCorrectOrder) {
      return true
    }
    
    // Vérification flexible : on cherche les mots-clés importants
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
    
    // Vérification exacte après suppression des mots communs
    if (userKeyWords === correctKeyWords && userKeyWords.length > 0) {
      return true
    }
    
    // Vérification spéciale pour les questions avec mots temporels : accepter les variantes d'ordre
    // Par exemple : "晚上你做什么" et "你晚上做什么" sont équivalents
    const timeWords = ['晚上', '早上', '中午', '下午', '平时', '周末', '现在', '今天', '明天', '昨天', '每天']
    const hasTimeWord = timeWords.some(word => normalizedUser.includes(word) && normalizedCorrect.includes(word))
    
    if (hasTimeWord) {
      // Extraire les mots-clés importants (mots temporels + verbes + mots interrogatifs)
      const extractKeyWords = (text: string): string => {
        const keywords: string[] = []
        timeWords.forEach(word => {
          if (text.includes(word)) keywords.push(word)
        })
        if (text.includes('做')) keywords.push('做')
        if (text.includes('什么')) keywords.push('什么')
        if (text.includes('怎么')) keywords.push('怎么')
        if (text.includes('哪里')) keywords.push('哪里')
        if (text.includes('谁')) keywords.push('谁')
        if (text.includes('几')) keywords.push('几')
        return keywords.sort().join('')
      }
      
      const userKeywords = extractKeyWords(normalizedUser)
      const correctKeywords = extractKeyWords(normalizedCorrect)
      
      // Si les mots-clés principaux correspondent (même ensemble, ordre différent accepté)
      if (userKeywords === correctKeywords && userKeywords.length > 0) {
        return true
      }
    }
    
    // Vérification par similarité de caractères (sans tenir compte de l'ordre)
    const userChars = userKeyWords.split('').filter(c => c.length > 0 && c.trim() !== '')
    const correctChars = correctKeyWords.split('').filter(c => c.length > 0 && c.trim() !== '')
    
    if (correctChars.length === 0) {
      return false
    }
    
    // Compter les occurrences de chaque caractère pour gérer les doublons
    const countChars = (chars: string[]): Map<string, number> => {
      const count = new Map<string, number>()
      chars.forEach(char => {
        count.set(char, (count.get(char) || 0) + 1)
      })
      return count
    }
    
    const userCharCount = countChars(userChars)
    const correctCharCount = countChars(correctChars)
    
    // Vérifier si tous les caractères de la réponse correcte sont présents dans la réponse utilisateur
    // avec le même nombre d'occurrences
    let allCharsMatch = true
    const correctEntries = Array.from(correctCharCount.entries())
    for (const [char, count] of correctEntries) {
      if ((userCharCount.get(char) || 0) < count) {
        allCharsMatch = false
        break
      }
    }
    
    // Vérifier aussi que le nombre total de caractères correspond (pour éviter les faux positifs)
    if (allCharsMatch && userChars.length === correctChars.length) {
      return true
    }
    
    // Vérification par similarité (au moins 85% des caractères correspondent pour être plus strict)
    let matchCount = 0
    const correctEntries2 = Array.from(correctCharCount.entries())
    for (const [char, count] of correctEntries2) {
      const userCount = userCharCount.get(char) || 0
      matchCount += Math.min(userCount, count)
    }
    
    const similarity = matchCount / correctChars.length
    return similarity >= 0.85
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
    // Ne pas supprimer le statut de vérification pour permettre de revérifier
    // La question reste dans la liste des échouées jusqu'à ce qu'elle soit correctement répondue
  }

  const handleCheck = () => {
    if (!userAnswer.trim()) {
      return
    }
    
    // On vérifie si la question formulée correspond à la question correcte
    const correct = checkAnswer(userAnswer, currentQuestion.question)
    setCheckedAnswers({ ...checkedAnswers, [currentQuestion.id]: true })
    setShowCorrectAnswer({ ...showCorrectAnswer, [currentQuestion.id]: correct })
    // Si la réponse est correcte, la question n'est plus échouée (showCorrectAnswer[id] = true)
    // Si la réponse est incorrecte, la question reste échouée (showCorrectAnswer[id] = false)
  }

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const handleToggleMark = () => {
    const newMarked = new Set(markedQuestions)
    if (isMarked) {
      newMarked.delete(currentQuestion.id)
    } else {
      newMarked.add(currentQuestion.id)
    }
    setMarkedQuestions(newMarked)
  }
  
  const handleReturnToProgress = () => {
    // Trouver la dernière question non répondue dans shuffledQuestions
    let lastUnansweredIndex = -1
    for (let i = shuffledQuestions.length - 1; i >= 0; i--) {
      const questionId = shuffledQuestions[i].id
      const answer = answers[questionId] || ''
      if (!answer.trim()) {
        lastUnansweredIndex = i
        break
      }
    }
    
    // Si toutes les questions sont répondues, aller à la dernière question
    if (lastUnansweredIndex === -1) {
      lastUnansweredIndex = shuffledQuestions.length - 1
    }
    
    // Sauvegarder l'index à restaurer
    setSavedIndexToRestore(lastUnansweredIndex)
    
    // Marquer qu'on revient à la progression
    setIsReturningToProgress(true)
    
    // Désactiver tous les filtres (l'index sera restauré par le useEffect)
    setShowOnlyMarked(false)
    setShowOnlyFailed(false)
  }

  const handleClearProgress = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toute votre progression ?')) {
      localStorage.removeItem(STORAGE_KEYS.answers)
      localStorage.removeItem(STORAGE_KEYS.checkedAnswers)
      localStorage.removeItem(STORAGE_KEYS.correctAnswers)
      localStorage.removeItem(STORAGE_KEYS.markedQuestions)
      localStorage.removeItem(STORAGE_KEYS.shuffledOrder)
      localStorage.removeItem(STORAGE_KEYS.currentIndex)
      window.location.reload()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const progress = filteredQuestions.length > 0 ? ((currentIndex + 1) / filteredQuestions.length) * 100 : 0
  const answeredCount = Object.keys(answers).filter(id => answers[id]?.trim().length > 0).length
  const correctCount = Object.values(showCorrectAnswer).filter(v => v === true).length
  const markedCount = markedQuestions.size
  const failedCount = Object.keys(checkedAnswers).filter(id => 
    checkedAnswers[id] === true && showCorrectAnswer[id] === false
  ).length

  return (
    <div className="container">
      <button className="btn btn-secondary back-button" onClick={() => router.push('/')}>
        ← Retour à l'accueil
      </button>
      
      <h1>复习问题 - 根据回答写问题</h1>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          93 questions de révision - Voyez la réponse et formulez la question
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setShowOnlyMarked(!showOnlyMarked)
              if (!showOnlyMarked) setShowOnlyFailed(false) // Désactiver l'autre filtre si on active celui-ci
            }}
            style={{
              padding: '8px 16px',
              background: showOnlyMarked ? '#ffc107' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            ⭐ {showOnlyMarked ? 'Toutes les questions' : 'Questions marquées'} ({markedCount})
          </button>
          <button
            onClick={() => {
              setShowOnlyFailed(!showOnlyFailed)
              if (!showOnlyFailed) setShowOnlyMarked(false) // Désactiver l'autre filtre si on active celui-ci
            }}
            style={{
              padding: '8px 16px',
              background: showOnlyFailed ? '#dc3545' : '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            ❌ {showOnlyFailed ? 'Toutes les questions' : 'Questions échouées'} ({failedCount})
          </button>
          <button
            onClick={handleReturnToProgress}
            style={{
              padding: '8px 16px',
              background: (showOnlyMarked || showOnlyFailed) ? '#28a745' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: 'bold',
              opacity: (showOnlyMarked || showOnlyFailed) ? 1 : 0.6
            }}
            disabled={!showOnlyMarked && !showOnlyFailed}
          >
            📍 Revenir à la progression
          </button>
          <button
            onClick={handleClearProgress}
            style={{
              padding: '8px 16px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9em',
              fontWeight: 'bold'
            }}
          >
            🗑️ Effacer progression
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#667eea' }}>
            Question {currentIndex + 1} / {filteredQuestions.length}
            {showOnlyMarked && <span style={{ fontSize: '0.8em', color: '#ffc107' }}> (⭐ {markedCount} marquées)</span>}
          </div>
          <div style={{ fontSize: '0.9em', color: '#666' }}>
            ✓ Correctes: {correctCount} | Répondues: {answeredCount}
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
                {currentQuestion.correctAnswer || '（示例回答）'}
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
            <button
              onClick={handleToggleMark}
              style={{
                marginLeft: '15px',
                background: 'none',
                border: 'none',
                fontSize: '1.5em',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
                color: isMarked ? '#ffc107' : '#ccc',
                transition: 'all 0.2s ease'
              }}
              title={isMarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              {isMarked ? '⭐' : '☆'}
            </button>
          </label>
          <textarea
            className="input-field"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
            disabled={isChecked && isCorrect}
            placeholder="用中文写问题，例如：你叫什么名字？"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '15px',
              fontSize: '1.1em',
              borderColor: isChecked
                ? isCorrect
                  ? '#28a745'
                  : '#dc3545'
                : userAnswer.trim().length > 0
                ? '#667eea'
                : '#ddd',
              borderRadius: '8px',
              resize: 'vertical',
              fontFamily: 'inherit',
              borderWidth: '2px'
            }}
          />
        </div>

        {(!isChecked || (isChecked && !isCorrect)) && (
          <button
            onClick={handleCheck}
            disabled={!userAnswer.trim()}
            className="btn btn-primary"
            style={{
              fontSize: '1.1em',
              padding: '12px 30px',
              opacity: userAnswer.trim() ? 1 : 0.5,
              cursor: userAnswer.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            {isChecked && !isCorrect ? '↻ 重新检查 (Revérifier)' : '✓ 检查问题 (Vérifier la question)'}
          </button>
        )}

        {isChecked && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px',
            border: '2px solid',
            borderColor: isCorrect ? '#28a745' : '#dc3545',
            background: isCorrect 
              ? 'rgba(40, 167, 69, 0.1)' 
              : 'rgba(220, 53, 69, 0.1)'
          }}>
            {isCorrect ? (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#28a745', fontSize: '1.2em' }}>
                  ✓ 正确！(Correct !)
                </div>
                <div className="chinese-text" style={{ fontSize: '1.1em', marginBottom: '5px' }}>
                  你的问题：{userAnswer}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#dc3545', fontSize: '1.2em' }}>
                  ✗ 不正确 (Incorrect)
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div className="chinese-text" style={{ fontSize: '1em', marginBottom: '5px' }}>
                    你的问题：{userAnswer}
                  </div>
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: 'rgba(102, 126, 234, 0.1)', 
                  borderRadius: '6px',
                  border: '1px solid #667eea',
                  marginTop: '10px'
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
          disabled={currentIndex === filteredQuestions.length - 1}
          style={{
            opacity: currentIndex === filteredQuestions.length - 1 ? 0.5 : 1,
            cursor: currentIndex === filteredQuestions.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          下一题 (Question suivante) →
        </button>
      </div>

      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.1em', marginBottom: '10px' }}>
          Progression
        </div>
        <div style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '5px' }}>
          {correctCount} / {answeredCount}
        </div>
        <div style={{ fontSize: '0.9em', opacity: 0.9 }}>
          {answeredCount > 0 ? `${Math.round((correctCount / answeredCount) * 100)}% de réussite` : 'Commencez à répondre !'}
        </div>
      </div>
    </div>
  )
}

