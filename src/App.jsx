import React from 'react'
import Setup from './pages/Setup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Shedule from './pages/Shedule'


const App = () => {
  return (
   <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Setup' element={<Setup/>}/>
      <Route path='/task' element={<Task/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/Shedule' element={<Shedule/>}/>
        

    </Routes>
   </>
  )
}

export default App