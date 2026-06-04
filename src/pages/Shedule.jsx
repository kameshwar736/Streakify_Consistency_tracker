import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Shedule = () => {
  const [schedule, setSchedule] = useState({
    date: "",
    commitment: "",
    status: "Incomplete",
  });

  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem("scheduleTask")) || [];
  });

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTasks = [...data, schedule];
    setData(updatedTasks);
    localStorage.setItem("scheduleTask", JSON.stringify(updatedTasks));

    setSchedule({ date: "", commitment: "", status: "Incomplete" });
  };

  const updateStatus = (index, value) => {
    const updatedTasks = data.map((task, i) =>
      i === index ? { ...task, status: value } : task
    );

    setData(updatedTasks);
    localStorage.setItem("scheduleTask", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Schedule your day
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Plan and manage your daily commitments
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <input
                type="date"
                name="date"
                value={schedule.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none"
              />

              <input
                type="text"
                name="commitment"
                placeholder="Enter commitment"
                value={schedule.commitment}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 md:col-span-2 focus:ring-2 focus:ring-gray-900 outline-none"
              />

              <select
                name="status"
                value={schedule.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none"
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                type="submit"
                className="md:col-span-4 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Task Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Your Tasks
            </h2>

            {/* Grid instead of narrow list */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.map((e, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="text-sm text-gray-500">{e.date}</p>
                    <p className="text-lg font-medium text-gray-800">
                      {e.commitment}
                    </p>
                  </div>

                  <select
                    value={e.status}
                    onChange={(event) =>
                      updateStatus(i, event.target.value)
                    }
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      e.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Shedule;