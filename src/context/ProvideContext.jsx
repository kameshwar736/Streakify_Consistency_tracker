import React, { useState } from 'react'

import CreateContext_New from './CreateContext_New';

const ProvideContext = ({ children }) => {

    const taskDetail = JSON.parse(localStorage.getItem("task")) || false;
     const [theme , setTheme] = useState(false)
    
      const handleTheme = ()=>{
        setTheme(!theme)
        console.log(theme);
        
      }

    return (
        <>
            <CreateContext_New.Provider value={{taskDetail,handleTheme,theme,setTheme}} >
                {children}
            </CreateContext_New.Provider>
        </>
    )
}

export default ProvideContext