"use client"
import React, { Children, createContext,useState } from 'react'

export const AppContext = createContext({
    isPlaying : false,
    setIsPlaying:()=>{

    }
})

const IsPlayingProvider = ({children}) => {
    const [isPlaying,setIsPlaying]=useState(false)
  return (
    <AppContext.Provider value={{isPlaying,setIsPlaying}}>
      {children}
    </AppContext.Provider>
  )
}

export default IsPlayingProvider
