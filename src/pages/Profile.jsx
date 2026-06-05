import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CreateContext_New from "../context/CreateContext_New";

const ProfileDashboard = () => {

  const { theme } = useContext(CreateContext_New)

  const [user, setUser] = useState({});
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {

    const localUser = JSON.parse(localStorage.getItem("localUser")) || {};
    const dailyTask = JSON.parse(localStorage.getItem("dailyTask")) || {};

    setUser(localUser);

    const todayData = dailyTask[today] || [];
    setTodayTasks(todayData);

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const key = d.toISOString().split("T")[0];
      const tasks = dailyTask[key] || [];

      const completed = tasks.filter(t => t.completed).length;

      last7Days.push({
        date: key,
        completed,
        total: tasks.length
      });
    }

    setWeeklyData(last7Days);

    const days = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const key = d.toISOString().split("T")[0];
      const tasks = dailyTask[key] || [];

      const completed = tasks.filter(t => t.completed).length;
      const total = tasks.length;

      let level = 0;

      if (total > 0) {
        const percent = completed / total;

        if (percent === 1) level = 4;
        else if (percent > 0.6) level = 3;
        else if (percent > 0.3) level = 2;
        else level = 1;
      }

      days.push({ date: key, level });
    }

    setHeatmap(days);

  }, []);

  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;

  const progress = totalToday
    ? Math.round((completedToday / totalToday) * 100)
    : 0;

  const bestStreak = user.bestStreak || user.streak || 0;

  const getColor = (level) => {
    switch (level) {
      case 1: return theme ? "bg-green-200" : "bg-green-900";
      case 2: return theme ? "bg-green-400" : "bg-green-700";
      case 3: return theme ? "bg-green-600" : "bg-green-500";
      case 4: return theme ? "bg-green-800" : "bg-green-300";
      default: return theme ? "bg-gray-200" : "bg-gray-700";
    }
  };

  return (
    <>
      <Navbar />

      <div className={`min-h-screen ${theme ? "bg-gray-50 text-gray-900" : "bg-gray-950 text-gray-100"} p-6`}>
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className={`${theme ? "bg-white text-gray-900" : "bg-gray-900 text-white"} rounded-2xl p-6 mb-6 flex justify-between items-center shadow-sm`}>
            <div>
              <h1 className="text-xl font-bold">{user.userName}</h1>
              <p className="text-gray-400 text-sm">{user.designation}</p>
              <p className="text-gray-500 text-xs mt-1">
                {new Date().toDateString()}
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl">🔥</p>
              <p className="font-bold text-lg">{user.streak || 0}</p>
              <p className="text-xs text-gray-400">Streak</p>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mb-6">

            {[ 
              { label: "Completed", value: completedToday },
              { label: "Total Tasks", value: totalToday },
              { label: "Best Streak", value: bestStreak }
            ].map((item, i) => (
              <div key={i} className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} p-4 rounded-xl text-center border`}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}

          </div>

          {/* PROGRESS */}
          <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} p-5 rounded-2xl mb-6 border`}>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold">Today's Progress</p>
              <p className="text-sm">{progress}%</p>
            </div>

            <div className={`${theme ? "bg-gray-200" : "bg-gray-700"} h-2 rounded`}>
              <div
                className={`${theme ? "bg-gray-900" : "bg-white"} h-2 rounded`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

        
          {/* HEATMAP */}
          <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} p-5 rounded-2xl mb-6 border`}>
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
          </div>

          {/* INSIGHT */}
          <div className={`${theme ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"} p-5 rounded-2xl border`}>
            <p className="font-semibold mb-2">Insight</p>

            {progress === 100 ? (
              <p className="text-green-600 text-sm">
                Perfect day! Keep it up!
              </p>
            ) : progress > 50 ? (
              <p className="text-yellow-500 text-sm">
                Good progress, almost there!
              </p>
            ) : (
              <p className="text-red-500 text-sm">
                Try to complete more tasks today.
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ProfileDashboard;