import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
        <div className='bg-amber-300 p-6 flex justify-between px-10 items-center'>
            <div>
                <h1 className='text-5xl font-mono'>Streakify</h1>
            </div>
            <div className='flex gap-6 px-10 text-lg font-medium'>
              <Link to='/'>Home</Link>
              <Link to='/task'>Task</Link>
              <p>Dashboard</p>
              <p>Profile</p>
            </div>
        </div>
    
    </>
  )
}

export default Navbar