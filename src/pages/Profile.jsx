import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {

  const [user, setUser] = useState({})
  const [heatmap, setHeatmap] = useState([])

  useEffect(() => {

    const localUser = JSON.parse(localStorage.getItem("localUser")) || {}
    const dailyTask = JSON.parse(localStorage.getItem("dailyTask")) || {}

    setUser(localUser)

    //  Generate last 30 days heatmap
    const days = []

    for (let i = 29; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)

      const key = d.toISOString().split("T")[0]
      const tasks = dailyTask[key] || []

      const completed = tasks.filter(t => t.completed).length
      const total = tasks.length

      let level = 0

      if (total > 0) {
        const percent = completed / total

        if (percent === 1) level = 4
        else if (percent > 0.6) level = 3
        else if (percent > 0.3) level = 2
        else level = 1
      }

      days.push({
        date: key,
        level
      })
    }

    setHeatmap(days)

  }, [])



  const getColor = (level) => {
    switch (level) {
      case 1: return "bg-green-200"
      case 2: return "bg-green-400"
      case 3: return "bg-green-600"
      case 4: return "bg-green-800"
      default: return "bg-gray-200"
    }
  }



  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-3xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-bold">{user.userName}</h1>
            <p className="text-gray-500 text-sm">{user.designation}</p>
            <p className="text-gray-400 text-xs mt-1">
              Goal: {user.goal}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl">🔥</p>
            <p className="font-bold">{user.streak || 0}</p>
            <p className="text-xs text-gray-400">Streak</p>
          </div>

        </div>



        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl text-center">
            <p className="text-gray-500 text-sm">Current Streak</p>
            <p className="text-xl font-bold">{user.streak || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl text-center">
            <p className="text-gray-500 text-sm">Best Streak</p>
            <p className="text-xl font-bold">{user.bestStreak || user.streak || 0}</p>
          </div>

        </div>



        {/* HEATMAP */}
        <div className="bg-white p-5 rounded-2xl">

          <p className="font-semibold mb-4">Activity</p>

          <div className="grid grid-cols-10 gap-2">

            {heatmap.map((d, i) => (
              <div
                key={i}
                title={d.date}
                className={`w-6 h-6 rounded ${getColor(d.level)}`}
              />
            ))}

          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-4 h-4 bg-green-200 rounded"></div>
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <div className="w-4 h-4 bg-green-800 rounded"></div>
            <span>More</span>
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default Profile