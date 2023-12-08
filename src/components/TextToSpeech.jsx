"use client"

import { useEffect, useState,useRef, useContext } from "react"
import { FormEvent } from "react"
import { sendTextToOpenAI } from "../../utils/sendTextToOpenAI"
import { AppContext } from "@/app/context/isPlayingContext"

const TextToSpeech = ({textToSpeak,setIsLoading,isLoading}) => {

      
    // const [userText,setUserText] = useState("")
    // const [isLoading,setIsLoading] = useState(false)

    const synth = typeof window !== "undefined" ? window.speechSynthesis : null
    const voices = synth?.getVoices();
    const synthRef = useRef(window.speechSynthesis);
    const {isPlaying,setIsPlaying} = useContext(AppContext)
    const selectedVoices = voices && voices.find(voice => voice.name === "Albert");

    useEffect(()=>{
      const utterance = new SpeechSynthesisUtterance(textToSpeak)

      synth?.speak(utterance)
      utterance.rate = 0.01;
      
      setIsLoading(true)
      setIsPlaying(true)
      utterance.onend = function() {
          setIsPlaying(false)
          setIsLoading(false);
        };
    },[textToSpeak,synth,setIsLoading,setIsPlaying])
   
    return null
  } 
        
              

        // const handleUserText = async (e) => {
        //       e.preventDefault();
        //       setIsLoading(true)
        //       try {
        //           const message = await sendTextToOpenAI(userText);
        //           speak(message);
        //       } catch (error) {
        //           let message = "";
        //           if(error instanceof Error) message = error.message
        //           console.log(error.message)
        //       }finally {
        //           setIsLoading(false)
        //           setUserText("")
        //       }
        //   };

  


export default TextToSpeech
