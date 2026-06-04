import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ProfileDashboard = () => {

  const [user, setUser] = useState({});
  const [todayTasks, setTodayTasks] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {

    const localUser = JSON.parse(localStorage.getItem("localUser")) || {};
    const dailyTask = JSON.parse(localStorage.getItem("dailyTask")) || {};

    setUser(localUser);

    // ===== TODAY TASKS =====
    const todayData = dailyTask[today] || [];
    setTodayTasks(todayData);

    // ===== WEEKLY DATA =====
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

    // ===== HEATMAP (30 DAYS) =====
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

  // ===== CALCULATIONS =====
  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;

  const progress = totalToday
    ? Math.round((completedToday / totalToday) * 100)
    : 0;

  const bestStreak = user.bestStreak || user.streak || 0;

  // ===== HEATMAP COLOR =====
  const getColor = (level) => {
    switch (level) {
      case 1: return "bg-green-200";
      case 2: return "bg-green-400";
      case 3: return "bg-green-600";
      case 4: return "bg-green-800";
      default: return "bg-gray-200";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
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

            <div className="bg-white p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold">{completedToday}</p>
            </div>

            <div className="bg-white p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-bold">{totalToday}</p>
            </div>

            <div className="bg-white p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Best Streak</p>
              <p className="text-xl font-bold">{bestStreak}</p>
            </div>

          </div>

          {/* PROGRESS */}
          <div className="bg-white p-5 rounded-2xl mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold">Today's Progress</p>
              <p className="text-sm">{progress}%</p>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-gray-900 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* WEEKLY */}
          <div className="bg-white p-5 rounded-2xl mb-6">
            <p className="font-semibold mb-4">Last 7 Days</p>

            <div className="flex justify-between items-end h-32">
              {weeklyData.map((d, i) => {
                const percent = d.total
                  ? (d.completed / d.total) * 100
                  : 0;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-6 bg-gray-900 rounded"
                      style={{ height: `${percent}%` }}
                    />
                    <p className="text-[10px] mt-1">
                      {d.date.slice(5)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HEATMAP */}
          <div className="bg-white p-5 rounded-2xl mb-6">
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
          <div className="bg-white p-5 rounded-2xl">
            <p className="font-semibold mb-2">Insight</p>

            {progress === 100 ? (
              <p className="text-green-600 text-sm">
                Perfect day! Keep it up!
              </p>
            ) : progress > 50 ? (
              <p className="text-yellow-600 text-sm">
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