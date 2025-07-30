"use client"

import { useState, useEffect } from "react"
import { routineData } from "@/data/routineData"
import { dietData } from "@/data/dietData"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Dumbbell, Utensils, Activity } from "lucide-react"

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
  glúteo: "bg-pink-900/20 text-pink-300 border-pink-800",
  femoral: "bg-purple-900/20 text-purple-300 border-purple-800",
  cuádriceps: "bg-blue-900/20 text-blue-300 border-blue-800",
  abductores: "bg-yellow-900/20 text-yellow-300 border-yellow-800",
  aductores: "bg-teal-900/20 text-teal-300 border-teal-800",
  espalda: "bg-green-900/20 text-green-300 border-green-800",
  bíceps: "bg-orange-900/20 text-orange-300 border-orange-800",
  pecho: "bg-red-900/20 text-red-300 border-red-800",
  hombros: "bg-indigo-900/20 text-indigo-300 border-indigo-800",
  tríceps: "bg-cyan-900/20 text-cyan-300 border-cyan-800",
  cardio: "bg-gray-900/20 text-gray-300 border-gray-800",
}

const dayNames = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
const dayShortNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

const Page = () => {
  const routine = routineData.routine
  const diet = dietData.diet
  const [currentDay, setCurrentDay] = useState(0)
  const [activeTab, setActiveTab] = useState<"training" | "nutrition">("training")
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [weightLogs, setWeightLogs] = useState<{ [key: string]: WeightLog }>({})
  const [showGif, setShowGif] = useState<{ [key: string]: boolean }>({})

  // Auto-select current day of the week
  useEffect(() => {
    const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
    const dayMapping = [6, 0, 1, 2, 3, 4, 5] // Map Sunday(0) to index 6, Monday(1) to index 0, etc.
    setCurrentDay(dayMapping[today])
  }, [])

  const currentWorkout = routine.days.find((day) => day.day === dayNames[currentDay])
  const currentDiet = diet.days.find((day) => day.day === dayNames[currentDay])

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
    setCurrentDay((prev) => (prev + 1) % 7)
  }

  const prevDay = () => {
    setCurrentDay((prev) => (prev - 1 + 7) % 7)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Day Navigation */}
        <div className="flex justify-center gap-2 mb-6">
          {dayShortNames.map((day, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`px-4 py-3 text-sm font-medium rounded-2xl transition-all ${
                index === currentDay
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("training")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all ${
              activeTab === "training"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Activity className="h-5 w-5" />
            Entrenamiento
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all ${
              activeTab === "nutrition"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Utensils className="h-5 w-5" />
            Nutrición
          </button>
        </div>

        {/* Current Day Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold capitalize text-white">{dayNames[currentDay]}</h1>
        </div>

        {/* Training Tab Content */}
        {activeTab === "training" && (
          <>
            {currentWorkout ? (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-300">{currentWorkout.name}</h2>
                </div>

                <div className="space-y-4">
                  {currentWorkout.exercises.map((exercise, index) => (
                    <Card key={`${exercise.name}-${index}`} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              className={`font-semibold text-lg ${
                                completedExercises.has(exercise.name) ? "line-through text-green-400" : "text-white"
                              }`}
                            >
                              {exercise.name}
                            </h3>
                          </div>
                          <div className="flex gap-2">
                            {exercise.gif_url && (
                              <button
                                onClick={() => toggleGif(exercise.name)}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                              >
                                {showGif[exercise.name] ? "Ocultar" : "Ver GIF"}
                              </button>
                            )}
                            <button
                              onClick={() => toggleExerciseComplete(exercise.name)}
                              className={`w-6 h-6 rounded-full border-2 transition-colors ${
                                completedExercises.has(exercise.name)
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-500 hover:border-green-400"
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

                        {showGif[exercise.name] && exercise.gif_url && (
                          <div className="mb-4">
                            <img
                              src={exercise.gif_url || "/placeholder.svg"}
                              alt={`${exercise.name} demonstration`}
                              className="w-full max-h-64 object-contain rounded-lg bg-gray-700 border border-gray-600"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=GIF+no+disponible"
                              }}
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-4 mb-3 text-gray-300">
                          {exercise.type === "cardio" ? (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">{exercise.duration}</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                <span className="text-sm font-medium">{exercise.sets} series</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">{exercise.reps} reps</span>
                              </div>
                            </>
                          )}
                        </div>

                        {exercise.type !== "cardio" && (
                          <div className="mb-3 p-3 bg-gray-700 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Peso utilizado</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Liss</label>
                                <input
                                  type="number"
                                  placeholder="kg"
                                  value={weightLogs[exercise.name]?.liss || ""}
                                  onChange={(e) => updateWeight(exercise.name, "liss", Number(e.target.value))}
                                  className="w-full px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-400 mb-1">Kriss</label>
                                <input
                                  type="number"
                                  placeholder="kg"
                                  value={weightLogs[exercise.name]?.kriss || ""}
                                  onChange={(e) => updateWeight(exercise.name, "kriss", Number(e.target.value))}
                                  className="w-full px-2 py-1 text-sm bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {exercise.muscle_group.map((muscle, muscleIndex) => (
                            <Badge
                              key={muscleIndex}
                              className={`${muscleGroupColors[muscle] || "bg-gray-700 text-gray-300 border-gray-600"} text-xs border`}
                            >
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6 mb-8 bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Progreso del día</p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="text-2xl font-bold text-white">
                          {
                            Array.from(completedExercises).filter((name) =>
                              currentWorkout.exercises.some((ex) => ex.name === name),
                            ).length
                          }
                        </div>
                        <div className="text-gray-500">/</div>
                        <div className="text-xl text-gray-400">{currentWorkout.exercises.length}</div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">ejercicios completados</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <Dumbbell className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Día de descanso</h3>
                  <p className="text-gray-500">No hay entrenamiento programado para hoy</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Nutrition Tab Content */}
        {activeTab === "nutrition" && currentDiet && (
          <div className="space-y-4">
            {currentDiet.meals.map((meal, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-white">{meal.name}</h3>
                    <span className="text-sm text-gray-400">{meal.time}</span>
                  </div>

                  <div className="space-y-2">
                    {meal.foods.map((food, foodIndex) => (
                      <div
                        key={foodIndex}
                        className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                      >
                        <span className="text-gray-300">{food.name}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-blue-400">{food.calories} cal</span>
                          <span className="text-green-400">{food.protein}g prot</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-sm font-medium">
                    <span className="text-gray-400">Total:</span>
                    <div className="flex gap-4">
                      <span className="text-blue-400">
                        {meal.foods.reduce((sum, food) => sum + food.calories, 0)} cal
                      </span>
                      <span className="text-green-400">
                        {meal.foods.reduce((sum, food) => sum + food.protein, 0)}g prot
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Resumen nutricional del día</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">
                        {currentDiet.meals.reduce(
                          (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.calories, 0),
                          0,
                        )}
                      </div>
                      <p className="text-xs text-gray-500">calorías totales</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        {currentDiet.meals.reduce(
                          (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.protein, 0),
                          0,
                        )}
                        g
                      </div>
                      <p className="text-xs text-gray-500">proteína total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
