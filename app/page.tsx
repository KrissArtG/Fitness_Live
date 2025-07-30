"use client"

import { useState, useEffect } from "react"
import { routineData } from "@/data/routineData"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, Dumbbell, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

interface Exercise {
  name: string
  reps?: number
  sets?: number
  duration?: string
  type?: string
  muscle_group: string[]
  gif_url?: string
}

interface WeightLog {
  liss: number
  kriss: number
}

const muscleGroupColors: { [key: string]: string } = {
  glúteo: "bg-pink-100 text-pink-700",
  femoral: "bg-purple-100 text-purple-700",
  cuádriceps: "bg-blue-100 text-blue-700",
  abductores: "bg-yellow-100 text-yellow-700",
  aductores: "bg-teal-100 text-teal-700",
  espalda: "bg-green-100 text-green-700",
  bíceps: "bg-orange-100 text-orange-700",
  pecho: "bg-red-100 text-red-700",
  hombros: "bg-indigo-100 text-indigo-700",
  tríceps: "bg-cyan-100 text-cyan-700",
  cardio: "bg-gray-100 text-gray-700",
}

const Page = () => {
  const routine = routineData.routine
  const [currentDay, setCurrentDay] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [weightLogs, setWeightLogs] = useState<{ [key: string]: WeightLog }>({})
  const [showGif, setShowGif] = useState<{ [key: string]: boolean }>({})

  // Auto-select current day of the week
  useEffect(() => {
    const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
    // Map to your 5-day routine: Monday(1) = 0, Tuesday(2) = 1, Wednesday(3) = 2, Thursday(4) = 3, Friday(5) = 4
    if (today >= 1 && today <= 5) {
      setCurrentDay(today - 1) // Monday = 0, Tuesday = 1, etc.
    }
  }, [])

  const currentWorkout = routine.days[currentDay]

  const toggleExerciseComplete = (exerciseName: string) => {
    setCompletedExercises((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(exerciseName)) {
        newSet.delete(exerciseName)
      } else {
        newSet.add(exerciseName)
      }
      return newSet
    })
  }

  const updateWeight = (exerciseName: string, person: "liss" | "kriss", weight: number) => {
    setWeightLogs((prev) => ({
      ...prev,
      [exerciseName]: {
        ...prev[exerciseName],
        [person]: weight,
      },
    }))
  }

  const toggleGif = (exerciseName: string) => {
    setShowGif((prev) => ({
      ...prev,
      [exerciseName]: !prev[exerciseName],
    }))
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
          <div className="mt-2 text-xs text-slate-500">
            Hoy es {new Date().toLocaleDateString("es-ES", { weekday: "long" })}
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
          {routine.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                index === currentDay ? "bg-slate-700 text-white" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {day.day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          {currentWorkout.exercises.map((exercise, index) => (
            <Card
              key={`${exercise.name}-${index}`}
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
                  <div className="flex gap-2">
                    {exercise.gif_url && (
                      <button
                        onClick={() => toggleGif(exercise.name)}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        {showGif[exercise.name] ? "Ocultar" : "Ver GIF"}
                      </button>
                    )}
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
                </div>

                {/* Exercise GIF */}
                {showGif[exercise.name] && exercise.gif_url && (
                  <div className="mb-4">
                    <img
                      src={exercise.gif_url || "/placeholder.svg"}
                      alt={`${exercise.name} demonstration`}
                      className="w-full max-h-64 object-contain rounded-lg bg-gray-50 border"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=GIF+no+disponible"
                      }}
                    />
                  </div>
                )}

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

                {/* Weight Tracking Section */}
                {exercise.type !== "cardio" && (
                  <div className="mb-3 p-3 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Peso utilizado</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Liss</label>
                        <input
                          type="number"
                          placeholder="kg"
                          value={weightLogs[exercise.name]?.liss || ""}
                          onChange={(e) => updateWeight(exercise.name, "liss", Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Kriss</label>
                        <input
                          type="number"
                          placeholder="kg"
                          value={weightLogs[exercise.name]?.kriss || ""}
                          onChange={(e) => updateWeight(exercise.name, "kriss", Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exercise.muscle_group.map((muscle, muscleIndex) => (
                    <Badge
                      key={muscleIndex}
                      variant="secondary"
                      className={`${muscleGroupColors[muscle] || "bg-gray-100 text-gray-800"} hover:opacity-80 text-xs`}
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

export default Page
