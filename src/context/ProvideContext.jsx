import React, { useEffect, useState } from 'react'
import CreateContext_New from './CreateContext_New'

const ProvideContext = ({ children }) => {

  const [taskDetail, setTaskDetail] = useState(() => {
    return JSON.parse(localStorage.getItem("task")) || []
  })

  const [theme, setTheme] = useState(false)

  const handleTheme = () => {
    setTheme(!theme)
  }

  // Listen for updates
  useEffect(() => {
    const updateTasks = () => {
      const updated = JSON.parse(localStorage.getItem("task")) || []
      setTaskDetail(updated)
    }

    window.addEventListener("storage", updateTasks)

    return () => window.removeEventListener("storage", updateTasks)
  }, [])

  return (
    <CreateContext_New.Provider
      value={{ taskDetail, setTaskDetail, theme, handleTheme }}
    >
      {children}
    </CreateContext_New.Provider>
  )
}

export default ProvideContext