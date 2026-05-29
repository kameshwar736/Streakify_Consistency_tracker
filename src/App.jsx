import React from 'react'
import Setup from './pages/Setup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'


const App = () => {
  return (
   <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Setup' element={<Setup/>}/>
      <Route path='/task' element={<Task/>}/>
        

    </Routes>
   </>
  )
}

export default App