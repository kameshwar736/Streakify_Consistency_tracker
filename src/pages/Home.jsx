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
    if (!user) { nav('/Setup'); return }
    setActiveUser(user)
    setStreak(user.streak || 0)
    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}
    if (!storedDaily[today] && passData && passData.length > 0) {
      const newDailyTasks = passData.map(task => ({ ...task, completed: false, date: today }))
      storedDaily[today] = newDailyTasks
      localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    }
    setTodayTasks(storedDaily[today] || [])
  }, [passData])

  const handletask = (clickedTask) => {
    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}
    const updatedTasks = storedDaily[today].map(task =>
      task.do === clickedTask.do ? { ...task, completed: true } : task
    )
    storedDaily[today] = updatedTasks
    localStorage.setItem("dailyTask", JSON.stringify(storedDaily))
    setTodayTasks(updatedTasks)
    const allCompleted = updatedTasks.every(task => task.completed)
    if (allCompleted && updatedTasks.length > 0) {
      const user = JSON.parse(localStorage.getItem("localUser"))
      if (user.lastStreakDate !== today) {
        const updatedUser = { ...user, streak: (user.streak || 0) + 1, lastStreakDate: today }
        localStorage.setItem("localUser", JSON.stringify(updatedUser))
        setActiveUser(updatedUser)
        setStreak(updatedUser.streak)
      }
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

  const allDone = totalCount > 0 && completedCount === totalCount

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="bg-gray-900 text-white rounded-2xl px-6 py-5 mb-4 flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Good day,</p>
              <h1 className="text-2xl font-medium">{activeUser.userName} 👋</h1>
              <p className="text-xs text-gray-500 mt-2">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long", month: "long", day: "numeric"
                })}
              </p>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded-xl px-4 py-3 gap-0.5 min-w-[60px]">
              <span className="text-lg">🔥</span>
              <span className="text-xl font-medium">{streak}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Streak</span>
            </div>
          </div>

          {/* All done banner */}
          {allDone && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-5 py-3 text-center mb-4">
              🎉 All tasks done for today! Streak extended.
            </div>
          )}

          {/* Progress */}
          {totalCount > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 mb-4">
              <div className="flex justify-between items-center mb-2.5 text-sm">
                <span className="text-gray-500 font-medium">Today's progress</span>
                <span className="font-medium text-gray-900">{completedCount} / {totalCount}</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gray-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Tasks */}
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-3">Tasks</p>

          {todayTasks.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">No tasks for today</div>
          ) : (
            todayTasks.map((e, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex items-center gap-3 mb-2 transition-opacity ${e.completed ? "opacity-50" : ""}`}
              >
                {/* Circle check */}
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border
                  ${e.completed
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "border-gray-300"
                  }`}
                >
                  {e.completed && (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${e.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {e.do}
                  </p>
                  {e.time && (
                    <p className="text-xs text-gray-400 mt-0.5">{fmt(e.time)}</p>
                  )}
                </div>

                <button
                  onClick={() => handletask(e)}
                  disabled={e.completed}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium flex-shrink-0 transition-colors
                    ${e.completed
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-gray-900 text-white hover:bg-gray-700 active:scale-95"
                    }`}
                >
                  {e.completed ? "Done ✓" : "Mark done"}
                </button>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  )
}

export default Home