import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const Task = () => {
    const [tasks, setTasks] = useState([])
    const [todo, setTodo] = useState({ start: "", end: "", do: "", completed: false })
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("task")) || []
        setTasks(storedTasks)
    }, [])

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedTasks = [...tasks, todo]
        setTasks(updatedTasks)
        localStorage.setItem("task", JSON.stringify(updatedTasks))
        alert("Task Added")
        setShowForm(false)
        setTodo({ start: "", end: "", do: "" })
    }

    const handleDetele = (e) => {
        const removeTask = tasks.filter((value) => value.start != e.start)
        if (removeTask) {
            localStorage.setItem("task", JSON.stringify(removeTask))
            setTasks(removeTask)
        }
    }

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

            <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">

                {/* FULL WIDTH */}
                <div className="w-full max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                                My Daily Tasks
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Organize and track your daily schedule
                            </p>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors w-full md:w-auto justify-center"
                        >
                            <span className="text-lg">+</span> Add Task
                        </button>
                    </div>

                    {/* Empty State */}
                    {tasks.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-700 text-lg">No tasks yet</p>
                            <p className="text-gray-400 text-sm mt-1">
                                Click "Add Task" to create your first task
                            </p>
                        </div>
                    )}

                    {/* TASK GRID (not narrow anymore) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
                        {tasks.map((e, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition"
                            >
                                <div>
                                    <p className="font-medium text-gray-800 text-sm mb-3 break-words">
                                        {e.do}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
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

                                <button
                                    onClick={() => handleDetele(e)}
                                    className="mt-4 text-gray-400 border border-gray-200 hover:border-red-400 hover:text-red-500 hover:bg-red-50 text-xs font-medium px-3 py-2 rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                >
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">

                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-400 text-2xl">×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-700">Start Time</label>
                                <input
                                    type="time"
                                    onChange={handleChange}
                                    name='start'
                                    value={todo.start}
                                    className="w-full bg-gray-100 rounded-xl px-4 py-3 mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-700">End Time</label>
                                <input
                                    type="time"
                                    onChange={handleChange}
                                    name='end'
                                    value={todo.end}
                                    className="w-full bg-gray-100 rounded-xl px-4 py-3 mt-1"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="text-sm font-semibold text-gray-700">Task</label>
                                <input
                                    type="text"
                                    name='do'
                                    value={todo.do}
                                    onChange={handleChange}
                                    placeholder="Enter task..."
                                    className="w-full bg-gray-100 rounded-xl px-4 py-3 mt-1"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl">
                                    Add Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="border px-6 py-3 rounded-xl"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Help */}
            <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg">
                ?
            </button>
        </>
    )
}

export default Task