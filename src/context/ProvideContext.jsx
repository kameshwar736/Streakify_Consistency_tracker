import React from 'react'
import CreateContext from './CreateContext'

const ProvideContext = ({ children }) => {

    const profileDetail = JSON.parse(localStorage.getItem("localUser")) || false;


    return (
        <>
            <CreateContext.Provider value={profileDetail} >
                {children}
            </CreateContext.Provider>
        </>
    )
}

export default ProvideContext