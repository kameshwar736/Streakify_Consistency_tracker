import React, { useState } from 'react'

const ThemeToggle = () => {

  const [theme , setTheme] = useState(false)

  const handleTheme = ()=>{
    setTheme(!theme)
    console.log(theme);
    
  }


  return (
   <>
   <div className={theme?'bg-black text-white w-15 text-center rounded-2xl': 'bg-gray-300 text-black w-15 text-center rounded-2xl'}>
       {theme? <button  className='text-sm p-1' onClick={handleTheme}>dark</button>: <button  className='text-sm p-1' onClick={handleTheme}>light</button>}
   </div>
   </>
  )
}

export default ThemeToggle