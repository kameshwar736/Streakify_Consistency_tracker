import React, { useContext, useState } from 'react'

import CreateContext_New from '../context/CreateContext_New'

const ThemeToggle = () => {

  // const [theme , setTheme] = useState(false)

  // const handleTheme = ()=>{
  //   setTheme(!theme)
  //   console.log(theme);
    
  // }

  // const nnewdata = useContext(CreateContext)
  // console.log(nnewdata);
  
  const {handleTheme,theme,setTheme} = useContext(CreateContext_New)



  return (
 <>
  <div
    onClick={handleTheme}
    className={`w-16 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
      theme ? "bg-gray-400" : "bg-gray-400"
    }`}
  >
    <div
      className={`w-6 h-4 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center text-xs font-bold ${
        theme
          ? "translate-x-8 bg-white text-black"
          : "translate-x-0 bg-black text-white"
      }`}
    >
      {theme ? "L" : "D"}
    </div>
  </div>
</>
  )
}

export default ThemeToggle