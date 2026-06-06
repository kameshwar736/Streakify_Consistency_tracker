import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CreateContext_New from '../context/CreateContext_New'

const Home = () => {

  const { theme, taskDetail } = useContext(CreateContext_New)

  const nav = useNavigate()

  const [activeUser, setActiveUser] = useState({})
  const [todayTasks, setTodayTasks] = useState([])
  const [streak, setStreak] = useState(0)

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("localUser") || "null")

    if (!user) {
      nav('/Setup')
      return
    }

    setActiveUser(user)
    setStreak(user.streak || 0)

    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}

    // ✅ FIXED LOGIC (merge new tasks daily without duplicates)
    if (taskDetail && taskDetail.length > 0) {

      const existingTasks = storedDaily[today] || []

      const newTasks = taskDetail.filter(
        task => !existingTasks.some(t => t.do === task.do)
      )

      const mergedTasks = [
        ...existingTasks,
        ...newTasks.map(task => ({
          ...task,
          completed: false,
          date: today
        }))
      ]

      storedDaily[today] = mergedTasks
      localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    }

    setTodayTasks(storedDaily[today] || [])

  }, [taskDetail])

  const handletask = (clickedTask) => {
    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}

    const updatedTasks = storedDaily[today].map(task =>
      task.do === clickedTask.do
        ? { ...task, completed: true }
        : task
    )

    storedDaily[today] = updatedTasks
    localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    setTodayTasks(updatedTasks)

    const allCompleted = updatedTasks.every(task => task.completed)

    if (allCompleted && updatedTasks.length > 0) {
      const user = JSON.parse(localStorage.getItem("localUser"))

      if (user.lastStreakDate !== today) {
        const updatedUser = {
          ...user,
          streak: (user.streak || 0) + 1,
          lastStreakDate: today
        }

        localStorage.setItem("localUser", JSON.stringify(updatedUser))
        setActiveUser(updatedUser)
        setStreak(updatedUser.streak)
      }
    }
  }

  const completedCount = todayTasks.filter(t => t.completed).length
  const totalCount = todayTasks.length

  const progressPercent =
    totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0

  const fmt = (t) => {
    if (!t) return ""
    const [h, m] = t.split(":")
    const hr = parseInt(h)
    const ampm = hr >= 12 ? "PM" : "AM"
    return `${hr % 12 || 12}:${m} ${ampm}`
  }

  const allDone = totalCount > 0 && completedCount === totalCount

  return (
    <>
      <Navbar />

      <div className={`min-h-screen ${theme ? "bg-gray-100 text-gray-900" : "bg-gray-950 text-gray-100"} px-4 md:px-10 py-8`}>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* Header */}
            <div className={`${theme ? "bg-white text-gray-900" : "bg-gray-900 text-white"} rounded-2xl px-6 py-6 mb-6 flex justify-between items-start shadow-sm`}>
              <div>
                <p className="text-xs text-gray-400">Good day,</p>
                <h1 className="text-3xl md:text-4xl font-semibold">
                  {activeUser.userName}
                </h1>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>

              <div className="flex flex-col items-center bg-white/10 rounded-xl px-5 py-4">
                <span className="text-2xl font-semibold">{streak}</span>
                <span className="text-[10px] text-gray-400 uppercase">
                  Streak
                </span>
              </div>
            </div>

            {/* Progress */}
            {totalCount > 0 && (
              <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} rounded-xl border p-5 mb-6`}>
                <div className="flex justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500">
                    Today's progress
                  </p>
                  <p className="text-sm font-semibold">
                    {completedCount}/{totalCount}
                  </p>
                </div>

                <div className={`${theme ? "bg-gray-200" : "bg-gray-700"} h-2 rounded-full`}>
                  <div
                    className={`${theme ? "bg-gray-900" : "bg-white"} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Tasks */}
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Tasks
            </p>

            {todayTasks.length === 0 ? (
              <div className={`${theme ? "bg-white text-gray-400" : "bg-gray-900 text-gray-500"} rounded-xl p-10 text-center`}>
                No tasks for today
              </div>
            ) : (
              todayTasks.map((e, index) => (
                <div
                  key={index}
                  className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} border rounded-xl px-5 py-4 flex items-center gap-4 mb-3 transition hover:shadow-md ${
                    e.completed ? "opacity-50" : ""
                  }`}
                >

                  {/* Check */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      e.completed
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "border-gray-400"
                    }`}
                  >
                    {e.completed && "✓"}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p
                      className={`text-sm md:text-base ${
                        e.completed
                          ? "line-through text-gray-400"
                          : theme
                            ? "text-gray-900"
                            : "text-gray-100"
                      }`}
                    >
                      {e.do}
                    </p>

                    {e.time && (
                      <p className="text-xs text-gray-400 mt-1">
                        {fmt(e.time)}
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handletask(e)}
                    disabled={e.completed}
                    className={`text-xs md:text-sm px-4 py-2 rounded-lg font-medium transition ${
                      e.completed
                        ? "bg-green-100 text-green-700"
                        : theme
                          ? "bg-gray-900 text-white hover:bg-gray-700"
                          : "bg-white text-gray-900 hover:bg-gray-300"
                    }`}
                  >
                    {e.completed ? "Done ✓" : "Mark done"}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Streak */}
            <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} rounded-2xl p-6 border text-center`}>
              <p className="text-gray-500 text-sm mb-2">Current Streak</p>
              <p className="text-4xl font-bold">{streak}</p>
              <p className="text-xs text-gray-400 mt-1">Keep going 🔥</p>
            </div>

            {/* Completion */}
            <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} rounded-2xl p-6 border text-center`}>
              <p className="text-gray-500 text-sm mb-2">Completion</p>
              <p className="text-3xl font-bold">{progressPercent}%</p>
              <p className="text-xs text-gray-400 mt-1">
                {completedCount} of {totalCount} tasks done
              </p>
            </div>

            {/* All Done */}
            {allDone && (
              <div className={`${theme 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-green-900/20 text-green-400 border-green-800"} 
                border text-sm font-medium rounded-xl px-5 py-4 text-center`}>
                Perfect day! Keep your streak alive!
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home