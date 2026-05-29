import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const Task = () => {

    const [tasks, setTasks] = useState([])
    const [todo, setTodo] = useState({ start: "", end: "", do: "" })
    const [showForm, setShowForm] = useState(false)

    // load from localStorage
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("task")) || []
        setTasks(storedTasks)
    }, [])

    // handle input
    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    // submit
    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedTasks = [...tasks, todo]
        setTasks(updatedTasks)

        localStorage.setItem("task", JSON.stringify(updatedTasks))

        alert("Task Added")

        setShowForm(false)
        setTodo({ start: "", end: "", do: "" }) // reset form
    }

    return (
        <>
            <Navbar />

            <div>
                <div>
                    <div>task for daily do</div>
                    <button onClick={() => setShowForm(true)}>Add task</button>
                </div>
            </div>

            {showForm && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Start from</label>
                        <input type="time" onChange={handleChange} name='start' value={todo.start} />

                        <label>End to</label>
                        <input type="time" onChange={handleChange} name='end' value={todo.end} />

                        <input
                            type="text"
                            placeholder='Enter the task'
                            name='do'
                            value={todo.do}
                            onChange={handleChange}
                        />

                        <button type="submit">Add</button>
                    </form>
                </div>
            )}

            <div>
                {tasks.map((e, i) => (
                    <div key={i}>
                        <div>
                            <p>{e.start}</p>
                            <p>{e.end}</p>
                        </div>
                        <div>
                            <p>{e.do}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Task