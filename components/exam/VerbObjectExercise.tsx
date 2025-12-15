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
    
    if (isCorrect) {
      return `Le verbe ${verb.verb} (${verb.pinyin}) peut être combiné avec l'objet ${object.object} (${object.pinyin}) pour former une expression correcte.`
    }
    const correctObjectId = correctPairs.find(([v]) => v === verbId)?.[1]
    const correctObject = objects.find(o => o.id === correctObjectId)
    return `Le verbe ${verb.verb} (${verb.pinyin}) ne peut pas être combiné avec ${object.object} (${object.pinyin}). La bonne combinaison est ${verb.verb} + ${correctObject?.object || ''} (${correctObject?.pinyin || ''}).`
  }

  const handleObjectSelect = (verbId: string, objectId: string) => {
    if (submitted) return
    
    // Si l'objet est déjà utilisé par un autre verbe, le libérer
    const currentUser = Object.keys(selectedObjects).find(v => selectedObjects[v] === objectId)
    if (currentUser && currentUser !== verbId) {
      const newSelected = { ...selectedObjects }
      delete newSelected[currentUser]
      setSelectedObjects(newSelected)
      setUsedObjects(new Set(Array.from(usedObjects).filter(id => id !== objectId)))
    }

    // Si ce verbe avait déjà un objet, le libérer
    if (selectedObjects[verbId]) {
      setUsedObjects(new Set(Array.from(usedObjects).filter(id => id !== selectedObjects[verbId])))
    }

    // Assigner le nouvel objet
    setSelectedObjects({ ...selectedObjects, [verbId]: objectId })
    setUsedObjects(new Set([...Array.from(usedObjects), objectId]))
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
              {verb.verb} ({verb.pinyin})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {objects.map((obj) => {
                const isSelected = selectedObjects[verb.id] === obj.id
                const isUsed = usedObjects.has(obj.id) && !isSelected
                const isCorrect = submitted && correctPairs.some(([v, o]) => v === verb.id && o === obj.id && obj.id === selectedObjects[verb.id])
                const isIncorrect = submitted && isSelected && !isCorrect
                
                return (
                  <div key={obj.id} style={{ position: 'relative' }}>
                    <button
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
                      {obj.object} ({obj.pinyin})
                    </button>
                    {submitted && isSelected && (
                      <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`} style={{ marginTop: '5px', fontSize: '0.9em', position: 'absolute', zIndex: 10, width: '100%', minWidth: '200px' }}>
                        <strong>Explication :</strong> {getExplanation(verb.id, obj.id, isCorrect)}
                      </div>
                    )}
                  </div>
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

