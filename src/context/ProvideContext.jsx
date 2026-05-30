import React from 'react'
import CreateContext from './CreateContext'

const ProvideContext = ({ children }) => {

    const taskDetail = JSON.parse(localStorage.getItem("task")) || false;


    return (
        <>
            <CreateContext.Provider value={taskDetail} >
                {children}
            </CreateContext.Provider>
        </>
    )
}

export default ProvideContext