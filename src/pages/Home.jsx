import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {

  const nav = useNavigate()
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("localUser") || "null")
    console.log(user)

    if (!user) {
      nav('/Setup')
    } else {
      setActiveUser(user.userName)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className='text-2xl'>
          Welcome {activeUser?.userName}
        </h1>
        <p>Streak 1</p>
      </div>

      <div>
        <p>task to do today</p>
        <p>Day1</p>
      </div>
    </>
  )
}

export default Home