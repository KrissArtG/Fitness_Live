"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dumbbell, Clock, Target, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

const routineData = {
  routine: {
    name: "Rutina Semanal de Gimnasio",
    duration: "5 días",
    days: [
      {
        day: "lunes",
        name: "Glúteo y Femoral",
        exercises: [
          {
            name: "Hip thrust",
            reps: 8,
            sets: 4,
            muscle_group: ["glúteo", "femoral"],
          },
          {
            name: "Peso muerto rumano",
            reps: 10,
            sets: 3,
            muscle_group: ["femoral", "glúteo"],
          },
          {
            name: "Sentadilla búlgara",
            reps: 10,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo"],
          },
          {
            name: "Máquina de abductores",
            reps: 10,
            sets: 4,
            muscle_group: ["abductores"],
          },
          {
            name: "Patada en polea",
            reps: 10,
            sets: 3,
            muscle_group: ["glúteo"],
          },
        ],
      },
      {
        day: "martes",
        name: "Espalda + Bíceps + Cardio",
        exercises: [
          {
            name: "Jalón abierto",
            reps: 12,
            sets: 3,
            muscle_group: ["espalda"],
          },
          {
            name: "Jalón cerrado",
            reps: 12,
            sets: 3,
            muscle_group: ["espalda"],
          },
          {
            name: "Remo en máquina",
            reps: 12,
            sets: 3,
            muscle_group: ["espalda"],
          },
          {
            name: "Curl de bíceps con barra",
            reps: 10,
            sets: 3,
            muscle_group: ["bíceps"],
          },
          {
            name: "Curl de bíceps martillo",
            reps: 10,
            sets: 3,
            muscle_group: ["bíceps"],
          },
          {
            name: "Cinta (caminadora)",
            duration: "10 minutos",
            type: "cardio",
            muscle_group: ["cardio"],
          },
        ],
      },
      {
        day: "miércoles",
        name: "Cuádriceps + Glúteo + Aductores",
        exercises: [
          {
            name: "Sentadilla goblet",
            reps: 12,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo"],
          },
          {
            name: "Sentadilla sumo",
            reps: 10,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo", "aductores"],
          },
          {
            name: "Desplantes",
            reps: 8,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo"],
          },
          {
            name: "Extensión de cuádriceps",
            reps: 8,
            sets: 4,
            muscle_group: ["cuádriceps"],
          },
          {
            name: "Máquina de abductores",
            reps: 10,
            sets: 4,
            muscle_group: ["abductores"],
          },
        ],
      },
      {
        day: "jueves",
        name: "Pecho + Hombro + Tríceps",
        exercises: [
          {
            name: "Press de hombros máquina",
            reps: 10,
            sets: 4,
            muscle_group: ["hombros"],
          },
          {
            name: "Press de pecho con barra",
            reps: 8,
            sets: 4,
            muscle_group: ["pecho"],
          },
          {
            name: "Jalón en máquina",
            reps: 12,
            sets: 3,
            muscle_group: ["espalda"],
          },
          {
            name: "Elevaciones laterales con mancuerna",
            reps: 10,
            sets: 3,
            muscle_group: ["hombros"],
          },
          {
            name: "Extensiones de tríceps con cable",
            reps: 10,
            sets: 3,
            muscle_group: ["tríceps"],
          },
          {
            name: "Cinta (caminadora)",
            duration: "10 minutos",
            type: "cardio",
            muscle_group: ["cardio"],
          },
        ],
      },
      {
        day: "viernes",
        name: "Pierna Completa",
        exercises: [
          {
            name: "Hip thrust",
            reps: 8,
            sets: 4,
            muscle_group: ["glúteo", "femoral"],
          },
          {
            name: "Peso muerto rumano",
            reps: 10,
            sets: 3,
            muscle_group: ["femoral", "glúteo"],
          },
          {
            name: "Extensiones de cuádriceps",
            reps: 8,
            sets: 4,
            muscle_group: ["cuádriceps"],
          },
          {
            name: "Prensa",
            reps: 10,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo"],
          },
          {
            name: "Sentadilla Smith",
            reps: 8,
            sets: 4,
            muscle_group: ["cuádriceps", "glúteo"],
          },
          {
            name: "Máquina de abductores",
            reps: 10,
            sets: 4,
            muscle_group: ["abductores"],
          },
        ],
      },
    ],
  },
}

const muscleGroupColors: { [key: string]: string } = {
  glúteo: "bg-pink-100 text-pink-800",
  femoral: "bg-purple-100 text-purple-800",
  cuádriceps: "bg-blue-100 text-blue-800",
  espalda: "bg-green-100 text-green-800",
  bíceps: "bg-orange-100 text-orange-800",
  pecho: "bg-red-100 text-red-800",
  hombros: "bg-yellow-100 text-yellow-800",
  tríceps: "bg-indigo-100 text-indigo-800",
  abductores: "bg-teal-100 text-teal-800",
  aductores: "bg-cyan-100 text-cyan-800",
  cardio: "bg-gray-100 text-gray-800",
}

export default function GymRoutineApp() {
  const [currentDay, setCurrentDay] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const routine = routineData.routine
  const currentWorkout = routine.days[currentDay]

  const toggleExerciseComplete = (exerciseName: string) => {
    const newCompleted = new Set(completedExercises)
    if (newCompleted.has(exerciseName)) {
      newCompleted.delete(exerciseName)
    } else {
      newCompleted.add(exerciseName)
    }
    setCompletedExercises(newCompleted)
  }

  const nextDay = () => {
    setCurrentDay((prev) => (prev + 1) % routine.days.length)
  }

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + routine.days.length) % routine.days.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Dumbbell className="h-8 w-8 text-slate-700" />
            <h1 className="text-2xl font-bold text-slate-800">{routine.name}</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{routine.duration}</span>
          </div>
        </div>

        {/* Day Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={prevDay} className="h-8 w-8 p-0 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <h2 className="font-semibold text-lg capitalize text-slate-800">{currentWorkout.day}</h2>
                <p className="text-sm text-slate-600">{currentWorkout.name}</p>
              </div>

              <Button variant="outline" size="sm" onClick={nextDay} className="h-8 w-8 p-0 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Day Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {routine.days.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentDay ? "bg-slate-700" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          {currentWorkout.exercises.map((exercise, index) => (
            <Card
              key={index}
              className={`transition-all duration-200 ${
                completedExercises.has(exercise.name) ? "bg-green-50 border-green-200" : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${
                        completedExercises.has(exercise.name) ? "line-through text-green-700" : "text-slate-800"
                      }`}
                    >
                      {exercise.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleExerciseComplete(exercise.name)}
                    className={`w-6 h-6 rounded-full border-2 transition-colors ${
                      completedExercises.has(exercise.name)
                        ? "bg-green-500 border-green-500"
                        : "border-slate-300 hover:border-green-400"
                    }`}
                  >
                    {completedExercises.has(exercise.name) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  {exercise.type === "cardio" ? (
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{exercise.duration}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Target className="h-4 w-4" />
                        <span className="text-sm font-medium">{exercise.sets} series</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <span className="text-sm font-medium">{exercise.reps} reps</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exercise.muscle_group.map((muscle, muscleIndex) => (
                    <Badge
                      key={muscleIndex}
                      variant="secondary"
                      className={`text-xs ${muscleGroupColors[muscle] || "bg-gray-100 text-gray-800"}`}
                    >
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card className="mt-6 mb-8">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-2">Progreso del día</p>
              <div className="flex items-center justify-center gap-2">
                <div className="text-2xl font-bold text-slate-800">
                  {
                    Array.from(completedExercises).filter((name) =>
                      currentWorkout.exercises.some((ex) => ex.name === name),
                    ).length
                  }
                </div>
                <div className="text-slate-500">/</div>
                <div className="text-xl text-slate-600">{currentWorkout.exercises.length}</div>
              </div>
              <p className="text-xs text-slate-500 mt-1">ejercicios completados</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
