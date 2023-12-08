"use client"

import React from 'react'
import axios from 'axios';
import {useClient,useState} from "react"
import TextToSpeech from './TextToSpeech';

const Chat = () => {

    const [userText,setUserText] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [called,setCalled] = useState(false)
    const [response, setResponse] = useState('');
    const [textToSpeak,setTextToSpeak] = useState("");
    const axios = require('axios');

const callAPI = async ()=>{

  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://iamai.p.rapidapi.com/ask',
    headers: {
      'content-type': 'application/json',
      'X-Forwarded-For': '<user\'s ip>',
      'X-RapidAPI-Key': 'b566d52df6msh0dd0010a7b9499fp16aa9fjsn7202b2a8d711',
      'X-RapidAPI-Host': 'iamai.p.rapidapi.com'
    },
    data: {
      consent: true,
      ip: '::1',
      question: userText
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data.message.text);
    speakText(response.data.message.text)
  } catch (error) {
    console.error(error);
  }

}

// data: [
//   {
//   content: userText,
//   role: 'user'
//   }
// ]
// };

// try {
// const response = await axios.request(options);
// console.log(response.data.text);
// speakText(response.data.text)
// } catch (error) {
// console.error(error);
// }

const handleButtonClick = () => {
    callAPI();
};

const speakText = (textToSpeak) => {
    setIsLoading(true); 
    setTextToSpeak(textToSpeak)
    setUserText("");
};

    

  return (
    <div className='flex items-center justify-center'>
      <form className="absolute flex  items-center justify-center bottom-[20px] space-x-2 pt-3">
        
        <input
        value={userText}
        className="bg-transparent lg:w-[500px] sm:w-[200px] md:w-[400px] border border-grey/80 outline-none rounded-lg placeholder:text-grey p-2 text-grey"
        placeholder="What do you want to know"
        onChange={(e)=>setUserText(e.target.value)}
        />

        <button 
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading}
        className="text-grey p-2 border-grey/80 border-[1px] rounded-lg disabled:text-blue-100 disabled:cursor-not-allowed disabled:bg-gray
        hover:scale-110 hover:text-black hover:bg-white duration-300 transition-all">
            {isLoading?"thinking...":"Ask"}
        </button>
        
        <TextToSpeech textToSpeak={textToSpeak} setIsLoading={setIsLoading} isLoading={isLoading}/>

      </form>
    </div>
  )
}

export default Chat
