'use client'

import { useState } from 'react'

interface VerbObjectExerciseProps {
  verbs: Array<{ id: string; verb: string; pinyin: string }>
  objects: Array<{ id: string; object: string; pinyin: string }>
  correctPairs: Array<[string, string]>
  onComplete: (score: number) => void
  onPrevious?: () => void
  onNext?: () => void
  onReset?: () => void
}

export default function VerbObjectExercise({ verbs, objects, correctPairs, onComplete, onPrevious, onNext, onReset }: VerbObjectExerciseProps) {
  const [selectedObjects, setSelectedObjects] = useState<Record<string, string>>({})
  const [usedObjects, setUsedObjects] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleReset = () => {
    setSelectedObjects({})
    setUsedObjects(new Set())
    setSubmitted(false)
    setScore(0)
    if (onReset) onReset()
  }

  const getExplanation = (verbId: string, objectId: string, isCorrect: boolean): string => {
    const verb = verbs.find(v => v.id === verbId)
    const object = objects.find(o => o.id === objectId)
    if (!verb || !object) return ''
    
    // Règles sémantiques pour les combinaisons verbe-objet courantes
    const verbObjectRules: Record<string, string> = {
      '看': '看 signifie "regarder" et s\'utilise avec des objets visuels comme 电视 (télévision), 书 (livre), 电影 (film).',
      '吃': '吃 signifie "manger" et s\'utilise uniquement avec des aliments solides comme 饭 (riz/repas), 水果 (fruit).',
      '喝': '喝 signifie "boire" et s\'utilise uniquement avec des liquides comme 水 (eau), 茶 (thé), 咖啡 (café).',
      '做': '做 signifie "faire" et s\'utilise avec des activités abstraites comme 作业 (devoirs), 运动 (sport), 工作 (travail).',
      '学': '学 signifie "apprendre" et s\'utilise avec des sujets d\'étude comme 汉语 (chinois), 英语 (anglais).',
      '教': '教 signifie "enseigner" et s\'utilise avec des sujets ou des personnes comme 学生 (étudiant), 汉语 (chinois).',
      '买': '买 signifie "acheter" et s\'utilise avec des objets concrets comme 东西 (choses), 书 (livre).',
      '写': '写 signifie "écrire" et s\'utilise avec des supports d\'écriture comme 字 (caractères), 作业 (devoirs).',
      '说': '说 signifie "parler" et s\'utilise avec des langues comme 汉语 (chinois), 英语 (anglais).',
      '听': '听 signifie "écouter" et s\'utilise avec des sons comme 音乐 (musique), 课 (cours).',
      '住': '住 signifie "habiter" et s\'utilise avec des lieux comme 宿舍 (dortoir), 家 (maison).',
      '玩': '玩 signifie "jouer" et s\'utilise avec des activités ludiques comme 游戏 (jeu), 球 (ballon).'
    }
    
    if (isCorrect) {
      const rule = verbObjectRules[verb.verb]
      if (rule) {
        return `Correct ! ${rule} La combinaison ${verb.verb} + ${object.object} forme une expression idiomatique correcte en chinois.`
      }
      return `Correct ! En chinois, le verbe ${verb.verb} (${verb.pinyin}) et l'objet ${object.object} (${object.pinyin}) forment une collocation naturelle. Les verbes chinois ont des objets spécifiques avec lesquels ils s'utilisent couramment, créant des expressions figées.`
    }
    
    const correctObjectId = correctPairs.find(([v]) => v === verbId)?.[1]
    const correctObject = objects.find(o => o.id === correctObjectId)
    const rule = verbObjectRules[verb.verb]
    
    if (rule) {
      return `Incorrect. ${rule} Le verbe ${verb.verb} ne peut pas s'utiliser avec ${object.object}. La bonne combinaison est ${verb.verb} + ${correctObject?.object || ''} (${correctObject?.pinyin || ''}) car en chinois, les verbes ont des restrictions sémantiques sur les objets qu'ils peuvent prendre.`
    }
    
    return `Incorrect. Le verbe ${verb.verb} (${verb.pinyin}) ne peut pas être combiné avec ${object.object} (${object.pinyin}) car cette combinaison viole les règles sémantiques du chinois. La bonne combinaison est ${verb.verb} + ${correctObject?.object || ''} (${correctObject?.pinyin || ''}) car les verbes chinois ont des objets spécifiques avec lesquels ils forment des collocations naturelles.`
  }

  const handleObjectSelect = (verbId: string, objectId: string) => {
    if (submitted) return
    
    // Si l'objet est déjà sélectionné pour ce verbe, on le désélectionne
    if (selectedObjects[verbId] === objectId) {
      const newSelected = { ...selectedObjects }
      delete newSelected[verbId]
      setSelectedObjects(newSelected)
      // Retirer l'objet de la liste des objets utilisés
      const newUsed = new Set(Array.from(usedObjects).filter(id => id !== objectId))
      setUsedObjects(newUsed)
      return
    }
    
    // Calculer les nouveaux états de manière atomique
    const newSelected = { ...selectedObjects }
    const newUsed = new Set(Array.from(usedObjects))
    
    // Si l'objet est déjà utilisé par un autre verbe, le libérer
    const currentUser = Object.keys(selectedObjects).find(v => selectedObjects[v] === objectId)
    if (currentUser && currentUser !== verbId) {
      delete newSelected[currentUser]
      newUsed.delete(objectId)
    }

    // Si ce verbe avait déjà un objet, le libérer
    const previousObject = selectedObjects[verbId]
    if (previousObject) {
      newUsed.delete(previousObject)
    }

    // Assigner le nouvel objet
    newSelected[verbId] = objectId
    newUsed.add(objectId)
    
    setSelectedObjects(newSelected)
    setUsedObjects(newUsed)
  }

  const handleSubmit = () => {
    let correct = 0
    correctPairs.forEach(([verbId, objectId]) => {
      if (selectedObjects[verbId] === objectId) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
    onComplete(correct)
  }

  return (
    <div className="question-container">
      <h3>四、给下面的动词选择合适的宾语 (Choisissez des objets appropriés pour les verbes)</h3>
      <p style={{ marginBottom: '20px', color: '#666' }}>Chaque objet ne peut être utilisé qu'une seule fois</p>
      
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ marginBottom: '15px', color: '#667eea' }}>Verbes :</h4>
        {verbs.map((verb) => (
          <div key={verb.id} style={{ marginBottom: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              <div className="chinese-text">{verb.verb}</div>
              <div style={{ color: '#666', marginTop: '5px', fontSize: '0.9em' }}>{verb.pinyin}</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {objects.map((obj) => {
                const isSelected = selectedObjects[verb.id] === obj.id
                const isUsed = usedObjects.has(obj.id) && !isSelected
                const isCorrect = submitted && correctPairs.some(([v, o]) => v === verb.id && o === obj.id && obj.id === selectedObjects[verb.id])
                const isIncorrect = submitted && isSelected && !isCorrect
                
                return (
                  <button
                    key={obj.id}
                    onClick={() => handleObjectSelect(verb.id, obj.id)}
                    disabled={submitted || isUsed}
                    style={{
                      padding: '10px 15px',
                      border: `2px solid ${
                        isSelected
                          ? submitted
                            ? isCorrect
                              ? '#28a745'
                              : '#dc3545'
                            : '#667eea'
                          : isUsed
                          ? '#ccc'
                          : '#ddd'
                      }`,
                      background: isSelected
                        ? submitted
                          ? isCorrect
                            ? '#28a745'
                            : '#dc3545'
                          : '#667eea'
                        : isUsed
                        ? '#f0f0f0'
                        : 'white',
                      color: isSelected && submitted ? 'white' : isUsed ? '#999' : '#333',
                      borderRadius: '8px',
                      cursor: submitted || isUsed ? 'default' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div>
                      <span className="chinese-text">{obj.object}</span>
                      <div style={{ color: isSelected && submitted ? 'rgba(255,255,255,0.9)' : isUsed ? '#999' : '#666', marginTop: '3px', fontSize: '0.85em' }}>
                        {obj.pinyin}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            {submitted && selectedObjects[verb.id] && (
              <div className={`feedback ${correctPairs.some(([v, o]) => v === verb.id && o === selectedObjects[verb.id]) ? 'correct' : 'incorrect'}`} style={{ marginTop: '10px', fontSize: '0.9em' }}>
                <strong>Explication :</strong> {getExplanation(verb.id, selectedObjects[verb.id], correctPairs.some(([v, o]) => v === verb.id && o === selectedObjects[verb.id]))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Valider
        </button>
      )}
      {submitted && (
        <>
          <div className="score">
            Score: {score} / {verbs.length}
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

