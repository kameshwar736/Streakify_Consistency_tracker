import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import CreateContext_New from "../context/CreateContext_New";

const Shedule = () => {
  const { theme } = useContext(CreateContext_New);

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

      <div
        className={`min-h-screen px-4 md:px-10 py-8 ${
          theme
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-950 text-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Schedule your day
            </h1>
            <p className="text-sm mt-1 text-gray-500">
              Plan and manage your daily commitments
            </p>
          </div>

          {/* Form Card */}
          <div
            className={`rounded-2xl p-6 md:p-8 shadow-sm mb-8 border ${
              theme
                ? "bg-white border-gray-200"
                : "bg-gray-900 border-gray-700"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <input
                type="date"
                name="date"
                value={schedule.date}
                onChange={handleChange}
                className={`rounded-xl px-4 py-3 outline-none border ${
                  theme
                    ? "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-gray-900"
                    : "bg-gray-800 border-gray-600 focus:ring-2 focus:ring-white"
                }`}
              />

              <input
                type="text"
                name="commitment"
                placeholder="Enter commitment"
                value={schedule.commitment}
                onChange={handleChange}
                className={`rounded-xl px-4 py-3 md:col-span-2 outline-none border ${
                  theme
                    ? "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-gray-900"
                    : "bg-gray-800 border-gray-600 focus:ring-2 focus:ring-white"
                }`}
              />

              <select
                name="status"
                value={schedule.status}
                onChange={handleChange}
                className={`rounded-xl px-4 py-3 outline-none border ${
                  theme
                    ? "bg-gray-50 border-gray-300"
                    : "bg-gray-800 border-gray-600"
                }`}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                type="submit"
                className={`  py-3 rounded-xl font-semibold transition ${
                  theme
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-white text-gray-900 hover:bg-gray-300"
                }`}
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Task Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Your Tasks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.map((e, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 flex justify-between items-center transition hover:shadow-md border ${
                    theme
                      ? "bg-white border-gray-200"
                      : "bg-gray-900 border-gray-700"
                  }`}
                >
                  <div>
                    <p className="text-sm text-gray-500">{e.date}</p>
                    <p
                      className={`text-lg font-medium ${
                        theme ? "text-gray-800" : "text-gray-100"
                      }`}
                    >
                      {e.commitment}
                    </p>
                  </div>

                  <select
                    value={e.status}
                    onChange={(event) =>
                      updateStatus(i, event.target.value)
                    }
                    className={`px-3 py-2 rounded-lg text-sm font-medium outline-none ${
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