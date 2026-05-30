import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CreateContext from '../context/CreateContext'

const Home = () => {

  const nav = useNavigate()
  const passData = useContext(CreateContext)

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

    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}

    if (!storedDaily[today]) {
      const newDailyTasks = (passData || []).map(task => ({
        ...task,
        completed: false,
        date: today
      }))
      storedDaily[today] = newDailyTasks
      localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    }

    setTodayTasks(storedDaily[today] || [])
  }, [passData])

  const handletask = (clickedTask) => {
    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}

    const updatedTasks = storedDaily[today].map(task => {
      if (task.do === clickedTask.do) {
        return { ...task, completed: true }
      }
      return task
    })

    storedDaily[today] = updatedTasks
    localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    setTodayTasks(updatedTasks)

    const checkStreak = todayTasks.filter((e) => e.completed != false)
    if (checkStreak) {
      setStreak(streak + 1)
    }
  }

  const completedCount = todayTasks.filter(t => t.completed).length
  const totalCount = todayTasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const fmt = (t) => {
    if (!t) return ""
    const [h, m] = t.split(":")
    const hr = parseInt(h)
    const ampm = hr >= 12 ? "PM" : "AM"
    return `${hr % 12 || 12}:${m} ${ampm}`
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-10">

          {/* Welcome Header */}
          <div className="bg-gray-900 text-white rounded-2xl px-7 py-6 mb-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Good day,</p>
              <h1 className="text-2xl font-bold tracking-tight">
                {activeUser.userName} 👋
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Streak Badge */}
            <div className="flex flex-col items-center bg-white/10 rounded-2xl px-5 py-4">
              <span className="text-2xl">🔥</span>
              <span className="text-2xl font-bold leading-tight">{streak}</span>
              <span className="text-gray-400 text-xs mt-0.5">Streak</span>
            </div>
          </div>

          {/* Progress Card */}
          {totalCount > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">Today's Progress</p>
                <span className="text-sm font-bold text-gray-900">{completedCount}/{totalCount}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-gray-900 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">{progressPercent}% completed</p>
            </div>
          )}

          {/* Tasks Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Tasks for Today</h2>
            {completedCount === totalCount && totalCount > 0 && (
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                All done! 🎉
              </span>
            )}
          </div>

          {/* Empty State */}
          {todayTasks.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="font-semibold text-gray-700 text-base">No tasks today</p>
              <p className="text-gray-400 text-sm mt-1">Add tasks from the Task Manager</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {todayTasks.map((e, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-2xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-300
                    ${e.completed ? "border-green-200 opacity-60" : "border-gray-200 hover:shadow-md"}`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Checkbox indicator */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors
                      ${e.completed ? "bg-gray-900 border-gray-900" : "border-gray-300"}`}>
                      {e.completed && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${e.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {e.do}
                      </p>
                      <div className="flex gap-2 mt-1.5">
                        {e.start && (
                          <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-lg">
                            ▶ {fmt(e.start)}
                          </span>
                        )}
                        {e.end && (
                          <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-lg">
                            ■ {fmt(e.end)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handletask(e)}
                    disabled={e.completed}
                    className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0
                      ${e.completed
                        ? "bg-green-100 text-green-600 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-gray-700 text-white cursor-pointer"
                      }`}
                  >
                    {e.completed ? "Done ✓" : "Mark Done"}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm font-semibold shadow-lg transition-colors">
        ?
      </button>
    </>
  )
}

export default Home