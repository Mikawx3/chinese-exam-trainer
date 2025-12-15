'use client'

import { useState } from 'react'
import ExerciseMenu from '@/components/ExerciseMenu'
import MultipleChoiceExercise from '@/components/MultipleChoiceExercise'
import TextInputExercise from '@/components/TextInputExercise'
import { exerciseData } from '@/data/exercises'

export default function Home() {
  const [currentExercise, setCurrentExercise] = useState<string | null>(null)
  const [exerciseType, setExerciseType] = useState<string | null>(null)

  const handleExerciseSelect = (exerciseId: string, type: string) => {
    setCurrentExercise(exerciseId)
    setExerciseType(type)
  }

  const handleBack = () => {
    setCurrentExercise(null)
    setExerciseType(null)
  }

  if (currentExercise && exerciseType) {
    const exercise = exerciseData[currentExercise]
    if (!exercise) {
      return (
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={handleBack}>
            ← Retour
          </button>
          <p>Exercice non trouvé</p>
        </div>
      )
    }

    if (exerciseType === 'multiple-choice') {
      return (
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={handleBack}>
            ← Retour
          </button>
          <MultipleChoiceExercise exercise={exercise} />
        </div>
      )
    } else if (exerciseType === 'text-input') {
      return (
        <div className="container">
          <button className="btn btn-secondary back-button" onClick={handleBack}>
            ← Retour
          </button>
          <TextInputExercise exercise={exercise} />
        </div>
      )
    }
  }

  return (
    <div className="container">
      <h1>🇨🇳 Entraînement Examen Chinois</h1>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <a
          href="/exam"
          style={{
            display: 'inline-block',
            padding: '20px 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '15px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}
        >
          📝 Mode Examen
        </a>
        <p style={{ marginTop: '15px', color: '#666' }}>
          Passez un examen complet avec tous les types de questions
        </p>
      </div>
      <ExerciseMenu onExerciseSelect={handleExerciseSelect} />
    </div>
  )
}

