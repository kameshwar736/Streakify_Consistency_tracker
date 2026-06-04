import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Shedule = () => {

    const [schedule, setSchedule] = useState({ date: "", commitment: "", status: "Incompleted" })
    const handleChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(schedule);

    }
    return (
        <>

            <Navbar />
            <div>
                <div>
                    <h1>Schedule your day</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="date" placeholder='select the date' onChange={handleChange} name='date' />
                        <input type="text" placeholder='commitment' onChange={handleChange} name='commitment' />

                        <select name="status" onChange={handleChange}>
                            <option value="Incompleted">Incompleted</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
            <div>
                <h1>list</h1>
                <div>
                    <div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Shedule