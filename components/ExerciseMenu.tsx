'use client'

import { exerciseCategories } from '@/data/exercises'

interface ExerciseMenuProps {
  onExerciseSelect: (exerciseId: string, type: string) => void
}

export default function ExerciseMenu({ onExerciseSelect }: ExerciseMenuProps) {
  return (
    <div>
      {exerciseCategories.map((category) => (
        <div key={category.id} style={{ marginBottom: '40px' }}>
          <h2>{category.title}</h2>
          <div className="exercise-grid">
            {category.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="exercise-card"
                onClick={() => onExerciseSelect(exercise.id, exercise.type)}
              >
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

