'use client'

import { useState } from 'react'

interface VerbObjectExerciseProps {
  verbs: Array<{ id: string; verb: string; pinyin: string }>
  objects: Array<{ id: string; object: string; pinyin: string }>
  correctPairs: Array<[string, string]>
  onComplete: (score: number) => void
}

export default function VerbObjectExercise({ verbs, objects, correctPairs, onComplete }: VerbObjectExerciseProps) {
  const [selectedObjects, setSelectedObjects] = useState<Record<string, string>>({})
  const [usedObjects, setUsedObjects] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleObjectSelect = (verbId: string, objectId: string) => {
    if (submitted) return
    
    // Si l'objet est déjà utilisé par un autre verbe, le libérer
    const currentUser = Object.keys(selectedObjects).find(v => selectedObjects[v] === objectId)
    if (currentUser && currentUser !== verbId) {
      const newSelected = { ...selectedObjects }
      delete newSelected[currentUser]
      setSelectedObjects(newSelected)
      setUsedObjects(new Set([...usedObjects].filter(id => id !== objectId)))
    }

    // Si ce verbe avait déjà un objet, le libérer
    if (selectedObjects[verbId]) {
      setUsedObjects(new Set([...usedObjects].filter(id => id !== selectedObjects[verbId])))
    }

    // Assigner le nouvel objet
    setSelectedObjects({ ...selectedObjects, [verbId]: objectId })
    setUsedObjects(new Set([...usedObjects, objectId]))
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
                    {obj.object} ({obj.pinyin})
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Valider
        </button>
      )}
      {submitted && (
        <div className="score">
          Score: {score} / {verbs.length}
        </div>
      )}
    </div>
  )
}

