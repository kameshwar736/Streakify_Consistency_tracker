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

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto px-6 py-10">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-7">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Daily Tasks</h1>
                            <p className="text-gray-400 text-sm mt-1">Organize and track your daily schedule</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                        >
                            <span className="text-lg leading-none">+</span> Add Task
                        </button>
                    </div>

                    {/* Empty State */}
                    {tasks.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-2xl py-16 flex flex-col items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-700 text-base">No tasks yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "Add Task" to create your first task</p>
                        </div>
                    )}

                    {/* Task List */}
                    <div className="flex flex-col gap-3">
                        {tasks.map((e, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 text-sm truncate">{e.do}</p>
                                        <div className="flex gap-2 mt-2">
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
                                    onClick={() => handleDetele(e)}
                                    className="text-gray-400 border border-gray-200 hover:border-red-400 hover:text-red-500 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
                >
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Add New Task</h2>
                                <p className="text-gray-400 text-sm mt-1">Schedule a new task for your day</p>
                            </div>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Start Time */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                                <input
                                    type="time"
                                    onChange={handleChange}
                                    name='start'
                                    value={todo.start}
                                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:bg-gray-200 transition-colors"
                                />
                            </div>

                            {/* End Time */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                                <input
                                    type="time"
                                    onChange={handleChange}
                                    name='end'
                                    value={todo.end}
                                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:bg-gray-200 transition-colors"
                                />
                            </div>

                            {/* Task Description */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Task Description</label>
                                <input
                                    type="text"
                                    placeholder='Enter your task...'
                                    name='do'
                                    value={todo.do}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:bg-gray-200 transition-colors placeholder-gray-400"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                                >
                                    Add Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Help Button */}
            <button className="fixed bottom-6 right-6 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm font-semibold shadow-lg transition-colors">
                ?
            </button>
        </>
    )
}

export default Task