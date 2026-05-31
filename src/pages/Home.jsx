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
    setStreak(user.streak || 0) // ✅ load streak

    const storedDaily = JSON.parse(localStorage.getItem("dailyTask")) || {}

    // ✅ FIX: only create tasks if passData exists
    if (!storedDaily[today] && passData && passData.length > 0) {

      const newDailyTasks = passData.map(task => ({
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

    // ✅ STREAK LOGIC (FIXED)
    const allCompleted = updatedTasks.every(task => task.completed)

    if (allCompleted && updatedTasks.length > 0) {

      const user = JSON.parse(localStorage.getItem("localUser"))

      // ✅ prevent multiple updates in same day
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
  const progressPercent = totalCount > 0
    ? Math.round((completedCount / totalCount) * 100)
    : 0

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

          {/* Header */}
          <div className="bg-gray-900 text-white rounded-2xl px-7 py-6 mb-6 flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Good day,</p>
              <h1 className="text-2xl font-bold">{activeUser.userName} 👋</h1>
              <p className="text-gray-400 text-sm mt-2">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>

            <div className="flex flex-col items-center bg-white/10 rounded-2xl px-5 py-4">
              <span>🔥</span>
              <span className="text-xl font-bold">{streak}</span>
              <span className="text-xs text-gray-400">Streak</span>
            </div>
          </div>



          {/* Progress */}
          {totalCount > 0 && (
            <div className="bg-white rounded-2xl p-5 mb-6">
              <div className="flex justify-between mb-2">
                <p>Today's Progress</p>
                <span>{completedCount}/{totalCount}</span>
              </div>

              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-gray-900 h-2 rounded"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}



          {/* Tasks */}
          {todayTasks.length === 0 ? (
            <p>No tasks today</p>
          ) : (
            todayTasks.map((e, index) => (
              <div key={index} className="flex justify-between mb-3">

                <p className={e.completed ? "line-through text-gray-400" : ""}>
                  {e.do}
                </p>

                <button
                  onClick={() => handletask(e)}
                  disabled={e.completed}
                  className={`px-3 py-1 rounded
                    ${e.completed
                      ? "bg-green-200 cursor-not-allowed"
                      : "bg-black text-white"
                    }`}
                >
                  {e.completed ? "Done ✓" : "Mark Done"}
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